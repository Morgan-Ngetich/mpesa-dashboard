import { Box, Table, Thead, Tr, Th, Td, Badge, Tbody, Text, Flex, Heading } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { Transaction } from "../../services/api";
import React from "react";

interface TransactionGridProps {
  transactions: Transaction[]
}
const TransactionGrid: React.FC<TransactionGridProps> = ({ transactions }) => {
  // Sort transactions descending by date (most recent first) and take the first 10
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.completion_time).getTime() - new Date(a.completion_time).getTime())
    .slice(0, 10);

  return (
    <Box overflowX="auto">
      <Heading size="md" my={5} color="gray.800">
        Recent Transactions
      </Heading>

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
          {recentTransactions.map((txn, index) => (
            <Tr key={index} _hover={{ bg: "gray.50" }}>
              <Td>{txn.completion_time}</Td>
              <Td>{txn.details}</Td>
              <Td
                fontWeight="bold"
                color={txn.paid_in > 0 ? "green.500" : "red.500"}
                isNumeric
                display={{ base: "none", md: "table-cell" }}
              >
                {txn.paid_in > 0 ? (
                  <Flex alignItems="center" gap={2}>
                    <FaArrowUp />
                    <Text>{txn.paid_in}</Text>
                  </Flex>
                ) : (
                  <Flex alignItems="center" gap={2}>
                    <FaArrowDown />
                    <Text>{txn.withdraw}</Text>
                  </Flex>
                )}
              </Td>
              <Td isNumeric display={{ base: "none", md: "table-cell" }}>
                {txn.balance}
              </Td>
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
  );
};

export default TransactionGrid;
