import { useState } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/api";

interface UploadProps {
  setTransactions: (data: any) => void;
}

const Upload: React.FC<UploadProps> = ({ setTransactions }) => {
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 
      "text/csv": [".csv"], 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/pdf": [".pdf"]
    },
    onDrop: async (acceptedFiles) => {
      setUploading(true);
      try {
        const uploadedData = await uploadFile(acceptedFiles[0]); 
        setTransactions(uploadedData);
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
