---
layout: post
title: Les tests sont comme une boite de chocolats
tags:
  qualité
  test
---

> Testing is like a box of chocolates. You never know what you’re gonna get.
> <br/> Peter Shih

<img src="/public/pictures/2012/chocolats.jpg" title="Boite de chocolats" style="width: 350px; float: left;"/>
<img src="/public/pictures/2012/forrest-gump.jpg" title="Forrest Gump" style="width: 350px; float: left;"/>
<p style="clear: both;"></p>

Je suis tout à fait d'accord avec lui. Quand on met en place des tests automatiques ou qu'on teste manuellement une nouvelle fonctionnalité, on ne sait jamais ce qu'il va se passer.

On peut tout avoir :

* Tout fonctionne, et tout s'affiche parfaitement
* Une partie ne fonctionne pas, bloquant une partie des tests.
* L'affichage est décalé (avec parfois des problèmes en cascade)

Du coup, rien ne se ressemble : chaque nouveau test permet d'être surpris, et de devoir réflechir en profondeur pour assurer la stabilité du produit testé. (Qu'il soit logiciel ou matériel d'ailleurs)