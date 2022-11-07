/* D3 Line Chart */

let height = 400,
width = 800,
margin = ({ top: 0, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('by_month.csv').then(data => {
    let timeParse = d3.timeParse("%Y-%m")
    
    for (let d of data) {
        d.Value = +d.Value; //force a number
        d.month = timeParse(d.month);
    };
    
    console.log(data);

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.month))
        .range([margin.left, width - margin.right ]);

    let y = d3.scaleLinear()
        .domain([100, d3.max(data, d => d.Value)])
        .range([height - margin.bottom, margin.top])



   // TYPE HERE
    
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
        .tickSizeOuter(0)
        .tickFormat(d => d)
        .tickSize(-width));

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "em") 
      .text("Month")
      .style("font-size", "15px");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Number of Victims")
      .style("font-size", "15px");

      let line = d3.line()
        .x(d => x(d.month))
        .y(d => y(d.Value));

    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");


  });