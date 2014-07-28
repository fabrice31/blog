---
layout: post
title: Quand un commerçant en ligne a des bugs
tags:
  bug
---

On peut être un grand nom de la vente en ligne, mais avoir malgré cela des problèmes sur son site web.

Parfois, cela se passe "presque bien" : tout le monde se souvient encore de l'homme nu de La Redoute (une photo présentant un produit avec en fond un homme nu). Tout le monde a rigolé, s'est moqué d'eux. Ils ont corrigé le tir, puis ont lancé un jeu pour trouver certains objets dans d'autres images pour les gagner.

### Et parfois, c'est le "drame"

Prenons un cas pratique, qui m'est arrivé.

Je suis client chez [http://www.boulanger.fr/](boulanger.fr) depuis longtemps, j'ai une carte de fidelité, etc. En janvier, j'ai rencontré des difficultés pour utiliser un chèque cadeau sur une commande. J'ai contacté leur support par un formulaire par mail : aucune nouvelle.

J'ai tweeté : une cm m'a demandé une copie du mail et m'a confirmé avoir transférée ma demande à l'équipe technique. Au menu : des problèmes d'ergonomie, de textes pas clairs...

Ce week-end, j'ai reçu un mail pour me dire que mon chèque cadeau n'était pas utilisé. Petit tour sur mon espace client, quelques soucis rencontrés en quelques minutes.


### Les commandes fantômes

Page "Commandes en cours", j'ai deux commandes notées "expédiées" :

* Celle de fin novembre. Que j'ai reçue en décembre, sans souci.
* Celle de janvier. Que j'ai reçue (en deux fois, l'un des articles était indisponible. J'ai été averti de l'indisponibilité, j'ai choisi d'attendre : 5 semaines avant la livraison)

### La saisie impossible (d'un chèque cadeau)

Pour saisir un chèque cadeau, quelques étapes :

* Validez votre panier
* Au milieu de la page de paiement, cochez oui à la phrase "Vous béneficiez de cartes cadeau, cartes satisfaction ou chèques fidélité ?"
* Sélectionnez "Chèque cadeau".
* Pour les férus d'accessibilité : c'est un div. (L'image de fond est appliqué au div parent)
* Pour les férus de webperf : l'image est chargée 2 fois, avec 2 adresses différentes.
* Saisissez le numéro du chèque (copier / coller, en faisant attention aux espaces)
* Saisissez le montant du chèque (Apparement, Boulanger ne connait pas le montant en fonction du numéro de chèque...) 
Attention, pas de format indiqué : 25,10 / 25.10 / 25€10 : bonne chance.
* Recopiez un captcha
* Validez le chèque

![8 moyens de paiements. +1 caché](/public/pictures/2013/boulanger-saisie-cheque.jpg "")


Voilà, la page se recharge, referme la partie chèque, et vous passez à la suite. Oui, mais :

* Si tout va bien, la ligne pour le chèque figure en bas de la page d'après ce qu'ils disent.
* Si une erreur s'est produite, vous devez :
 * Au milieu de la page de paiement, il faut cocher à nouveau la phrase "Vous béneficiez de cartes cadeau, cartes satisfaction ou chèques fidélité ?"
 * Sélectionner "Chèque cadeau".
 * Regarder si par hasard, une ligne rouge n'est pas affichée. Avec un message d'erreur du genre "Le paiement n'est pas valide". Bonne chance pour comprendre quelle est l'erreur. Si vous tapez le montant "AA" ou un numéro de chèque erroné, vous aurez la même erreur.

![Un message d'erreur (enfin, façon de parler)](/public/pictures/2013/boulanger-saisie-cheque2.jpg "")


### Vous avez demandé le service client, ne quittez pas

En bas de page, un lien contact : je me dis que je vais leur expliquer ce que je pense de leur site.

* Je clique sur le lien en bas de page
* Une page apparaît avec une liste de 8 "services" pour les contacter. Je clique sur "Contactez Boulanger.fr" (accessibilité : nulle. c'est une image sans texte alternatif)
* Une page différente apparaît, avec les 8 services, où celui que j'ai sélectionné est "ouvert". Aucun des choix proposés ne me convient. Je change de service pour "Les produits ou les services (je vous ai parlé de la non accessibilité du site ?). Voilà, je peux choisir un type de contact qui me convient "Question concernant la carte de fidélité"
* Et là, alors que je suis connecté, qu'ils ont donc mon adresse, mon numéro de client, mon email, je dois remplir quelques informations.
  * Informations obligatoires (présence de * à coté de l'intitulé) : Nom, prénom, numéro de téléphone (là encore, pas de format... je choisi donc le format international), email, choix du mode de contact de leur part (email ou téléphone), et ma question
  * Le numéro de la carte de fidélité n'est pas obligatoire : ouf.
  * Des cases pour accepter ou non de recevoir des mails de promos de Boulanger et de ses partenaires (avec une ligne en gris sur fond blanc, que j'ai trouvé peu lisible...)
* J'écris un long mail (cet article est issu du mail). Enfin, je ne l'écris pas dans le champ : le textarea de 6 lignes, 32 colonnes, non redimensionnable est trop petit pour ma prose.
* Je l'envoie. Ah tiens, j'ai un message d'erreur (il est clair cette fois) : je n'ai pas saisi mon numéro de carte boulanger. Même s'il est "logique" de devoir saisir le numéro sur la page de contact à ce sujet, c'est pourtant le seul champ que je ne suis pas obligé de remplir.
* Je remplis le champ par mon numéro, qui d'après leur aide (qui apparaît au survol.. accessibilité...) doit faire 10 caractères. Sauf que je peux en mettre 12 ou plus en fait. Le champ n'est pas limité en nombre de caractères.
* J'arrive tout de même à envoyer mon mail, et j'ai donc un joli message de confirmation. Par expérience, j'aurais aimé recevoir une copie par mail. Pour ne pas perdre mon message, et l'avoir si on me demande de redonner des infos.


![Boulanger, une fois le mail envoyé](/public/pictures/2013/boulanger-confirmation.jpg "")

### Pour aller plus loin

Après avoir envoyé le mail, j'ai commencé mon article, et j'ai du coup été tatillon : lecture du code source de quelques pages, etc. Quelques trucs qui me chiffonnent en vrac :

* La page de contact n'a pas de balise "title"
* A la louche : 4 fichiers css (+2 pour le print), 20 fichiers js...
* Le design du formulaire de contact en balise table dans une balise table dans une balise table.
* La vérification des champs provoque un message d'erreur (un seul : c'est une bonne chose) mais est faite en javascript (accessibilité...)
* Des balises mises en commentaires HTML.
* La liste des mot-clés (meta keyword) me semble un peu longue, mais admettons. Par contre, le dernier mot-clé est terminé par un point. Étrange.

A la base, je comptais juste faire un achat rapide. Je viens de passer la soirée à faire un audit qualité (bug / ergonomie / accessibilité / webperf) à boulanger. C'est cadeau : je n'ai fait que survoler. J'encourage Boulanger à le faire à fond (ou mieux, à le faire faire par des experts).
(Evidemment, si j'ai une réponse, je la publierais ici)