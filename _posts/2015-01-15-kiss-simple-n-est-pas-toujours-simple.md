---
layout: post
title: La simplicité n'est pas toujours simple
tags:
  qualite
  ruby
---

Comme je le disais il y a peu, sur les gros projets, il est intéressant de [surveiller la simplicité]({% post_url 2014-12-13-kiss-simple-et-efficace %}) du code.
J'utilise pour cela [flog](https://rubygems.org/gems/flog) qui calcule la complexité des méthodes.

### Zone grise

Sur notre projet actuel, le score total flog est de plus de 6300 points de complexité d'après flog. Avec une moyenne de 12.7 et un maximum de 206.5, le champ est large.

Répartition des plus hauts scores: 

* > 200 : 1 fonction
* > 100 : 3 fonctions
* > 50 : 16 fonctions
* > 20 : 41 fonctions
* < 20 : un peu plus de 400.

Evidemment, quand je cherche à simplifier, je commence à regarder les fonctions les plus complexes. Il est souvent plus facile de simplifier une chose compliquée qu'une chose déjà simple.

Il est pourtant très difficile de savoir quelle est la limite acceptable. Selon les gens, et les projets, cela varie entre 25 et 60.
On définit par conséquent une zone grise, contenant les fonctions "à vérifier" et à simplifier si possible, au cas par cas.

Au dessus, il faut bien évidemment faire quelque chose. En dessous, c'est peu utile. J'ai donc encore quelques fonctions bien tordues à simplifier sur le projet, pour respecter cette règle à la lettre.


### Complexe ou compliqué ?

J'ai enquêté sur une fonction particulière, assez longue, qui vérifie la présence d'un élément particulier. Cet élément varie en fonction du type de page que l'on teste.

```ruby
def format_is_present(format)
	case (format.downcase)
	when 'bt'
		expect(@browser.divs(class: 'wtr').length).to eq(1)
		expect(@browser.divs(class: 'wtl').length).to eq(1)
	when 'bc'
		@browser.send_keys :space
		expect(@browser.iframe(id: 'ei0').divs(id: 'ep0').length).to eq(1)
	when 'ib'
		sleep(SHORT_TIMEOUT)
		expect(@browser.divs(id: 'ebib').length).to eq(1)
	when 'ic'
		expect(@browser.divs(id: 'bc').length).to eq(1)
	when 'ifw'
		expect(@browser.divs(id: 'bc').length).to eq(1)
	when 'ift'
		expect(@browser.divs(class: 'wf').length).to eq(1)
	when 'ir'
		@browser.send_keys :space
		sleep(SHORT_TIMEOUT)
		expect(@browser.divs(id: 'en').length).to eq(1)
	when 'ise'
		expect(@browser.divs(class: 'bm').length).to eq(1)
	when 'iso'
		@browser.send_keys :space
		sleep(SHORT_TIMEOUT)
		expect(@browser.divs(id: 'ep0').length).to eq(1)
	when 'ise'
		sleep(SHORT_TIMEOUT)
		if (@browser.div(class: 'ebt').exists?)
			expect(@browser.divs(class: 'ebt').length).to eq(1)
		else
			expect(@browser.divs(class: 'et').length).to eq(1)
		end
	when 'it'
		sleep(SHORT_TIMEOUT)
		expect(@browser.divs(class: 'wtr').length).to eq(1)
		expect(@browser.divs(class: 'wtl').length).to eq(0)
	else
		puts "Format #{format} Not yet implemented"
		return "pending"
	end
end
```

Score flog : 135.8. 

Vraiment pas terrible, mais le nombre de cas différents ne simplifie pas la tâche.

#### Premier essai : Yaml et algorithme

J'ai commencé par créer un fichier yaml contenant toutes les informations des tests, pour n'avoir ensuite qu'un algorithme commun à tous les cas.

Voici le code ruby de la fonction ainsi modifié:

```ruby
def format_is_present_with_yaml(format)
	which = format.gsub(' ', '_').downcase
	# Get checkers from the yaml
	CONTROLS = YAML.load_file('support/checkers.yml')['controls']
	checks = CONTROLS[which]
	if !checks.nil?
		checks.each do | _key, check |
			# extra command
			if !check['extra'].nil?
				if check['extra'].to_s == 'sleep'
					sleep(SHORT_TIMEOUT)
				elsif check['extra'].to_s == 'scroll'
					@browser.send_keys :space
				elsif check['extra'].to_s == 'both'
					sleep(SHORT_TIMEOUT)
					@browser.send_keys :space
				end
			end

			# Check in a frame is slightly different
			if (check['in_frame'].nil?)
				b = @browser
			else
				b = @browser.iframe(id: check['in_frame'])
			end

			# Make the control
			if check['type'] == "class"
				expect(b.divs(class: check['value']).length).to eq(check['result'])
			else
				expect(b.divs(id: check['value']).length).to eq(check['result'])
			end
		end
	else
		puts "Format #{format} Not yet implemented"
		return "pending"
	end
end
```

Score flog : 75.3. Score presque divisé par deux : impressionnant. 

Par contre, contrairement à la première fonction :

* Une partie du raisonnement est déporté dans un fichier externe. Si je ne le poste pas, il est impossible de savoir ce que fait l'algo.
* Si de nouveaux cas apparaissent, il faudra peut être modifié ce nouvel algorithme, ce qui peut être risqué et ajouter des effets de bords.
* Franchement, lisez le code : c'est beaucoup moins clair que la fonction précédente. La gestion des cas particuliers représente la plus grande part du code, noyant complétement la compréhension.


#### Un compromis

Autre solution, regrouper les différents cas par lots similaires. 

```ruby
def format_is_present_new(format)
	ids = {
		'ib' 	=> 'ebib',
		'ic' 	=> 'bc',
		'ifw'	=> 'bc',
		'ir'	=> 'en',
		'is'	=> 'ep0'
	}
	classes = {
		'ift'	=> 'wf',
		'is'	=> 'bm',
		'ise' 	=> /e(|b)t/
	}

	case (format.downcase)
	# generic cases with element by id
	when 'ib', 'ic', 'ifw', 'ir', 'is'
		if %w(ir is).include? format.downcase
			# generic cases but with scroll
			@browser.send_keys :space
		end
		sleep(SHORT_TIMEOUT)
		expect(@browser.divs(id: ids[format]).length).to eq(1)
	# generic cases with element by class
	when 'is', 'ift', 'ise'
		sleep(SHORT_TIMEOUT)
		expect(@browser.divs(class: classes[format]).length).to eq(1)

	# particular cases
	when 'bt'
		expect(@browser.divs(class: 'wtr').length).to eq(1)
		expect(@browser.divs(class: 'wtl').length).to eq(1)
	when 'bc'
		@browser.send_keys :space
		expect(@browser.iframe(id: 'ei0').divs(id: 'ep0').length).to eq(1)
	when 'intab'
		sleep(SHORT_TIMEOUT)
		expect(@browser.divs(class: 'wtr').length).to eq(1)
		expect(@browser.divs(class: 'wtl').length).to eq(0)
	else
		puts "Format #{format} Not yet implemented"
		return "pending"
	end
end	
```

Quelques détails :

* J'ai regroupé en fonction du type d'element à vérifier : les div filtrés par id, ceux filtrés par class, puis tous les autres cas particuliers.
* En écrivant cet article, j'ai trouvé une petite amélioration qui baisse la note flog de quelques points supplémentaires.
* Ajouter des nouveux cas sera trivial. Le code reste parfaitement lisible, même pour quelqu'un découvrant le projet.
* Le score est toujours au dessus de la zone grise, mais je suis à cours d'idée. Pour le moment.

Score flog final : 76.4. Il était de 85 quand j'ai commencé à écrire cet article : merci à vous d'avoir été mon [canard en plastique](http://fr.wikipedia.org/wiki/M%C3%A9thode_du_canard_en_plastique)

