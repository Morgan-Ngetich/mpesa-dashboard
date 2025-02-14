import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f5faff",
      100: "#e1f0ff",
      200: "#b3d9ff",
      300: "#85c2ff",
      400: "#57abff",
      500: "#2a94ff",
      600: "#0077e6",
      700: "#005bb4",
      800: "#003f82",
      900: "#002450",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.900",
      },
    },
  },
});

export default theme;
