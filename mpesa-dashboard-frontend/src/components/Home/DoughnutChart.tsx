import { Box, Text, VStack, HStack, Flex } from "@chakra-ui/react"
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

// ✅ Register the Plugin Explicitly
const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart: any) => {
    const { width, height } = chart;
    const ctx = chart.ctx;

    if (!ctx) return; // Ensure ctx is available

    ctx.save();

    // 🎨 Text Content
    const line1 = "Total Expense";
    const line2 = "79,000 /=";

    // 📍 Font Styling
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#333"; // Text color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 📍 Adjust Positioning (Centered)
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.fillText(line1, centerX, centerY - 10); // Upper line
    ctx.font = "bold 20px Arial"; // Slightly larger for second line
    ctx.fillText(line2, centerX, centerY + 15); // Lower line

    ctx.restore();
  },
};


// 🎨 Doughnut Chart Data
const doughnutData = {
  labels: ["Received", "Spent", "Balance", "Total"],
  datasets: [
    {
      data: [50000, 40000, 25000, 70000],
      backgroundColor: ["rgba(125, 15, 64, 0.2)", "rgba(15, 86, 125, 0.2)", "rgba(15, 125, 64, 0.2)", "rgba(121, 125, 15, 0.19)"],
      hoverBackgroundColor: ["#7d0f40", "#0f567d", "#0f7d40", "#797d0f"],
      hoverOffset: 15,
      borderWidth: 4,
      borderColor: "#ffffff",
      borderRadius: 15,
    },
  ],
};

const options = {
  responsive: true,
  cutout: "70%", // Controls thickness
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#333",
      borderRadius: 8, // Fix border radius
      titleColor: "#fff",
      bodyColor: "#ddd",
      padding: 10,
      borderColor: "#ffffff",
      borderWidth: 1,
    },
  },
  animation: {
    animateScale: true,
    animateRotate: true,
  },
};
const DoughnutChart = () => {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Financial Overview
      </Text>

      <Flex align="center" justify="space-between">
        {/* Doughnut Chart on the Left */}
        <Box width="250px" height="250px">
          <Doughnut data={doughnutData} options={options} plugins={[centerTextPlugin]} />
        </Box>

        {/* Summary on the Right */}
        <VStack align="start" spacing={3}>
          <HStack>
            <Box w={4} h={4} bg="#797d0f" borderRadius="full" />
            <Text fontSize="sm">Spent</Text>
          </HStack>
          <HStack>
            <Box w={4} h={4} bg="#0f7d40" borderRadius="full" />
            <Text fontSize="sm">Received</Text>
          </HStack>
          <HStack>
            <Box w={4} h={4} bg="#0f567d" borderRadius="full" />
            <Text fontSize="sm">Balance</Text>
          </HStack>
          <HStack>
            <Box w={4} h={4} bg="#7d0f40" borderRadius="full" />
            <Text fontSize="sm">Balance</Text>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}

export default DoughnutChart