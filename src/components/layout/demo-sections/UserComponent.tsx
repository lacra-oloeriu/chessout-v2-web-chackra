import React from "react";
import { Text } from "@chakra-ui/react";
import { BasicContext } from "../../../util/basicContext";
import { ValContext } from "../../../App";

const UserComponent = () => {
  const appContext = React.useContext(BasicContext);

  const { state, update } = React.useContext(ValContext);
  console.log(state);

  let userComponent =
    state?.userLoggedIn === false ? (
      <Text>Time to login</Text>
    ) : (
      <Text>Hello: {state?.userName}</Text>
    );
  return userComponent;
};

export default UserComponent;
