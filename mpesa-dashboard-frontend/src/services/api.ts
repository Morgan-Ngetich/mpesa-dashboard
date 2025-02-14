import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

interface TransactionsResponse {
  transactions: any[]; // Change `any[]` to the actual structure if known
}

export const uploadFile = async (file: File): Promise<any[]> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<TransactionsResponse>(
    `${API_BASE_URL}/upload-file/`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data.transactions;
};
