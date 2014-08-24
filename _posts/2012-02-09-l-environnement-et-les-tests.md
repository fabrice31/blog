---
layout: post
title: "L'environnement et les tests"
tags:
  qualite
---

Cet article n'a rien à voir avec l'écologie, mais beaucoup avec l'[environnement](http://fr.wikipedia.org/wiki/Environnement_%28homonymie%29#Informatique).

Lorsque l'on teste un projet web, il faut toujours savoir "où" nous testons : est-on sur un serveur de test ? de développement ? de pré-prod ? de production ?

Lorsque vous êtes en pleine création d'un projet, il est intéressant de définir clairement, le plus tôt possible, les différents environnements et leurs stratégies de tests respectives.

L'intégration continue sera d'autant plus simple que vous aurez défini clairement les règles du jeu.

### Environnements pour un projet web

* Environnement de pré-prod : ce serveur doit être stable, mis à jour très régulièrement, comporter toutes les nouveautés.
* Environnement de développement : utilisé par tous les développeurs, il peut être soit centralisé, soit individuel (avec des machines virtuelles).
* Environnement de prod : c'est le serveur qui sera utilisé par vos utilisateurs/clients. Il doit être choyé, aux petits oignons.

### Comment organiser le travail (du point de vue de la qualité)

* Les développeurs codent sur le serveur de dév.
* Les tests unitaires (côté php ou js) sont aussi jouer sur le serveur de développement.
* L'environnement de préprod est posé en tant que référent : il est mis à jour régulièrement, avec des versions stables. Pour contrôler sa mise à jour, un outil d'intégration continu (nous utilisons hudson) qui rejoue tous les tests unitaires de tous les sous projets.

### Comment organiser les tests fonctionnels

* Pour les tests manuels, en fonction du test, il faut le faire sur l'un des environnements. Il est parfois utile de le faire sur chaque environnement, afin de pouvoir dire "ce bug particulier n'existe pas encore en prod, mais il est apparut sur la pré prod".
* L'environnement de prod peut être utilisé pour vérifier la présence d'un bug, mais ne devrait pas être utilisé pour des tests automatiques.
* Pour les tests automatiques, il y a 2 écoles: 
  Lancer sur la version de pré-prod. Défaut principal : il n'est pas toujours évident de créer des tests fonctionnels avant de voir la fonction tourner réellement. Chaque nouvelle fonctionnalité aura donc ses tests ajoutés dans les jours qui suivront, et pas avant.
  Faire lancer les tests par les développeurs en environnement de développement. C'est plus coûteux à mettre en place (il faut par exemple former tous les développeurs à l'analyse du rapport de tests...), mais cela peut améliorer la détection des bugs.

Pour moi, ces deux écoles ne s'excluent pas. Je les vois plutôt comme des étapes. C'est d'ailleurs le cas dans ma société : lors de la refonte du projet, il a été décidé que les tests fonctionnels automatiques devront pouvoir s'exécuter partout (y compris la prod). Pour l'instant, ils peuvent être exécuter sur la pré prod, avec une configuration prévue théoriquement pour qu'ils puissent être exécuter sur d'autres environnements. (La gestion de profils de cucumber est parfaite pour ça)

### Pourquoi est-il essentiel de connaître les environnements ?

Il m'arrive régulièrement de tester un bug sur un onglet, de faire autre chose, et de revenir dans mon onglet pour avoir d'autres informations au sujet des bugs. Et là, miracle, le bug est résolu. Pourtant, personne n'a modifié le code. Un enquête de quelques minutes permet de comprendre que le bug n'existe que dans un environnement particulier, et que j'ai changé d'onglet par inadvertance.

Cela peut avoir des conséquences plus grave. Pour un projet personnel, j'héberge un forum "privé". J'ai l'habitude de "stocker" ce forum sur mes sites successifs, dans un sous-domaine, et de faire suivre aux utilisateurs la nouvelle adresse, voire de mettre en place une redirection.

### Erreur d'environnement

En novembre dernier, j'ai lancé un déménagement. (La qualité de service de mon hébergeur devenait déplorable avec un uptime passant parfois sous les 90%)

* Je verrouille l'accès en écriture sur l'ancien
* Je déplace la totalité des fichiers d'un serveur à un autre, tranquillement.
* Je copie la base de données.
* Je teste avec quelques utilisateurs le nouveau.
* Fin de l'opération.

Jusqu'à ce matin, lorsque j'ai vu un message d'erreur "Can't connect to MySQL server on anciendomaine.com". J'ai mal lu le message, et n'ai pas fait attention, et j'ai attendu quelques minutes, pensant à une maintenance sur mon hébergeur. Puis j'ai fini par réaliser que sur mon nouveau domaine, opérationnel depuis 4 mois, la base de données utilisée était toujours l'ancienne. Du coup, nouvelle copie des bases de données, modification du fichier config.php qui contenait les données pour la base, et voilà, tout est rentré dans l'ordre.

Si mon ancien domaine (et sa base) avait expiré avant que je m'en rende compte, j'aurais perdu une partie de l'historique. Pour un petit forum privé, cela n'aurait pas été trop grave. Mais pour un projet plus important, cela aurait pu provoquer des catastrophes.
