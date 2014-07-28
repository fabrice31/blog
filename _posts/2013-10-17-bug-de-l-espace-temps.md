---
layout: post
title: Bug de l'espace temps
tags:
  bug
---

Dans notre outil, nous utilisons le langage twig. Cela permet une grande flexibilité, et d'avoir un moteur déjà bien robuste.

Prenons par exemple l'affichage d'une date avec ce code :

```ruby
Post.Date|datel(Lang.Get("Default date format"))
```

Notre outil étant mutli langue, et les formats de date changeant avec la langue, nous utilisons une locale. En pratique, il s'agit d'une chaîne de caractères indiquant le format.

On pourrait avoir HH:mm pour l'heure par exemple.

Dans l'analyse du bug du jour, nous avons un signalement de date fausse sur certaines pages. Après vérifications nous trouvons une page datant du 3 janvier 2010, mais qui est affichée comme étant le 3 janvier 2009.

L'enquête se poursuit en vérifiant les dates des autres pages : la quasi totalité des pages affichent une date juste. On finit par regrouper les pages à problèmes suivant le critères : certaines pages de début janvier de certaines années (mais pas toutes).

Le collègue qui cherchait a trouvé le problème.

```ruby
Default date format = MMMM d Y
```

Dans la documentation de datel, Y = year of "Week of Year". Il s'agit de l'année durant laquelle le week end du jour en question a eu lieu.

Il s'agit donc d'un bug visible pour les premiers jours de janvier pour lesquels la semaine commençait l'année d'avant. Tordu non ?

Pour la petite histoire, le code corrigé sans bug donne :

```ruby
Default date format = MMMM d yyyy
```
