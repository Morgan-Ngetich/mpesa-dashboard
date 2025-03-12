import { Box, Flex, Button } from "@chakra-ui/react";
import { useSwipeable } from "react-swipeable";
import { useState } from 'react'
import Deposits from "./SummaryCards/Deposits";
import Withdrawals from "./SummaryCards/ Withdrawals";
import Breakdown from "./SummaryCards/BreakDown";
import DoughnutChart from "./DoughnutChart";
import TotalCards from "./SummaryCards/TotalCards";
import HighlightCalendar from "./Calendar";
import TransactionGrid from "./TransactionGrid";
import { StatementData } from "../../services/api";

interface SummaryDashboardProps {
  fileData: StatementData
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ fileData }) => {
  const [view, setView] = useState(0); // 0 = Summary, 1 = Transactions

  const handlers = useSwipeable({
    onSwipedLeft: () => setView((prev) => (prev < 3 ? prev + 1 : 0)), // Loop forward
    onSwipedRight: () => setView((prev) => (prev > 0 ? prev - 1 : 3)), // Loop backward
  });

  const transactions = fileData?.transactions
  const deposits = fileData?.summary.filter((t) =>
    ["Cash In", "Customer Merchant Payment", "B2C Payment", "Send Money", "OD Payment Transfer", "KenyaRecharge"].includes(t.transaction_type)
  );

  const withdrawals = fileData?.summary.filter((t) =>
    ["Cash Out", "Customer Airtime Purchase", "Pay Bill", "Send Money", "Customer Merchant Payment", "ODRepayment"].includes(t.transaction_type)
  );
  const startDate = fileData?.statement.period.start
  const endDate = fileData?.statement.period.end

  const parseDate = (dateStr: string) => {
    const cleanedDate = dateStr.replace(/(st|nd|rd|th)/, ""); // Remove "st", "nd", "rd", "th"
    const [day, month, year] = cleanedDate.split(" ");
    return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
  };


  return (
    <Flex gap={6} wrap="wrap">
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        w="full"
        gap={6} // Adjust the gap as needed
      >
        {/* Left Section - 60% on Large Screens */}
        <Box flex={{ base: "1", lg: "3" }} h="full" p={0}>
          <Box
            overflowX={{ base: "auto", md: "visible" }}
            whiteSpace="nowrap"
            sx={{
              "::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            <Flex
              justify={{ base: "", md: "center" }}
              gap={4}
              mb={5}
              wrap={{ base: "nowrap", md: "wrap" }}
              flexDirection="row"
            >
              {[
                { label: "Summary", id: 0 },
                { label: "Deposits", id: 1 },
                { label: "Withdrawals", id: 2 },
                { label: "Breakdown", id: 3 },
              ].map(({ label, id }) => (
                <Button
                  key={id}
                  size="sm"
                  bg={view === id ? "gray.400" : "gray.100"}
                  border={view === id ? "1px solid black" : ""}
                  color={view === id ? "green" : "gray"}
                  onClick={() => setView(id)}
                  borderRadius="3xl"
                  minW={{ base: "100px", md: "120px" }}
                >
                  {label}
                </Button>
              ))}
            </Flex>
          </Box>

          <Box {...handlers} p={0}>
            {view === 0 ? (
              <TotalCards summaryData={fileData?.summary} />
            ) : view === 1 ? (
              <Deposits deposits={deposits} />
            ) : view === 2 ? (
              <Withdrawals withdrawals={withdrawals} />
            ) : view === 3 ? (
              <Breakdown deposits={deposits} withdrawals={withdrawals} />
            ) : null}
          </Box>
        </Box>

        {/* Right Section - 40% on Large Screens */}
        <Box flex={{ base: "1", lg: "2" }}>
          <DoughnutChart />
        </Box>
      </Flex>



      <Flex gap={6} direction={{ base: "column", lg: "row" }} mt={10}>
        <Box
          flex="2"
          overflowX="auto"
          bg="white"
          px={4}
          py={2}
          borderRadius="lg"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <TransactionGrid transactions={transactions} />
        </Box>


        <Box
          flex="1"
        >
          <HighlightCalendar startDate={parseDate(startDate)} endDate={parseDate(endDate)} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default SummaryDashboard;
