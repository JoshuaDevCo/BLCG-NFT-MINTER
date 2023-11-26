import React, { useEffect, useState } from "react";
import { useAddress, useContract, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import Card from "./Card";
import { 
  BLC_CONTRACT_ADDRESSES,
  STAKING_CONTRACT_ADDRESS,
  BLCG_CONTRACT_ADDRESSES } from "../../const/addresses";
import { MdBarChart } from "react-icons/md";
import { ethers } from "ethers";
import { Text, useToast } from "@chakra-ui/react";

export default function TotalStakedWidget() {
  const address = useAddress();
  const { contract: stakeTokenContract } = useContract(
    BLC_CONTRACT_ADDRESSES,
    "token"
  );
  const { contract: rewardTokenContract } = useContract(
    BLCG_CONTRACT_ADDRESSES,
    "token"
  );
  const { contract: stakeContract } = useContract(
    STAKING_CONTRACT_ADDRESS,
    "custom"
  );

  const {
    data: stakeInfo,
    refetch: refetchStakeInfo,
    isLoading: loadingStakeInfo,
  } = useContractRead(stakeContract, "getStakeInfo", [address]);

  const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
    useTokenBalance(stakeTokenContract, address);

  const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
    useTokenBalance(rewardTokenContract, address);

  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 10000);
  }, []);

  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");

  function resetValue() {
    setStakeAmount("0");
    setUnstakeAmount("0");
  }

  const toast = useToast();

  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            <MdBarChart className="h-7 w-7" />
          </span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-portal">Total Staked Balance</p>
        {loadingStakeInfo ? (
          <div className="skeleton-loader">
            <div className="loading-animation">Loading...</div>
          </div>
        ) : (
          <h4 className="text-xl font-bold text-white dark:text-white">
            {stakeInfo && stakeInfo[0] ? (
              `${parseFloat(ethers.utils.formatEther(stakeInfo[0])).toLocaleString()} ${stakeTokenBalance?.symbol}`
            ) : (
              <p>0</p>
            )}
          </h4>
        )}
      </div>
    </Card>
  );
}
