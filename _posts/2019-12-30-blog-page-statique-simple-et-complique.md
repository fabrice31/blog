---
layout: post
title: "Blog, page statique : simple et compliqué à la fois"
tags:
  qualite
---

Il y a quelques années, j'ai déménagé mon blog d'une plateforme de blog jusqu'à github pages. C'était à la mode, ça me permettait d'être autonome, de me faire la main sur des technos que je ne maitrisais pas à l'époque.

Les pages statiques, pour un site qui ne bouge pas trop, c'est l'idéal : rapide, léger, et efficace. L'interet est surtout qu'on n'a pas de langage de script qui calcule encore et encore les mêmes pages. C'est facile, une commande jekyll, et on génère son blog, tout marche comme sur des roulettes. Il suffit d'un repo github, de pusher, et github se charge de générer les pages en fonction du code envoyé.

Enfin, ça, c'est la théorie. En pratique, je voulais quelques fonctions qui n'existaient pas sur github pages, je devais donc avoir la stack installée en local, générer le site, puis envoyer le résultat fini. Pas de problème en soi. En particulier, j'utilisais les tags de façon non standard : j'avais donc du code ruby spécifique, pour gérer mes meta données supplémentaires.

Je publie rarement. Il y a même des années où je ne publie pas. Et puis un jour, été 2018, j'ai voulu reprendre la main dessus, corriger une faute d'orthographe. Depuis la dernière fois que je l'avais tenu à jour, il s'était écoulé plusieurs mois. Et j'avais surtout changé d'ordinateur, passant d'un ancien mac à un pc sous windows. Et sous ce pc, pas moyen de faire fonctionner la stack.

Lorsque j'ai installé la gem jekyll, je n'avais plus l'info de la version que j'avais utilisé. Et évidemment, celle prise par défaut n'était pas compatible avec certaines extensions que j'utilisais. Je mets donc à jour les gems, les unes après les autres. En tenant à jour la configuration du projet, ce qui n'est pas une mince affaire. 

Entre les documentations incomplètes, les erreurs de compilations pointant vers des bugs vieux de deux ans, j'ai cru devenir chèvre. Dans la majorité des cas, il s'agissait de bug spécifiques à Windows, évidemment. Et donc, aucun moyen de s'assurer que ce n'était pas le cas sur mac avec mon ancienne configuration. A plusieurs reprises, j'ai passé la soirée à installer ruby, les gems, vérifier que cela marchait ou pas.

Puis, de guerre las, j'ai abandonné cette idée : j'ai regardé les autres générateurs de sites statiques. J'ai testé des scripts de migration de contenu entre jekyll et hugo, et je rencontrais systématiquement des problèmes. Evidemment, la doc ne le mentionne pas, mais la migration n'était possible qu'avec une version de jekyll plus ancienne que la mienne. J'ai testé d'autres outils, en quelques instants, et parfois de façon très décevante : quand rien dans la doc n'indique qu'il faut un serveur php local pour générer les pages, je n'appelle pas ça un générateur de site statique. Quand je vois une méthode soit disant "full javascript, sans installation" mais qu'en tentant de l'utiliser, je dois installer node.js et une multitude de dépendances, j'ai tendance à trouver ça pénible.


Finalement, j'ai fini par trouver une solution récemment : j'ai installée une VM Ubuntu sur mon pc, dans laquelle j'ai pu installer ruby, mes gems à jour, importer mon blog, et générer sans aucun souci la mise à jour du blog. Le plus drôle, c'est que le code que j'utilisais pour gérer les tags a pu être totalemnt supprimé : un plugin récent fait parfaitement l'affaire. Et j'ai pu mettre en place toutes les astuces que j'ai vu durant ma quête, pour optimiser la génération de mon blog, etc.

Au final, j'ai appris beaucoup de choses, dans des domaines assez variés. Mais j'ai l'impression d'avoir perdu surtout beaucoup de temps, et cela a mis ma motivation à rude épreuve de ne pas pouvoir bloguer comme je le souhaitais.
