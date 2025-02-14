import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface Transaction {
  date: string;
  type: string;
  recipient: string;
  amount: number;
  method: string;
  category: string;
}

interface GroupedTransactions {
  [key: string]: Transaction[];
}

interface TableProps {
  transactions: Transaction[];
  groupBy: "type" | "date" | "moneyFlow" | "recipient" | "method" | "size";
}

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
    case "method":
      return transactions.reduce((acc, transaction) => {
        acc[transaction.method] = acc[transaction.method] || [];
        acc[transaction.method].push(transaction);
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
  const groupedData = groupTransactions(transactions, groupBy);

  return (
    <>
      {Object.entries(groupedData).map(([group, transactions]) => (
        <Table variant="simple" size="md" key={group} mt={5}>
          <Thead>
            <Tr>
              <Th colSpan={6} textAlign="left" bg="gray.100">
                {group}
              </Th>
            </Tr>
            <Tr>
              <Th>Date</Th>
              <Th>Type</Th>
              <Th>Recipient</Th>
              <Th>Amount (KES)</Th>
              <Th>Method</Th>
              <Th>Category</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={index}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.recipient}</Td>
                <Td>{transaction.amount.toLocaleString()}</Td>
                <Td>{transaction.method}</Td>
                <Td>{transaction.category}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ))}
    </>
  );
};

export default DataTable;
