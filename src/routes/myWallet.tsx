import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { DappUI, logout, useGetAccountInfo } from "@elrondnetwork/dapp-core";
import React from "react";

export default function MyWallet() {
  const { address } = useGetAccountInfo();
  const { WebWalletLoginButton, WalletConnectLoginButton } = DappUI;

  const isLoggedIn = Boolean(address);

  let closeWallet = (
    <Button onClick={() => logout(`${window.location.origin}/wallet`)}>
      {" "}
      Close
    </Button>
  );

  let connectionInfo = isLoggedIn ? (
    <Text>Address: {address}</Text>
  ) : (
    <Text>Not connected</Text>
  );

  let connectWallet = isLoggedIn ? (
    closeWallet
  ) : (
    <HStack>
      <Button>
        <WebWalletLoginButton
          callbackRoute="/wallet"
          loginButtonText={"Web wallet"}
        />
      </Button>
      <Button>
        <WalletConnectLoginButton
          callbackRoute="/wallet"
          loginButtonText={"Maiar"}
        />
      </Button>
    </HStack>
  );

  return (
    <VStack alignItems={"flex-start"}>
      <Text>Wallet</Text>
      {connectionInfo}
      {connectWallet}
    </VStack>
  );
}
