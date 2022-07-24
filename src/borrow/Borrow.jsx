import React, { useContext } from "react";
import { MetamaskContext } from "../connectMetamask/ConnectMetamask";
import { tokens } from "../data/tokens";
import Card from "../layouts/Card";
import ContentWrapper from "../layouts/ContentWrapper";
import DottedButton from "../layouts/DottedButton";
import TokenCard from "../layouts/TokenCard";
import NavigationBar from "../navigation/NavigationBar";

const Borrow = () => {
  const {address} = useContext(MetamaskContext)
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
              {address ? (
                <>
                  <TokenCard token={tokens && tokens[1]} />
                  <TokenCard token={tokens && tokens[2]} isCPG={true} />
                </>
              ) : (
                <DottedButton>Connect Wallet</DottedButton>
              )}
            </div>
            <div className="text-sm p-4 text-grey-500 font-semibold">Blocks remaining for next payment : 57</div>
          </ContentWrapper>
        </Card>
      </div>
    </div>
  );
};

export default Borrow;
