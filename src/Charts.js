
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';


const useD3 = (renderChartFn, dependencies) => {
    const ref = useRef();
  
    useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
  }
  
  export const LineChart = (props) => {
    
    const ref = useD3(
      (svg) => {
        const height = 500;
        const width = 1000;
        const margin = { top: 40, right: 30, bottom: 60, left: 40 };
  
        const x = d3
          .scaleBand()
          .domain(props.data.map((d) => d.name))
          .range([0, width])
          .padding(0.1);
  
        const y1 = d3
          .scaleLinear()
          .domain([0, d3.max(props.data, (d) => d.size)])
          .rangeRound([height - margin.bottom, margin.top]);
  
        const xAxis = (g) =>
          g.attr("transform", `translate(0,${height - margin.bottom})`).call(
            d3
              .axisBottom(x)
              .tickValues(
                d3
                  .ticks(...d3.extent(x.domain()), width / 40)
                  .filter((v) => x(v) !== undefined)
              )
              .tickSizeOuter(0)
          );
  
        const y1Axis = (g) =>
          g
            .attr("transform", `translate(${margin.left},0)`)
            .style("color", "steelblue")
            .call(d3.axisLeft(y1).ticks(null, "s"))
            .call((g) => g.select(".domain").remove())
            .call((g) =>
              g
                .append("text")
                .attr("x", -margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(props.data.name)
            );
  
        svg.select(".x-axis").call(xAxis);
        svg.select(".y-axis").call(y1Axis);

        svg.append("path")
        .datum(props.data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d[props.x]) })
          .y(function(d) { return y1(d.size) })
          )
  
  
        // svg
        //   .select(".plot-area")
        //   .attr("fill", "steelblue")
        //   .selectAll(".bar")
        //   .data(props.data)
        //   .join("rect")
        //   .attr("class", "bar")
        //   .attr("x", (d) => x(d.name))
        //   .attr("width", x.bandwidth())
        //   .attr("y", (d) => y1(d.size))
        //   .attr("height", (d) => y1(0) - y1(d.size));
      },
      [props.data.length]
    );
  
    return (
      <svg
        ref={ref}
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    );
  }
  
  