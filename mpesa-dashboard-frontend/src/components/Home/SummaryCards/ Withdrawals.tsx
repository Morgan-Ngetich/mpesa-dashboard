import { SimpleGrid, Box, Text, Flex, Icon } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

const withdrawals = [
  { type: "Cash Out", amount: 28081.0 },
  { type: "Customer Airtime Purchase", amount: 150.0 },
  { type: "Pay Bill", amount: 16065.0 },
  { type: "Send Money (Sent)", amount: 83563.0 },
  { type: "Customer Merchant Payment", amount: 10772.25 },
  { type: "OD Repayment", amount: 22171.67 },

  // { type: "Customer Bundle Purchase", amount: 2226.0 },
];

const Withdrawals = () => {
  return (
    <Box>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6} >
        {withdrawals.map((t, index) => (
          <Box
            key={index}
            p={6}
            bgGradient="linear(to-r,rgba(206, 8, 97, 0.24), gray.200)"
            boxShadow="0px 4px 20px rgba(105, 26, 26, 0.2)"
            border="1px solid rgba(3, 3, 3, 0.1)"
            borderRadius="lg"
            backdropFilter="blur(10px)"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            position="relative"
          >
            {/* Icon at the top right */}
            <Box position="absolute" top={2} right={2}>
              <Icon as={FaArrowUp} boxSize={4} color="red.600" />
            </Box>

            {/* Title */}
            <Text fontSize={{base: "sm", md: "md"}} fontWeight="bold">{t.type}</Text>

            {/* Amount */}
            <Text fontSize={{base: "xl", md: "2xl"}} fontWeight="bold" color="green.700">
              <span style={{ fontSize: "16px" }}>KES</span> {t.amount.toLocaleString()}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Withdrawals;
