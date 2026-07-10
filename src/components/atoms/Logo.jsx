import React from "react";
import iconMoneyWallet from "../../assets/icons/Money-Wallet.svg";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flex gap-1">
      <Link to={"/"}>
        <img
          src={iconMoneyWallet}
          alt="Logo"
          className="h-7 w-7 object-contain hover:scale-105 md:h-10 md:w-10"
        />
      </Link>
      <h1 className="text-primary mt-1 text-lg font-medium tracking-wide md:mt-2.5 md:text-2xl">
        E-Wallet
      </h1>
    </div>
  );
};

export default Logo;
