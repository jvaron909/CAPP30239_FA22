/* D3 Line Chart */

const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('long-term-interest-canada.csv').then(data => {
    let timeParse = d3.timeParse("%Y-%m")
    


    for (let d of data) {
        d.Num = +d.Num;//To treat the column Num as numbers
        d.Month = timeParse(d.Month);//To treat Month as a time var
    };

/* Assigning data to the axis */
    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Month))
        .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Num)])
        .range([height - margin.bottom, margin.top])

/* Defining axis */    
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
        .tickSizeOuter(0)
        .tickFormat(d => d + "%")
        .tickSize(-width));

/* Including labels */ 
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Year");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

/* Creating the line */
      let line = d3.line()
        .x(d => x(d.Month))
        .y(d => y(d.Num));

    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");

  });