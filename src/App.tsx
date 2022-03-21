import {
  ChakraProvider,
  Container,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import UserComponent from "./components/layout/demo-sections/UserComponent";
import theme from "./theme/default-dark";
import { ContextProvider } from "./util/basicContext";




export function App() {
  return (
    <ChakraProvider theme={theme}>
      <ContextProvider>
        <Container p={3}>
          <VStack>
            <HStack>
              <Heading>Bookkeeper</Heading>
              <div></div>
              <UserComponent />
            </HStack>
            <HStack>
              <Link to="/invoices">Invoices</Link> |{" "}
              <Link to="/expenses">Expenses</Link>
            </HStack>
          </VStack>
          <Outlet />
        </Container>
        i
      </ContextProvider>
    </ChakraProvider>
  );
}
