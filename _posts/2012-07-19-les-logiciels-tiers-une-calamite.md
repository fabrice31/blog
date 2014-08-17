---
layout: post
title: Les logiciels tiers, une calamité
tags:
  bug
---

Lorsqu'on rencontre des problèmes vraiment étranges sur une fonction particulière, on pense d'abord que cela n'a jamais pu marcher, on ne comprend plus.

Puis on enquête. Et parfois, la cause du problème est une surprise, autant pour nous que pour les personnes touchées. Quelques exemples plus ou moins vieux.

### La box qui coupe

Petit retour sur l'article : Les bugs poilus sont-ils solubles dans le temps ?

Au début, il s'agissait d'un simple problème de validation de formulaire AJAX pour une partie des utilisateurs. Ils emblaient tous utiliser une LiveBox. Nous avons éliminé cette piste au bout de plusieurs jours, certains cas ne collant pas.

Mais au final, il semble que ce problème qui nous a occupé pendant plus d'un mois était bien une mise à jour de la LiveBox : la mise à jour suivante a corrigé le problème.

### L'antivirus anti web

En général, je ne cite pas, mais cela fait trop de fois où nous rencontrons des problèmes avec Kaspersky.

Deux points sans rapport, tous les deux liés à des classiques du web.

* Lorsque vous envoyez une photo via certains protocoles, on a un comportement aléatoire :
 * Images non envoyées
 * Images envoyées de façon incomplète.

	Evidemment, il suffit de désactiver Kaspersky pour que cela fonctionne. Selon les navigateurs, nous utilisons le protocole PUT ou le protocole GET. si le get fonctionne, le put pose de nombreux problèmes.
* Les notifications, très utilisées sur les réseaux sociaux, sont dégradées : le nombre de notifications n'est pas mis à jour après leur lecture, en particulier sur Google+. Là encore, désactiver l'antivirus suffit à régler le problème.

![Toutes les notifications ont été lues, et pourtant](/public/pictures/2012/bug-kaspersky-notif.jpg "")

### La navigation compatible

Lorsqu'on utilise Internet Explorer, il lui arrive de décider d'utiliser le mode compatible sur certains sites. Un utilisateur qui ne fait pas attention pensera utiliser la dernière version du navigateur, mais aura entre les mains un navigateur se comportant comme IE7 ou IE8 dans le meilleur des cas.

Les éditeurs wysiwyg sont particulièrement concernés par ce genre de problème, mais ce ne sont pas les seuls.

Lorsqu'on sait en outre que le mode compatible IE8 est différent d'IE8, on sait qu'on va s'arracher les cheveux pour trouver la cause du problème.

### Le plugin défaillant

Les navigateurs sont depuis plusieurs années extensibles : on peut ajouter des fonctionnalités plus ou moins intéressantes. La plupart des développeurs ont installé FireBug par exemple.

Revenons à celle qui me pose problème : "Facebook Disconnect". Cette extension sous chrome permet d'empêcher Facebook de vous traquer. En contre partie, elle bloque des scripts, sans vous demander votre avis. Un exemple ? notre éditeur wysiwym. Ce n'est apparement pas la seule à bloquer l'éditeur, mais la récupération des informations auprès de nos utilisateurs prend beaucoup de temps sur des problèmes aussi pointus.

### Conclusion

Les mises à jour automatiques sont une plaie : les utilisateurs ne comprennent pas pourquoi le comportement change sans modification, et pense systématiquement à un problème du produit concerné, pas d'un logiciel tiers.

Certains logiciels s'adjugent des pouvoirs très importants, sans le signaler à leurs utilisateurs, dégradant par la même occasion la navigation sur des sites web qui fonctionnent pourtant parfaitement par ailleurs.
