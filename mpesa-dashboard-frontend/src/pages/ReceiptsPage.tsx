import { Box } from "@chakra-ui/react"
import Receipts from "../components/Receipts/Index"
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ReceiptsPage = () => {
  const fileData = useSelector((state: RootState) => state.upload.fileContent)

  if (!fileData) return <Box>No file uploaded.</Box>;
  
  return (
    <Box>
      <Receipts fileData={fileData}/>
    </Box>
  )
}

export default ReceiptsPage