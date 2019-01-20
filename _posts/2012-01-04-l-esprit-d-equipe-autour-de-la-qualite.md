---
layout: post
title: "L’esprit d’équipe autour de la qualité"
---

### Contexte

La société pour laquelle je travaille est en train de refaire son principal projet depuis le début. Au programme : changement de technologies. Nous lancerons ce nouveau projet d’ici l’été, et nous travaillons déjà depuis quelques mois sur le sujet.

Nous avons mis en avant la qualité, avec de l’intégration continue ([Hudson](http://hudson-ci.org/), allié à [Git](http://fr.wikipedia.org/wiki/Git)), des TDD (Test driven development), des framework robustes : [Symfony](http://www.symfony-project.org/) pour le php, [YUI](http://developer.yahoo.com/yui/) pour le javascript, des tests fonctionnels avec cucumber et watir… Et pour organiser tout ça, on passe à [Scrum](http://fr.wikipedia.org/wiki/Scrum).

Beaucoup de changements, et les premiers tests sur le serveur de staging nous ont tous donné envie d’aller encore plus loin.

### Action

Mais tout n’est pas rose dans notre monde : le serveur de staging n’était pas assez stable à mon goût. J’ai donc envoyé un mail à tous mes collègues concernés afin de mettre au clair la façon de travailler :

* Pas de mise à jour en milieu de journée (le staging est mis à jour chaque nuit avec les dernières versions stables des sous projets).
* Tests en amont, côté serveur de développement.
* Incitation à me consulter pour la mise en place des tests fonctionnels que j’aurais pu oublier.

Et bien évidemment, j’ai précisé dans le mail que j’étais ouvert à toutes les suggestions.

![Travail d'équipe](/public/pictures/2012/equipe.jpg "Travail d'équipe")

### Réactions

Nous avions longuement rabâché qu’il fallait un produit de qualité, que nous devions tous tester le produit de façon à ne rien laisser passer.

En envoyant le mail, je ne m’attendais pas aux retours que j’ai eu. Je savais que certains point "techniques" ne feraient pas l’unanimité. Mais mes collègues ont été très intéressés, et m’ont montré qu’ils pensaient toujours "qualité". L’équipe a échangé pas mal de mail dans l’après-midi (cela faisait quelques semaines que je n’avais pas vu autant d’échange de mails sur un même sujet en aussi peu de temps). Des idées sont venus des développeurs, qui rejoignaient certaines idées d’améliorations que nous envisagions à moyen terme. 

Tout cela pour dire qu’au final, la qualité d’un projet web, c’est aussi une histoire d’équipe : une équipe soudée, motivée peut faire de grandes choses dans le bon sens si on lui en donne l’opportunité.
