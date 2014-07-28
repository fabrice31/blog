---
layout: post
title: Il faut savoir se fier à ses tests
tags: 
  tests
  bug
---

Vroici l'histoire d'un test fonctionnel "basique" mais techniquement compliqué à mettre en place.

### Passé

Depuis plusieurs mois, nous sommes 2 à developper les tests automatiques. Nous avons une longue liste de tests à ajouter que nous dépilons progressivement. Certains tests sont présents depuis longtemps dans cette liste, mais nous ne réussissons tout simplement pas à les créer, pour des raisons purement techniques. D'autres sont en attente de la correction du bug sur le produit.

### Lundi

Pour l'un d'eux, je réussi finalement à trouver une solution tarabiscotée qui semble marcher. La solution ne me plait pas totalement, cela revient à exécuter du javascript dans un navigateur que je controle avec watir, lancé depuis un cucumber géré par un jenkins.

L'utilisation du javascript (langage que je ne maîtrise pas) pour ce détail me gêne : s'il me permet de tester la fonctionnalité, je ne pourrais pas simplement tester certains points de la fonctionnalité.

En outre, cela m'empêche d'être sur de moi pour ce test : j'ai peur qu'il ne soit pas stable et pérenne.

### Mercredi

Mercredi dernier, j'ai remonté un problème qui entrainait un problème en cascade sur l'ensemble de mes tests fonctionnels (40 scenarios échoués sur 270).

Il y avait deux importants chantiers effectués par mes collègues pour des mises à jours importantes, qui demandait des corrections.

![Il faut savoir se fier à ses tests](/public/pictures/2013/mug-qualite.jpg "")


### Jeudi

Jeudi, c'est normalement la fin du codage des nouveautés pour le sprint en cours. Le jeudi c'est donc débug, tests, préparation du changelog et de la mise en production...

Lorsque j'arrive un jeudi avec mes indicateurs qui clignotent en rouge, je n'aime pas ça. Je survole rapidement, vois que c'est un problème commun pour les 10 premiers rapports que j'analyse en profondeur. Je demande donc une nouvelle correction, puis je relance des tests qui semblent être juste des faux positifs. Certains reviennent à la normale.

Je désactive certains tests qui paraissent toujours instables. Parmi eux, les tests ajoutés le lundi : je ne les sentais pas en les codant, je n'ai pas cru en eux lorsqu'ils ont signalé un bug.

### Lundi

Lundi, jour de la mise en production. Une fois finie, l'équipe teste en production les changements pour vérifier que tout est normal.

En faisant un test sur tout à fait autre chose, je me suis dit "y'a un truc qui cloche, (pas ce que je suis en train de tester), mais je vois pas quoi". Mon instinct me disait que j'avais raté un truc. Je fais donc un tour du côté du support.

Les premiers retours utilisateurs signalent un bug m'a fait sourciller : on signale un bug sur la fonction testée depuis peu. Je vérifie le dernier rapport de tests : ils détectaient le bug, et étaient parfaitement stables.

### Conclusion

En n'ayant pas cru en la stabilité d'un test que j'ai codé moi-même, j'ai laissé passer un bug en production.

J'ai vu un faux positif plutôt qu'un bug réel, alors que j'expliquais ce risque il y a longtemps.

J'ai l'impression d'avoir échoué à garantir la qualité de notre produit. J'ai eu trop confiance dans mes collègues, et pas assez en moi.
