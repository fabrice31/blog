---
layout: post
title: "Cucumber : des tests plus simples pour tous"
---

Mettre régulièrement à jour ses batteries de tests est indispensable.

Cela permet de découvrir un test qui ne fonctionne plus, d'optimiser le comportement des tests. Parfois, on intègre une nouvelle technologie qui change tout dans la façon de tester.

### Mise à jour des tests

Pour mettre à jour mes tests, j'ai décidé de repartir de zéro. De réflexions en réflexions, j'en était arrivé à me poser des questions (existentielles) du genre :

* Est-ce que je peux envisager de créer des Tests Unitaires pour tester que mes tests testent bien ?
* Pour éviter de toujours refaire la même chose, il faudrait que je crée des "primitives" à réutiliser partout. Comment les gérer au mieux ?
* Avec ces primitives, je pourrais envisager de créer des tests dans toutes les langues du site de façon très rapide...

Après quelques tests d'outils, etc, j'en suis arrivé aux conclusions suivantes:

* Le système de primitive existe. Il s'appelle Cucumber. J'avais parlé succintement de Cucumber lors d'une présentation que j'ai faite lors d'un apéroweb Toulouse. Pour résumer, Cucumber permet de rédiger les scénarios en anglais, simplifiant ainsi la création et la mise à jour de test.
* Créer des tests unitaires de mes tests fonctionnels automatisés ne me garantirait pas qu'ils détectent les bugs. Pour cela, il faut un oeil humain, qui lance les tests, vérifient, etc.

### Nouvelle configuration

Je suis donc passé de Watir / Webdriver à Cucumber / Watir / Wedriver pour les tests. Nouvelle organisation, nouvelle façon de lancer les tests, etc. Après un mois d'utilisation, je vois déjà des avancées :

* La réutilisation des primitives est un énorme gain de temps
* La lecture d'un scénario de test est possible pour tout le monde. Il en va de même pour leur écriture (à faire relire / adapter par le responsable qualité tout de même)

Voici un petit exemple fait maison, on en trouve une quantité sur le net.

*Fichier features/webQualiteBlog.feature*

```cucumber
Feature: WeQualite Blog
Generic tests about my blog
@portal
Scenario: First page of blog
    When I go to "web-quality.over-blog.com"
    Then I shouldn't see errors
    And page should contain "Web qualité"
    And page should contain "Dieu du web"

@portal @google
Scenario: Verify blog is in first page of google search
    When I go to "www.google.fr"
    And I search "web-qalite"
    Then page should contain "Beaucoup d'outil de tests" 
    And page should contain "web-quality.over-blog.com"
```

![Résultats de l'éxecution](/public/pictures/2011/cucumber-first.jpg "Sous Windows, la coloration syntaxique est possible grâce à AnsiColor")

On voit que cucumber nous donne directement les primitives (step definitions) à gérer pour compléter les tests. C'est à la fois pratique, mais peut devenir source de problèmes. Si une primitive est sensé être déjà codée, il faut vérifier la syntaxe, l'appel du fichier etc..

*Fichier features/step_definitions/common.rb*

```ruby
require 'rubygems'
require "watir-webdriver"

caps = Selenium::WebDriver::Remote::Capabilities.htmlunit()
BROWSER = Watir::Browser.new(:remote, :desired_capabilities => caps)
 
When /^I go to "([^"]*)"$/ do |uri|
  BROWSER.goto(uri)
end
 
Then /^I shouldn't see errors$/ do
  errors = ["Call Stack", "Erreur 404", "Erreur 50", "Page Web introuvable",
            "Undefined ", "Trying to", "cette page n'est pas accessible",
            "Warning ", "Fatal exception", "Syntax error"]
  errors.each do |error|
    BROWSER.html.include?(error).should == false
  end
end

Then /^page should contain "([^"]*)"$/ do |txt|
  BROWSER.text.include?(txt).should == true
end

```

![Résultats de l'éxecution](/public/pictures/2011/cucumber-first.jpg "Ca marche (ou pas)")


### Explication de l'affichage

* En rouge : les primitives ne s'étant pas bien passés.
* En bleu : les primitives n'ayant pas été exécutés (une étape précédente a échoué).
* En marron: les primitives n'étant pas définies.

### Optimisations

J'ai déjà un peu d'expérience, et j'ai déjà intégré des optimisations directement dans l'exemple:

* Les primitives doivent être le plus "générique" possible. Cela évite de devoir code deux primitives similaires deux fois.
* L'utilisation de paramètres est un point très important pour optimiser ces primitives.
* Il est possible de rendre l'affichage du résultat moins verbeux (ex: cucumber features --format progress permet d'afficher une liste de point comme les tests unitaires classiques)


Pour aller plus loin

* [Le blog d'Alister Scott [en]](http://watirmelon.com/2011/01/21/my-simple-cucumber-watir-page-object-pattern-framework)
* [La gem ruby de cucumber](http://rubygems.org/gems/cucumber)
