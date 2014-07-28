---
layout: post
title: Affichage des résultats de tests
tags:
  tests
  jenkins
---

Lorsqu'on teste avec jenkins, cucumber et watir, on obtient des rapports détaillés, qu'il faut lire et analyser en permanence.

Depuis plusieurs mois, nous avons dans nos locaux une télé dédiée à l'affichage de l'état général de l'ensemble de nos tests. Pour cela, le plugin Jenkins Wall Display nous a suffit dans un premier temps. Nous affichons sur la télé une page web qui fait défiler

Au total, sur ces écrans, nous affichons le résumé :

* Plus de 1 300 test php unit (et leur 5 000 assertions)
* Près de 500 tests unitaires JS
* Plus de 950 scénarios cucumber pour les tests fonctionnels.

En outre, nous affichons aussi quelques graphiques sensibles de l'état de la production : nombre de compte crées, etc..
On a beau regrouper toutes ces informations, il arrive un moment où l'affichage n'est plus lisible.

![Exemple avec les tests fonctionnels](/public/pictures/2013/screen-avant.jpg "Affichage avant les travaux")

Le constat est moins alarmant pour les tests unitaires. Les chiffres exposent bien pourquoi :

* Tests fonctionnels : 40 jobs jenkins * 3 navigateurs
* Tests unitaires : 18 jobs jenkins * 2 environnement

### Comment afficher proprement les résultats

Je suis parti en quête d'une solution pour afficher tous nos résultats proprement, avec quelques contraintes :

* Je préférais afficher tous les résultats sur un seul écran par type de tests
* Je veux pouvoir afficher un résumé ( x tests KO / x tests total)
* Je veux pouvoir séparer facilement les affichages d'un même type de tests (par navigateur / environnement)

Ma quête fut longue et semée d'embûches :

* Tentative d'utilisation de l'API, mais c'était déjà trop lent alors que je ne calculais / affichais pas la moitié de ce que je voulais (45 secondes environ)
* Plusieurs plugin jenkins, mais aucun ne permettant ce que je veux
* Un Plugin jenkins faisant la moitié de ce que je voulais, mais complètement bugué


### Mon premier plugin jenkins

Je suis donc parti à l'assaut de la documentation de jenkins pour coder un plugin fait-maison qui ferait exactement ce que je voudrais.

Ce que j'ai bien aimé dans cette création :

* Tout en java. Je n'avais pas codé en java depuis 10 ans je pense, et j'ai perdu, mais vite repris mes repères.
* Bosser sur un plugin que je pourrais diffuser en open-source à la fin :)
* La possibilité de faire exactement ce que je veux, sans être limité par un plugin déjà fait.

Ce que je n'ai pas aimé :

* La documentation : elle existe, elle semble complète. Mais je trouve l'organisation moyennement bonne. J'ai plusieurs fois été à la recherche d'exemple de code pour trouver la fonction dont j'avais besoin, que je ne trouvais pas dans la doc.
* L'installation de maven qui marche du premier coup sur un de mes postes, mais se passe mal sur l'autre.


### Au final, ça donne quoi ?

J'ai donc un plugin qui permet de créer une nouvelle "View". On peut y configurer :

* Les noms des colonnes, et la façon de filtrer les jobs dans chaque colonne, par des expression régulières.
* Affichage dans chaque colonne du temps pris pour ces tests, du nombre de scénarios en échec et du nombre total de scénarios. (Afficher le nombre de jobs est beaucoup plus simple, mais donne beaucoup moins d'informations : un job en échec pour 1 / 34 est moins grave qu'un test avec 4 / 4 erreurs)
* Affichage de la liste des jobs en échec (avec le nombre de scénarios)
* Une colonne à part, qui affiche le temps total sur jenkins (master + slave)
* Une liste de jobs spéciaux (dans mon cas : ceux qui lancent les autres, la génération de la doc...)

Le plugin est sur github : [https://github.com/fabrice31/CucumberJenkins](https://github.com/fabrice31/CucumberJenkins)

Et maintenant ?

J'ai configuré le plugin pour fonctionner avec cucumber, puisque je suis au coeur des tests fonctionnels. Il faut maintenant que je me débrouille pour que cet affichage fonctionne aussi bien avec tests php unit (séparés par des regexp par environnement cette fois)


![Affichage de résultats cucumber](/public/pictures/2013/screen-apres.jpg "Affichage apres les travaux")
![Plugin jenkins affichage de résultats cucumber](/public/pictures/2013/screen-config.jpg "Configuration du plugin")

