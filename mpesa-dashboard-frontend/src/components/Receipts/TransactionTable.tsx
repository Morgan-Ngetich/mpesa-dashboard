import { Box, Table, Thead, Tr, Th, Td, Badge, Tbody } from "@chakra-ui/react";

const TransactionTable = ({ transactions }) => {
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
          {transactions.map((txn, index) => (
            <Tr key={index} _hover={{ bg: "gray.50" }}>
              <Td>{txn.completion_time}</Td>
              <Td>{txn.details}</Td>
              <Td fontWeight="bold" color={txn.paid_in > 0 ? "green.500" : "red.500"} isNumeric>
                {txn.paid_in > 0 ? `+Ksh ${txn.paid_in}` : `-Ksh ${txn.withdraw}`}
              </Td>
              <Td isNumeric>Ksh {txn.balance}</Td>
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
