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

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Flex h="100vh" py={20}>
          <VStack
            w="full"
            h="full"
            p={10}
            spacing={10}
            alignItems="flex-start"
          ></VStack>
         <Details/>
        </Flex>
      </Grid>
    </Box>
  </ChakraProvider>
);
