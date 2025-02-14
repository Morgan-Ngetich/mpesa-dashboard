import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard";
import theme from "./theme";


const App = () => (
  <ChakraProvider theme={theme}>
    <Dashboard />
  </ChakraProvider>
);

export default App;
