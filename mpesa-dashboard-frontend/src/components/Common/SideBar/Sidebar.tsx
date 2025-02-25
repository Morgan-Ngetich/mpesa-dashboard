import { useState } from "react";
import { Box, Flex, IconButton, VStack, Text, HStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import {
  MdMenu,
  MdClose,
  MdDashboard,
  MdReceiptLong,
  MdInsights,
  MdNotifications,
  MdSettings,
} from "react-icons/md";
import SidebarItem from "./SidebarItem";

// Define icon mapping
const iconMap: Record<string, any> = {
  MdDashboard: MdDashboard,
  MdReceiptLong: MdReceiptLong,
  MdInsights: MdInsights,
  MdNotifications: MdNotifications,
  MdSettings: MdSettings,
};

// Sidebar items
const SidebarData = [
  { title: "Dashboard", icon: "MdDashboard", path: "/" },
  { title: "Receipts", icon: "MdReceiptLong", path: "/transactions" },
  { title: "Insights", icon: "MdInsights", path: "/insights" },
  { title: "Notifications", icon: "MdNotifications", path: "/notifications" },
  { title: "Settings", icon: "MdSettings", path: "/settings" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Get current route

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        display={{ base: "none", md: "block" }}
        w={isCollapsed ? "80px" : "250px"}
        h="100vh"
        bg="green.600"
        color="white"
        pl="4"
        transition="width 0.3s"
        borderLeftRadius={10}
        // position="fixed"
      >
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold" display={isCollapsed ? "none" : "block"}>
            M-PESA
          </Text>
          <IconButton
            icon={isCollapsed ? <MdMenu /> : <MdClose />}
            aria-label="Toggle Sidebar"
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="ghost"
            color="white"
          />
        </Flex>

        <VStack mt="6" spacing="2" align="stretch">
          {SidebarData.map((item, index) => (
            <SidebarItem
              key={index}
              title={item.title}
              icon={iconMap[item.icon]}
              path={item.path}
              isActive={location.pathname === item.path} // Check if active
            />
          ))}
        </VStack>
      </Box>

      {/* Mobile Bottom Navigation */}
      <Box
        display={{ base: "flex", md: "none" }}
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        bg="green.600"
        color="white"
        py="2"
        boxShadow="md"
        justifyContent="space-around"
      >
        {SidebarData.map((item, index) => (
          <SidebarItem
            key={index}
            title={item.title}
            icon={iconMap[item.icon]}
            path={item.path}
            isActive={location.pathname === item.path}
          />
        ))}
      </Box>
    </>
  );
};

export default Sidebar;
