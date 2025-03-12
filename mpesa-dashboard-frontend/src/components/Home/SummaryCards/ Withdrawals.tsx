import { SimpleGrid, Box, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { SummaryItem } from "../../../services/api";

interface BreakDownProps {
  withdrawals: SummaryItem[];
}

const Withdrawals: React.FC<BreakDownProps> = ({withdrawals}) => {
  return (
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
            <Text fontSize={{base: "sm", md: "md"}} fontWeight="bold">{t.transaction_type}</Text>

            {/* Amount */}
            <Text fontSize={{base: "xl", md: "2xl"}} fontWeight="bold" color="green.700">
              <span style={{ fontSize: "16px" }}>KES</span> {t.paid_out.toLocaleString()}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
  );
};

export default Withdrawals;
