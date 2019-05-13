import 'css/style.css';

// constantes
const d3 = require('d3');

const p = d3.select("p");
const svg = d3.select("svg");
const WIDTH = +svg.attr('width');
const HEIGHT = +svg.attr('height');

const margin = { top: 50, right: 300, bottom: 50, left: 100 };
const innerWidth = WIDTH - margin.left - margin.right;
const innerHeight = HEIGHT - margin.top - margin.bottom;

const DATA = require('data/json/population.json')

const DATA1 = require('data/json/production.json')

const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

const lineColor = 'lightblue';
const lineColor1 = 'violet';

//-----------------------message-----------------------//
var message = p
  .append('g')
  .html("En 2015, 7.8 milliards de tonnes de plastique avait été produit, <strong>soit plus d'une tonne de plastique pour chaque personne vivante. </strong>")
  // .attr('x', innerWidth / 2)
  // .attr('y', -10)
  .style("opacity", 0)

//-----------------------axis-----------------------//
// échelle pour l'axe X
const x = d3.scaleLinear()
  .range([0, innerWidth])
  .domain([d3.min(DATA, d => d.year), d3.max(DATA, d => d.year)]);

// échelle pour l'axe Y
const y = d3.scaleLinear()
  .range([innerHeight, 0])
  .domain([0, 8000000000])

// création de l'attribut "d" pour la première courbe
const linePathCreator = d3.line()
  .x(d => x(d.year))
  .y(d => y(d.population))


// création de l'attribut "d" pour la deuxième courbe
const linePathCreator1 = d3.line()
  .x(d => x(d.year))
  .y(d => y(d.tonnes))

// axe Y
g.append('g').call(d3.axisLeft(y)
  .tickFormat(d => `${d / 1000000000} milliards`)
  // le nombre de valeurs présentées
  .ticks(9))
  //épurer l'apparence de l'axe
  .selectAll('.domain, .tick line')
  .remove();


// axe X
g.append('g').call(d3.axisBottom(x)  .tickFormat(d => d)
)
  .attr('transform', `translate(0, ${innerHeight + 20})`)
  .select('.domain')
  .remove()
  


//-----------------------legends-----------------------//
var legend = g
  .append('text')
  .text('Population mondiale')
  .attr('fill', lineColor)
  .attr('x', 15)
  .attr('y', -10)
  .attr("class", "legend");

  var legend1 = g
  .append('text')
  .text('Production cumulée de plastique (en tonnes)')
  .attr('fill', lineColor1)
  .attr('x', 15)
  .attr('y', 10)
  .attr("class", "legend");

//-----------------------au clic-----------------------//

const run = d3.select("button")

run.on('click', () => {

  // ajouter la première courbe au svg
  const line = g.append('path')
    .attr("class", "line")
    .attr('d', linePathCreator(DATA))
    .attr('fill', 'none')
    .attr('stroke', lineColor)
    .style("stroke-width", 2);

  // ajouter la deuxième courbe au svg
  const line1 = g.append('path')
    .attr("class", "line")
    .attr('d', linePathCreator1(DATA1))
    .attr('fill', 'none')
    .attr('stroke', lineColor1)
    .style("stroke-width", 2);

  //-----------------------transition-----------------------//

  //transition du graph de population
  var linePathLength = line.node().getTotalLength();
  line
    .attr("stroke-dasharray", linePathLength)
    .attr("stroke-dashoffset", linePathLength)
    .transition()
    .duration(4000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);

  //transition du graph de production de plastique
  var linePathLength1 = line1.node().getTotalLength();
  line1
    .attr("stroke-dasharray", linePathLength1)
    .attr("stroke-dashoffset", linePathLength1)
    .transition()
    .duration(4000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);

  //apparition du message
  message
    .transition()
    .delay(4500)
    .duration(1000)
    .style("opacity", 1)
    .style("class", "year")
    .attr("fill", "white")
    .attr("class", "year");

});

//-----------------------hover-----------------------//

// retourne la valeur x la plus proche du positionnement de la souris
var bisect = d3.bisector(function (d) { return d.year; }).left;

// création des éléments qui vont s'afficher lors du hover
var focus = g
  .append('g')
  .append('circle')
  .style("fill", "none")
  .attr("stroke", lineColor)
  .attr('r', 8.5)
  .style("opacity", 0)
  .style("stroke-width", 2);

var focus1 = g
  .append('g')
  .append('circle')
  .style("fill", "none")
  .attr("stroke", lineColor1)
  .attr('r', 8.5)
  .style("opacity", 0)
  .style("stroke-width", 2);

var focusText = g
  .append('g')
  .append('text')
  .style("opacity", 0)
  .attr("text-anchor", "left")
  .attr("alignment-baseline", "middle")
  .attr("fill", "white")

var focusText1 = g
  .append('g')
  .append('text')
  .style("opacity", 0)
  .attr("text-anchor", "left")
  .attr("alignment-baseline", "middle")
  .attr("fill", "white")


var showYear = g
  .append('text')
  .attr('x', innerWidth / 2)
  .attr('y', -10)
  .style("opacity", 0)
  .style("class", "year")
  .attr("fill", "white")
  .attr("class", "year");

// rectangle par dessus le graph qui reconnaît la position de la souris
g
  .append('rect')
  .style("fill", "none")
  .style("pointer-events", "all")
  .attr('width', innerWidth)
  .attr('height', innerHeight)
  .on('mouseover', mouseover)
  .on('mousemove', mousemove)
  .on('mouseout', mouseout);

// apparition des éléments lors du mouseover
function mouseover() {
  focus.style("opacity", 1)
  focus1.style("opacity", 1)
  focusText.style("opacity", 1)
  focusText1.style("opacity", 1)
  showYear.style("opacity", 1)
}

function mousemove() {
  // insertion des données
  var x0 = x.invert(d3.mouse(this)[0]);
  var i = bisect(DATA, x0, 1);
  var i1 = bisect(DATA1, x0, 1);
  var selectedData = DATA[i];
  var selectedData1 = DATA1[i1];
  focus
    .attr("cx", x(selectedData.year))
    .attr("cy", y(selectedData.population))
  focusText
    .html("Population mondiale: " + (Math.round((selectedData.population / 1000000000) * 100) / 100) + " milliards")
    .attr("x", x(selectedData.year) + 15)
    .attr("y", y(selectedData.population))
  focus1
    .attr("cx", x(selectedData1.year))
    .attr("cy", y(selectedData1.tonnes))
  focusText1
    .html("Plastique: " + (Math.round((selectedData1.tonnes / 1000000000) * 100) / 100) + " milliards de tonnes")
    .attr("x", x(selectedData1.year) + 15)
    .attr("y", y(selectedData1.tonnes))
  showYear
    .text(selectedData.year)
}

// disparition des éléments lors du mouseout
function mouseout() {
  focus.style("opacity", 0)
  focusText.style("opacity", 0)
  focus1.style("opacity", 0)
  focusText1.style("opacity", 0)
  showYear.style("opacity", 0)
}