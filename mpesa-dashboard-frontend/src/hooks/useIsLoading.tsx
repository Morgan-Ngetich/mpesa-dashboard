import { useState } from "react";
import { StatementData, uploadFile } from "../services/api"; // Import API function
import { setFileContent } from "../store/uploadSlice";
import { useDispatch } from "react-redux";

const useIsLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedData, setUploadedData] = useState<StatementData| null>(null);
  const dispatch = useDispatch()

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await uploadFile(file);
      console.log("Response after upload:", response);

      if (response) {
        setUploadedData(response);
        // Dispatch Redux action to store file content
        dispatch(setFileContent(response))
        return response;
      } else {
        throw new Error("Upload failed. No response received.");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, uploadedData, handleUpload };
};

export default useIsLoading;
