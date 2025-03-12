import React, { useState } from "react";
import {
  Box,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSearch, FaFilter, FaFileDownload } from "react-icons/fa";

interface TransactionControlsProps {
  onSearch : (query: string) => void;
  onFilter : (status: string) => void;
  onExport : () => void;
}

const TransactionControls: React.FC<TransactionControlsProps> = ({ onSearch, onFilter, onExport }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const applyFilter = () => {
    onFilter(status);
    onClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={4}>
      {/* Search Bar */}
      <InputGroup maxW="300px">
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={handleSearch}
          variant="filled"
          borderRadius="xl"
        />
      </InputGroup>

      {/* Filter & Export Buttons */}
      <Box display="flex" gap={2}>
        <Button leftIcon={<FaFilter />} colorScheme="blue" onClick={onOpen}>
          Filter
        </Button>
        <Button leftIcon={<FaFileDownload />} colorScheme="green" onClick={onExport}>
          Export
        </Button>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent
          bg="rgba(255, 255, 255, 0.15)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          boxShadow="2xl"
          p={4}
        >
          {/* Drawer Header */}
          <DrawerHeader display="flex" justifyContent="space-between" alignItems="center">
            <Box fontSize="lg" fontWeight="bold" color="white">
              🔍 Filter Transactions
            </Box>
            <Button variant="ghost" color="white" onClick={onClose} _hover={{ bg: "whiteAlpha.300" }}>
              ✖
            </Button>
          </DrawerHeader>

          {/* Drawer Body */}
          <DrawerBody>
            {/* Date Filters */}
            <Box mb={4} color="white" fontSize="md" fontWeight="semibold">
              Date:
            </Box>
            <Box display="flex" gap={2} flexWrap="wrap">
              {["Recent", "Yesterday", "Today"].map((date) => (
                <Box
                  key={date}
                  px={4}
                  py={2}
                  bg={status === date ? "blue.500" : "whiteAlpha.300"}
                  color="white"
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ bg: "blue.400" }}
                  onClick={() => setStatus(date)}
                >
                  {date}
                </Box>
              ))}
            </Box>

            {/* Transaction Filters */}
            <Box mt={6} color="white" fontSize="md" fontWeight="semibold">
              Transaction Type:
            </Box>
            <Box display="flex" gap={2} flexWrap="wrap">
              {["Amount", "Balance", "Everything"].map((type) => (
                <Box
                  key={type}
                  px={4}
                  py={2}
                  bg={status === type ? "blue.500" : "whiteAlpha.300"}
                  color="white"
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ bg: "blue.400" }}
                  onClick={() => setStatus(type)}
                >
                  {type}
                </Box>
              ))}
            </Box>
          </DrawerBody>

          {/* Drawer Footer */}
          <DrawerFooter display="flex" justifyContent="space-between">
            <Button
              variant="outline"
              color="white"
              borderColor="whiteAlpha.600"
              _hover={{ bg: "whiteAlpha.300" }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={applyFilter}>
              Apply Filters
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>


    </Box>
  );
};

export default TransactionControls;