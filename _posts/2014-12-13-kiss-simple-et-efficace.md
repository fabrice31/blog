---
layout: post
title: "KISS : Keep it simple and stupid"
tags:
  qualite
  ruby
---

Quand on travaille sur des gros projets, on a tendance à rajouter beaucoup de fonctions, de code, partout, à tout bout de champ.
Il faut savoir prendre du recul, pour simplifier le code, et faire des choses simples et efficaces.

Dans le cadre de mon travail, l'équipe test a pas mal changé cet été, avec 2 nouveaux arrivants. Ca tombe bien, on a aussi récupéré des nouveaux projets à tester.
C'est en les formant à nos méthodes, notre code, que j'ai repéré des améliorations à faire, et qu'ils ont fait des suggestions intéressantes.

Avec leur arrivée, une partie de ma charge de travail a pu diminuer un peu, me permettant de réflechir, de me poser des questions, de chercher des idées "innovantes" pour résoudre des problèmes mis de côté par manque de temps depuis des semaines (voire plus).


### Mise en place en 3 clics

Bon, j'éxagère, il faut plus que 3 clics. L'utilisation d'un Gemfile et de la gem [bundler](https://rubygems.org/gems/bundler) permet de simplifier l'ensemble de la procédure.


Pour préparer un nouveau poste (suite à une embauche, une réinstallation, ou un nouveau serveur, il faut alors installer ruby, la gem bundler, récupérer le dépôt du code, puis lancer juste la commande ```bundle install```. 
Et le tour est joué.


Pour aller plus loin : mise en place sur tous les serveurs de tests d'une routine vérifiant que la liste est à jour et conforme à ce qu'on attend, avec un 

```
bundle update
gem cleanup
```

### L'information, le nerf de la guerre

Plongés dans les tests, nous disposions de plusieurs documentations, avec des buts plus ou moins précis. Localisées à plusieurs endroits.
Du coup, petit ménage d'été, pour les regrouper, classer, mettre à jour. Au final, on a gardé plusieurs documents, pour plusieurs rôles différents :

* __Documentation du code__ : présente depuis le début, avec génération automatique par la gem ruby [rdoc](https://rubygems.org/gems/rdoc) et un petit script ruby (basé sur des expressions régulières) pour lister les step_definitons. Basée évidemment sur les commentaires dans le code, qui sont eux mêmes le premier niveau d'explication.
* __Documentation sur comment coder__ : quelques documents précis sur comment installer l'environnement, les conventions de codage, ou des points précis et complexe des tests.
* __Documentation sur les produits__ : nous testons une demie douzaine de projets, plus ou moins liés les uns avec les autres. Pour pouvoir teter efficacement, il vaut mieux savoir comment le projet fonctionne, et dans l'idéal, connaître également les bugs les plus courants sur le projet.


### Codes complexes et compliqués

Aujourd'hui, l'ensemble de nos codes testant les projets de la société représenter environ 11 000 lignes de codes (essentiellement en ruby, cucumber, shell)


Il y a 10 jours, j'ai regardé pour la première fois depuis des mois les résultats de [flog](https://rubygems.org/gems/flog) sur le projet. 
Pour résumer, flog analyse le code source, compte combien de fois on effectue chaque "action", et s'ensuit une note de complexité pour chaque méthode, et pour l'ensemble.


Comme on peut classer, on voit immédiatement les fonctions les plus compliquées. Reste à savoir si la complexité est normale ou non. Après avoir lu pas mal d'articles sur le sujet, et testé moi même sur notre code, j'estime qu'une fonction avec un score supérieur à 50 doit être analysée, et éventuellement, modifiée.


#### Quelques chiffres

J'ai profité d'un "temps calme" au bureau pour bosser sur le sujet. 

Avant :

```
  7128.5: flog total
    15.6: flog/method average

   793.5: main#none
   236.1: main#launch_browser
   197.0: main#get_job_results
   138.0: Then#/^HTML (contain|don't contain) (.*)$/
   136.7: Then#/^I don't see errors$/
   134.8: FormatPage#format_is_present
   131.1: main#compare_stats
    90.7: Then#/^I click on the insocial expand$/
    81.4: main#stats_of_day
```


Après : 

```
 6166.2: flog total
    13.8: flog/method average

   827.4: main#none
   197.0: main#get_job_results
   168.0: main#launch_browser
   134.8: FormatPage#format_is_present
    90.7: Then#/^I click on the insocial expand$/
    90.3: main#compare_stats
    77.0: main#stats_of_day
```

On note plusieurs choses :

* La note globale a chuté (-14%). 
* Cela fait mathématiquement baissé la moyenne par méthode.
* Certaines méthodes "complexes" ont bien baissé.
* D'autres ont augmenté : avec les pull request de mes collègues, rien d'aberrant. La note a donc baissé alors que dans le même temps, plus de 1 500 lignes de code ont été ajoutées / modifiées.
* Certaines méthodes, complexes, ont une note qui correspond à leur difficulté de compréhension. 


#### Qu'est ce que j'ai changé ?

Rien de transcendant :

* Du code dupliqué a été "mis en commun" pour faciliter la maintenance.
* Des optimisations faciles : par exemple, dans une méthode utilisant beaucoup de données, j'ai remplacé l'utilisation d'un tableau par une copie du contenu d'une données. Passer de ```my_array['result']['report']['url']``` à ```my_url``` quand c'est utilisé 7-8 fois, ça améliore la complexité et aussi la lisibilité et la maintenabilité.
* Des méthodes ont été découpées pour clarifier ce que le code faisait.


### Et c'est conventionnel tout ça ?

En parralèle, j'ai mis à jour la gem [rubocop](https://rubygems.org/gems/rubocop). Cette gem permet de vérifier que toutes les conventions sont respectées. La liste des choses vérifiées s'est beaucoup étoffée depuis la dernière fois que j'avais mis à jour la gemme (de 0.18.1 à 0.27.1), et j'ai passé quelques heures à modifier notre code pour qu'il passe les nouvelles règles.


Sur le projet, nous avons désactivé 27 règles parmi les centaines présentes. Par exemple, nous désactivons la limite sur le calcul de [complexité cyclomatique](http://fr.wikipedia.org/wiki/Nombre_cyclomatique) puisque nous utilisons flog.


Rubocop nous a aussi aidé sur la complexité : une nouvelle règle a fait remonté quelques variables non utilisés. Les supprimer à fait baisser les notes de flog.

Pour l'automatisation, un git-hooks lance un script shell :

* vérifiant le résultat de rubocop, 
* vérifiant qu'il ne reste pas de trace d'un conflit dans les fichiers,
* vérifiant que tous les fichiers yaml sont syntaxiement juste (```find . -name *.yml -exec yaml-lint {} \;``` pour les analyser, avec la gem [yaml-lint](https://rubygems.org/gems/yaml-lint))


### KISS, et après

Le [principe KISS](http://fr.wikipedia.org/wiki/Principe_KISS) (pour Keep it simple and stupid) est une façon de travailler qui incite à rester simple pour être efficace.
Certains points cités plus hauts ne sont pas triviaux à mettre en place, mais permettent sur le long terme à limiter les risques, à garder facilement du code propre, compréhensible, et simple.

Ma todolist pour la suite ? 

* Traquer le code dupliqué (j'en ai déjà repéré quelques morceaux, dont le nettoyage n'était pas possible dans le temps que j'avais), 
* Supprimer le code mort et non utilisé.
* Continuer à documenter, ranger, classer.
* Refactoriser ce qui peut l'être et dont le code n'est pas amené à disparaître dans les prochains mois.