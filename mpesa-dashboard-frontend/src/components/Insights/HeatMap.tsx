import { useEffect, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import * as d3 from "d3";

const activityData = [
  { date: "2025-01-01", count: 5 },
  { date: "2025-01-15", count: 10 },
  { date: "2025-02-05", count: 3 },
  { date: "2025-02-20", count: 8 },
  { date: "2025-03-10", count: 15 },
  { date: "2025-04-25", count: 20 },
];

const Heatmap = () => {
  const ref = useRef();

  useEffect(() => {
    const width = "100%";
    const height = "100%";
    const cellSize = 15;
    const monthSpacing = 15; // Space between months
    const months = d3.timeMonths(new Date("2025-01-01"), new Date("2026-01-01"));

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40,20)");

    const colorScale = d3
      .scaleLinear()
      .domain([0, d3.max(activityData, (d) => d.count)])
      .range(["#ebedf0", "#216e39"]);

    const parseDate = d3.timeParse("%Y-%m-%d");
    const formattedData = new Map(
      activityData.map((d) => [parseDate(d.date).toISOString().split("T")[0], d.count])
    );

    const days = d3.timeDays(new Date("2025-01-01"), new Date("2026-01-01"));

    let currentMonth = -1;
    let xOffset = 0;
    let monthOffsets = {}; // Store offsets for month labels

    svg
      .selectAll(".day")
      .data(days)
      .enter()
      .append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("rx", 4) // Rounded corners
      .attr("ry", 4)
      .attr("x", (d) => {
        const month = d.getMonth();
        if (month !== currentMonth) {
          xOffset += 3; // Add space between months
          currentMonth = month;
          monthOffsets[month] = xOffset; // Store position for labels
        }
        return d3.timeWeek.count(d3.timeYear(d), d) * (cellSize + 2) + xOffset;
      })
      .attr("y", (d) => d.getDay() * (cellSize + 2))
      .attr("fill", (d) => colorScale(formattedData.get(d.toISOString().split("T")[0]) || 0))
      .append("title")
      .text((d) => `${d.toISOString().split("T")[0]}: ${formattedData.get(d.toISOString().split("T")[0]) || 0} transactions`);

    svg
      .selectAll(".month-label")
      .data(months)
      .enter()
      .append("text")
      .attr("class", "month-label")
      .attr("x", (d) => {
        const month = d.getMonth();
        return (monthOffsets[month] || 0) + d3.timeWeek.count(d3.timeYear(d), d) * (cellSize + 2);
      })
      .attr("y", -5)
      .text((d) => d3.timeFormat("%b")(d))
      .attr("fill", "#fff")
      .style("font-size", "12px")
      .style("font-weight", "bold");

  }, []);

  return (
    <Box
      w="100%"
      py={5}
      px={0}
      bgGradient="linear(to-r, #1a1a2e, gray.800)"
      border="1px solid rgba(255,255,255,0.1)"
      borderRadius="lg"
      boxShadow="0 0 20px rgba(0, 255, 30, 0.1)"
      backdropFilter="blur(10px)"
      overflowX="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={6} // Space between heatmap & transaction box
    >
      {/* Heatmap */}
      <Box minW="800px">
        <svg ref={ref}></svg>
      </Box>
    </Box>

  );
};

export default Heatmap;
