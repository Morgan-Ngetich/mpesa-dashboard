import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export interface Customer {
  name: string;
  mobile_number: string;
}

export interface Statement {
  date: string;
  period: {
    start: string;
    end: string;
  };
}

export interface SummaryItem {
  transaction_type: string;
  paid_in: number;
  paid_out: number;
}

export interface Transaction {
  receipt_no: string;
  completion_time: string;
  details: string;
  transaction_status: string;
  paid_in: number;
  balance: number;
  withdraw: number;
}

export interface StatementData {
  customer: Customer;
  disclaimer: string;
  filename: string;
  message: string;
  statement: Statement;
  summary: SummaryItem[];
  transactions: Transaction[];
}

export const uploadFile = async (file: File): Promise<StatementData | null> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post<StatementData>(
      `${API_BASE_URL}/api/upload-file/`,
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