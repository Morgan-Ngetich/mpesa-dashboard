import { Box, Heading, Text, Flex, SimpleGrid, Card, Stat, StatLabel, StatNumber, VStack, HStack, Icon, Badge, useColorModeValue, Input, InputGroup, InputLeftElement, Table, Thead, Tbody, Tr, Th, Td, useBreakpointValue } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown, FaFilePdf, FaSearch, FaDatabase, FaCloudUploadAlt } from "react-icons/fa";
import DashHeader from "../components/Common/NavBar/DashHeader";
import { } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import SummaryDashboard from "../components/Home/Index";
import { IoIosWarning } from "react-icons/io";
import HighlightCalendar from "../components/Common/Calendar";

const customer = { name: "MORGAN NGETICH", mobile_number: "254718114923" };
const statement = { date: "14th Feb 2025", period: { start: "01st Jan 2025", end: "31st Jan 2025" } };
// const transactions = [
//   { completion_time: "2025-01-31 19:21:33", details: "Pay Merchant Charge", paid_in: 0, withdraw: 2.20, balance: 13.80, receipt_no: "TAV88PF1EU", transaction_status: "COMPLETED" },
//   { completion_time: "2025-01-31 19:14:55", details: "B2C Transfer", paid_in: 300, withdraw: 0, balance: 16.00, receipt_no: "BCX99HGF21", transaction_status: "COMPLETED" },
// ];


const Home = () => {
  // const cardBg = useColorModeValue("white", "gray.800");
  // const cardBorder = useColorModeValue("gray.200", "gray.700");

  // // Calculate Summary Values
  // const totalPaidIn = transactions.reduce((sum, txn) => sum + txn.paid_in, 0);
  // const totalWithdrawn = transactions.reduce((sum, txn) => sum + txn.withdraw, 0);
  // const currentBalance = transactions[transactions.length - 1]?.balance || 0;

  const isMobile = useBreakpointValue({ base: true, md: false })
  return (
    <Box px={{ base: 0, md: 6 }} w={"full"}>
      {isMobile && (

        <DashHeader />
      )}
      {/* Header */}
      <Box p={{ base: 2, md: 6 }}>

        {/* Summary Cards */}
        <SummaryDashboard />

        {/* Disclaimer */}
        <Box mt={6} p={4} bg="yellow.200" borderRadius="md" borderLeft={"8px solid orange"}>
          <Text fontSize="sm"><strong style={{ color: "red" }}>Disclaimer:</strong> This data is extracted from the M-Pesa statement<span style={{ color: "green", fontWeight: "bold" }}>(**Uploaded File**)</span> and may not be 100% accurate.</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
