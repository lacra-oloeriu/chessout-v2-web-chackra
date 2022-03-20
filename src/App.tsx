import {
  ChakraProvider,
  Container,
  Heading,
  HStack,
  theme,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { Outlet, Link } from "react-router-dom";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Container p={3}>
      <VStack>
        <Heading>Bookkeeper</Heading>
        <HStack>
          <Link to="/invoices">Invoices</Link> |{" "}
          <Link to="/expenses">Expenses</Link>
        </HStack>
      </VStack>
      <Outlet />
    </Container>
  </ChakraProvider>
);
