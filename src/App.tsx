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

import { BasicContext } from "./util/basicContext";
import { ContextState } from "./util/BasicContextInterface";

export const myContext: ContextState = {
  userLoggedIn: true,
  userName: "Bogdan Oloeriu",
};





export const App = () => (
  <ChakraProvider theme={theme}>
    <BasicContext.Provider value={myContext}>
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
      </Container>i
    </BasicContext.Provider>
  </ChakraProvider>
);
