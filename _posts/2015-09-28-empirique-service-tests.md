---
layout: post
title: "L'empirique au service des tests"
tags:
  webdriver
  proxy
---

### Contexte

Je travaille souvent à tester des comportements liés à la vidéo. Vérifier qu'elle se déroule bien, qu'elle se finit au moment voulu, que les interactions sont possibles.
Une des problématiques est de pouvoir vérifier que les évenements de tracking (statistiques, etc.) sont bien envoyés au bon moment.

Dans mon cas, chaque événement est un appel à un pixel précis, avec un tas de paramètres. L'intérêt pour l'utilisateur est de pouvoir vérifier le fonctionnement, et par exemple déterminer si les utilisateurs qui mettent en pause à un moment relancent la vidéo pour la regarder jusqu'au bout.

Lorsqu'on teste ce genre de chose manuellement, il suffit d'ouvrir la console réseau du navigateur, et de vérifier que les urls sont bien appelées au bon moment.

### Industrialisation

Dans mon cas, j'ai besoin d'effectuer une centaine de contrôles de ce type, sur différents navigateurs, tous les jours. L'ensemble des tests étant écrit en ruby / watir-webdriver, j'ai longtemps chercher une solution permettant via webdriver de vérifier ce qui passait au niveau réseau. 

J'ai envisagé un temps de démarrer mes navigateurs en leur ajoutant un plugin : webdriver permet de le faire à la volée avec le fichier xpi. Mais cela ne marche pas pour Internet Explorer, que je ne peux pas exclure des tests.

Après des semaines de réflexions, par une nuit d'insomnie, j'ai trouvé une solution:

* Installer un proxy sur le serveur de tests
* Analyser les logs de ce proxy pour mes besoins

Le choix du proxy était "limité" avec de nombreuses contraintes : 

* Besoin d'avoir un fichier de logs
* Besoin de pouvoir le contrôler en ruby (ou dans un navigateur)
* Besoin de fonctionner sur windows et mac

Mon choix s'est porté vers [Charles proxy](http://www.charlesproxy.com/).

Le fichier de log de charles étant horodaté, nous avons pu comparer les événements les uns par rapport aux autres. Pour vérifier, par exemple, que l'evenement "50%" se produit à la moitié de la durée de la vidéo.

Il a suffit d'ajouter des urls bien reconnaissables pour toutes nos vidéos de tests et de se retrousser les manches.


### Problèmes

Durant la mise en place de cette solution (et sa maintenance), nous avons rencontrés plusieurs problèmes :

* Nécessité, pour chaque scénario, de redémarrer le proxy. Il est gourmand en ressources (mémoire principalement), et nos centaines de tests journaliers le mettent à rude épreuve.
* Lors d'un test où nous en avons besoin, il faut pour l'analyser ouvrir un navigateur, télécharger le fichier de log (format CSV), filter les lignes utiles, etc. Cela est couteux en temps. Le fichier de log pèse environ 1mo à chaque fois. Cela est couteux en temps.
* Les tests de vidéo sur mobile rencontrent parfois des lenteurs, ce qui compliquent l'analyse des écarts de temps.
* Le format du fichier de log (en particulier les dates) est différent enttre windows et mac.
* Cela empêche la paralélisation sur une même serveur.


### Bénéfices

Malgré ces défauts, ce système nous convenait parfaitement.

Il nous a permis d'industrialiser des tests sur un point clé de certains projets, sur tous les navigateurs, y compris sur mobile.

Lorsqu'un nouveau collègue est arrivé dans l'équipe en juillet, et que je lui ai présenté cette brique bien pratique, il a trouvé ça intéressant, et trouvait l'idée originale.


### On prend les mêmes et on recommence, mais pas tout à fait

Quelques mois plus tard, lors d'une discussion avec un collègue sans aucun rapport, j'ai eu une meilleure idée.
Objectifs: 

* Diminuer le temps d'initialisation
* Simplifier le code (et donc faciliter la maintenance)

Plutôt que d'analyser le départ de tous les pixels, on inverse la pensée. Comme dans la vraie vie, il faut que nous ayons notre propre serveur web, qui récupère les appels à des pixels, et il nous faut "juste" analyser les logs de ce serveur.
C'est là qu'entre en scène node.js, et et plus précisement son http-server.

Dans un dossier proxy, on créer un fichier html. On édite les urls de pixels de toutes nos vidéos de tests, pour appeler le serveur local http://127..0.0.1:8080/track.htm?action=pause&id=123456

Ensuite, la ligne de commande ```http-server proxy/ --cors -a 127.0.0.1 >> proxy/log.txt``` permet de lancer le serveur localement, et d'avoir le log dans un fichier lui même accessible sur le serveur.

Pour l'analyse du log, il est disponible via une véritable url, donc on gagne du temps : pas besoin d'ouvrir un navigateur comme avec le log de charles.

```ruby
url = "http://127.0.0.1:8080/log.txt"
content = Net::HTTP.get(URI.parse(url))
```

### Bénéfices

Quand j'ai commencé cette modification, j'espérais gagner un peu de temps. 
Nous avions à ce moment là environ 100h de tests, et pour certains projets, je n'attendais pas de gros gains. Et puis, j'ai fait les calculs. 

* Quelques centaines de scenarios n'ont plus besoin du tout d'initialisation. 10 à 15 secondes à chaque fois sur windows.
* Le fichier de log (1 Mo / scenario auparavant) a fortement diminué. Puisqu'on ne log plus que ce qui est utile, on gagne plus de 99% de taille de fichier de log.
* La non ouverture du navigateur pour télécharger le fichier de log fait également gagner beaucoup de temps.

Première estimation : environ 4h de gagnées parmi les 100h de tests.

Lors des premiers tests, sur mon mac, j'ai eu l'impression que mes calculs sous estimaient les gains. On a en fait avoisiné les 6h30 de gain.

Après analyses et contrôles, quelques pistes supplémentaires pour expliquer ces gains en plus:

* Sans proxy, les pages s'affichent un tout petit peu plus vite. Non perceptible à l'oeil humain, mais vu la quantité de pages de nos batteries de tests, c'est sensible.
* La mémoire vive libérée par ce changement sur les serveurs windows peut être utilisée par le serveur à autre chose de "plus utile" pour les tests.


C'est finalement une clef primordiale quand on met en place des tests sur de gros projets: il faut tester brique par brique, et améliorer la solidité et la couvertue de façon empirique.
