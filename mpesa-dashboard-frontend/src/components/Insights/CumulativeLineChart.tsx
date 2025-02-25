import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip);

const transactions = [
  { time: "2025-02-16 14:29:30", balance: 60, withdrawal: 0, paidIn: 600 },
  { time: "2025-02-16 14:29:31", balance: 0, withdrawal: 600, paidIn: 0 },
  { time: "2025-02-16 14:56:47", balance: 250, withdrawal: 0, paidIn: 500 },
  { time: "2025-02-16 14:56:47", balance: 100, withdrawal: 500, paidIn: 0 },
  { time: "2025-02-17 07:59:02", balance: 420, withdrawal: 0, paidIn: 520 },
  { time: "2025-02-17 07:59:02", balance: 0, withdrawal: 520, paidIn: 0 },
  { time: "2025-02-17 11:19:40", balance: 813, withdrawal: 700, paidIn: 713 },
  { time: "2025-02-17 20:57:58", balance: 20, withdrawal: 0, paidIn: 20 },
];

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

const CumulativeLineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const balanceGradient = ctx.createLinearGradient(0, 0, 0, 400);
    balanceGradient.addColorStop(0, "rgba(58, 123, 213, 0.5)");
    balanceGradient.addColorStop(1, "rgba(0, 210, 255, 0.2)");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: transactions.map((item) => formatDate(item.time)),
        datasets: [
          {
            label: "Balance Over Time",
            data: transactions.map((item) => item.balance),
            fill: true,
            backgroundColor: balanceGradient,
            borderColor: "#3A7BD5",
            pointBackgroundColor: "#fff",
            pointBorderColor: "#3A7BD5",
            tension: 0.4, // Smooth curve
            borderWidth: 2,
            borderJoinStyle: "round", // Round joins between segments
            borderCapStyle: "round", // Round line caps
            pointRadius: 5, // Adjust point size for a rounded look
            pointHoverRadius: 7
          },
          {
            label: "Withdrawals",
            data: transactions.map((item) => item.withdrawal),
            fill: false,
            borderColor: "#FF4500",
            pointBackgroundColor: "#FF4500",
            pointBorderColor: "#FF4500",
            tension: 0.4,
          },
          {
            label: "Paid In",
            data: transactions.map((item) => item.paidIn),
            fill: false,
            borderColor: "#32CD32",
            pointBackgroundColor: "#32CD32",
            pointBorderColor: "#32CD32",
            tension: 0.4,
            borderJoinStyle: "round", // Round joins between segments
            borderCapStyle: "round", // Round line caps
            pointRadius: 5, // Adjust point size for a rounded look
            pointHoverRadius: 7
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 5,
              color: "#ffffff",
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.02)",
            },
          },
        },
      },
    });

    return () => chartInstance.current.destroy();
  }, []);

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
