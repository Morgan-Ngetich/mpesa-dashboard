import { Box, Table, Thead, Tr, Th, Td, Badge, Tbody, Flex, Text } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { Transaction } from "../../services/api"

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <Box overflowX="auto" bg="white" p={4} borderRadius="lg" boxShadow="lg">
      <Table variant="simple" size="md">
        <Thead bg="gray.100">
          <Tr>
            <Th>Date</Th>
            <Th>Description</Th>
            <Th isNumeric>Amount</Th>
            <Th isNumeric>Balance</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((txn: Transaction, index: number) => (
            <Tr key={index} _hover={{ bg: "gray.50" }}>
              <Td>{txn.completion_time}</Td>
              <Td>{txn.details}</Td>
              <Td fontWeight="bold" color={txn.paid_in > 0 ? "green.500" : "red.500"} isNumeric>
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
              <Td isNumeric>{txn.balance}</Td>
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

export default TransactionTable;
