import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = ({ data, width = 500, height = 300 }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous drawings

    // Increase margins to add more space between graph and labels
    const margin = { top: 20, right: 30, bottom: 50, left: 50 }; // Increased bottom and left margin for padding
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create xScale for date range and format the dates
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date)))
      .range([0, innerWidth]);

    // Calculate the maximum value of y and round it up to the nearest multiple of $500
    const maxY = Math.ceil(d3.max(data, (d) => d.value) / 500) * 500;

    // Create yScale for currency values, ensuring it increments by $500
    const yScale = d3
      .scaleLinear()
      .domain([0, maxY]) // Domain ends at the rounded maxY
      .nice()
      .range([innerHeight, 0]);

    const line = d3
      .line()
      .x((d) => xScale(new Date(d.date)))
      .y((d) => yScale(d.value))
      .curve(d3.curveLinear);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add horizontal grid lines
    g.append("g")
      .selectAll("line")
      .data(yScale.ticks()) // Generate ticks based on yScale
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "#ddd");

    // X-axis: format the dates as M/DD (but don't show the axis line or ticks)
    g.append("g")
      .attr("transform", `translate(0,${innerHeight + 10})`) // Add some padding below the graph for the X-axis labels
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat("%m/%d")).tickSize(0)); // Remove ticks
    g.select(".domain").remove(); // Remove the X-axis line (domain)

    // Y-axis: display currency in increments of $500 (but don't show the axis line or ticks)
    g.append("g")
      .attr("transform", `translate(-10,0)`) // Add some padding to the left of the graph for the Y-axis labels
      .call(d3.axisLeft(yScale)
        .tickFormat((d) => {
          // Format numbers larger than 1000 with "k"
          if (d >= 1000) {
            return `$${(d / 1000).toFixed(1)}k`;
          }
          return `$${d}`;
        })
        .tickSize(0)) // Remove ticks
      .select(".domain") // Remove the axis line (domain)
      .remove();

    // Add the line path
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add smaller dots for each value on the line
    g.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(new Date(d.date)))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 3) // Reduced size of the dot (radius set to 3)
      .attr("fill", "steelblue")
      .attr("stroke", "black") // Optional: add a black border for bold effect
      .attr("stroke-width", 1); // Optional: reduce the border width
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default LineChart;
