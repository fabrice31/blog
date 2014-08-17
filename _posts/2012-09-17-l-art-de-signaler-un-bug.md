---
layout: post
title: L'art de signaler un bug
tags:
  bug
---

Lorsqu'un utilisateur lambda signale un bug, il a tendance à penser qu'il est évident, et qu'il n'a pas besoin de donner des informations. On se retrouve alors à devoir analyser des mails ne contenant peu ou pas d'informations, à leur demander des détails, ou à tester plusieurs cas possibles, en espérent "tomber dessus par hasard".

Dans tous les cas, il y a beaucoup de temps "perdu" pour trouver un bug, qui parfois n'est pas lié à votre site web, mais à tout autre chose : mauvaise manipulation, antivirus, etc.

Lorsqu'on emmène sa voiture chez le garagiste, on lui donne souvent plein d'informations inutiles. Je me souviens d'une fois, où je suis arrivé pour lui dire : "_je sais pas ce qu'elle a : elle vibre quand je roule, les vibrations augmentent avec la vitesse. Et j'ai du mal à passer les vitesses, comme si ce n'était plus aligné._"

La garagiste a dit "je pense que je sais", a été démarré la voiture sur le parking, puis a éteint et a répondu : "_Supports moteurs HS : il va falloir les changer_". A peu de chose près, je pensais à Bourvil.

(Pour la petite histoire, 2 supports moteurs sur 3 cassés, à la fin d'un voyage de 800km.)

<iframe width="560" height="315" src="//www.youtube.com/embed/Ipl67KqEkWc?rel=0" frameborder="0" allowfullscreen></iframe>


Mais alors, quelles informations donner lors du signalement d'un bug ? toutes celles qui peuvent être utiles :

* Navigateur (et version : Firefox 3.5 et Firefox 14 se ressemblent, mais ne sont pas identique, loin de là)
* Système d'exploitation (non, Safari pour windows et pour mac ne se comportent pas de la même façon)
* Antivirus (pas utile à chaque fois, mais c'est quand il manque qu'il est utile)
* Messages d'erreur : tous, en entier.
* Procédure pour reproduire le bug : où cliquez-vous, dans quel ordre...

Parfois, un bug se joue à un détail : vous cliquez sur le bouton, ou alors vous tabulez et validez au clavier ?

Plus vous donnez d'informations précises, plus cela peut être utile à corriger le bug.
