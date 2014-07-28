---
layout: post
title: Tester sur plusieurs navigateurs
tags:
  cucumber
  watir
---

Tester de façon automatique, c'est bien. Le faire sur plusieurs environnements, c'est mieux.

Dans mon cas, par défaut, mes tests sont lancés sur Firefox. Sur un serveur jenkins-ci (sur debian), c'est en effet le navigateur le plus facile à gérer. Ils sont exécutés une fois par jour, et aussi à la demande.

Certains scenarios testent la version mobile de nos sites. Il nous faut aussi tester nos sites pour différents navigateurs. Pour cela, les profils et les tags de cucumber sont très intéressants.

### Tags cucumber

Au dessus de chaque scénario, il est possible de lister des tags. On peut ensuite exécuter tous les tests portant un tag particulier.

Cela permet de découper l'exécution de nombreux scénarios en plusieurs jobs sur jenkins, ce qui est plus confortable : si un test passe dans le rouge, il faut analyser un rapport pour 10 scénario au lieu de 300. Si on veut re-tester ce point précis, on mettra également moins de temps.

On exécute les scénarios avec la ligne "cucumber --tag @montag". Si le tag n'existe pas, le résultat affichera immédiatement 0 scenarios.

```ruby
@admin @montag @ie
Scenario: test un tag
  When I test
  Then I tested
```

### Cucumber.yml

Les profils de cucumber se gère dans un fichier au format yaml, qui peut gérer beaucoup de choses :

* Ajouter automatiquement des paramètres de tags
* Passer des variables à l'environnement de tests, qui peut ensuite les utiliser.

Exemple avec une partie de mon fichier :

```ruby
<% common = "-r support -r features --tags ~@wip --tags ~@danger 
--color --format pretty --format html -o results.html --format junit -o junit" %>
# default : staging and firefox
default: <%= common %> BROWSER=firefox
danger: -r support -r features --tags ~@wip --color --format pretty BROWSER=firefox
ie: <%= common %> ENV=staging BROWSER=ie
ff: <%= common %> ENV=staging BROWSER=firefox
chrome: <%= common %> ENV=staging BROWSER=chrome
mobile: <%= common %> ENV=staging BROWSER=mobile
```

La première ligne définit des paramètres commun à la plupart des profils :

* On impose de récupérer le dossier features (dans lequel se trouvent les scenarios) et le dosser support (qui contient le code qui "gère" le navigateur)
* On exclut les tests portant le tag @wip (work in progress) et le tag @danger
* On demande l'affichage des résultats complets (avec les étapes et la couleur)
* On demande l'export des résultats au format html et au format junit

Lorsqu'on utilise un profil, on peut lancer pour un tag donné. Exemple : ```cucumber . --tag @test -p chrome```

Viennent ensuite les profils :

* -p default: lance les tests sur firefox
* -p danger: autorise le lancement des tests taggués @danger
* -p ie, ff, chrome, mobile: lance les tests sur un navigateur particulier

### Différences entre les navigateurs

Passer le nom du navigateur ne suffit pas, il faut également l'utiliser dans le code pour travailler avec le navigateur voulu.

Dans notre cas, nous lancons le navigaeur avant chaque scénario pour éviter qu'un test ait un impact sur le suivant.

Voici le code :

```ruby
Before do
  case ENV['BROWSER']
  when 'ie'
    @browser = Watir::Browser.new :ie
  when 'mobile'
    mobile_useragent = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like \
        Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 \
        Mobile/9B206 Safari/7534.48.3"
    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['general.useragent.override'] = mobile_useragent
    @browser = Watir::Browser.new :firefox, :profile => profile
  when 'chrome'
    @browser = Watir::Browser.new :chrome
  else
    # Default case : firefox
    download_directory = "#{Dir.pwd}/downloads"
    download_directory.gsub!("/", "\\") \
        if Selenium::WebDriver::Platform.windows?
    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['browser.download.folderList'] = 2
    profile['browser.download.dir'] = download_directory
    profile['browser.link.open_newwindow'] = 3
    profile['browser.helperApps.neverAsk.saveToDisk'] = \
        "application/octet-stream"
    profile['network.http.use-cache'] = false
    @browser = Watir::Browser.new :firefox, :profile => profile
  end
  # Resize window
  if ENV['BROWSER'] != 'mobile'
    @browser.window.resize_to(1100, 900)
  else
    @browser.window.resize_to(640, 960)
  end
end
```

On exploite le nom du navigateur pour lancer le bon, avec des paramètres particuliers.

* Le mobile lance un Firefox avec le profil d'un navigateur Iphone (et une résolution de classique pour un mobile)
* Pour internet explorer et chrome, il faut avoir téléchargé les exécutables (sur le groupe selenium) et les avoir ajoutés au path
* Pour firefox, on ajoute des paramètres pour effectuer des tests d'upload et download de fichiers)

### Les tests ont-ils changés ?

Lorsque j'ai commencé à coder ces tests, il y a plus d'un an, j'avais anticipé l'architecture pour gérer ce genre de problématique. La mise en place n'a pourtant pas eu lieu sans douleur.

Certains navigateurs ne se comportent pas tout à fait comme les autres. Il faut donc mettre à jour son code pour qu'il soit le plus "ré utilisable possible".

Dans le cas d'Internet Explorer, les modifications apportées :

* Ajout d'un tag @ie sur les tests compatibles (et stables) avec IE.
* Dans certains cas de remplissage de formulaire, ajout d'une ligne de code pour donner le focus au champ à remplir
* Modification des timeout du projet.

On lance donc les tests pour Internet Explorer avec la commande ```cucumber --tag @ie -p ie```. On peut changer le tag, mais certains ne fonctionnent pas encore sous IE à cause de codes vraiment spécifiques.

Voici deux exemples de code modifé spécifiquement pour IE :

```ruby
if ENV['BROWSER'] == 'ie'
  # internet explorer is slower : timeout increase
  SHORT_TIMEOUT = 5
  TIMEOUT = 15
  LONG_TIMEOUT = 25
else
  SHORT_TIMEOUT = 2
  TIMEOUT = 9
  LONG_TIMEOUT = 25
end
```

Ce code définit les constantes des timeout pour l'ensemble des test.

```ruby
if ENV['BROWSER'] == 'ie'
  sleep(1) # need for IE purpose
end
self.wait_until(LONG_TIMEOUT){
  self.login_element.exists? and self.login_element.visible?
}
self.username_element.focus # need for IE purpose
self.username = @account.email
```

Les commentaires dans le code parlent d'eux mêmes. Documenter le code spécifique à IE est d'ailleurs indispensable si on veut garder ses modifications qui semblent "inutiles".

Si les tests avec Firefox sont joués chaque jour sur un serveur, en 2h45 environ, ceux pour IE sont exécutés en local, en 3h, alors que certains tests ne sont pas exécutés sur IE.

Ce sont donc plus de 300 scénarios par jour, 12 000 par mois. Sans compter les tests unitaires, les tests manuels...
