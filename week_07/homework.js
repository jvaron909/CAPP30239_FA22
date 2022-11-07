(function voronoi() {
   let height = 400,
      width = 800,
      margin = ({ top: 25, right: 30, bottom: 35, left: 40 });
    
    
   const svg = d3.select("#stacked-chart")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
    
    d3.csv("count_by_race_by_gender.csv").then( data => {
    
      let x = d3.scaleBand(data.map(d => (d.Race)),[margin.left, width - margin.right]);

      let y = d3.scaleLinear([0,800],[height - margin.bottom, margin.top]);

      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))
      
      //protein,carbs,fiber
      const subgroups = data.columns.slice(1);

      const color = d3.scaleOrdinal(subgroups,['#e41a1c','#377eb8','#4daf4a']);
    
      const stackedData = d3.stack()
        .keys(subgroups)(data)
    
      svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d)
        .join("rect")
        .attr("x", d => x(d.data.Race))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width",x.bandwidth())

      // Manual legend
      svg.append("circle").attr("cx",10).attr("cy",10).attr("r", 6).style("fill", "#e41a1c")
      svg.append("circle").attr("cx",110).attr("cy",10).attr("r", 6).style("fill", "#377eb8")
      svg.append("text")
      .attr("x", 20)
      .attr("y", 10)
      .text("Female")
      .style("font-size", "15px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 130).attr("y", 10).text("Male").style("font-size", "15px").attr("alignment-baseline","middle")

    });
   })();