import React from "react";
import Card from "../layouts/Card";
import ContentWrapper from "../layouts/ContentWrapper";
import TokenCard from "../layouts/TokenCard";
import NavigationBar from "../navigation/NavigationBar";
import { tokens } from "../data/tokens";
import DottedButton from "../layouts/DottedButton";
import ConnectMetamask from "../connectMetamask/ConnectMetamask";

export default function Lend({ address, balance }) {
  return (
    <div className="flex flex-col items-center h-screen text-white md:px-8 lg:h-auto lg:min-h-screen bg-black-800">
      <NavigationBar />
      <div className="relative bg-black-900 p-2 overflow-y-scroll coingrid-scrollbar lg:overflow-y-auto md:p-10 rounded-t-[40px] md:rounded-[40px] overflow-hidden  flex flex-col  items-center flex-1 w-full lg:mb-6">
        <Card>
          <Card.Title>Lend</Card.Title>
          <Card.Description>
            Lend money to start earning interest
          </Card.Description>
          <hr className="my-8 border-black-600" />
          <ContentWrapper
            label={"Your assets"}
            rightLabelClassName="text-primary"
          >
            <div className="flex flex-col gap-1 p-4">
              {/* If user connected to wallet */}
              {address ? (
                <TokenCard balance={balance} token={tokens && tokens[0]} />
              ) : (
                <DottedButton onClick={ConnectMetamask} >Connect Wallet</DottedButton>
              )}
              {/* If user not connected to wallet */}
            </div>
          </ContentWrapper>
        </Card>
      </div>
    </div>
  );
}
