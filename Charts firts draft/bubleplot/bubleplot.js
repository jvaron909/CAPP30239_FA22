  // Copyright the d3 graph gallery 2018
  //  https://d3-graph-gallery.com/graph/bubble_template.html

// set the dimensions and margins of the graph
var margin = {top: 40, right: 150, bottom: 60, left: 30},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bubleplot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv('bubleplot/meetings_by_year.csv').then(data => {

    for (let d of data) {
        d.budget_prop_year = +d.budget_prop_year;//To treat the column Num as numbers
        d.total_agenda = +d.total_agenda;
        d.count = +d.count;
    };

  // ---------------------------//
  //       AXIS  AND SCALE      //
  // ---------------------------//


  console.log(data)
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 2500000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(3));

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+50 )
      .text("Assigned budget");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 34])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -20 )
      .text("Number of meetings")
      .attr("text-anchor", "start")

  // Add a scale for bubble size
  var z = d3.scaleSqrt()
    .domain([0, 2000])
    .range([ 10, 50]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(["2019", "2020", "2021", "2022"])
    //.domain(["Committee on Aviation","Committee on Budget and Government Operations","Committee on Committees and Rules","Committee on Contracting Oversight and Equity","Committee on Economic, Capital and Technology Development","Committee on Education and Child Development","Committee on Environmental Protection and Energy","Committee on Ethics and Government Oversight","Committee on Finance","Committee on Health and Human Relations","Committee on Housing and Real Estate","Committee on Immigrant and Refugee Rights","Committee on License and Consumer Protection","Committee on Pedestrian and Traffic Safety","Committee on Public Safety","Committee on Special Events, Cultural Affairs and Recreation","Committee on Transportation and Public Way","Committee on Workforce Development","Committee on Zoning, Landmarks and Building Standards"])
    .range(d3.schemeSet2);


  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("#bubleplot")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(event, d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html(`Committee: ${d.committee}<br />Year: ${d.year}<br />Projects discussed: ${d.total_agenda}`)
      .style("top", (d.pageY - 30) + "px")
      .style("left", (d.pageX + 30) + "px");
      //.style("top", (event.pageY - 10) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
    .style("top", (d.pageY - 30) + "px")
    .style("left", (d.pageX + 30) + "px");
  }
  var hideTooltip = function(event, d) {
    tooltip
      .transition()
      .duration(1000)
      .style("opacity", 0)
  }


  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function(d){
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", .05)
    // expect the one that is hovered
    d3.selectAll(".group_" + d).style("opacity", 1);
    //d3.selectAll(".bubbles" + d.year).style("opacity", .01) 
  }
  
  // And when it is not hovered anymore
  var noHighlight = function(d){
    d3.selectAll(".bubbles").style("opacity", 1)
  }


  // ---------------------------//
  //       CIRCLES              //
  // ---------------------------//

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      //.attr("class", function(d) { return "bubbles " + group_${d.year}})
      .attr("class", function(d) { return "bubbles " + d.year })
      .attr("cx", function (d) { return x(d.budget_prop_year); } )
      .attr("cy", function (d) { return y(d.count); } )
      .attr("r", function (d) { return z(d.total_agenda); } )
      .style("fill", function (d) { return myColor(d.year); } )
    // -3- Trigger the functions for hover
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )



    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

    // Add legend: circles
    var valuesToShow = [0, 500, 2000]
    var xCircle = 750
    var xLabel = 820
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d){ return height - 100 - z(d) } )
        .attr("r", function(d){ return z(d) })
        .style("fill", "none")
        .attr("stroke", "black")

    // Add legend: segments
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("line")
        .attr('x1', function(d){ return xCircle + z(d) } )
        .attr('x2', xLabel)
        .attr('y1', function(d){ return height - 100 - z(d) } )
        .attr('y2', function(d){ return height - 100 - z(d) } )
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
        .attr('x', xLabel)
        .attr('y', function(d){ return height - 100 - z(d) } )
        .text( function(d){ return d } )
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')

    // Legend title
    svg.append("text")
      .attr('x', xCircle)
      .attr("y", height - 100 +30)
      .text("Number of legislative items discussed")
      .attr("text-anchor", "middle")

    // Add one dot in the legend for each name.
    var size = 20
    var allgroups = ["2019", "2020", "2021", "2022"]
    //var allgroups = ["Committee on Aviation","Committee on Budget and Government Operations","Committee on Committees and Rules","Committee on Contracting Oversight and Equity","Committee on Economic, Capital and Technology Development","Committee on Education and Child Development","Committee on Environmental Protection and Energy","Committee on Ethics and Government Oversight","Committee on Finance","Committee on Health and Human Relations","Committee on Housing and Real Estate","Committee on Immigrant and Refugee Rights","Committee on License and Consumer Protection","Committee on Pedestrian and Traffic Safety","Committee on Public Safety","Committee on Special Events, Cultural Affairs and Recreation","Committee on Transportation and Public Way","Committee on Workforce Development","Committee on Zoning, Landmarks and Building Standards"]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 750)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add labels beside legend dots
    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 750 + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return myColor(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
  });