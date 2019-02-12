import { select, selectAll } from "d3-selection";
import 'd3-transition';
import { scaleBand, scaleLinear, scaleTime } from "d3-scale";
import { avgTemp} from "./barchart.data";
import { axisBottom, axisLeft } from "d3-axis";

const d3 = {
  select, selectAll, scaleBand, scaleLinear, scaleTime, axisBottom, axisLeft
};

const width = 500;
const height = 300;
const padding = 100;

// Creamos la tarjeta.
const card = select("#root")
  .append("div")
    .attr("class", "card");

// Creamos el 'lienzo' svg.
const svg = card
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `${-padding} ${-padding} ${width + 2*padding} ${height + 2*padding}`);

const scaleYPos = d3.scaleLinear()
  .domain([0, 30])
  .range([height, 0]);

  
const scaleXPos = d3.scaleBand()
  .domain(avgTemp.map((s) => s.month))// Range Jan to Dec 2019
  .range([0, width]); // pixels


const barGroup = svg
  .append('g');

barGroup
.selectAll('rect')
.data(avgTemp)
.enter()
.append("rect")
  .attr('x', (g) => scaleXPos(g.month))
  .attr('y', (g) =>  scaleYPos(g.temp))
  .attr("width","40px")
  .attr("height", d => height - scaleYPos(d.temp))
  .attr("fill", "url(#barGradient)");

// Y Axis: call axisLeft helper and pass the scale
barGroup
  .append("g").call(d3.axisLeft(scaleYPos));

// X axis:
barGroup
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(scaleXPos))
  .selectAll("text")
    .attr("transform", "rotate(90)")
    .attr("x", "10")
    .attr("y", "-5")
    .style("text-anchor", "start");

barGroup
    .append("text")
    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ (-40) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
    .text("Temperatura");

    barGroup
    .append("text")
    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ (width/2) +","+(380)+")")  // centre below axis
    .text("Meses 2018");

// OPTIONAL
// Gradient fill for the bars.
const gradient = svg
.append("defs")
  .append("linearGradient")
    .attr("id", "barGradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", "0")
    .attr("y1", height)
    .attr("x2", "0")
    .attr("y2", "0");
gradient
.append("stop")
  .attr("offset", "0")
  .attr("stop-color", "blue");
gradient
.append("stop")
  .attr("offset", "15%")
  .attr("stop-color", "magenta");
gradient
.append("stop")
  .attr("offset", "70%")
  .attr("stop-color", "yellow");

