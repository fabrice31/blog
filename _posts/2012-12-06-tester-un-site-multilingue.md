---
layout: post
title: Tester un site multilingue
---

Travailler sur un site international demande de multiplier les tests.

D'abord, si l'interface change, il est parfois intéressant de la tester dans chaque langue. Dans mon cas, ce n'est pas fait. Le principal risque des "langues" est l'affichage des textes (du point de vue design), ce qui ne peut pas être testé de façon automatique. Pour cela, une équipe multilangue qui vérifie les modifications et leurs impacts est plus réaliste.

L'autre aspect important, c'est l'accès au site en fonction de la langue. Si vous avez une stratégie de redirection en fonction de la langue, il faut pouvoir le tester. J'ai l'impression que cela m'a pris du temps, alors qu'au final, c'est tout simple. Mais j'ai exploré beaucoup de pistes sur le sujet.

### Le test

```ruby
class TestProductionFrench < Test::Unit::TestCase
  def setup
    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['intl.accept_languages'] = "it"
    @browser = Watir::Browser.new :firefox, :profile => profile
  end
  def teardown
    @browser.close
  end
  def test_redirection_it
    @browser.goto("http://www.google.com")
    assert_equal("http://www.google.it", @browser.url)
  end
  def test_redirection_fr
    @browser.goto("http://www.google.fr")
    assert_equal("http://www.google.it", @browser.url)
  end
end
```

### L'explication

Pour ce test, je n'ai pas utilisé cucumber, ou autre, mais juste la librairie unitest de ruby, et watir.

* Ligne 3 à 7 : le setup, joué avant chaque test. On crée un nouveau profil pour Firefox, contenant l'attribut de langue voulu. Puis on charge Firefox.
* Ligne 9 à 11 : le teardown, qui ferme le navigateur après chaque test.
* Ligne 13 à 16 : premier test : on charge google.com, et on vérifie ensuite qu'on a bien été redirigé vers google.it (puisque le navigateur signale une préférence pour cette langue)
* Ligne 18 à 21 : second test, depuis google.fr

### Pourquoi j'ai perdu du temps

J'ai perdu du temps à faire fonctionner cela, pour la simple et bonne raison que cela ne marchait pas, et que mes tests testaient donc "mal". La tête dans le guidon, je n'ai pas testé que le fonctionnement du changement de langue soit juste. Je cherchais à corriger le problème là où il n'était pas.

Quelques rappels :

* Changer la langue préférée pour l'affichage des pages de Firefox ne change pas la langue du navigateur.undefinedundefined
* Il est facile d'afficher une page qui vous donne la langue préférée de votre navigateur. Voici un exemple de code en PHP :

```php
<?php
    $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    echo $lang;
```
