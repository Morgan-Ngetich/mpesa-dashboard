import { Box, Text, Flex, Grid, Icon } from "@chakra-ui/react";
import TransactionChart from "./TransactionChart";
import CumulativeLineChart from "./CumulativeLineChart";
import Heatmap from "./HeatMap";
import TotalTransactions from "./TotalTranscations";


const Insights = () => {
  const Insights = [
    { type: "Cash Out", paidIn: 8252.33, paidOut: 28081.0 },
    { type: "Send Money", paidIn: 90751.27, paidOut: 83563.0 },
    { type: "B2C Payment", paidIn: 44400.0, paidOut: 0.0 },
    { type: "Pay Bill", paidIn: 355.0, paidOut: 16065.0 },
    { type: "Cash In", paidIn: 6100.0, paidOut: 0.0 },
    { type: "OD Payment Transfer", paidIn: 5000.0, paidOut: 0.0 },
    { type: "KenyaRecharge", paidIn: 50.0, paidOut: 50.0 },
    { type: "ODRepayment", paidIn: 0.0, paidOut: 22171.67 },
    { type: "Customer Merchant Payment", paidIn: 900.0, paidOut: 10772.25 },
    { type: "Customer Airtime Purchase", paidIn: 40.0, paidOut: 150.0 },
    { type: "Customer Bundle Purchase", paidIn: 647.0, paidOut: 2226.0 },
  ];

  const leftTransactions = Insights.slice(0, 9);
  const rightTransactions = Insights.slice(9);

  const totalPaidIn = Insights.reduce((sum, t) => sum + t.paidIn, 0);
  const totalPaidOut = Insights.reduce((sum, t) => sum + t.paidOut, 0);

  return (
    <Box>

      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Box flex="1">
          <TransactionChart />
        </Box>
        <Box flex="1">
          <CumulativeLineChart />
        </Box>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }} // Column on small screens, row on larger
        align="center"
        justify="center"
        gap={4}
        overflowX="auto" // Enables horizontal scrolling if needed
        w="100%"
        mt={5}
      >
        {/* Heatmap */}
        <Heatmap />


        <TotalTransactions />

      </Flex>


    </Box>
  );
};

export default Insights;
