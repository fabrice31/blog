---
layout: post
title: "L'important, c'est le paradigme"
tags:
  ruby
  python
  selenium
  watir
---

### Technologie de tests

Dans le passé, j'ai travaillé avec webtest, selenium en 2007/2008, mais ils ne me suffisaient pas. J'avais donc une stack classique depuis 5 ans déjà, améliorée de temps en temps par l'ajout d'une librairie ou une organisation de code différente.

* Scenario : Cucumber
* Code : Ruby
* Navigateur : Watir-webdriver
* Framework : page-object
* Mobile : appium, avec vrais android et xcode simulator pour iOS
* Serveur : Jenkins
* Autres technologies : applytools, http-server, ... 

A plusieurs reprises, j'ai hésité à changer de langage, mais cela voulait aussi dire de changer l'ensemble du code actuel pour changer de langage, avoir accès à des choses qui n'existent pas, ou pour faciliter les recrutements. Trouver des développeurs ruby n'est pas toujours facile, en passant à java, ils sont plus nombreux par exemple. Ayant même des développeurs java dans les équipes de développement, on aurait pu avoir des appuis en cas de charge momentanée de travail.

Je n'ai jamais franchi le cap de changer cette stack, qu'on arrivait à adapter et exploiter de mieux en mieux avec le temps. Former mes nouveaux collègues me paraissait simple, et était "facile" parce que tout était logique pour moi. Ils comprenaient vite, posaient des questions parfois pertinentes.

Il m'est arrivé de dire qu'on n'avait pas fait comme il pensait, parce qu'on avait du passif, qui imposait tel ou tel gestion particulière dans un cas précis, qui avait disparu depuis. Ou comment lever une refacto pour simplifier du code en parlant "à bâtons rompus" autour de la stack actuelle.


### Nouvelle stack

Fin 2015, nous étions une équipe qualité de 6 personnes, codant des tests automatiques.
En janvier 2016, j'ai changé de société. 
Dans la nouvelle, j'ai le même rôle : j'automatise des tests pour assurer la qualité, éviter les bugs, supprimer les régressions à chaque mise en production, etc.

Cette société utilise beaucoup de langage, et j'ai décidé de me mettre un challenge en plus : m'adapter à un des langages utilisés en interne, pour faciliter les interactions en internes : si un développeur veut me filer un coup de main, il peut plus facilement. Etant seul à l'automatisation, si je suis en vacances et qu'un problème survient, ils auront des gens capables de lire les erreurs de code et de débugguer / tenir à jour si c'est urgent.

* Scenario : behave
* Code : Python
* Navigateur : Selenium-webdriver2
* Framework : page-object
* Mobile : pour le moment, simulateur dans chrome via les user-agents
* Serveur : Jenkins
* Autres technologies : aucune pour le moment

On voit que c'est très proche : 

* Cucumber et behave sont pareils, avec quelques subtilités. Par exemple, je n'ai pas trouvé de solution pour tagguer différement des exemples de scenarios outlines.
* Watir et selenium se ressemblent beaucoup. Je préfère parfois la syntaxe et la facilité de watir/ruby, qui me permet d'écrire ```browser.div(class: 'maClasse').span(index: 1)``` au lieu de selenium/python qui donne ```browser.find_element_by_class_name('maClasse').find_elements_by_tag_name('span')[1]```
* Le page object de python me parait moins abouti (et moins utile) que celui de ruby. Je n'utilise au final qu'une partie de ses possibilités, le reste étant déjà gérées par l'organisation de code de behave.

Il m'a fallu plusieurs semaines pour arriver à coder du python aussi propre que je le souhaitais, quelques jours pour coder en selenium sans penser à watir.

C'est surtout un changement de mentalité, comme quand on change de langue entre français et anglais : on ne traduit pas littéralement, il faut changer sa façon de penser.

Cela étant, garder quelques points figés, comme les scenarios en BDD (behaviour driven development) m'a permis de gagner beaucoup de temps, de savoir où je voulais aller, ce dont j'avais besoin, pour faciliter la transition.

Le paradigme reste le même : avoir des cas de tests simples, découpés, qui permettent de tester point par point que l'interface utilisateur réagit comme prévu.