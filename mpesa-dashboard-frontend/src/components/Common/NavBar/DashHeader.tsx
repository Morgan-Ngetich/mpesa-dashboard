import { Box, Heading, Text, Icon, Flex, HStack, InputGroup, InputLeftElement, Input, VStack } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { FaCalendar, FaFilePdf, FaPhoneAlt } from "react-icons/fa"
import { MdArrowOutward } from "react-icons/md";
import { useBreakpointValue } from "@chakra-ui/react"
import React from "react";

interface DashHeaderProps {
  name?: string;
  phone?: string;
  fileName?: string;
  message?: string; // optional if needed
  statement_date?: string;
  period_start?: string;
  period_end?: string;
}

const DashHeader: React.FC<DashHeaderProps> = ({
  name,
  phone,
  fileName,
  statement_date,
  period_start,
  period_end,
  // message,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box bg="white" mb={6}>
      {isMobile ? (
        <Box
          bg="green.200"
          p={3}
          borderBottomRadius={"xl"}
        >
          <Flex justify={'space-between'}>
            <Box>
              <Text fontSize="md" color="gray.600">
                Welcome back,
              </Text>
              <Text as="span" fontSize="xl" fontWeight="bold">
                {name}
              </Text>
            </Box>
            <Box>
              <Flex gap={4} p={2}>
                <Icon as={IoNotifications} boxSize={7} color="gray.600" cursor="pointer" _hover={{ color: "#E60000" }} />
                <Icon as={FaFilePdf} boxSize={7} color="red.500" />
              </Flex>
            </Box>
          </Flex>

          <Flex
            overflowX={'auto'}
            sx={{
              "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for WebKit browsers
              "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
              "scrollbar-width": "none", // Hide
            }}
            mt={4}
            gap={3}
          >
            <HStack bg={{ base: "white", md: "gray.100" }} px={4} py={2} borderRadius="2xl" spacing={3} border="1px solid black" minW="240px">
              <Box bg="gray.200" p={2} borderRadius="full">
                <Icon as={FaPhoneAlt} boxSize={4} color="gray.600" />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontSize="xs" fontWeight="bold" color="gray.500">Phone Number:</Text>
                <Text fontSize="xs" fontWeight="semibold" color="gray.700">+{phone}</Text>
              </VStack>
            </HStack>


            <HStack bg={{ base: "white", md: "gray.100" }} px={4} py={2} borderRadius="2xl" spacing={3} border="1px solid black" minW="240px">
              <Box bg="gray.200" p={2} borderRadius="2xl">
                <Icon as={FaCalendar} boxSize={4} color="gray.600" />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontSize="xs" fontWeight="bold" color="gray.500">Date:</Text>
                <Text fontSize="xs" fontWeight="semibold" color="gray.700">{period_start} -- {period_end}</Text>
              </VStack>
            </HStack>


            <HStack bg={{ base: "white", md: "gray.100" }} px={4} py={2} borderRadius="2xl" spacing={3} border="1px solid black" minW="200px">
              <Box bg="gray.200" p={2} borderRadius="2xl">
                <Icon as={FaCalendar} boxSize={4} color="gray.600" />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontSize="xs" fontWeight="bold" color="gray.500">Statement_Date:</Text>
                <Text fontSize="xs" fontWeight="semibold" color="gray.700">{statement_date}</Text>
              </VStack>
            </HStack>
          </Flex>

          <Box mt={5}>
            <InputGroup maxW={{ base: "", md: "250px" }}>
              <InputLeftElement pointerEvents="none">
                <Icon as={CiSearch} boxSize={6} color="#008000" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search for transactions..."
                bg="white"
                border="1px solid #008000"
                _focus={{ borderColor: "#34A853", boxShadow: "0 0 5px rgba(52, 168, 83, 0.4)" }}
                _placeholder={{ color: "gray.400" }}
                borderRadius="2xl"
              />
            </InputGroup>
          </Box>
        </Box>
      ) : (
        <Flex justify="space-between" align="center" wrap="wrap">

          <Box flex="1" mb={{ base: 4, md: 0 }}>
            <Text fontSize="md" color="gray.600">
              Welcome back,{" "}
              <Text as="span" fontSize="xl" fontWeight="bold">
                {name}
              </Text>
            </Text>
          </Box>

          <Box>
            <HStack spacing={10}>
              <InputGroup maxW="400px">
                <InputLeftElement pointerEvents="none">
                  <Icon as={CiSearch} boxSize={6} color="#008000" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search for transactions..."
                  bg="white"
                  border="1px solid #008000"
                  _focus={{ borderColor: "#34A853", boxShadow: "0 0 5px rgba(52, 168, 83, 0.4)" }}
                  _placeholder={{ color: "gray.400" }}
                  borderRadius="2xl"
                />
              </InputGroup>

              <Icon as={IoNotifications} boxSize={7} color="gray.600" cursor="pointer" _hover={{ color: "#E60000" }} />

              <HStack spacing={2}>
                <Icon as={FaCircleUser} boxSize={6} color="gray.600" cursor="pointer" _hover={{ color: "#008000" }} />
                <Text fontWeight="bold" color="#34A853">
                  {name ? name.split(" ")[0] : ""}
                </Text>
              </HStack>
            </HStack>
          </Box>


          {/* <Flex gap={6} justify={'end'}> */}
          <Flex justify={'space-between'} w={"full"} mt={4}>
            <Heading
              size="2xl"
              fontWeight="bold"
              color="#0c912f"
              display={{ base: "block", md: "none", lg: "block" }}
            >
              Dashboard
            </Heading>




            <Box
              overflowX="auto"
              whiteSpace="nowrap"
              sx={{
                "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for WebKit browsers
                "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
                "scrollbar-width": "none", // Hide
              }}
              p={0}
            >
              <HStack spacing={3} px={4} justify={{ base: "start", md: "start" }} minW="max-content">

                <HStack bg="gray.100" px={4} py={2} borderRadius="full" spacing={3} border="1px solid black" minW="240px">
                  <Box bg="gray.200" p={2} borderRadius="full">
                    <Icon as={FaPhoneAlt} boxSize={4} color="gray.600" />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500">Phone Number:</Text>
                    <Text fontSize="md" fontWeight="semibold" color="gray.700">+{phone}</Text>
                  </VStack>
                </HStack>


                <HStack bg="gray.100" px={4} py={2} borderRadius="full" spacing={3} border="1px solid black" minW="200px">
                  <Box bg="gray.200" p={2} borderRadius="full">
                    <Icon as={FaCalendar} boxSize={4} color="gray.600" />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500">Date:</Text>
                    <Text fontSize="md" fontWeight="semibold" color="gray.700">{period_start} -- {period_end}</Text>
                  </VStack>
                </HStack>

                <HStack bg="gray.100" p={4} borderRadius="full" spacing={3} border="1px solid black" minW="220px">
                  <Icon as={FaFilePdf} boxSize={6} color="red.500" />
                  <Text fontSize="md" fontWeight="semibold">
                    {fileName && fileName.length > 15 ? fileName.slice(0, 12) + "..." : fileName ?? " "}
                  </Text>
                  <Icon as={MdArrowOutward} boxSize={6} color="green.500" cursor="pointer" />
                </HStack>
              </HStack>
            </Box>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default DashHeader;
