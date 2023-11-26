import React, { useEffect, useState } from "react";
import { useAddress, useContract, useContractRead, useOwnedNFTs, useTokenBalance } from "@thirdweb-dev/react";
import Card from "./Card";
import { tokenContractAddress, tokenizedBronzeAddress, stakingAddress } from "../../const/contractAddresses";
import { MdBarChart } from "react-icons/md";
import { BigNumber, ethers } from "ethers";
import { Text, useToast } from "@chakra-ui/react";

const USD_RATE = 0.000000002434; // Add your manual USD rate here

export default function StakedNFTRewardWidget() {
  const address = useAddress();
  const [claimableReward, setClaimableReward] = useState<BigNumber>();
  const [usdValue, setUsdValue] = useState<number>(0);

  const {
    contract: ERC721Contract
  } = useContract(tokenizedBronzeAddress, "nft-drop");
  const {
    contract: StakeContract
  } = useContract(stakingAddress);
  const {
    contract: ERC20Contract
  } = useContract(tokenContractAddress);

  const {
    data: ownedERC721Tokens,
    isLoading: ownedERC721TokensIsLoading
  } = useOwnedNFTs(ERC721Contract, address);

  const {
    data: stakeInfo,
    refetch: refetchStakeInfo,
    isLoading: loadingStakeInfo,
  } = useContractRead(StakeContract, "getStakeInfo", [address]);

  const { data: tokenBalance, isLoading: ERC20TokenBalanceIsLoading } = useTokenBalance(ERC20Contract, address);

  useEffect(() => {
    if (!address || !StakeContract) return;

    async function getClaimableReward() {
      const claimableReward = await StakeContract?.call(
        "getStakeInfo",
        [address]
      );

      setClaimableReward(claimableReward[1]);
    }

    getClaimableReward();
  }, [address, StakeContract]);

  useEffect(() => {
    if (stakeInfo && stakeInfo[0] && tokenBalance) {
      const ethValue = parseFloat(ethers.utils.formatEther(stakeInfo[1]));
      const calculatedUsdValue = ethValue * USD_RATE;
      setUsdValue(calculatedUsdValue);
    }
  }, [stakeInfo, tokenBalance]);

  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 1000);
  }, []);

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
        <p className="font-dm text-sm font-medium text-portal">Active Mining Reward</p>
        {loadingStakeInfo || ERC20TokenBalanceIsLoading ? (
          <div className="skeleton-loader">
            <div className="loading-animation">Loading...</div>
          </div>
        ) : (
          <h4 className="text-xl font-bold text-white dark:text-white">
            {stakeInfo && stakeInfo[0] ? (
              <>
                {`${parseFloat(ethers.utils.formatEther(stakeInfo[1])).toLocaleString()} ${tokenBalance?.symbol}`}
                <br />
                <p className="coinprice text-portal"> {`$${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} USD</p>
              </>
            ) : (
              <p>0</p>
            )}
          </h4>
        )}
      </div>
    </Card>
  );
}
