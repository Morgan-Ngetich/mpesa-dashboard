import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatementData } from "../services/api";


// TODO: ensure that the file contents is not any;
// NB: Its any because we are returnig the entire JSON data
interface UploadState {
  file: {
    name: string;
    size: number;
    type: string;
  } | null;
  fileContent: StatementData | null;
}

const initialState: UploadState = {
  file: null,
  fileContent: null,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File>) => {
      state.file = action.payload;
    },
    setFileContent: (state, action: PayloadAction<any>) => {
      console.log("Setting fileContent in Redux:", action.payload);
      state.fileContent = action.payload;
    },
    clearFile: (state) => {
      state.file = null;
      state.fileContent = null;
    },
  },
});

export const { setFile, setFileContent, clearFile } = uploadSlice.actions;
export default uploadSlice.reducer;
