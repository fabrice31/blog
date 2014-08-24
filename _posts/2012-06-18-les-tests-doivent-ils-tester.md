---
layout: post
title: Les tests doivent-ils tester ?
tags:
  qualite
  test
---

### Le juste équilibre dans les tests

Mettre en place des __tests fonctionnels automatiques__ revient à jouer à l'équilibriste entre l'existant (déjà testé et "stable"), les nouvelles fonctionnalités (et leurs effets de bords sur l'existant), et des eléments externes : navigateurs (et mises à jours), plugins, utilisateurs...

Le responsable qualité et l'équipe doivent avoir confiance dans leurs indicateurs, et doivent connaître leurs limites, afin de pouvoir planifier les actions pour éliminer les bugs.


### Des tests toujours réussis

J'ai lu récemment que des tests fonctionnels toujours "vert" sont mauvais, qu'ils ne testent rien. ([Why 100% Test Pass rates are Bad](http://experttesters.com/2012/05/17/why-100-test-pass-rates-are-bad/))

Je ne suis pas d'accord : j'ai la hantise de tests "rouge" : à chaque fois, cela demande d'aller analyser le rapport, vérifier si c'est un faux positif. (Cela arrive régulièrement : même en prévoyant au mieux, il arrive qu'une action dépasse le temps prévue pour s'exécuter, etc.)


#### Les tests doivent être toujours vert

Si votre écran de contrôle affiche toujours du rouge, vous finirez pas ne plus lui faire confiance. Le problème, c'est que si vous n'avez pas confiance dans des tests automatisés, c'est que vous perdrez du temps à les refaire à la main. Et que lorsqu'ils passeront au rouge, vous penserez à un faux positif avant même de regarder, et vous pourriez laisser passer un bug.


#### L'important n'est pas la couleur, mais la couverture

Je préfère avoir une couverture de 50% fiable qu'une plus grande couverture mais instable. Il faut bien comprendre qu'un test vert ne dit pas "il n'y a pas de bug sur ce projet", mais plutôt "aucun bug prévu n'a été trouvé cette fois-ci". La différence semble tenue, mais elle est primordiale.

L'équipe doit savoir si les tests ont des lacunes, afin de redoubler d'effort "manuels" dans cette partie. Il ne faut jamais oublier que les tests automatiques ne testent pas tout le projet, mais seulement ce qu'ils sont sensés tester.

<img src="/public/pictures/2012/screen_tests.jpg" title="Ecran de contrôle" style="width: 200px; float: left;"/>
<img src="/public/pictures/2012/cucumber-report.png" title="Résultats de tests cucumber" style="width: 200px; float: left;"/>
<img src="/public/pictures/2012/graphique-nb-issues.jpg" title="Evolution du nombre de bugs" style="width: 200px; float: left;"/>
<p style="clear: both;"></p>

### Choix des métriques

Le choix des métriques est primordial : cela influe sur le ressenti de la qualité par l'équipe qui développe le produit. ([Test automation metrics - what do you report on?](http://martijndevrieze.net/2012/05/30/test-automation-metrics-what-do-you-report-on/))

#### Mise à jour des métriques

* En début de projet, la pertinence du "nombre" de bugs est relative. Quand le projet a déjà été livré dans une version beta au public, ce nombre est déjà plus réaliste.
* Les tests de charge sont importants tout le temps, mais il ne faut jamais oublier le stade d'avancement du projet. Un test de charge qui semble échouer peut ne pas l'être si on le fait durant une "maintenance programmée" du serveur.

Certains pensent qu'il vaut mieux avoir trop de métriques que pas assez. Mais il faut pondérer ceci par le temps pour les analyser et les comprendre.

#### Stratégie générale

De la même façon, la remise en cause des stratégies de tests doit être régulière. Il est nécessaire de vérifier régulièrement que les tests testent bien, sont stables, détectent bien les vrais bugs.
