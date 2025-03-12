import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Insights from "../components/Insights/Index";

const Transactions = () => {
  const fileData = useSelector((state: RootState) => state.upload.fileContent)

  return (
    <Box p={4}>
      <Insights fileData={fileData}/>
    </Box>
  );
};

export default Transactions;
