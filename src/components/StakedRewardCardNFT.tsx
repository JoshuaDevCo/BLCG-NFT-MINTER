import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import { Web3Button, useAddress, useContract, useTokenBalance, useOwnedNFTs } from "@thirdweb-dev/react"; // Import useOwnedNFTs
import { ERC721_CONTRACT_ADDRESS, NFTSTAKING_CONTRACT_ADDRESS, BLC_CONTRACT_ADDRESSES } from "../const/addresses";
import { ethers, BigNumber } from "ethers";
import { BsFillCalendar2WeekFill } from "react-icons/bs";

export default function StakedRewardCardNFT() {
  const address = useAddress();
  const [claimableReward, setClaimableReward] = useState<BigNumber>();

  const {
    contract: ERC721Contract
  } = useContract(ERC721_CONTRACT_ADDRESS, "nft-drop");
  const {
    contract: StakeContract
  } = useContract(NFTSTAKING_CONTRACT_ADDRESS);
  const {
    contract: ERC20Contract
  } = useContract(BLC_CONTRACT_ADDRESSES);

  const {
    data: ownedERC721Tokens,
    isLoading: ownedERC721TokensIsLoading
  } = useOwnedNFTs(ERC721Contract, address); // Use useOwnedNFTs

  const {
    data: ERC20TokenBalance,
    isLoading: ERC20TokenBalanceIsLoading
  } = useTokenBalance(ERC20Contract, address);

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

  return (
    <StakedRewardCardContainer className="glass">
      <CardContent>
        <CardHeader>Claimable Rewards</CardHeader>
        <CardValue>
          {!claimableReward
            ? "0"
            : ethers.utils.formatEther(claimableReward)}
        </CardValue>
        <br />
        <CardContent>
          <CardHeader>Account Balance</CardHeader>
          <CardValue>
            {!ERC20TokenBalanceIsLoading ? (
              <>{ERC20TokenBalance?.displayValue}</>
            ) : (
              <>0</>
            )}
          </CardValue>
        </CardContent>
        <Web3Button
          contractAddress={NFTSTAKING_CONTRACT_ADDRESS}
          action={(contract) => contract.call("claimRewards")}
          onSuccess={() => {
            alert("Claimed Rewards");
            setClaimableReward(ethers.constants.Zero);
          }}
          isDisabled={!claimableReward || claimableReward.isZero()}
        >
          Claim Rewards
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
