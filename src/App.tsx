import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/layout/ColorModeSwitcher";
import { Logo } from "./components/layout/Logo";
import Details from "./components/layout/demo-sections/Details";
import Cart from "./components/layout/demo-sections/Cart";

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
