import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const ConnectMetamask = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [provider, setProvider] = useState(null);
  
  useEffect(() => {
    (async function connectMetamask() {
      try {
        if (window.ethereum.networkVersion !== "4") {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: "0x4"} ]
          });
        }
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "rinkeby"
          );
          //console.log(provider)
          // Prompt user for account connections
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          setAddress(await signer.getAddress());
          setBalance(await signer.getBalance());
          setProvider(provider);
          
          
        } else {
          toast.error("Please connect to Metamask");
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);
  
  //const a = new ethers.providers.Web3Provider(window.ethereum);
  return { address, balance: ethers.utils.formatEther(balance) , provider };
};

export default ConnectMetamask;
