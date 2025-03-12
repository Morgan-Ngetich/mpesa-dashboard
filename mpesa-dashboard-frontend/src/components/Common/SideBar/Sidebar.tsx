import { useState, useEffect } from "react";
import { Box, Flex, IconButton, VStack, Text } from "@chakra-ui/react";
import {
  MdMenu,
  MdClose,
  MdDashboard,
  MdReceiptLong,
  MdInsights,
  MdNotifications,
  MdSettings,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

// Map icon names to actual icon components
const iconMap: Record<string, any> = {
  MdDashboard,
  MdReceiptLong,
  MdInsights,
  MdNotifications,
  MdSettings,
};

// Sidebar menu data
const SidebarData = [
  { title: "Dashboard", icon: "MdDashboard", path: "/dashboard" },
  { title: "Receipts", icon: "MdReceiptLong", path: "/dashboard/transactions" },
  { title: "Insights", icon: "MdInsights", path: "/dashboard/insights" },
  { title: "Notifications", icon: "MdNotifications", path: "/dashboard/notifications" },
  { title: "Settings", icon: "MdSettings", path: "/dashboard/settings" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Automatically collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1024);
    };

    handleResize(); // Set initial state based on screen width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Sidebar for Desktop */}
      <Box
        display={{ base: "none", md: "block" }}
        w={isCollapsed ? "80px" : "260px"}
        minW="80px"
        h="100vh"
        bg="green.600"
        color="white"
        p="4"
        transition="width 0.3s ease-in-out"
      >
        <Flex justify="space-between" align="center" mb="4">
          {!isCollapsed && (
            <Text fontSize="xl" fontWeight="bold">
              M-PESA
            </Text>
          )}
          <IconButton
            icon={isCollapsed ? <MdMenu /> : <MdClose />}
            aria-label="Toggle Sidebar"
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="ghost"
            color="white"
          />
        </Flex>

        <VStack spacing="2" align="stretch">
          {SidebarData.map((item, index) => (
            <SidebarItem
              key={index}
              title={item.title}
              icon={iconMap[item.icon]}
              path={item.path}
              isCollapsed={isCollapsed}
              isActive={location.pathname.startsWith(item.path)}
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
        zIndex={10}
      >
        {SidebarData.map((item, index) => (
          <SidebarItem
            key={index}
            title={item.title}
            icon={iconMap[item.icon]}
            path={item.path}
            isCollapsed={false}
            isActive={location.pathname.startsWith(item.path)}
          />
        ))}
      </Box>
    </>
  );
};

export default Sidebar;
