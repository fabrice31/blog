---
layout: post
title: "Tests automatiques : watir"
tags:
  watir
  test
---

[Watir-webdriver](http://watirwebdriver.com/) est une librairie qui permet de contrôler le navigateur : vous écrivez un code qui vous permet de simuler le comportement d'un utilisateur. Cela vous permet d'automatiser des tests, afin de pouvoir les effectuer systématiquement, sans intervention humaine.
Voici une petite demonstration de watir-webdriver. Basique, il vérifie uniquement que le lien contact est bien présent, et que le mot __qualité__ apparait sur la page.

<iframe width="640" height="480" src="//www.youtube.com/embed/E6s4-m2U8b4?rel=0" frameborder="0" allowfullscreen></iframe>

```ruby
# lutte contre : web.rb:3:in `require': no such file to load -- watir (LoadError)
require "rubygems"

# chargement de la libraire watir
require "watir-webdriver"

# ouvrir un navigateur
B = Watir::Browser.new
B.window.resize_to(800,600)

# Ouvrir le site
B.goto("http://web-quality.over-blog.com")

# Clignotement
B.link(:text, "Contact").flash

# Vérifier que le mot qualité est présent
if (!B.text.include?"Qualite")
  puts "Test Qualite KO"
else
  puts "Test Qualite OK"
end

# Fermeture
B.close
```

Pour résumer :

* on charge les libraires adéquates
* on ouvre un navigateur
* on va sur le site web à tester
* on effectue des actions et/ou de tests

Et voilà, le tour est joué. Ce code basique ne sera jamais utilisé tel quel : afficher un message d'erreur suffit pour quelques tests, qui prennent peu de temps. Mais pour des tests nombreux et longs, il faut pouvoir disposer d'un rapport d'erreur détaillé, etc.