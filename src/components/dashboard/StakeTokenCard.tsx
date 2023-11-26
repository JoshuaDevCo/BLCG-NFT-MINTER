import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Stakeboard from "./Stakeboard";
import StakingCard from "./StakingCard";
import StakeEvents from "./StakeEvents";

// import image1 from "../assets/04.jpg";
// import image2 from "../assets/05.png";
// import image3 from "../assets/06.png";

export default function StakeTokenCard() {

  return (
    <div className="rounded-[12px] border-[2px] border-portal bg-clip-border shadow-md shadow-[#27ff0059] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none !p-[14px] mt-4 mb-4">
     <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-portal dark:text-white">
          Liquidity Staking 
        </h4>
        <p className="mt-2 nft-font text-white">
        Liquidity staking is a strategic play in decentralized finance (DeFi), involving the provision of cryptocurrency assets to liquidity pools.</p>
      </div>
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-2">
        <div className="col-span-4 lg:!mb-0">
        <Stakeboard />
        </div>

        <div className="col-span-3 lg:!mb-0">
          <StakingCard />
        </div>
      </div>
      <StakeEvents/>
    </div>
  );
}
