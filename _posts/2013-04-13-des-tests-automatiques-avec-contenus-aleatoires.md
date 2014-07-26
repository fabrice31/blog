---
layout: post
title: Des tests automatiques avec contenus aléatoires
---

Si vous avez plusieurs tests qui s’exécutent en même temps sur le même environnement (le serveur de test), il faut veiller à bien tester la "bonne chose".

Prenons un exemple de deux tests exécutés en même temps :

```ruby
@scenario1
Scenario: Test modif pseudo
   Given I connect to my "pseudo" account
     When I change my nickname for "pseudo-tmp"
     When I publish an article "test pseudo-tmp"
     Then my published pseudo is "pseudo-tmp"
@scenario2
Scenario: Pseudo cannot be empty when you publish
   Given I connect to my "pseudo" account
     When I change my nickname for ""
     When I publish an article "test pseudo"
     Then my published pseudo is "pseudo"
```

Si les 2 scénarios se terminent "au même moment", nous aurons sur la page de contrôle 2 articles. L'un signé avec "pseudo-tmp", et l'autre avec "pseudo".

Si la vérification vérifie dans tout le contenu de la page des publications et pas seulement le dernier élément, cela pourrait bien se passer.

A un détail près :

* A 10h, le test s’exécute, il fonctionne.
* A 15h, le test s’exécute mais les articles parus à 10h sont peut-être toujours affichés. On aura donc bien un article "test pseudo" sur la page alors qu'un bug sera présent.

Ma solution : **ajouter de l'aléatoire dans les tests**.
Avant chaque scénario, je crée un token, composé de :
* 2 lettres du navigateur (ff, ie, ch..)
* un nombre aléatoire.
Et je l'affiche en console (bien pratique pour débugguer)

```ruby
Before do
  $token = Token.new
  puts "Token for this test : #{$token.value}"
  /* je vous fais grace du code pour lancer le navigateur, ... */ 
End
```

Ma classe Token :

```ruby
# Use to got random value
# Useful to post a data with random string but keep the value to check it later
# Author:: Fabrice
class Token
  # Create a new token
  # Author:: Fabrice
  def initialize
    @value = "#{ENV['BROWSER']}#{256*256+rand(1024*1024)}"
  end
  # Get the value of the last token
  # Author:: Fabrice
  def value
    @value
  end
end
```

Ensuite, sans modifier le scénario, on modifie le code des étapes. Lorsqu'on sauve une donnée, on ajoute le token "courant" dans le champ.

```ruby
title = "#{title} #{$token.value}"
```

Et côté vérification, on en tient compte également.

```ruby
def open_article(title, token = false)
  if(token)
    @browser.link(:text => "#{title} #{$token.value}").click
  else
    @browser.link(:text => "#{title}").click
  end
end
```

Parfois, on a besoin de pouvoir jouer "sans token" pour des points bien précis : on prévoit alors un paramètre pour s'en passer. (Exemple, pour la saisie d'un email)

Ce genre de solution peut aussi vous éviter des effets de bords si vous publiez sur le même compte des articles avec le même titre. (Ceci, c'est un autre test à part entière)