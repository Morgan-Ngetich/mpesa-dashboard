import { Box, Icon, Flex, Button, Input, InputGroup, InputLeftElement, Table, Thead, Tbody, Tr, Th, Td, Heading, Badge } from "@chakra-ui/react";
import { useSwipeable } from "react-swipeable";
import { useState } from 'react'
import Deposits from "./SummaryCards/Deposits";
import Withdrawals from "./SummaryCards/ Withdrawals";
import Breakdown from "./SummaryCards/BreakDown";
import DoughnutChart from "./DoughnutChart";
import TotalCards from "./SummaryCards/TotalCards";
import { FaSearch } from "react-icons/fa";
import HighlightCalendar from "./Calendar";

const SummaryDashboard = ({fileData}) => {

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
  
  console.log("Deposits:", deposits);
  console.log("Withdrawals:", withdrawals);
  console.log("trasactions", transactions)
  console.log("Summary Data:", fileData);

  return (
    <Flex gap={6} wrap="wrap">
      <Flex direction={{base: "column", md: "column", lg: "row"}} justify={'space-between'} w={'full'}>

      <Box h={'full'}  p={0}>
        <Box
          overflowX={{ base: "auto", md: "visible" }} // Enable horizontal scrolling on mobile
          whiteSpace="nowrap"
          // pb={2} // Add padding to prevent scrollbar overlay
          sx={{
            "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for WebKit browsers
            "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
            "scrollbar-width": "none" // Hide scrollbar for Firefox
          }}
        >
          <Flex
            justify={{ base: "", md: "center" }}
            gap={4}
            mb={5}
            wrap={{ base: "nowrap", md: "wrap" }} // Prevent wrapping on mobile
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
                minW={{ base: "100px", md: "120px" }} // Ensure buttons don't shrink too much
              >
                {label}
              </Button>
            ))}
          </Flex>
        </Box>

        <Box {...handlers}  p={0}>
          {view === 0 ? (
            <TotalCards summaryData={fileData?.summary}/>
          ) : view === 1 ? (
            <Deposits deposits={deposits}/>
          ) : view === 2 ? (
            <Withdrawals withdrawals={withdrawals}/>
          ) : view === 3 ? (
            <Breakdown deposits={deposits} withdrawals={withdrawals}/>
          ) : null}
        </Box>
      </Box>

      {/* 📈 Right Section - Doughnut Chart & Total Summary Card */}
      <Box  w={'40%'}>
        {/* Doughnut Chart */}
        <DoughnutChart />
      </Box>
      </Flex>


      <Flex gap={6} direction={{ base: "column", md: "row" }} mt={10}>

        
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
          {/* Search Transactions */}
          <InputGroup mt={4} mb={3}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input placeholder="Search transactions..." variant="filled" size="sm" borderRadius={"xl"} />
          </InputGroup>

          <Heading size="md" mb={3} color="gray.800">
            Recent Transactions
          </Heading>

          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Date</Th>
                  <Th>Description</Th>
                  <Th isNumeric display={{ base: "none", md: "table-cell" }}>Amount</Th>
                  <Th isNumeric display={{ base: "none", md: "table-cell" }}>Balance</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((txn, index) => (
                  <Tr key={index} _hover={{ bg: "gray.50" }}>
                    <Td>{txn.completion_time}</Td>
                    <Td>{txn.details}</Td>
                    <Td
                      fontWeight="bold"
                      color={txn.paid_in > 0 ? "green.500" : "red.500"}
                      isNumeric
                      display={{ base: "none", md: "table-cell" }}
                    >
                      {txn.paid_in > 0 ? `+Ksh ${txn.paid_in}` : `-Ksh ${txn.withdraw}`}
                    </Td>
                    <Td isNumeric display={{ base: "none", md: "table-cell" }}>Ksh {txn.balance}</Td>
                    <Td>
                      <Badge
                        colorScheme={txn.transaction_status === "COMPLETED" ? "green" : "yellow"}
                        px={2}
                        py={1}
                        fontSize="0.8em"
                        borderRadius="full"
                      >
                        {txn.transaction_status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>


        <Box
          flex="1"
        >
          <HighlightCalendar startDate={new Date("2025-01-10")} endDate={new Date("2025-02-15")} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default SummaryDashboard;
