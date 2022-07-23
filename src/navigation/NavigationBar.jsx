import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UilUserCircle } from "@iconscout/react-unicons";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import ConnectMetamask, { MetamaskContext } from "../connectMetamask/ConnectMetamask";

const ActiveTabIndicator = () => (
  <svg
    height="6"
    viewBox="0 0 64 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 6C0 4.89543 0.895431 4 2 4H24C26.2091 4 27.8897 1.75663 29.7587 0.578836C30.3129 0.229623 31.0416 0 32 0C32.9584 0 33.6871 0.229623 34.2413 0.578836C36.1103 1.75663 37.7909 4 40 4H62C63.1046 4 64 4.89543 64 6H0Z"
      fill="#2CC995"
    />
  </svg>
);

const NavItem = ({ route, Icon, label }) => {
  const { pathname } = useRouter();
  const [color, setColor] = useState("#FAFAFA");

  useEffect(() => {
    if (pathname === route) {
      setColor("#2CC995");
    }
  }, [pathname, route]);

  return (
    <Link href={route} passHref>
      <a className="relative flex items-center h-full p-4">
        {/* {pathname === route && (
          <ActiveTabIndicator className="absolute bottom-0 left-0 right-0 flex w-full self-end mx-auto mt-auto h-[7px]" />
        )} */}
        <span
          className={`flex  items-center gap-4 text-lg font-semibold ${
            pathname === route && `text-primary`
          }`}
        >
          <Icon color={color} className="w-10 h-10" />
          {label}
        </span>
      </a>
    </Link>
  );
};

function NavigationBar() {
  const { address } = useContext(MetamaskContext);

  return (
    <nav className="grid items-center w-full grid-cols-2 lg:grid-cols-[0.5fr_1fr_0.5fr] lg:px-12 ">
      <span className="px-3 py-4 xs:px-0 xs:py-6">
        <div  className="hover:cursor-pointer">
          <a className="flex items-center w-max">
            <div className="text-primary font-bold text-4xl tracking-[8px] leading-6">
              BOND
            </div>
          </a>
        </div>
      </span>
      <div className="items-center justify-center hidden h-full lg:gap-10 xl:gap-18 lg:flex">
        <NavItem route="/borrow" Icon={GiReceiveMoney} label="Borrow" />
        <NavItem route="/lend" Icon={GiPayMoney} label="Lend" />
      </div>
      <div className="flex items-center justify-end">
        {address && address.length ? (
          <div className="flex align-middle justify-center">
            <div className=" text-white text-lg font-bold bg-grey-600 text-center w-36 rounded-2xl px-2">
              {address.slice(0, 8)}...
            </div>
            <UilUserCircle className="w-8 h-8" />
          </div>
        ) : (
          <button className="flex  items-center gap-4 text-lg font-semibold text-white">
            {" "}
            Connect <UilUserCircle />
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
