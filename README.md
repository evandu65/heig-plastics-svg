# Projet final

Les données sur la population mondiale proviennent du site [The World Bank](https://data.worldbank.org/indicator/sp.pop.totl). Les données concernant la production comulée de plastique proviennent du site [Our World in Data](https://ourworldindata.org/plastic-pollution).

Les deux sources de données susmentionnées ont été transformées du format CSV au format JSON à l'aide des fichiers javaScript PrepareData se trouvant dans le dossier 'data'. Ces scripts utilisent les librairies [fs](https://node.readthedocs.io/en/latest/api/fs/) et [d3](https://d3js.org/) et les données sont converties du type string au type integer à l'aide de 'JSON.stringify'.

Mon choix s'est porté sur ce jeu de données car il me tenait à coeur de transmettre un message écologique au travers de ce projet. L'état de notre planète est critique et il revient à chacun de se responsabiliser quant à son mode de consommation et sa consommation de plastique. 

J'ai décidé de me passer de librairies telles que billboard.js afin de mieux prendre en main la librairie d3. Je me suis basé sur le [support de cours fourni par Anders Bengtson](https://github.com/idris-maps/heig-datavis-2019/tree/master/projets) ainsi que sur divers forums en ligne afin d'arriver à mes fins. Il me semblait pertinent de rajouter une animation des courbes afin de mieux montrer leur progression. Les légendes apparaissent au hover de la souris et des informations détaillées s'affichent en fonction de la position du curseur. Pour ce qui est de la mise en page finale, j'ai utilisé la librairie de classes CSS [Bulma](https://bulma.io/).

J'ai souhaité représenter ces données sous forme de courbes (line chart) pour mettre en avant l'intersection de la courbe de production comulée de plastique de 1960 à 2015 avec le nombre d'humains vivants sur la planète.

Le message que je souhaite véhiculer au travers de cette visualisation de donnée est qu'en 2015, 7.8 milliards de tonnes de plastique avait été produit, **soit plus d'une tonne de plastique pour chaque personne vivante**.

Ce projet cible toutes les personnes dans leur rôle de consommateur. Nous vivons dans une société de consommation où nous sommes poussés à consommer toujours davantage, mais il existe aujourd'hui de plus en plus d'alternatives au plastique et il n'est jamais trop tard pour chercher à diminuer notre empreinte sur la planète.