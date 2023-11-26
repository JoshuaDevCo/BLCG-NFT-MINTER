import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAddress, useContract, useTokenBalance, useOwnedNFTs, Web3Button } from "@thirdweb-dev/react";
import { BLC_CONTRACT_ADDRESSES, ERC721_CONTRACT_ADDRESS, NFTSTAKING_CONTRACT_ADDRESS } from "../const/addresses";
import { BigNumber, ethers } from "ethers";
import StakedRewardCardNFT from "./StakedRewardCardNFT";
import StakeNFTGrid from "./stake-nft-grid";
import StakedNFTContainer from "./staked-nft-container";
import { cardStyles } from "./ReusableStyles";

export default function StakedCardNFT() {
  const address = useAddress();
  const [claimableReward, setClaimableReward] = useState<BigNumber>();

  const { contract: ERC721Contract } = useContract(ERC721_CONTRACT_ADDRESS, "nft-drop");
  const { contract: StakeContract } = useContract(NFTSTAKING_CONTRACT_ADDRESS);
  const { contract: ERC20Contract } = useContract(BLC_CONTRACT_ADDRESSES);

  const { data: ownedERC721Tokens, isLoading: ownedERC721TokensIsLoading } = useOwnedNFTs(ERC721Contract, address);
  const { data: ERC20TokenBalance, isLoading: ERC20TokenBalanceIsLoading } = useTokenBalance(ERC20Contract, address);

  useEffect(() => {
    if (!address || !StakeContract) return;

    async function getClaimableReward() {
      const claimableReward = await StakeContract?.call("getStakeInfo", [address]);
      setClaimableReward(claimableReward[1]);
    }

    getClaimableReward();
  }, [address, StakeContract]);

  const [selectedNFTs, setSelectedNFTs] = useState<number[]>([]);

  function handleSelectNFT(nftId: number) {
      if (selectedNFTs.includes(nftId)) {
          setSelectedNFTs(selectedNFTs.filter((id) => id !== nftId));
      } else {
          setSelectedNFTs([...selectedNFTs, nftId]);
      };
  }

  async function stakeNFT(nftId: number[]) {
    if (!address) return;
    
    const isApproved = await ERC721Contract?.isApproved(
        address,
        NFTSTAKING_CONTRACT_ADDRESS
    );

    if (!isApproved) {
        await ERC721Contract?.setApprovalForAll(
            NFTSTAKING_CONTRACT_ADDRESS,
            true
        );
    };

    await StakeContract?.call("stake", [nftId]);
};

const [selectStakedNFT, setSelectStakedNFT] = useState<number[]>([]);

    function handleSelectStakedNFT(nftId: number) {
        if (selectStakedNFT.includes(nftId)) {
            setSelectStakedNFT(selectStakedNFT.filter((id) => id !== nftId));
        } else {
            setSelectStakedNFT([...selectStakedNFT, nftId]);
        };
    };



  return (
    <CardContainer>
      <StakedRewardCardNFT />
      <StakedBalanceCard className="glass">
          <StakeNFTGrid isLoading={ownedERC721TokensIsLoading} data={ownedERC721Tokens} />
      </StakedBalanceCard>

      <StakedBalanceCard className="glass">
          <StakedNFTContainer />
      </StakedBalanceCard>
    </CardContainer>
  );
}

const CardContainer = styled.section`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StakedBalanceCard = styled.div`
  ${cardStyles};
  border: 2px solid gold;
  justify-content: space-between;
  align-items: center;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: #161204;
    color: #ffffff;
    svg {
      color: white;
    }
  }

  .cd-margin {
    margin-top: 20px;
  }
};
`;
