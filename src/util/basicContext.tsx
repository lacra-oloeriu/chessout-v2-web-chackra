import React from "react";
import { ContextState } from "./BasicContextInterface";

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
export const ContextProvider = ContextStateProvider;
