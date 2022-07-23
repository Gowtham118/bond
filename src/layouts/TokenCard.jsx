import React from "react";
import Image from "next/image";
import Badge from "./Badge";
import { useRouter } from "next/router";

const TokenCard = ({ token,balance }) => {
  const router = useRouter();
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
              className={`ml-3 ${isLend ? "bg-primary" : "bg-[#73A9AD]"}`}
              text={` ${isLend ? "Earn" : "Interest"} ${token.interest}%`}
            />
          </div>
          <div className="text-sm text-grey-500 font-semibold">
            Avl balance : {balance}
          </div>
        </div>
        <button
          className={`justify-end mr-4 bg-grey-450  text-bold text-white ${
            isLend ? "hover:bg-primary" : "hover:bg-[#73A9AD]"
          } rounded-32px py-2 px-4`}
        >
          {isLend ? "Lend" : "Borrow"}
        </button>
      </div>
    </div>
  );
};

export default TokenCard;
