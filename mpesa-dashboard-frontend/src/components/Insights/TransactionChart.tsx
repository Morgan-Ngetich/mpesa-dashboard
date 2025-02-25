import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Box } from "@chakra-ui/react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionChart = () => {
  const data = {
    labels: [
      "Cash Out", "Send Money", "B2C Payment", "Pay Bill", "Cash In", "OD Payment Transfer",
      "KenyaRecharge", "ODRepayment", "Customer Merchant Payment", "Customer Airtime Purchase", "Customer Bundle Purchase"
    ],
    datasets: [
      {
        label: "Paid In",
        data: [
          8252.33, 90751.27, 44400.00, 355.00, 6100.00, 5000.00, 50.00, 0.00, 900.00, 40.00, 647.00
        ],
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Paid Out",
        data: [
          28081.00, 83563.00, 0.00, 16065.00, 0.00, 0.00, 50.00, 22171.67, 10772.25, 150.00, 2226.00
        ],
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
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: "Transaction Summary",
        color: "#ffffff",
        font: {
          size: 18
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
          maxRotation: 45,
          minRotation: 45,
          callback: function (value, index, values) {
            return value.length > 10 ? value.substring(0, 10) + "..." : value;
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.05)"
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff"
        },
        grid: {
          color: "rgba(255, 255, 255, 0.05)"
        }
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
