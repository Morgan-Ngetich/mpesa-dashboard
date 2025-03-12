import { Outlet } from "react-router-dom";
import { Flex, Spinner, Box } from "@chakra-ui/react";
import Sidebar from "../components/Common/SideBar/Sidebar";



const Layout = () => {
  const isLoading = false; // Replace with actual loading state if needed
  // const isLarge = useBreakpointValue({base: false, md: true})

  return (
    <Flex minH="100vh">
      {/* Sidebar - Fixed in place */}
      <Sidebar />

      {/* Main Content Area - Scrollable */}
      <Box flex="1" overflowY="auto" height="100vh" p={{base: 0, md: 4}}>
        {isLoading ? (
          <Flex justify="center" align="center" height="100vh">
            <Spinner size="xl" color="ui.main" />
          </Flex>
        ) : (
          <Outlet />
        )}
      </Box>
    </Flex>
  );
};

export default Layout;
