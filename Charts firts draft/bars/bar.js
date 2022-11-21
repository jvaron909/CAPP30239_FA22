  // Copyright 2022 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@armanrahman/2012-2018-agricultural-land-in-five-continents


d3.csv('bars/bars.csv').then(data => {


  //const svg = d3.select(DOM.svg(width, height));

  groupKey = data.columns[0]
  keys = data.columns.slice(1)
  const height = 200,
    width = 400,
    margin = ({top: 20, right: 80, bottom: 20, left: 20});

  yAxis = g => g
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

  xAxis = g => g
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x0).tickSizeOuter(0))
  .call(g => g.select(".domain").remove())

  color = d3.scaleOrdinal()
    .range(["#82c3d3", "#d1848d", "#8697cf", "#c0bc95", "#b092c3", "#cbad8a"])

  y = d3.scaleLinear()
  .domain([0, 50])
  .rangeRound([height - margin.bottom, margin.top])

  x0 = d3.scaleBand()
  .domain(data.map(d => d[groupKey]))
  .rangeRound([margin.left, width - margin.right])
  .paddingInner(0.1)

  x1 = d3.scaleBand()
    .domain(keys)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05)

  legend = svg => {
    const g = svg
      .attr("transform", `translate(${width},0)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 8)
      .selectAll("g")
      .data(color.domain().slice().reverse())
      .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);
  
    g.append("rect")
      .attr("x", -10)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color);
  
    g.append("text")
      .attr("x", -14)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .attr("font-weight", 0.00001)
      .text(d => d);
  }

  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
    .selectAll("rect")
    .data(d => keys.map(key => ({key, value: d[key]})))
    .join("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.key));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .call(legend);
  
});