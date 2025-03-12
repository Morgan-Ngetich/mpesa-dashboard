import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import * as d3 from "d3";
import { Transaction } from "../../services/api";


interface HeatmapProps {
  transactions: Transaction[]
}

const Heatmap: React.FC<HeatmapProps> = ({ transactions = [] }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current || transactions.length === 0) return;

    const transactionCounts = transactions.reduce<Record<string, number>>(
      (acc, transaction) => {
        const date = transaction.completion_time.split(" ")[0]; // Extract YYYY-MM-DD
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {}
    );

    const activityData = Object.keys(transactionCounts).map((date) => ({
      date,
      count: transactionCounts[date],
    }));

    const width = 900;
    const height = 150;
    const cellSize = 15;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const parseDate = d3.timeParse("%Y-%m-%d");

    const formattedData = new Map(
      activityData.map((d) => [
        parseDate(d.date)?.toISOString().split("T")[0] ?? "",
        d.count,
      ])
    );

    const colorScale = d3
      .scaleSequential(d3.interpolateRgb("#ffffff", "#007324"))
      .domain([0, d3.max(activityData, (d) => d.count) || 1])

    const days = d3.timeDays(new Date("2025-01-01"), new Date("2026-01-01"));

    svg
      .selectAll(".day")
      .data(days)
      .join("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr(
        "x",
        (d) => d3.timeWeek.count(d3.timeYear(d), d) * (cellSize + 2)
      )
      .attr("y", (d) => d.getDay() * (cellSize + 2))
      .attr("fill", (d) =>
        colorScale(formattedData.get(d.toISOString().split("T")[0]) || 0)
      )
      .append("title")
      .text(
        (d) =>
          `${d.toISOString().split("T")[0]}: ${
            formattedData.get(d.toISOString().split("T")[0]) || 0
          } transactions`
      );
  }, [transactions]);

  return (
    <Box
      w="100%"
      py={5}
      px={0}
      overflowX="auto"
      display="flex"
      justifyContent="center"
      bgGradient="linear(to-r, #1a1a2e, gray.800)"
      border="1px solid rgba(255,255,255,0.1)"
      borderRadius="lg"
      boxShadow="0 0 20px rgba(0, 255, 30, 0.1)"
      backdropFilter="blur(10px)"
    >
      <Box minW="800px">
        <svg ref={ref}></svg>
      </Box>
    </Box>
  );
};

export default Heatmap;
