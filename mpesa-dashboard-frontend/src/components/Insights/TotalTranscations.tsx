import { Box, Text } from "@chakra-ui/react"

const TotalTransactions = () => {
  return (
    <Box
      minW={{ base: "100%", md: "200px" }} // Full width on small screens
      p={6}
      bgGradient="linear(to-r, gray.700, gray.900)"
      border="1px solid rgba(255,255,255,0.1)"
      borderRadius="lg"
      boxShadow="0 0 20px rgba(0, 255, 30, 0.1)"
      backdropFilter="blur(10px)"
      textAlign="center"
      color="white"
      display={{ base: "none", md: "block" }} // Hide on small screens if needed
    >
      <Text fontSize="lg" fontWeight="bold" mb={2} textTransform="uppercase">
        Total Transactions
      </Text>
      <Text fontSize="4xl" fontWeight="bold" color="cyan.700">
        61
      </Text>
    </Box>
  )
}

export default TotalTransactions