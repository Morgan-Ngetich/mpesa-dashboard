import { Box, Flex, SimpleGrid, Text, Icon, Button } from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import React, { useState } from "react";
import { SummaryItem } from "../../../services/api";

interface BreakDownProps {
  deposits: SummaryItem[]
  withdrawals: SummaryItem[]
}
const Breakdown: React.FC<BreakDownProps> = ({deposits, withdrawals}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      mx="auto"
      // borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      w={'full'}
    >
      {/* Expandable Content */}
      <Box
        maxH={isExpanded ? "none" : {base: "350px", md: "255px"}}
        overflow="hidden"
        transition="max-height 0.3s ease-in-out"
        px={4}
        w={'full'}
      >
        <SimpleGrid columns={{ base: 2, md: 2 }} spacing={8}>
          {/* Deposits Column */}
          <Box>
            <Text fontSize={{base: "sm", md: "lg"}} fontWeight="bold" mb={2} color="green.600">
              Deposits (Money Received)
            </Text>
            {deposits.map((t, index) => (
              <Box
                key={index}
                p={4}
                bgGradient="linear(to-r,rgba(12, 255, 97, 0.25), gray.300)"
                border="1px solid rgba(3, 3, 3, 0.1)"
                borderRadius="lg"
                boxShadow="0 0 20px rgba(6, 84, 15, 0.1)"
                backdropFilter="blur(10px)"
                position="relative"
                mb={3}
              >
                {/* Icon (Top Right) */}
                <Box position="absolute" top={2} right={2}>
                  <Icon as={FaArrowDown} boxSize={4} color="green.600" />
                </Box>

                {/* Transaction Type */}
                <Text  fontSize={{base: "sm", md: "md"}} fontWeight="bold">{t.transaction_type}</Text>

                {/* Amount */}
                <Text  fontSize={{base: "lg", md: "xl"}} fontWeight="bold" color="green.700">
                  KES {t.paid_in.toLocaleString()}
                </Text>
              </Box>
            ))}
          </Box>

          {/* Withdrawals Column */}
          <Box>
            <Text  fontSize={{base: "sm", md: "lg"}} fontWeight="bold" mb={2} color="red.600">
              Withdrawals (Money Spent)
            </Text>
            {withdrawals.map((t, index) => (
              <Box
                key={index}
                p={4}
                bgGradient="linear(to-r,rgba(206, 8, 97, 0.24), gray.200)"
                border="1px solid rgba(3, 3, 3, 0.1)"
                borderRadius="lg"
                boxShadow="0px 4px 20px rgba(105, 26, 26, 0.2)"
                backdropFilter="blur(10px)"
                position="relative"
                mb={3}
              >
                {/* Icon (Top Right) */}
                <Box position="absolute" top={2} right={2}>
                  <Icon as={FaArrowUp} boxSize={4} color="red.600" />
                </Box>

                {/* Transaction Type */}
                <Text  fontSize={{base: "sm", md: "md"}} fontWeight="bold">{t.transaction_type}</Text>

                {/* Amount */}
                <Text  fontSize={{base: "lg", md: "xl"}} fontWeight="bold" color="red.700">
                  KES {t.paid_out.toLocaleString()}
                </Text>
              </Box>
            ))}
          </Box>
        </SimpleGrid>
      </Box>

      {/* Toggle Button */}
      <Flex
        justify="center"
        p={1}
        boxShadow={"lg"}
        borderBottomRadius="lg"
        bg="rgba(255, 255, 255, 0.1)" // More transparent
        backdropFilter="blur(20px)" // Balanced blur
        sx={{
          WebkitBackdropFilter: "blur(20px)", // Safari compatibility
        }}
      >
        <Button size="sm" onClick={() => setIsExpanded(!isExpanded)} colorScheme="teal" borderRadius="full">
          {isExpanded ? "See Less" : "See More"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Breakdown;
