import React from "react";
import { Text } from "@chakra-ui/react";
import { BasicContext } from "../../../util/basicContext";

const UserComponent = () => {
  const appContext = React.useContext(BasicContext);
  let userComponent =
    appContext?.userLoggedIn === false ? (
      <Text>Time to login</Text>
    ) : (
      <Text>
        Hello: {appContext?.userName} 
      </Text>
    );
  return userComponent;
};

export default UserComponent;
