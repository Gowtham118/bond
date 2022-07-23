import React, { useContext, useEffect } from "react";
import { MetamaskContext } from "../src/connectMetamask/ConnectMetamask";
import Lend from "../src/lend/Lend";
import NavigationBar from "../src/navigation/NavigationBar";

const LendPage = () => {
  const { address, balance , provider } = useContext(MetamaskContext);
  return <Lend address={address} balance={balance} provider = {provider} />;
};

export default LendPage;
