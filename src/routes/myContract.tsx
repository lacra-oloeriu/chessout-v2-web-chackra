import { Button, Divider, HStack, Input, Text, VStack } from "@chakra-ui/react";
import {
  AbiRegistry,
  Address,
  BytesValue,
  Interaction,
  NetworkConfig,
  ProxyProvider,
  SmartContract,
  SmartContractAbi,
} from "@elrondnetwork/erdjs/out";

import {
  transactionServices,
  useGetAccountInfo,
  useGetPendingTransactions,
  refreshAccount,
  useGetNetworkConfig,
} from "@elrondnetwork/dapp-core";

import * as React from "react";
import { NavLink } from "react-router-dom";
import { getInvoices } from "../data";
//import * from "../../my-contract.abi.json"
let invoices = getInvoices();

async function getTournamentInfoList(): Promise<string[]> {
  try {
    let provider = new ProxyProvider("https://devnet-gateway.elrond.com");
    await NetworkConfig.getDefault().sync(provider);

    let stringAddress =
      "erd1qqqqqqqqqqqqqpgq4mhvpxl9w49z63ppuwfr74nwvudd0zdtd8ssnfgknq";
    let address = new Address(stringAddress);

    const abiLocation = `${process.env.PUBLIC_URL}/my-contract.abi.json`;

    let abiRegistry = await AbiRegistry.load({
      urls: [abiLocation],
    });
    let abi = new SmartContractAbi(abiRegistry, [`MyContract`]);

    let contract = new SmartContract({
      address: address,
      abi: abi,
    });

    let interaction: Interaction = contract.methods.getTournamentInfoList([
      BytesValue.fromUTF8("tournament-01"),
      BytesValue.fromUTF8("tournament-02"),
    ]);

    let queryResponse = await contract.runQuery(
      provider,
      interaction.buildQuery()
    );
    let response = interaction.interpretQueryResponse(queryResponse);
    let myType = response.firstValue.getType();

    let myList = response.firstValue.valueOf();

    let myReturnList: string[] = [];

    myList.forEach((element: { tournament_id: any; sing_in_price: number }) => {
      let bufferedId = element.tournament_id;

      let stringVal = bufferedId.toString();
      myReturnList.push(stringVal);

      let signInPrice = element.sing_in_price.toFixed();
    });
    return myReturnList;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function MyContract() {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const isLoggedIn = Boolean(address);

  const initTournamentIdList: string[] = ["tournament-01", "tournament-02"];
  const initContractIdList: string[] = [];
  const [tournamentIdList, setTournamentIdList] = React.useState(
    initTournamentIdList
  );
  const [contractIdList, setContractIdList] = React.useState(
    initContractIdList
  );

  React.useEffect(() => {
    async function fetchContractData() {
      let cData = await getTournamentInfoList();
      setContractIdList(cData);
    }

    fetchContractData();
  }, []);

  const { sendTransactions } = transactionServices;

  const createNewTournament = async () => {
    const createTournamentTransaction = {
      data: "createTournament tournament-03 EGLD 11",
      receiver:
        "erd1qqqqqqqqqqqqqpgq4mhvpxl9w49z63ppuwfr74nwvudd0zdtd8ssnfgknq",
    };
  };

  let idList = tournamentIdList.map((id) => <Text key={id}>{id}val</Text>);

  let contractList = contractIdList.map((id) => <Text key={id}>{id}val</Text>);

  let createButton = isLoggedIn ? (
    <Button onClick={createNewTournament}>Create</Button>
  ) : (
    ""
  );

  return (
    <VStack alignItems={"flex-start"}>
      <HStack>
        <Text>My Contract</Text>
        <Button
          onClick={async () => {
            let newIdList = await getTournamentInfoList();
            setContractIdList(newIdList);
          }}
        >
          Query contract
        </Button>
      </HStack>
      {idList}
      <Divider />
      <HStack>
        <Input />
        {createButton}
      </HStack>
      <Divider />
      <Text>Data from contract</Text>
      {contractList}
    </VStack>
  );
}
