import React, { useEffect } from "react";
import ConnectMetamask from "../src/connectMetamask/ConnectMetamask";
import Lend from "../src/lend/Lend";
import NavigationBar from "../src/navigation/NavigationBar";

const LendPage = () => {
  const { address, balance , provider } = ConnectMetamask();
  
    
  return <Lend address={address} balance={balance} provider = {provider} />;
};

export default LendPage;
