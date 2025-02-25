import { Flex, Icon, Text, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";

interface SidebarItemProps {
  title: string;
  icon: IconType;
  path: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, icon, path, isActive }) => {
  const navigate = useNavigate();
  
  // Hide text on mobile devices
  const showText = useBreakpointValue({ base: false, md: true });
  const iconSize = useBreakpointValue({ base: "28px", md: "20px" }); // Larger icon for mobile
  const justifyContent = showText ? "flex-start" : "center"; // Center icon when text is hidden
  const borderRadius = useBreakpointValue({ base: "xl", md: "3xl" }); // Different border radius for mobile and desktop

  return (
    <Flex
      align="center"
      justify={justifyContent}
      p="3"
      my="2"
      w={showText ? "full" : "50px"} // Adjust width for better alignment
      h="50px" // Ensure consistent height
      borderRadius={borderRadius}
      cursor="pointer"
      bg={isActive ? "white" : "transparent"}
      color={isActive ? "black" : ""}
      _hover={{ bg: "gray.300", color: "black" }}
      onClick={() => navigate(path)}
    >
      <Icon as={icon} fontSize={iconSize} />
      {showText && <Text fontSize="md" ml="3">{title}</Text>}
    </Flex>
  );
};

export default SidebarItem;
