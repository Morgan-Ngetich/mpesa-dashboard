import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
import TransactionControls from "./TransactionControls";
import { StatementData, Transaction } from "../../services/api"

interface ReceiptsProps {
  fileData: StatementData;
}

const Receipts: React.FC<ReceiptsProps> = ({ fileData }) => {
  // Extract transactions from fileData (default to empty array if undefined)
  const transactions: Transaction[] = fileData?.transactions || [];
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);

  // Update filtered transactions if the incoming transactions change
  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  // Search by filtering on the details field
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredTransactions(transactions);
      return;
    }
    setFilteredTransactions(
      transactions.filter((txn) =>
        txn.details.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleFilter = (filterValue: string) => {
    if (filterValue === "all" || filterValue === "Everything") {
      setFilteredTransactions(transactions);
    } else if (filterValue === "Recent") {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 7);
      setFilteredTransactions(
        transactions.filter(
          (txn) => new Date(txn.completion_time) >= recentDate
        )
      );
    } else if (filterValue === "Yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      setFilteredTransactions(
        transactions.filter((txn) => {
          const txnDate = new Date(txn.completion_time);
          return txnDate.toDateString() === yesterday.toDateString();
        })
      );
    } else if (filterValue === "Today") {
      const today = new Date();
      setFilteredTransactions(
        transactions.filter((txn) => {
          const txnDate = new Date(txn.completion_time);
          return txnDate.toDateString() === today.toDateString();
        })
      );
    } else if (filterValue === "Amount") {
      setFilteredTransactions(
        transactions.filter(
          (txn) => Number(txn.paid_in) !== 0 || Number(txn.balance) !== 0
        )
      );
    } else if (filterValue === "Balance") {
      setFilteredTransactions(
        transactions.filter(
          (txn) => txn.balance && Number(txn.balance) !== 0
        )
      );
    } else {
      setFilteredTransactions(
        transactions.filter(
          (txn) => txn.transaction_status === filterValue
        )
      );
    }
  };
  // Export the filtered transactions as CSV
  const handleExport = () => {
    const csvContent = [
      "Date,Description,Amount,Balance,Status",
      ...filteredTransactions.map(
        (txn) =>
          `${txn.completion_time},${txn.details},${txn.paid_in ? txn.paid_in : -txn.withdraw},${txn.balance},${txn.transaction_status}`
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
      <TransactionControls
        onSearch={handleSearch}
        onFilter={handleFilter}
        onExport={handleExport}
      />
      <TransactionTable transactions={filteredTransactions} />
    </Box>
  );
};

export default Receipts;
