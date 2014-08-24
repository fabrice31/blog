---
layout: post
title: Une petite boulette peut coûter cher
tags:
  test
  watir
---

Comme je l'ai déjà dit, je développe des tests sous cucumber / watir pour un gros projet. J'ai quelques centaines de scénarios, des milliers d'étapes, le tout regroupé par fonctionnalité. Cela nous permet de voir rapidement si on peut mettre en prod ou non : si une fonctionnalité est testée "instable", il faut lire le rapport détaillé.
Deux anecdotes récentes à ce sujet.

### Le bug est détecté

L'un des tests fonctionnels crée il y a une semaine pour détecter un bug existant permettait d'éviter la non régression sur ce point. Ce matin, je peste à voix haute en parlant à un collègue, et un autre me dit "mais je l'ai corrigé vendredi". Après test manuel, je confirme, le bug n'est plus présent. Pourtant, le test ne fonctionne pas.

Commence alors une rapide enquête pour comprendre.

Le bug : si un utilisateur remplit un champ particulier, tout semble marcher quand il sauve. Pourtant, si on rafraichit la page, on voit que cela ne marche pas.

Le test a été mis en place au moment du bug, et une partie du test n'avait donc jamais été vérifiée avant la mise en service du test.

La correction a consisté à attendre que l'élément testé soit bien affiché avant de le tester.


### J'ai cru voir un petit bug

Plus tôt cette semaine, un collègue me signale qu'il faudrait ajouter un test sur une fonctionnalité particulière. On en discute, mais plus le temps passe, plus je suis sur que nous avons ajouté un test en ce sens récemment.

Après vérification, nous avons bien un test, mais il ne voit pas le bug. Il me laisse un peu de temps pour corriger le test avant de publier sa correction, cela a facilité le travail.

Durant le test, nous vérifions plusieurs éléments, en fonction des options passées.

Nous avons donc une suite de vérifications, en ruby+watir

```ruby
find = find and (@browser.div.img).exists?
if data['align'] == 'right'
  find = find and (@browser.div.img(:class => 'media-right')).exists?
else
  find = find and (@browser.div.img(:class => 'media-left')).exists?
end
```

Pour traduire : On vérifie qu'une image est présente, puis si l'option alignement est "droite", je vérifie que l'image est aligné à droite. Sinon, je vérifie à gauche.

Le problème ? Ce test ne teste rien. Tout simplement parce que le parenthésage est mauvais.

En ruby, le and est prioritaire sur le .exists. Je teste donc l'existence d'un booléen au lieu de tester deux booléens.

Le code corrigé ajoute juste des parenthèses pour changer la priorité.

```ruby
find = find && ((@browser.div.img).exists?)
if data['align'] == 'right'
  find = find && ((@browser.div.img(:class => 'media-right')).exists?)
else
  find = find && ((@browser.div.img(:class => 'media-left')).exists?)
end    
```

### Conclusion

Ce que je retiens de ces événements récents ?

* La communication dans l'équipe est très importante.
* Tester qu'un test détecte une panne est complexe.
* Il n'y a pas de règle sur le bon moment pour créer un test : que ce soit pendant une panne ou en dehors, seul un contrôle régulier permet de s'assurer que le test teste.