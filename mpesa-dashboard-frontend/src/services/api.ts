import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export interface Customer {
  name: string;
  mobile_number: string;
}

export interface StatementPeriod {
  start: string;
  end: string;
}

export interface Statement {
  date: string;
  period: StatementPeriod;
}

export interface Transaction {
  receipt_no: string;
  completion_time: string;
  details: string;
  transaction_status: string;
  paid_in: string;
  withdraw: string;
  balance: string;
}

export interface TransactionsResponse {
  filename: string;
  customer: Customer;
  statement: Statement;
  transactions: Transaction[];
  disclaimer: string;
}

export const uploadFile = async (file: File): Promise<TransactionsResponse | null> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post<TransactionsResponse>(
      `${API_BASE_URL}/upload-file/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("Response from API:", response.data);

    return response.data; // Return the full structured response
  } catch (error) {
    console.error("Error uploading file:", error);
    return null; // Return null to handle errors gracefully
  }
};
