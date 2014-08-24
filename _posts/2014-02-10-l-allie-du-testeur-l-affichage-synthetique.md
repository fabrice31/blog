---
layout: post
title: L'allié du testeur &#58; l'affichage synthétique
tags: 
  jenkins
  test
---

Comme beaucoup de gens, je travaille toujours sur plusieurs projets à la fois. Mon rôle principal est de créer et maintenir des tests fonctionnels automatiques.

Pour gérer tout cela, nous sommes 2 personnes. Mais nous avons aussi des tests manuels à faire avant chaque mise en production de chaque projet.

### Quelques chiffres

* 6 serveurs jenkins : 3 linux, 3 windows. (Uniquement pour les tests fonctionnels)
* 1 700 scenarios cucumber joués quotidiennement. (soit plus de 20 heures chaque jour)
* près de 300 jobs jenkins pour les ranger
* 7 produits principaux, à tester sur 1 à 3 navigateurs + mobile

Cela donne le tournis. Plus le temps passe, plus j'ai besoin d'avoir un affichage synthétique pour savoir si mes tests sont passés ou non.

J'avais dans le passé créer un petit plugin pour [afficher mes résultats](http://web-quality.over-blog.com/affichage-des-resultats-de-tests). Mais chaque projet est légèrement différent, demande des réglages différents, et j'arrivais aux limites de cet affichage. J'avais un écran par projet, soit 7 écrans de contrôle, que j'aurais voulu avoir toujours sous la main.

### Plugin jenkins

J'ai donc regardé sur jenkins s'il existait des plugins permettant de lister les résultats au format json. Je n'ai rien trouvé de concluant, j'ai donc codé un petit plugin pour avoir un fichier jsonp qui liste tous les jobs, et pour chacun :
* son statut courant,
* les stats du dernier résultat,
* l'avancement s'il est en cours...
Vous pouvez trouver le code sur le [dépôt github](https://github.com/fabrice31/jsonResult).

### Console en javascript

Une fois le json obtenu, il restait à le traiter. L'avantage est de pouvoir le faire en javascript, ce qui permet à chacun de gérer ensuite l'avantage à sa sauce. J'ai fait un écran de contrôle pour l'ensemble des projets que je gère.

Et j'ai filé les clefs à une équipe sur un projet, qui a modifié l'écran pour pour avoir seulement les tests fonctionnels de son projet, et a ajouté les tests unitaires sur le même écran.
Et voilà ce que ça donne :

![Jenkins show](/public/pictures/2014/jenkins-show.png "Ecran d'affichage jenkins")

* On peut séparer les jobs dans les différents projets via des expressions régulières.
* Pour l'un des projets, très conséquents, j'ai même séparé par navigateur.
* On voit bien les tests KO pour chaque job. (en rouge)
* Les jobs désactivés ou n'ayant pas de résultats sont gris.
* Les jobs qui sont en cours d'exécution sont en bleu, avec une barre d'avancement sur leur durée estimée.
* Les jobs qui seront lancés quand il y aura une place pour eux ont une pastille jaune.