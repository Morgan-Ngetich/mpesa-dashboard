import { useState } from "react";
import { 
  Container, VStack, Heading, Select, Text, Divider, Card, CardBody 
} from "@chakra-ui/react";
import Upload from "../components/Upload";
import DataTable from "../components/Table";
import { TransactionsResponse } from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState<TransactionsResponse | null>(null);
  const [groupBy, setGroupBy] = useState<"type" | "date" | "moneyFlow" | "recipient" | "size">("type");

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} align="stretch">
        {/* Title */}
        <Heading textAlign="center" size="lg">M-Pesa Transactions</Heading>

        {/* Upload Section */}
        <Upload setData={setData} /> 

        {data && (
          <>
            {/* Customer Details */}
            <Card variant="outline">
              <CardBody>
                <Heading size="md" mb={3}>Customer Details</Heading>
                <Text><strong>Name:</strong> {data.customer.name}</Text>
                <Text><strong>Mobile Number:</strong> {data.customer.mobile_number}</Text>
              </CardBody>
            </Card>

            {/* Statement Details */}
            <Card variant="outline">
              <CardBody>
                <Heading size="md" mb={3}>Statement Details</Heading>
                <Text><strong>Filename:</strong> {data.filename}</Text>
                <Text><strong>Statement Date:</strong> {data.statement.date}</Text>
                <Text><strong>Period:</strong> {data.statement.period.start} - {data.statement.period.end}</Text>
                <Text fontStyle="italic" color="gray.600">{data.disclaimer}</Text>
              </CardBody>
            </Card>

            <Divider my={5} />

            {data.transactions.length > 0 && (
              <Card variant="outline">
                <CardBody>
                  {/* Grouping Dropdown */}
                  <Heading size="md" mb={3}>Transaction Data</Heading>
                  <Select value={groupBy} onChange={(e) => setGroupBy(e.target.value as any)} maxW="sm" mb={4}>
                    <option value="type">Group by Transaction Type</option>
                    <option value="date">Group by Date</option>
                    <option value="moneyFlow">Group by Money Flow</option>
                    <option value="recipient">Group by Recipient</option>
                    <option value="method">Group by Payment Method</option>
                    <option value="size">Group by Transaction Size</option>
                  </Select>
                  <DataTable transactions={data.transactions} groupBy={groupBy} />
                </CardBody>
              </Card>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Dashboard;
