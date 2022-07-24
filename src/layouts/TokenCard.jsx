import React, { useContext } from "react";
import Image from "next/image";
import Badge from "./Badge";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import ERC20_ABI from "../data/bond.json";
import { MetamaskContext } from "../connectMetamask/ConnectMetamask";
import { useNotification } from "../contexts/NotificationProvider";

const TokenCard = ({ token }) => {
  const { balance } = useContext(MetamaskContext);
  const router = useRouter();
  const pushNotification = useNotification()
  let {} = useContext(MetamaskContext);
  //provider = new ethers.providers.Web3Provider(window.ethereum, "rinkeby");
  //ethereum.send("eth_requestAccounts", []);
  const provider = new ethers.providers.Web3Provider(window.ethereum, "rinkeby");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    ERC20_ABI.abi,
    signer
  );
  const sendEther = async () => {
    const amount = ethers.utils.parseEther("0.01");
    let tx ={
      to: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      value: amount,
    }
    const txHash = await (contract.signer).sendTransaction(tx);
    
    
      if(txHash!==null){
        pushNotification("info", "Transaction Successful", "You have successfully sent 0.01 ether to the bond contract","topR")
      }
    console.log(txHash);
  } 
  const isLend = router.pathname === "/lend";
  return (
    <div className="flex flex-col items-center px-3 py-[14px] sm:flex-row bg-black-900 md:bg-black-800 rounded-xl">
      <div className="flex items-center self-start w-full gap-3 ">
        <Image src={token?.image} width={40} height={40} alt="btc logo" />

        <div className="flex flex-col flex-1 ">
          <div className="flex">
            <span className="text-base font-semibold tracking-wide md:text-xl">
              {token.symbol}
            </span>
            <Badge
              className={`ml-3 ${isLend ? "bg-primary" : "bg-navigationblue"}`}
              text={` ${isLend ? "Earn" : "Interest"} ${token.interest}%`}
            />
          </div>
          <div className="text-sm text-grey-500 font-semibold">
            Avl balance : {balance}
          </div>
        </div>
        <button
          onClick={() => {
            if (isLend) {
              sendEther();
            } else {
              //this.doBorrow();
            }
          }}
          className={`justify-end mr-4 bg-grey-450  text-bold text-white ${
            isLend ? "hover:bg-primary" : "hover:bg-navigationblue"
          } rounded-32px py-2 px-4`}
        >
          {isLend ? "Lend" : "Borrow"}
        </button>
      </div>
    </div>
  );
};

export default TokenCard;
