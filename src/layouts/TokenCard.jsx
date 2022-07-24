import React, { useContext } from "react";
import web3 from "web3";
import Image from "next/image";
import Badge from "./Badge";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import ERC20_ABI from "../data/bond.json";
import ERC20 from "../data/erc20.json";
import { MetamaskContext } from "../connectMetamask/ConnectMetamask";
import { useNotification } from "../contexts/NotificationProvider";
const cpgTokenAdd = "0x150520503Ae8b49bFE5EFBefAFaBac86e093715B";


const toFixed = (n, precision = 4) => {
  if (n === undefined || n === null) return n;
  let p = 10 ** precision;
  let truncated = Math.trunc(n * p) / p;
  if (truncated === 0) {
    p = 10 ** (precision + 2);
    truncated = Math.trunc(n * p) / p;
  }
  return truncated;
};

const TokenCard = ({ token, isCPG = false }) => {
  const { balance } = useContext(MetamaskContext);
  const router = useRouter();
  const pushNotification = useNotification();
  const provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "rinkeby"
  );
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    "0x80a6E19DaDD16cbCec55d64a809bCC15CfBdDb98",
    ERC20_ABI.abi,
    signer
  );

  const sendEther = async () => {
    const amount = ethers.utils.parseEther("0.001");

    let tx = {
      to: "0x80a6E19DaDD16cbCec55d64a809bCC15CfBdDb98",
      value: amount,
      gasLimit: 5000000,
    };
    const txHash = await contract.signer.sendTransaction(tx);

    // if (txHash !== null) {
    //   pushNotification(
    //     "info",
    //     "Transaction Successful",
    //     "You have successfully sent 0.01 ether to the bond contract",
    //     "topR"
    //   );
    // }
    console.log(txHash);

  }
  const doBorrow = async () => {
    let tx = contract.borrow("ETH", "0x3D6438083F0aEbe48B4594bA6EF97bd6aFad1EA6", 100, { gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 100000 });

    console.log(tx);
  }
  const isLend = router.pathname === "/lend";
  return (
    <div className="flex flex-col items-center px-3 py-[14px] sm:flex-row bg-black-900 md:bg-black-800 rounded-xl">
      <div className="flex items-center self-start w-full gap-3 ">
        <Image src={token?.image} width={40} height={40} alt="btc logo" />

        <div className="flex flex-col flex-1">
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
            Avl balance : {isCPG ? "10000000000000" : `${toFixed(balance, 2)}`}
          </div>
        </div>
        <input
          type="number"
          inputMode="decimal"
          className="peer text-right w-[20%] border-b-[1px]  outline-none select-none font-[inherit] text-current bg-inherit font-bold hide-arrows"
          step="any"
          min={0}
        />
        <button
          onClick={() => {
            if (isLend) {
              sendEther();
            } else {
              doBorrow();
            }
          }}
          className={`justify-end mr-4 bg-grey-450  text-bold text-white ${isLend ? "hover:bg-primary" : "hover:bg-navigationblue"
            } rounded-32px py-2 px-4`}
        >
          {isLend ? "Lend" : "Borrow"}
        </button>
      </div>
    </div>
  );
};


export default TokenCard;

