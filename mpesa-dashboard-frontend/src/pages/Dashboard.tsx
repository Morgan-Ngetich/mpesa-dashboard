import { useState } from "react";
import { Container, VStack, Heading, Select } from "@chakra-ui/react";
import Upload from "../components/Upload";
import DataTable from "../components/Table";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<any[]>([]); // Ensuring it's always an array
  const [groupBy, setGroupBy] = useState<"type" | "date" | "moneyFlow" | "recipient" | "method" | "size">("type");

  console.log("Transactions being sent to Table:", transactions);

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={5}>
        <Heading>M-Pesa Transactions</Heading>
        <Upload setTransactions={(data) => setTransactions(data || [])} /> 
        {/* Ensures transactions is an array, even if data is undefined */}

        {Array.isArray(transactions) && transactions.length > 0 && (
          <>
            <Select value={groupBy} onChange={(e) => setGroupBy(e.target.value as any)}>
              <option value="type">Group by Transaction Type</option>
              <option value="date">Group by Date</option>
              <option value="moneyFlow">Group by Money Flow</option>
              <option value="recipient">Group by Recipient</option>
              <option value="method">Group by Payment Method</option>
              <option value="size">Group by Transaction Size</option>
            </Select>
            <DataTable transactions={transactions} groupBy={groupBy} />
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Dashboard;
