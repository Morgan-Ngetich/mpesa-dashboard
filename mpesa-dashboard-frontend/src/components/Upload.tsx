import { useState } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/api";
import { TransactionsResponse } from '../services/api'

interface UploadProps {
  setData: (data: TransactionsResponse | null) => void; // Capture entire response
}

const Upload: React.FC<UploadProps> = ({ setData }) => {
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/pdf": [".pdf"],
    },
    onDrop: async (acceptedFiles) => {
      setUploading(true);
      try {
        const uploadedData = await uploadFile(acceptedFiles[0]);
        console.log("Setting data state with:", uploadedData); 
        setData(uploadedData); // Store entire response in state
      } catch (error) {
        console.error("Upload failed", error);
      }
      setUploading(false);
    },
  });

  return (
    <VStack
      {...getRootProps()}
      p={5}
      border="2px dashed #3182ce"
      borderRadius="md"
      textAlign="center"
      cursor="pointer"
    >
      <input {...getInputProps()} />
      <Text>{uploading ? "Uploading..." : "Drag & drop a file (CSV, DOCX, PDF) here"}</Text>
      <Button isLoading={uploading} colorScheme="blue">
        Upload File
      </Button>
    </VStack>
  );
};

export default Upload;
