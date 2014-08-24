---
layout: post
title: Valider un thème
tags:
  qualite
  test
---

### Choisir un thème

Lorsqu'on crée son blog, on regarde souvent les fonctionnalités de l'outil, mais on est surtout intéressé par le thème.

Chacun a une attente particulière d'un thème : on a tous une couleur préférée, un sujet de prédilection (cuisine, technologie, voiture...). Certains aiment également ajouter un tas de widgets facilement, ou pouvoir le personnaliser en changeant une couleur ou une image. Cela permet de se sentir chez soi.

Dans la nouvelle version d'OverBlog, l'utilisateur peut choisir son design, changer les options prévues dans le thème, mais également modifier le html, le css, afin d'avoir un thème qui correspond exactement à ce que l'on veut.


### Et la qualité ?

Lorsqu'un nouveau thème est créé pour être proposé aux blogueurs, en tant que responsable qualité, je dois vérifier qu'il s'affiche correctement sur tous les navigateurs, avec toute sorte de contenus. Sans parler d'avoir les options qui permettent de plaire au plus grand nombre.

Lorsque nous avons ajouté les premiers thèmes, j'ai testé manuellement beaucoup de choses, refait les mêmes tests plusieurs fois. Avec le recul, je pense même n'avoir pas fait les mêmes tests sur chaque thème.

L'équipe ayant augmenté la cadence de livraison de thèmes, il y a de plus en plus de thèmes à tester.

Au delà de ça, l'équipe ajoute régulièrement de nouvelles fonctions utilisables dans les thèmes (ex : une fonction article suivant / précédent). Il faut alors faire modifer les anciens thèmes, les tester à nouveau...

![Checklist](/public/pictures/2012/checklist.jpg "Checklist point par point")


### Tests en équipe

Du retard s'étant accumulé dans les tests, j'ai décidé de faire participer l'équipe aux tests. Pour cela, j'ai préparé un document comportant une centaine de points à vérifier pour chaque thème, plus ou moins précis.

Certains points sont issus de tests précédents, de bugs s'étant déjà produits. D'autres sont issus de connaissances accumulées dans le domaine depuis de longues années.

Chaque membre de l'équipe a choisi un thème (en veillant à ne jamais tester un thème que l'on a soi-même créé: le test ne saurait être fiable dans ces conditions). Ne restait alors plus qu'à vérifier la checklist.

![Checklist en équipe](/public/pictures/2012/checklist_equipe.jpg "Checklist en parrallèle")


### Checklist : SEO

* Titre du blog sur la home, de préférence en h1
* Description du blog affichée sur la home
* Pas de répétition abusive du titre et de la description du blog
* Sur une page d'article, le titre et le lien vers l'article ne sont pas répétés
* Le title de la page d'accueil inclut le titre du blog
* Le title d'une page d'article contient le titre de l'article
* Le title d'une recherche contient le keyword
* Le title d'une catégorie contient la catégorie
* La meta description contient la description du blog sur la home
* La meta description contient l'extrait de l'article sur les pages "article seul"
* Les widgets et les articles ont des titres de forme h* (h2, h3...)
* Le flux RSS est renseigné et l'url est juste

### Checklist : ergonomie

* Le titre est cliquable et renvoie sur l'accueil
* L'attribut title du titre du blog contient la description du blog
* L'attribut title du titre des articles contient un extrait de l'article
* Il y a un lien vers la page contact
* Le champ de recherche a un placeholder
* Un message apparait quand il n'y a pas de résultat
* Lors d'une recherche, les articles sans titre peuvent être ouverts
* Les tags sont affichés par leurs noms, pas par leur url
* Les suites de tags sont séparées par un élément visuel : # , /

### Checklist : webperf

* Vérifier que les js chargés sont en nombre limité
* Si une option permet de désactiver une fonction, le JS associé est désactivé
* Les js qui le peuvent sont placés en pied de page
* Poids total de la page inférieur à 3 Mo
* Pas d'erreur 404 dans les fichiers / images

### Checklist : options du thème

* Prévoir une option article complet / extrait
* Pas de lien "en dur" vers une url interne à créer par le blogueur
* Pas de saisie inutile de valeur
* Ne pas hésiter à faire changer les couleurs principales du thème
* Si une image est utilisée "par défaut", permettre de la changer
* Permettre de choisir les modules à afficher / masquer
* Penser à l'ajout des comptes de réseaux sociaux
* Les options ont des valeurs par défaut
* Le type des options est adapté
* Prévoir l'ajout de Google analytics / webmaster tools / msn tools

### Checklist : widgets

* Prévoir un module listant les pages
* Prévoir un module affichant la biographie de l'auteur, sa ville, son pseudo
* Dans le module "bprofil"io", afficher lien + logo vers les réseaux sociaux
* Prévoir un module archive, affichant les années, interactivité pour afficher les mois
* Prévoir un module tags, qui affiche les tags.d'utilisation

### Checklist : article

* Informations de base affichées : titre, date, auteur, tags
* Les images des sections texte sont alignées correctement
* Mise en page correcte : listes (puce + numérotées)
* Mise en page correcte : gras, italique, del, liens
* Mise en page correcte : titres, preformatted
* La section image prend la largeur maximale disponible
* Ajouter une "fancybox" ou script assimilé pour zoomer sur les images
* Le slideshow fonctionne dans la section image
* Les vidéos ne sont pas coupées en largeur
* Le player de musique s'affiche et fonctionne
* Pour une section lien, le lien, la vignette, l'extrait sont placés correctement
* Les citations apparaissent de façon à ressortir
* L'auteur d'une citation est affiché clairement
* Les cartes s'affichent entièrement
* Le curseur indique qu'on peut cliquer sur la carte
* Pour les sections image, vidéos, musique, carte... la description est alignée avec le contenu
* Une suite de sections s'affiche correctement
* Les articles sans titre peuvent être visités (ajout d'un lien "Read more"...)
* Les articles venant de Twitter s'affichent correctement
* Les articles venant de FB s'affichent correctement (image, texte..)
* L'article dispose d'options de partage (Twitter, FB, G+, Pinterest...)

### Checklist : autres contenus

* Sur une page d'article seul, on affiche les commentaires
* Sur une page d'accueil, on affiche une information pour indiquer les commentaires
* La zone de commentaire apparait dans toute sa largeur
* Si les commentaires sont désactivés, pas de lien / d'affichage des commentaires
* Sur les pages listant les articles (accueil, recherche, tags...), afficher la pagination
* Quand on passe sur la page 2, ce sont les articles suivants qui apparaissent
* Sur une page d'article, afficher un lien vers l'article suivant / précédent
* La page de contact s'affiche correctement

### Checklist : divers

* Si le design est responsive, cela fonctionne
* Les textes affichés passent par la fonction de langue (permet la traduction du thème)
* Pas de textes localisés dans les images (pour faciliter le changement de langue)
* Affichage parfait sur IE9
* Affichage correct sur IE8
* Affichage parfait sur Chrome
* Affichage parfait sur Firefox
* Affichage correct sur Safari
* Les options de commentaires (Disqus, Facebook..) fonctionnent
* Les options des widgets sociaux fonctionnent
* Les options de thèmes fonctionnent pour changer l'apparence : couleurs, police...
* Les autres options sont opérationnelles.
