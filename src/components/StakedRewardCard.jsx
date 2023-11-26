import React, { useEffect, useState } from "react";
import { Text, useToast } from "@chakra-ui/react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import { Web3Button, useAddress, useContract, useContractRead, useTokenBalance,} from "@thirdweb-dev/react";

import {
  BLC_CONTRACT_ADDRESSES,
  STAKING_CONTRACT_ADDRESS,
  BLCG_CONTRACT_ADDRESSES,
} from "../const/addresses";

import { ethers } from "ethers";
import { BsFillCalendar2WeekFill } from "react-icons/bs";

export default function StakedRewardCard() {
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
    <StakedRewardCardContainer className="glass">
      <CardContent>
        <CardHeader>Staked Reward Balance</CardHeader>
        <CardValue isLoaded={!loadingStakeInfo && !loadingRewardTokenBalance}>
          {stakeInfo && stakeInfo[0] ? (
           <Value>
           {parseFloat(ethers.utils.formatEther(stakeInfo[1])).toLocaleString()} {rewardTokenBalance?.symbol}
         </Value>
          ) : (
            <Text>0</Text>
          )}
        </CardValue>
        <br/>
        <CardContent>
          <CardHeader>Total Staked Balance</CardHeader>
          <CardValue isLoaded={!loadingStakeInfo}>
            {stakeInfo && stakeInfo[0] ? (
             <Value>
             {parseFloat(ethers.utils.formatEther(stakeInfo[0])).toLocaleString()} {stakeTokenBalance?.symbol}
           </Value>
            ) : (
              <Text>0</Text>
            )}
          </CardValue>
        </CardContent>
        <br/>
        <Web3Button
            contractAddress={STAKING_CONTRACT_ADDRESS}
            action={async (contract) => {
              await contract.call("claimRewards");
              resetValue();
            }}
            onSuccess={() =>
              toast({
                title: "Rewards Claimed",
                status: "success",
                duration: 5000,
                isClosable: true,
              })
            }
          >
            Claim  {rewardTokenBalance?.symbol} Reward
          </Web3Button>
      </CardContent>
    </StakedRewardCardContainer>
  );
}

const StakedRewardCardContainer = styled.div`
  ${cardStyles};
  padding: 54px;
  border: 2px solid gold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: #ffc107;
    color: black;
    svg {
      color: white;
    }
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardHeader = styled.h5`
  font-size: 0.6rem;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const CardValue = styled.div`
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const Value = styled.p`
  font-size: 1.5rem;
  text-transform: uppercase;
  margin: 0;
`;

const ClaimButtonContainer = styled.div`
  margin-top: 20px;
`;

const Icon = styled(BsFillCalendar2WeekFill)`
  font-size: 1.5rem;
  color: #ffc107;
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    border: 2px solid gold;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #ffc107;
      color: black;
      svg {
        color: white;
      }
    }
    .logo {
      background-color: #000000;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
        color: #ffc107;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      h5 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
      }
      h2 {
        font-size: 1.5rem;
        text-transform: uppercase;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
