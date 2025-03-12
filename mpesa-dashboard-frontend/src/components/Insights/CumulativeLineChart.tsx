import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Transaction } from "../../services/api";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, zoomPlugin);

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  // Format: MM/DD HH:MM
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

interface CumulativeLineChartProps {
  transactions: Transaction[];
}

const CumulativeLineChart: React.FC<CumulativeLineChartProps> = ({ transactions = [] }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const balanceGradient = ctx.createLinearGradient(0, 0, 0, 400);
    balanceGradient.addColorStop(0, "rgba(58, 123, 213, 0.5)");
    balanceGradient.addColorStop(1, "rgba(0, 210, 255, 0.2)");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: transactions.map((item) => formatDate(item.completion_time)),
        datasets: [
          {
            label: "Balance Over Time",
            data: transactions.map((item) => Number(item.balance)),
            fill: true,
            backgroundColor: balanceGradient,
            borderColor: "#3A7BD5",
            pointBackgroundColor: "#fff",
            pointBorderColor: "#3A7BD5",
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
          {
            label: "Withdrawals",
            data: transactions.map((item) => Number(item.withdraw)),
            fill: false,
            borderColor: "#FF4500",
            pointBackgroundColor: "#FF4500",
            pointBorderColor: "#FF4500",
            tension: 0.4,
          },
          {
            label: "Paid In",
            data: transactions.map((item) => Number(item.paid_in)),
            fill: false,
            borderColor: "#32CD32",
            pointBackgroundColor: "#32CD32",
            pointBorderColor: "#32CD32",
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 500,
        },
        plugins: {
          legend: {
            display: true,
          },
          zoom: {
            pan: {
              enabled: true,
              mode: "x",
            },
            zoom: {
              wheel: {
                enabled: true,
                modifierKey: "ctrl" as const, // Hold Ctrl to zoom\n                speed: 0.3,
              },
              pinch: {
                enabled: true,
              },
              drag: {
                enabled: true,
                threshold: 5,
              },
              mode: "x",
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 5,
              color: "#ffffff",
              callback: (value) => (typeof value === "string" && value.length > 10 ? value.substring(0, 10) + "..." : value),
            },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(255, 255, 255, 0.02)" },
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [transactions]);

  return (
    <Box
      w="100%"
      h="100%"
      bgGradient="linear(to-r, #1a1a2e, gray.800)"
      border="1px solid rgba(255,255,255,0.1)"
      borderRadius="lg"
      boxShadow="0 0 20px rgba(0, 255, 30, 0.1)"
      backdropFilter="blur(10px)"
      p={4}
    >
      <canvas ref={chartRef}></canvas>
    </Box>
  );
};

export default CumulativeLineChart;
