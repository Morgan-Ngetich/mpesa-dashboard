import { Box, Text } from "@chakra-ui/react";
import DashHeader from "../components/Common/NavBar/DashHeader";
import SummaryDashboard from "../components/Home/Index";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Home = () => {
  const fileData = useSelector((state: RootState) => state.upload.fileContent)
  console.log("redux file content state:", fileData)

  return (
    <Box px={{ base: 0, md: 6 }} w={"full"}>
      <DashHeader
        name={fileData?.customer.name}
        phone={fileData?.customer.mobile_number}
        fileName={fileData?.filename}
        message={fileData?.message}
        statement_date={fileData?.statement.date}
        period_start={fileData?.statement.period.start}
        period_end={fileData?.statement.period.end}
      />
      <Box p={{ base: 2, md: 6 }}>
        {fileData && <SummaryDashboard fileData={fileData} />}

        {/* Disclaimer */}
        <Box mt={6} p={4} bg="yellow.200" borderRadius="md" borderLeft={"8px solid orange"}>
          <Text fontSize="sm"><strong style={{ color: "red" }}>Disclaimer:</strong> This data is extracted from the M-Pesa statement<span style={{ color: "green", fontWeight: "bold" }}>(**Uploaded File**)</span> and may not be 100% accurate.</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
