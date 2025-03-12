import { Box, SimpleGrid, Flex, Text, Icon } from "@chakra-ui/react";
import { FaMoneyBillWave, FaExchangeAlt, FaWallet } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { SummaryItem } from "../../../services/api";
import React from "react";

interface TotalCardsProps {
  summaryData: SummaryItem[];
}

const TotalCards: React.FC<TotalCardsProps> = ({summaryData}) => {
  // Calculate totals
const totalPaidIn = summaryData.reduce((sum, txn) => sum + txn.paid_in, 0);
const totalPaidOut = summaryData.reduce((sum, txn) => sum + txn.paid_out, 0);
const netBalanceChange = totalPaidIn - totalPaidOut;
const overdraftLoanActivity = summaryData.find(txn => txn.transaction_type === "ODRepayment")?.paid_out || 0;

const summaryCards = [
  {
    title: "Total Inflows (Money Received)",
    amount: `KES ${totalPaidIn.toFixed(2)}`,
    color: "rgba(125, 15, 64, 0.2)",
    icon: FaMoneyBillWave,
  },
  {
    title: "Total Outflows (Money Spent)",
    amount: `KES ${totalPaidOut.toFixed(2)}`,
    color: "rgba(15, 86, 125, 0.2)",
    icon: FaExchangeAlt,
  },
  {
    title: "Net Balance Change",
    amount: `KES ${netBalanceChange.toFixed(2)}`,
    color: "rgba(15, 125, 64, 0.2)",
    icon: FaWallet,
  },
  {
    title: "Overdraft & Loan Activity",
    amount: `KES ${overdraftLoanActivity.toFixed(2)}`,
    color: "rgba(121, 125, 15, 0.19)",
    icon: MdTrendingUp,
  },
];

  return (
    <SimpleGrid columns={{ base: 2, md: 2 }} spacing={6} placeItems="center" h="full" w="full">
      {summaryCards.map((card, index) => (
        <Box
          key={index}
          h="full"
          w="full"
          bg={card.color}
          backdropFilter="blur(10px)"
          border="1px solid rgba(15, 125, 64, 0.3)"
          p={6}
          borderRadius="lg"
          boxShadow="0px 4px 20px rgba(15, 125, 64, 0.4)"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Flex justify="space-between" width="100%">
            <Text fontSize={{base: "sm", md: "md"}} color="#0F7D40" fontWeight="medium">
              {card.title}
            </Text>
            <Icon as={card.icon} boxSize={{base: "6", md: "8"}} color="white" />
          </Flex>

          <Text fontSize={{base: "xl", md: "3xl"}} fontWeight="bold" mt={2} bgGradient="linear(to-r, #0F7D40, #E60000)" bgClip="text">
            {card.amount}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default TotalCards;
