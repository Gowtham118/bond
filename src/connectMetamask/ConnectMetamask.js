import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const ConnectMetamask = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
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
          // Prompt user for account connections
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          setAddress(await signer.getAddress());
          setBalance(await signer.getBalance());
        } else {
          toast.error("Please connect to Metamask");
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);
  return { address, balance: ethers.utils.formatEther(balance) };
};

export default ConnectMetamask;
