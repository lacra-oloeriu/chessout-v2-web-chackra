import { Box, ChakraProvider, Flex, Grid, theme } from "@chakra-ui/react";
import * as React from "react";
//import theme from "./theme";
import { ColorModeSwitcher } from "./components/layout/ColorModeSwitcher";
import Cart from "./components/layout/demo-sections/Cart";
import Details from "./components/layout/demo-sections/Details";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Flex
          h={{ base: "auto", md: "100vh" }}
          py={[0, 10, 20]}
          direction={{ base: "column", md: "row" }}
        >
          <Details />
          <Cart />
        </Flex>
      </Grid>
    </Box>
  </ChakraProvider>
);
