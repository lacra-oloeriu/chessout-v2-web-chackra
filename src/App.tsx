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

export function createCtx<ContextState>(defaultValue: ContextState) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate,
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue);
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const [ctx, ContextStateProvider] = createCtx(myContext);
export const ValContext = ctx;

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <ContextStateProvider>
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
      </ContextStateProvider>
    </ChakraProvider>
  );
}
