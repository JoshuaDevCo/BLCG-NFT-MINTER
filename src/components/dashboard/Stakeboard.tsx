import Card from "./Card";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import NFTCard from "../nft-card";
import numeral from "numeral";

import { useToast } from "@chakra-ui/react";
import { LPStakingAddress, LPTokenAddress, tokenContractAddress } from "../../const/contractAddresses";

const Stakeboard = () => {
  const address = useAddress();
  const { contract: stakeTokenContract } = useContract(
    LPTokenAddress,
    "token"
  );
  const { contract: rewardTokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { contract: stakeContract } = useContract(
    LPStakingAddress,
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
    }, 1000);
  }, []);

  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");

  function resetValue() {
    setStakeAmount("0");
    setUnstakeAmount("0");
  }

  const toast = useToast();

  return (
    <Card extra={"w-full h-full p-3"}>
      <div className="flex w-full space-x-4">
        <div className="flex-grow card rounded-full bg-lightPrimary p-3 dark:bg-navy-700 p-4 text-center">
          <p className="text-sm text-portal">Reward Balance</p>
          <p className="text-base font-medium text-white dark:text-white">
            {stakeInfo && stakeInfo[0] ? (
              <span>
                {parseFloat(
                  ethers.utils.formatEther(stakeInfo[1])
                ).toLocaleString()}{" "}
                {rewardTokenBalance?.symbol}
              </span>
            ) : (
              <span>0</span>
            )}
          </p>
        </div>
        <div className="flex-grow card rounded-full bg-lightPrimary p-3 dark:bg-navy-700 p-4 text-center">
          <p className="text-sm text-portal">Staked LP Balance</p>
          <p className="text-base font-medium text-white dark:text-white">
            {stakeInfo && stakeInfo[0] ? (
              <span>
                {parseFloat(
                  ethers.utils.formatEther(stakeInfo[0])
                ).toLocaleString()}{" "}
                {stakeTokenBalance?.symbol}
              </span>
            ) : (
              <span>0</span>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Stakeboard;
