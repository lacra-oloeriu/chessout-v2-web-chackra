import { Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
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
import * as React from "react";
import { NavLink } from "react-router-dom";
import { getInvoices } from "../data";
//import * from "../../my-contract.abi.json"
let invoices = getInvoices();

async function getTournamentInfoList() {
  try {
    let provider = new ProxyProvider("https://devnet-gateway.elrond.com");
    await NetworkConfig.getDefault().sync(provider);

    let stringAddress =
      "erd1qqqqqqqqqqqqqpgq4mhvpxl9w49z63ppuwfr74nwvudd0zdtd8ssnfgknq";
    let address = new Address(stringAddress);

    const abiLocation = `${process.env.PUBLIC_URL}/my-contract.abi.json`

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
    console.log(response);

    console.log("--------------------List iteration -------------");
    let myType = response.firstValue.getType();
    console.log(myType);

    let myList = response.firstValue.valueOf();
    console.log(myList);

    myList.forEach((element: { tournament_id: any; sing_in_price: number }) => {
      let bufferedId = element.tournament_id;

      let stringVal = bufferedId.toString();
      console.log(stringVal);

      let signInPrice = element.sing_in_price.toFixed();
      console.log(signInPrice);
    });
    // End of queryCrowdFund()
    let stamp = Date();
    console.log("End of query crowdfund " + stamp);
  } catch (error) {
    console.log(error);
  }
}

export default function MyContract() {
  const initTournamentIdList: string[] = ["tournament-01", "tournament-02"];
  const initContractIdList: string[] = [];
  const [tournamentIdList, setTournamentIdList] = React.useState(
    initTournamentIdList
  );
  const [contractIdList, setContractIdList] = React.useState(
    initContractIdList
  );

  let idList = tournamentIdList.map((id) => (
    <NavLink to={`/invoices/${id}`} key={id}>
      {id}val
    </NavLink>
  ));

  return (
    <VStack alignItems={"flex-start"}>
      <HStack>
        <Text>My Contract</Text>
        <Button
          onClick={async () => {
            await getTournamentInfoList();
          }}
        >
          Query contract
        </Button>
      </HStack>
      {idList}
      <Divider />
      <Text>Data from contract</Text>
    </VStack>
  );
}
