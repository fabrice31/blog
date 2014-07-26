---
layout: post
title: Ruby - OAuth v1.0a pour optimiser les tests
---

Lors de tests, il arrive souvent qu'on ait besoin de "faire le ménage" pour retrouver un état comme à l'origine.
Plusieurs stratégies possibles, en fonction des technologies qu'on souhaite utiliser.

### Un par un, à la fin

Après chaque scénario, supprimer ce qui a été ajouté, annuler les modifications une par une.

Avantages : 

* Facile à mettre en place (on réutilise ce qui a déjà été fait)

Défauts : 

* Si le scénario plante, on ne remet pas en l'état
* Chaque scénario prend un peu plus de temps (jusqu'au double, dans le pire des cas)

### Un par un, au début
Avant chaque scénario, remettre les valeurs par défauts pour le test

Avantages :

* Facile à mettre en place (on réutilise ce qui a déjà été fait)

Défauts :

* Si la remise à zéro ne marche pas, on ne teste pas
* Chaque scénario prend un peu plus de temps (jusqu'au double, dans le pire des cas)

### Tous d'un coup, dans une routine à part
Puisqu'on utilise un outil comme jenkins pour organiser tous les tests, on peut ajouter une routine "à part", qui va se connecter sur chaque compte pour effectuer cette remise à zéro.

Avantages :

* Toutes les procédures de remises à zéro sont au même endroit

Défauts :

* Un peu plus long à mettre en place
* Demande d'ajouter une sécurité pour ne pas la lancer au mauvais moment
* Ca prend du temps (mais autant que de le faire un par un)


### Optimisation : utilisation d'une API

Dans mon cas, nous disposons aussi d'une API publique (en alpha, elle n'est pas encore ouverte à tout le monde)

Avantages :

* Pas d'interface web, cela devrait aller plus vite
* Ajoutera "en passant" des tests sur la public API

Défauts :

* Je ne maitrise pas du tout Oauth 1.0a (ça me permettra d'apprendre : tant mieux)
* Nous disposons d'un SDK pour faciliter l'utilisation de l'API, en php. Pour des raisons pratiques, je préfère le faire en ruby, le serveur de tests étant déjà configuré pour cela. Je pars donc "de zéro"

### Utiliser une API OAuth 1.0a en Ruby

On trouve un peu de documentation pour le faire, et quelques exemples. Quelques remarques sur ces articles :
* La quasi totalité expose le même code d'exemple.
* Rares sont ceux qui signalent la version d'OAuth
* Les exemples se concentrent beaucoup sur "comment se connecter à l'api", et très rarement sur "comment l'utiliser"

Voilà quelques astuces pour utiliser "rapidement" une API OAuth en ruby

#### Utilisation de gems

Elles facilitent la vie, autant en profiter.

```ruby
require 'oauth'
require 'watir-webdriver'
require 'json'
```

#### Définition de constantes de l'api

```ruby
OB_API_SERVER                 = 'http://url_server_api'
OB_API_BASE_URL               = OB_API_SERVER+'/public/0.1'
OB_API_ENDPOINT_REQUEST_TOKEN = '/oauth/request_token'
OB_API_ENDPOINT_ACCESS_TOKEN  = '/oauth/access_token'
OB_API_ENDPOINT_AUTHORIZE     = '/oauth/authorize'
OB_API_MY_CONSUMER_KEY        = '######'
OB_API_MY_CONSUMER_SECRET     = '######'
```

Obtenir la connexion à l'API

```ruby
# create the OAuth consumer
@consumer = OAuth::Consumer.new( 
	OB_API_MY_CONSUMER_KEY,
	OB_API_MY_CONSUMER_SECRET,
	{
		:oauth_version      => '1.0a',
		:site               => OB_API_SERVER,
		:request_token_path => OB_API_ENDPOINT_REQUEST_TOKEN,
		:access_token_path  => OB_API_ENDPOINT_ACCESS_TOKEN,
		:authorize_path     => OB_API_ENDPOINT_AUTHORIZE
	}
)
# show all debugs in console
# @consumer.http.set_debug_output($stdout)
# get the authorize url
@request_token = @consumer.get_request_token
# Make as if the user authorize the app
# If you make a web app, you should show the link to your user, and let it click it
# browse the authorize url
@browser = Watir::Browser.new
@browser.goto(@request_token.authorize_url())
# connect with account
@browser.text_field(:name => 'email').set("test@test.fr")
@browser.text_field(:name => 'passwd').set("monmotdepasse")
@browser.button(:name => 'loginSubmit').click
# give access
@browser.form.submit
# get verifier token
# browser url contain oauth_verifier_token
oauth_verifier_token = @browser.url.split("oauth_verifier=")[1]
# grant total access
@access_token = @request_token.get_access_token(:oauth_verifier => oauth_verifier_token)
# no more browser needed
@browser.close
```

#### Exemples d'utilisation de l'API OAuth

Une fois qu'on est connecté à l'API, on peut l'utiliser. Il faut lire sa documentation, en général assez touffue, pour savoir ce qu'on peut faire (lister / ajouter / modifier / supprimer).
Voici deux exemples "simplifiés" pour mon exemple.

##### Classique

Afficher les informations sur le blog courant.

```ruby
get_url_info =  OB_API_BASE_URL+'/blog/info'
current_blog_info = @access_token.get(get_url_info)
```
	
##### Avec une option

Afficher la liste des titres des articles en brouillons.

```ruby
get_lists_content = OB_API_BASE_URL+'/blog/posts/draft?limit=20'
content_list = @access_token.get(get_lists_content)
# read json results
result = JSON.parse(content_list.body)
result['response'].each do | content |
	puts content['title']
end
```

Conclusions

* Ma routine journalière prenait environ 55 minutes. La nouvelle routine, via l'api, dure environ 90 secondes.
* J'ai depuis très envie de l'étendre pour ajouter de nouvelles procédures de remises à zéro.
* La documentation est primordiale (que ce soit celle de l'API ou celle de OAuth)