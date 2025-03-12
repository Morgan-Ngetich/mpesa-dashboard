import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Input,
  Text,
  // VStack,
  Spinner,
  useToast,
  Icon,
  Flex,
  Center,
  Progress,
} from "@chakra-ui/react";
import { setFile, setFileContent } from "../store/uploadSlice"; // Redux actions
import useIsLoading from "../hooks/useIsLoading";
// import { RootState } from "../store/store";
import { FaCloud } from "react-icons/fa6";
// import Statement from "../assets/Statement_All_Transactions.pdf"

const UploadFile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { isLoading, error, handleUpload } = useIsLoading();
  // const file = useSelector((state: RootState) => state.upload.file);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      processFile(event.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      toast({
        title: "Only PDF files are allowed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setSelectedFile(file);
    dispatch(setFile(file));
    readFileContents(file);
  };

  const readFileContents = (file: File) => {
    const reader = new FileReader();
  
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      }
    };
  
    reader.onload = (event) => {
      if (event.target?.result) {
        try {
          // Only attempt to parse JSON if it's not a PDF
          if (!file.name.endsWith(".pdf")) {
            const parsedData = JSON.parse(event.target.result as string);
            dispatch(setFileContent(parsedData));
          } else {
            // If it's a PDF, just store the file as a blob
            dispatch(setFileContent(event.target.result)); 
          }
        } catch (error) {
          console.error("Error processing file:", error);
          toast({
            title: "Invalid file format",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    };
  
    // Read as text if JSON, or as ArrayBuffer for PDFs
    if (file.name.endsWith(".pdf")) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };
  
  const onUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const response = await handleUpload(selectedFile);
    if (response) {
      toast({
        title: "Upload Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Upload Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Load sample file from public folder
  const loadSampleFile = async () => {
    try {
      const response = await fetch(`/Statement_All_Transactions.pdf`, { mode: "cors" });

      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const blob = await response.blob();
      const sampleFile = new File([blob], "Statement_All_Transaction.pdf", {
        type: "application/pdf",
        lastModified: Date.now(),
      });
  
      processFile(sampleFile);
    } catch (error) {
      console.error("Error loading sample file:", error);
      toast({
        title: "Error loading sample file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  // Drag & drop handlers
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      processFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  return (
    <Center py="10">
      <Box
        maxW="600px"
        mx="auto"
        mt="10"
        p="8"
        bg="white"
        shadow="2xl"
        borderRadius="xl"
        textAlign="center"
      >
        <Text fontSize="3xl" fontWeight="bold" mb="6" color="gray.700">
          Upload Your Resume
        </Text>

        <Flex
          direction="column"
          align="center"
          justify="center"
          p="10"
          borderWidth="2px"
          borderRadius="xl"
          borderStyle="dashed"
          cursor="pointer"
          _hover={{ bg: "gray.50" }}
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          bg={isDragActive ? "gray.100" : "white"}
        >
          <Icon as={FaCloud} boxSize="20" color="gray.400" />
          <Text fontSize="lg" color="gray.600" mt="4">
            Drag & drop your transaction file here, or click to select a file
          </Text>
          <Input ref={inputRef} type="file" onChange={onFileChange} disabled={isLoading} hidden />
        </Flex>

        {selectedFile && (
          <Flex justify="space-between" mt="4">
            <Text fontSize="md" color="gray.700">
              {selectedFile.name}
            </Text>
            <Text>
              ({formatBytes(selectedFile.size)})
            </Text>
          </Flex>
        )}

        {uploadProgress > 0 && (
          <Box mt="4" display={uploadProgress === 100 ? "none" : "block"}>
            <Text fontSize="sm" mb="2">Upload Progress: {uploadProgress}%</Text>
            <Progress value={uploadProgress} size="sm" colorScheme="blue" />
          </Box>
        )}
        <Flex gap={5} mt={5}>

          <Button
            onClick={onUpload}
            isLoading={isLoading}
            colorScheme="green"
            w="70%"
            disabled={!selectedFile}
          >
            Upload File
          </Button>

          <Button onClick={loadSampleFile} colorScheme="yellow" w="30%">
            Use Sample File
          </Button>
        </Flex>



        {isLoading && <Spinner color="blue.500" mt="4" />}
        {error && <Text color="red.500" mt="4">{error}</Text>}
      </Box>
    </Center>
  );
};

// Utility function to format bytes to human-readable format
const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export default UploadFile;
