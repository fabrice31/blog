---
layout: post
title: Quand le texte rencontre les tests automatiques
tags:
  watir
  test
---

Lors de SudWeb en mai, j'ai discuté avec le créateur de [CasperJS](http://casperjs.org/) pour lui expliquer pourquoi je préférais Watir à son outil.

### Petit tour rapide des défauts de CasperJS

* __Limitation des sélecteurs__ : Avec watir, je peux sélectionner un élement à peu près comme je veux. Avec CasperJs, le choix est plus limité (mais il peut être étendu en javascript.
* __Navigateur__ : CasperJS utilise un navigateur headless basé sur webdriver. Watir permet de prendre le contrôle de la plupart des navigateurs (via selenium)
* __Langage__ : je n'aurais pas dit ça il y a 2 ans, mais je préfère le ruby au javascript.
* __Capture d'écran__ : ~~Il est difficile de faire une capture d'écran anvec un navigateur headless.~~ Apparement, c'est possible aussi en CasperJs.

Mais je suis partial : je connais et j'utilise Watir depuis 2 ans, et j'au découvert CasperJs depuis une semaine.

### Point sur CasperJS

Je ne nie pas son intérêt. Mettre en place des tests fonctionnels sous Watir / cucumber (et hudson pour gérer tout cela) prend du temps, et cela me fait penser à sortir l'infanterie pour écraser un moustique.

Si on a besoin de créer des tests rapides, et que "webdriver" nous suffit, et si on en plus on est à l'aise avec le javascript : je vous le conseille.

<img src="/public/pictures/2012/texte.jpg" title="Test de textes" />

Notre point de désaccord n'était pas sur les outils, leurs limitations, etc.. mais sur les tests eux-mêmes.

### Doit-on utiliser les textes de l'interface pour tester ?

Lorsqu'on met en place des tests, on utilise au maximum les informations de l'interface : class, name, id, parfois même url (src ou href).

Certains utilisent même les xpath, mais je le déconseille : je trouve que cela alourdit la maintenance du projet à long terme.

Mais cela n'exclut pas d'utiliser aussi le texte. Mais dire "Cliquer sur le bouton 'Ajouter au panier'" a un défaut : si le texte change, il faut mettre à jour les tests.

Donc, utiliser les textes peut être intéressant, mais il ne faut pas en abuser, et les "limiter".

### Doit-on tester les textes de l'interface ?

Tester tous les textes reviendrait à devoir modifier les tests à chaque mise à jour de textes. Ce serait coûteux en temps, et dà difficile à maintenir. (Dans la plupart des projets web, le nombre de texte augmente dans le temps)

Par contre, certains textes doivent être tester dans l'interface :

* Tous les messages d'erreur
* Tous les message de validation
* Les liens principaux de navigation
* Les boutons d'action

### Quoi d'autre ?

Cela nous donne une liste "réduite" de textes qui peuvent être utilisés durant les tests. Si un texte change pour une raison inconnue, certains tests passeront dans le rouge, et il n'y aura qu'à les mettre à jour le texte dans les tests pour corriger.

Il n'est pas utile de tester les textes : les utiliser durant les tests revient au même. (l'optimisation est importante, j'y reviendrais)

Je travaille sur un projet disponible dans 5 langues. J'ai donc rassembler tous les textes dans un lot de fichier (un par langue)

Last but not least : en tant que responsable qualité, je suis garant que les textes soient conformes. Si nos traducteurs modifient le texte anglais du bouton "Save" en "See", je dois agir en conséquence pour obtenir une correction au plus tôt.
