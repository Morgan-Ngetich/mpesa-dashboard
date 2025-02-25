import { Box } from "@chakra-ui/react";
import TransactionTable from "./TransactionTable";
import TransactionControls from "./TransactionControls";
import { useState } from "react";

const transactions = [
  { completion_time: "2025-01-31 19:21:33", details: "Pay Merchant Charge", paid_in: 0, withdraw: 2.2, balance: 13.8, receipt_no: "TAV88PF1EU", transaction_status: "COMPLETED" },
  { completion_time: "2025-01-31 19:14:55", details: "B2C Transfer", paid_in: 300, withdraw: 0, balance: 16.0, receipt_no: "BCX99HGF21", transaction_status: "COMPLETED" },
];

const Receipts = () => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const handleSearch = (query: string) => {
    setFilteredTransactions(
      transactions.filter((txn) =>
        txn.details.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleFilter = (status: string) => {
    if (status === "all") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter((txn) => txn.transaction_status === status));
    }
  };

  const handleExport = () => {
    const csvContent = [
      "Date,Description,Amount,Balance,Status",
      ...filteredTransactions.map(
        (txn) =>
          `${txn.completion_time},${txn.details},${txn.paid_in > 0 ? txn.paid_in : -txn.withdraw},${txn.balance},${txn.transaction_status}`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  

  return (
    <Box>
      <TransactionControls onSearch={handleSearch} onFilter={handleFilter} onExport={handleExport} />
      <TransactionTable transactions={filteredTransactions} />
    </Box>
  );
};

export default Receipts;