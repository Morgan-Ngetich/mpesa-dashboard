import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Box } from "@chakra-ui/react";
import { Transaction } from "../../services/api";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);

const categories = [
  "Cash Out", "Send Money", "B2C Payment", "Pay Bill", "Cash In", "OD Payment Transfer",
  "KenyaRecharge", "ODRepayment", "Customer Merchant Payment", "Customer Airtime Purchase", "Customer Bundle Purchase"
];

interface TransactionChartProps {
  transactions: Transaction[]
}
const TransactionChart: React.FC<TransactionChartProps> = ({ transactions }) => {

  // Initialize category sums
  const categorySums: Record<string, { paidIn: number; withdrawn: number }> = {};

  // Process transaction data
  transactions.forEach(({ details, paid_in, withdraw }) => {
    const paidInAmount = Number(paid_in) || 0;
    const withdrawnAmount = Number(withdraw) || 0;

    if (!categorySums[details]) {
      categorySums[details] = { paidIn: 0, withdrawn: 0 };

      if (!categories.includes(details)) {
        categories.push(details);
      }
    }

    categorySums[details].paidIn += paidInAmount;
    categorySums[details].withdrawn += withdrawnAmount;
  });

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Paid In",
        data: categories.map(category => categorySums[category]?.paidIn || 0),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Withdrawn",
        data: categories.map(category => categorySums[category]?.withdrawn || 0),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: "rgba(255, 99, 132, 1)",
      }
    ]
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 500 },
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#ffffff",
        font: { size: 14 }
      }
    },
    title: {
      display: true,
      text: "Transaction Summary",
      color: "#ffffff",
      font: { size: 18 }
    },
    zoom: {
      pan: { 
        enabled: true, 
        mode: "x" as const  // ✅ Explicitly typed as "x"
      },
      zoom: {
        wheel: { enabled: true, modifierKey: "ctrl" as const },
        pinch: { enabled: true },
        drag: { enabled: true, threshold: 10 },
        mode: "x" as const,  // ✅ Explicitly typed as "x"
        limits: { x: { min: "original", max: "original" }, y: { min: "original", max: "original" } }
      }
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#ffffff",
        maxRotation: 45,
        minRotation: 45,
        callback: (value: string | number) => {
          const label = String(value);
          return label.length > 10 ? `${label.substring(0, 10)}...` : label;
        },
      },
      grid: { color: "rgba(255, 255, 255, 0.05)" }
    },
    y: {
      beginAtZero: true,
      ticks: { color: "#ffffff" },
      grid: { color: "rgba(255, 255, 255, 0.05)" }
    }
  }
};


  return (
    <Box
      bgGradient="linear(to-r, #1a1a2e, gray.800)"
      border="1px solid rgba(255,255,255,0.1)"
      borderRadius="lg"
      boxShadow="0 0 20px rgba(0, 255, 30, 0.1)"
      backdropFilter="blur(10px)"
      p={4}
      width="100%"
      height="500px"
    >
      <Bar data={data} options={options} />
    </Box>
  );
};

export default TransactionChart;
