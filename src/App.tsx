import {
  ChakraProvider,
  Container,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "./components/chessout/navBar";
import UserComponent from "./components/layout/demo-sections/UserComponent";
import theme from "./theme/default-dark";
import { ContextProvider } from "./util/basicContext";
import { DappProvider } from "@elrondnetwork/dapp-core";

const environment = "devnet";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <ContextProvider>
        <DappProvider
          environment={environment}
          customNetworkConfig={{ name: "customConfig", apiTimeout: 6000 }}
          completedTransactionsDelay={200}
        >
          <Container p={3}>
            <VStack>
              <NavBar />
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
        </DappProvider>
      </ContextProvider>
    </ChakraProvider>
  );
}
