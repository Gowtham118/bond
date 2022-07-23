import React from "react";
import { tokens } from "../data/tokens";
import Card from "../layouts/Card";
import ContentWrapper from "../layouts/ContentWrapper";
import DottedButton from "../layouts/DottedButton";
import TokenCard from "../layouts/TokenCard";
import NavigationBar from "../navigation/NavigationBar";

const Borrow = () => {
  return (
    <div className="flex flex-col items-center h-screen text-white md:px-8 lg:h-auto lg:min-h-screen bg-black-800">
      <NavigationBar />
      <div className="relative bg-black-900 p-2 overflow-y-scroll coingrid-scrollbar lg:overflow-y-auto md:p-10 rounded-t-[40px] md:rounded-[40px] overflow-hidden  flex flex-col  items-center flex-1 w-full lg:mb-6">
        <Card>
          <Card.Title>Borrow</Card.Title>
          <Card.Description>
            Borrow your desired token for low interest rates
          </Card.Description>
          <hr className="my-8 border-black-600" />
          <ContentWrapper
            label={"Available assets"}
            rightLabelClassName="text-primary"
          >
            <div className="flex flex-col gap-1 p-4">
              {/* If user connected to wallet */}
              <TokenCard token={tokens && tokens[1]}/>
              {/* If user not connected to wallet */}
              {/* <DottedButton>Connect Wallet</DottedButton> */}
            </div>
          </ContentWrapper>
        </Card>
      </div>
    </div>
  );
};

export default Borrow;
