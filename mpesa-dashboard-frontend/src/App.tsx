import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";  // Import Redux Provider
import { store } from "./store/store";  // ✅ Import store
import Layout from "./layouts/Layout";
import Home from "./pages/HomePage";
import NotFound from "./components/Common/NotFound";
import ReceiptsPage from "./pages/ReceiptsPage";
import Transactions from "./pages/Transactions";
import UploadFile from "./pages/UploadFile";

const App = () => {
  return (
    <Provider store={store}>  {/* ✅ Wrap App with Redux Provider */}
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<UploadFile />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="insights" element={<Transactions />} />
              <Route path="transactions" element={<ReceiptsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
