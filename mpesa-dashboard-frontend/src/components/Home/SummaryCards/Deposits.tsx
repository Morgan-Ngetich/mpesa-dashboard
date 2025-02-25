import { SimpleGrid, Box, Text, Flex, Icon } from "@chakra-ui/react";
import { FaArrowDown } from "react-icons/fa";

const deposits = [
  { type: "Cash In", amount: 6100.0 },
  { type: "Customer Merchant Payment", amount: 900.0 },
  { type: "B2C Payment", amount: 44400.0 },
  { type: "Send Money (Received)", amount: 90751.27 },
  { type: "OD Payment Transfer", amount: 5000.0 },
  { type: "KenyaRecharge", amount: 50.0 },
];

const Deposits = () => {
  return (
    <Box>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}  h={'full'} w={'full'}>
        {deposits.map((t, index) => (
          <Box
            key={index}
            p={6}
            h="full" 
            w="full"
            bgGradient="linear(to-r,rgba(12, 255, 97, 0.25), gray.300)"
            border="1px solid rgba(3, 3, 3, 0.1)"
            borderRadius="lg"
            boxShadow="0px 4px 20px rgba(26, 105, 62, 0.2)"
            backdropFilter="blur(10px)"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            position="relative" // Ensure absolute positioning inside works correctly
          >
            {/* Icon at the top right */}
            <Box position="absolute" top={2} right={2}>
              <Icon as={FaArrowDown} boxSize={4} color="green.600" />
            </Box>

            {/* Title */}
            <Text fontSize={{base: "sm", md: "md"}} fontWeight="bold">{t.type}</Text>

            {/* Amount */}
            <Text fontSize={{base: "xl", md: "2xl"}}fontWeight="bold" color="green.700">
              <span style={{ fontSize: "16px" }}>KES</span> {t.amount.toLocaleString()}
            </Text>
          </Box>

        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Deposits;
