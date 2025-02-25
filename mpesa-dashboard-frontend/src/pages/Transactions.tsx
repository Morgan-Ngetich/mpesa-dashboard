import { Box } from "@chakra-ui/react";

import Insights from "../components/Insights/Index";

const Transactions = () => {
  const transactions = [
    { type: "Cash Out", paidIn: 8252.33, paidOut: 28081.0 },
    { type: "Send Money", paidIn: 90751.27, paidOut: 83563.0 },
    { type: "B2C Payment", paidIn: 44400.0, paidOut: 0.0 },
    { type: "Pay Bill", paidIn: 355.0, paidOut: 16065.0 },
    { type: "Cash In", paidIn: 6100.0, paidOut: 0.0 },
    { type: "OD Payment Transfer", paidIn: 5000.0, paidOut: 0.0 },
    { type: "KenyaRecharge", paidIn: 50.0, paidOut: 50.0 },
    { type: "ODRepayment", paidIn: 0.0, paidOut: 22171.67 },
    { type: "Customer Merchant Payment", paidIn: 900.0, paidOut: 10772.25 },
    { type: "Customer Airtime Purchase", paidIn: 40.0, paidOut: 150.0 },
    { type: "Customer Bundle Purchase", paidIn: 647.0, paidOut: 2226.0 },
  ];

  const leftTransactions = transactions.slice(0, 9);
  const rightTransactions = transactions.slice(9);

  const totalPaidIn = transactions.reduce((sum, t) => sum + t.paidIn, 0);
  const totalPaidOut = transactions.reduce((sum, t) => sum + t.paidOut, 0);

  return (
    <Box p={4}>
      <Insights />
    </Box>
  );
};

export default Transactions;
