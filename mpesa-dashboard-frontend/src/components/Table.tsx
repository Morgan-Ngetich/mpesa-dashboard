import { Table, Thead, Tbody, Tr, Th, Td, Box, Text } from "@chakra-ui/react";

interface RawTransaction {
  completion_time: string;
  details: string;
  receipt_no: string;
  paid_in: string;
  withdraw: string;
  transaction_status: string;
}

interface Transaction {
  date: string;
  type: string;
  recipient: string;
  amount: number;
  category: string;
}

interface GroupedTransactions {
  [key: string]: Transaction[];
}

interface TableProps {
  transactions: RawTransaction[];
  groupBy: "type" | "date" | "moneyFlow" | "recipient" | "size";
}

const transformTransactions = (transactions: RawTransaction[]): Transaction[] => {
  return transactions.map((t) => ({
    date: new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(t.completion_time)),
    type: t.details,
    recipient: t.receipt_no || "N/A",
    amount: parseFloat(t.paid_in) > 0 ? parseFloat(t.paid_in) : -parseFloat(t.withdraw),
    category: t.transaction_status,
  }));
};

const groupTransactions = (transactions: Transaction[], groupBy: string): GroupedTransactions => {
  switch (groupBy) {
    case "type":
      return transactions.reduce((acc, transaction) => {
        acc[transaction.type] = acc[transaction.type] || [];
        acc[transaction.type].push(transaction);
        return acc;
      }, {} as GroupedTransactions);
    case "date":
      return transactions.reduce((acc, transaction) => {
        acc[transaction.date] = acc[transaction.date] || [];
        acc[transaction.date].push(transaction);
        return acc;
      }, {} as GroupedTransactions);
    case "moneyFlow":
      return transactions.reduce((acc, transaction) => {
        const category = transaction.amount > 0 ? "Money Received" : "Money Spent";
        acc[category] = acc[category] || [];
        acc[category].push(transaction);
        return acc;
      }, {} as GroupedTransactions);
    case "recipient":
      return transactions.reduce((acc, transaction) => {
        acc[transaction.recipient] = acc[transaction.recipient] || [];
        acc[transaction.recipient].push(transaction);
        return acc;
      }, {} as GroupedTransactions);
    case "size":
      return transactions.reduce((acc, transaction) => {
        let size = "Medium";
        if (transaction.amount < 100) size = "Small";
        else if (transaction.amount > 1000) size = "Large";
        acc[size] = acc[size] || [];
        acc[size].push(transaction);
        return acc;
      }, {} as GroupedTransactions);
    default:
      return { "All Transactions": transactions };
  }
};

const DataTable: React.FC<TableProps> = ({ transactions, groupBy }) => {
  const cleanedTransactions = transformTransactions(transactions);
  const groupedData = groupTransactions(cleanedTransactions, groupBy);

  return (
    <Box overflowX="auto" p={4}>
      {Object.entries(groupedData).map(([group, transactions]) => (
        <Box key={group} mb={6} borderRadius="lg" boxShadow="md" overflow="hidden">
          <Text fontSize="lg" fontWeight="bold" bgGradient="linear(to-r, blue.500, purple.500)" color="white" p={3}>
            {group}
          </Text>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr bg="gray.200">
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>Recipient</Th>
                <Th isNumeric>Amount (KES)</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction, index) => (
                <Tr key={index} _hover={{ bg: "gray.100" }}>
                  <Td>{transaction.date}</Td>
                  <Td>{transaction.type}</Td>
                  <Td>{transaction.recipient}</Td>
                  <Td isNumeric color={transaction.amount > 0 ? "green.500" : "red.500"}>
                    {transaction.amount.toLocaleString()}
                  </Td>
                  <Td>{transaction.category}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ))}
    </Box>
  );
};

export default DataTable;
