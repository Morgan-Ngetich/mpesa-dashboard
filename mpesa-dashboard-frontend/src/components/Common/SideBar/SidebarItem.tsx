import React from "react";
import { Flex, Icon, Text, useBreakpointValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";

interface SidebarItemProps {
  title: string;
  icon: IconType;
  path: string;
  isCollapsed: boolean;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, icon, path, isCollapsed, isActive }) => {
  // On desktop, show text; on mobile, only the icon
  const showText = useBreakpointValue({ base: false, md: true });
  // Adjust icon size based on breakpoint
  const iconSize = useBreakpointValue({ base: "28px", md: "23px" });
  const justifyContent = showText ? "flex-start" : "center";



  return (
    <NavLink to={path} style={{ textDecoration: "none", width: "100%" }}>
      <Flex
        align="center"
        justifyContent={justifyContent}
        p="3"
        borderRadius="lg"
        bg={isActive ? "whiteAlpha.300" : "transparent"}
        color={isActive ? "white" : "gray.200"}
        fontWeight={isActive ? "bold" : "normal"}
        transition="0.2s"
        _hover={{ bg: "whiteAlpha.200", color: "white" }}
        h="50px"
        mb={{base: "",  md: 5}}
      >
        <Icon as={icon} fontSize={iconSize} />
        {showText && !isCollapsed && <Text fontSize="md" ml="3">{title}</Text>}
      </Flex>
    </NavLink>
  );
};

export default SidebarItem;
