/* Bar chart of branches */

d3.csv("library_visits_jan22.csv").then(data => {
    
    
    for (let d of data) {
        d.num = +d.num; //To treat the column num as numbers
    };

    /* Defining the size of the chart */
    const height = 600,
          width = 800,
          margin = ({top: 25, right: 30, bottom:35, left: 50});

    let svg = d3.select("#chart")
                .append("svg")
                .attr("viewBox", [0, 0, width, height]);

    /* Assigning data to the axis */
    let x = d3.scaleBand()
                .domain(data.map(d => d.branch))
                .range([margin.left, width - margin.right])
                .padding(0.1);

    let y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.num)]).nice()
                .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
          .attr("transform", `translate( 0, ${height -margin.bottom +5})`)
          .call(d3.axisBottom(x));

    const yAxis = g => g
          .attr("transform", `translate(${margin.left -5}, 0)`)
          .call(d3.axisLeft(y));

    svg.append("g")
       .call(xAxis);

    svg.append("g")
       .call(yAxis);

    /* Creating the bars */   
    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect")
       .attr("fill", "steelblue")
       .attr("x", d=> x(d.branch))
       .attr("width", x.bandwidth())
       .attr("y", d=> y(d.num))
       .attr("height", d => y(0) - y(d.num));

    bar.append('text')// including labels
       .text(d => d.num)
       .attr('x', d => x(d.branch) + (x.bandwidth()/2))
       .attr('y', d => y(d.num + 15))
       .attr('text-anchor', 'middle')
       .style('fill', 'black')

});