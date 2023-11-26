import Card from "./Card";
import { Input, Text, useToast } from "@chakra-ui/react";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import NFTCard from "../nft-card";

import { LPStakingAddress, LPTokenAddress, tokenContractAddress } from "../../const/contractAddresses";

const StakingCard = () => {
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

  const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);
  const manualUsdRate = 0.000000002434; // Set your manual USD rate here
  const [usdPrice, setUsdPrice] = useState<number | null>(null);

  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 10000);
  }, []);

  useEffect(() => {
    // Calculate the USD price based on the manual rate
    if (tokenBalance?.value !== undefined) {
      const usdPrice = parseFloat(ethers.utils.formatEther(tokenBalance.value)) * manualUsdRate;
      setUsdPrice(usdPrice);
    }
  }, [tokenBalance, manualUsdRate]);


  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");

  function resetValue() {
    setStakeAmount("0");
    setUnstakeAmount("0");
  }

  const toast = useToast();

  return (
    <div className="flex justify-center items-center h-full">
    <Card extra={"w-full p-3"}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card bg-dark rounded-box p-4">
          <h4 className="mb-2 text-xl font-bold text-portal dark:text-white">
            STAKE {stakeTokenBalance?.symbol}
          </h4>
          <div className="cd-margin">
            <p className="nft-font text-white">
              To maximize your crypto assets stake your {stakeTokenBalance?.symbol} tokens.
            </p>
            <div className="mt-2 mb-2">
              <p className="text-sm font-bold text-white dark:text-white">Amount of {stakeTokenBalance?.symbol}</p>
              <Input
                type="number"
                max={stakeTokenBalance?.displayValue}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="input input-bordered input-success w-full max-w-xs"
              />
              <p className="text-sm font-bold text-white dark:text-white">  
                {!loadingTokenBalance && !loadingTokenBalance && tokenBalance?.value !== undefined ? (
          <>
            <h4 className="text-sm font-bold text-portal dark:text-white">
            Wallet Balance: {`${parseFloat(ethers.utils.formatEther(tokenBalance.value)).toLocaleString()} ${tokenBalance.symbol}`}
            </h4>
            {/* {usdPrice !== null && (
              <p className="coinprice text-portal">
              {`${usdPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} USD
              </p>
            )} */}
          </>
        ) : (
          <div className="skeleton-loader">
            <div className="loading-animation">Loading...</div>
          </div>
        )}
        </p>
            </div>
            <div>
              <Web3Button
                contractAddress={LPStakingAddress}
                action={async (contract) => {
                  await stakeTokenContract?.erc20.setAllowance(
                    LPStakingAddress,
                    stakeAmount
                  );

                  await contract.call("stake", [
                    ethers.utils.parseEther(stakeAmount),
                  ]);
                  resetValue();
                }}
                onSuccess={() =>
                  toast({
                    title: "Stake Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                }
              >
                Stake {stakeTokenBalance?.symbol}
              </Web3Button>
            </div>
          </div>
        </div>

        <div className="card bg-dark rounded-box p-4">
          <h4 className="mb-2 text-xl font-bold text-portal dark:text-white">
            UNSTAKE {stakeTokenBalance?.symbol}
          </h4>
          <div className="cd-margin">
            <p className="nft-font text-white">
              To access your staked {stakeTokenBalance?.symbol}, you can simply unstake.
            </p>
            <div className="mt-2 mb-2">
              <p>Amount of {stakeTokenBalance?.symbol}</p>
              <Input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                className="input input-bordered input-success w-full max-w-xs"
              />
              <p>
              {stakeInfo && stakeInfo[0] ? (
                 <h4 className="text-sm font-bold text-portal dark:text-white">
                 Staked LP Balance:  {parseFloat(
                  ethers.utils.formatEther(stakeInfo[0])
                ).toLocaleString()}{" "}
                {stakeTokenBalance?.symbol}
                 </h4>
            ) : (
              <span>0</span>
            )}
            </p>
            </div>
            <div>
              <Web3Button
                contractAddress={LPStakingAddress}
                action={async (contract) => {
                  await contract.call("withdraw", [
                    ethers.utils.parseEther(unstakeAmount),
                  ]);
                }}
                onSuccess={() =>
                  toast({
                    title: "Unstake Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                }
              >
                Unstake {stakeTokenBalance?.symbol}
              </Web3Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
};

export default StakingCard;
