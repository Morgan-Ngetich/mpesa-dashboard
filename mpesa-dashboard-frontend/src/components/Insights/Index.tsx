import { Box, Flex } from "@chakra-ui/react";
import TransactionChart from "./TransactionChart";
import CumulativeLineChart from "./CumulativeLineChart";
import Heatmap from "./HeatMap";
import TotalTransactions from "./TotalTranscations";
import { StatementData } from "../../services/api";
import React from "react";

interface InsightsProps {
  fileData : StatementData | null
}
const Insights: React.FC<InsightsProps> = ({ fileData }) => {
  return (
    <Box>
      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Box flex="1">
          <TransactionChart transactions={fileData?.transactions || []} />
        </Box>
        <Box flex="1">
          <CumulativeLineChart transactions={fileData?.transactions || []} />
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
        <Heatmap transactions={fileData?.transactions || []} />

        <TotalTransactions />

      </Flex>


    </Box>
  );
};

export default Insights;
