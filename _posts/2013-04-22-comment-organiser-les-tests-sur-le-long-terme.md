---
layout: post
title: Comment organiser les tests sur le long terme
tags:
  tests
  jenkins
---

### Exécuter une partie des tests

Les scénarios sont taggués pour être lancé par jenkins par la commande : ```cucumber --tag @montag```
Cela permet de ne lancer qu'une partie des tests. (voir "[Tester sur plusieurs navigateurs](http://web-quality.over-blog.com/tester-sur-plusieurs-navigateurs)" pour les détails)

### Serveurs
Côté serveur, nous avons 2 serveurs jenkins.
Le principal, une grosse machine debian quadri core, qui exécute jusqu'à 3 jobs en même temps.

Ensuite, un serveur Windows, avec un jenkins "slave".
L'esclave reçoit ses ordres du maître, qui lui demande d’exécuter des jobs particuliers.
Il est sous Windows pour pouvoir les exécuter sur Internet Explorer.

Pour éviter les effets de bords entre les tests sur IE, pas de solution. On vide donc les cookies, le cache, etc à la fermeture d'Internet Explorer.
On ne peut donc pas exécuter les tests pour IE en parallèle sur le même serveur : les sessions se mélangeraient.

### Quelques chiffres
Les scenarios sont regroupés en feature, dont le temps d'execution est de maximum 10 minutes. Dans Jenkins on a 38 "jobs" sur FF (+ 34 sur IE)

**Firefox**

Chaque jour : 323 scénarios / 2693 step => 3h

**IE** (1 fois par semaine actuellement, 1 fois par jour bientôt)

Chaque jour : 302 scénarios / 2527 step => 4h 30

Cela représente 227 500 scénarios par an (pour 2 737 heures de tests).

Sans oublier les lancements à la demande de certains jobs.

#### Comptes utilisateurs

Du côté des scénarios, ils utilisent pour le moment 70 comptes utilisateurs différents (avec des options particulières, etc...)

Un changement prochain de notre offre me fait penser que les tests auront besoin de 100 comptes d'ici 2 à 3 semaines.

Sans oublier de dupliquer tout ça pour nos 2 environnements (test / stable)

Ni d'ajouter l'exécution de ces tests sur chrome.

Et on ajoute des tests fonctionnels en dehors de ce schéma, pour tester des choses particulière, que ce soit en production sur des points essentiels ou la validité de données particulières.

Et vous, combien vous testez ?