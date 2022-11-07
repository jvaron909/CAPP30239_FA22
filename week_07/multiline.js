let height = 500,
    width = 800,
    margin = ({ top: 25, right: 30, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

const svg = d3.select("#multiline-chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv("by_month.csv").then(data => {
  let timeParse = d3.timeParse("%Y-%m");
  let races = new Set();

  for (let d of data) {
    d.month = timeParse(d.month);
    d.count = +d.count;
    races.add(d.Race);
  }

  console.log(data)

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.month))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.count))
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d));

  let line = d3.line()
    .x(d => x(d.month))
    .y(d => y(d.count));
 
  for (let race of races) {
    let raceData = data.filter(d => d.Race === race);

    let g = svg.append("g")
      .attr("class", "race")
      .on('mouseover', function () {
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    if (race === "Chicago") {
      g.classed("highlight", true);
    }

    g.append("path")
      .datum(raceData)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", line)

    let lastEntry = raceData[raceData.length - 1]; //last piece of data to position text x and y

    g.append("text")
      .text(race)
      .attr("x", x(lastEntry.month) + 3)
      .attr("y", y(lastEntry.count))
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }
  
});