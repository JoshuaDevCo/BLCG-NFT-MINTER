import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import {
  Web3Button,
  useAddress,
  useClaimIneligibilityReasons,
  useClaimedNFTSupply,
  useContract,
  useContractMetadata,
  useNFT,
  useOwnedNFTs,
  useTotalCount,
  useActiveClaimConditionForWallet,
  useTotalCirculatingSupply,
  MediaRenderer,
} from "@thirdweb-dev/react";
import { tokenizedBronzeAddress } from "../const/contractAddresses";
import TimerGrid from "./dashboard/TimerGrid";
import Mint from "./dashboard/Mint";
import { ethers } from "ethers";

export default function NFTMembership() {
  const address = useAddress();
  const maxClaimQuantity = 2;
  const { contract } = useContract(tokenizedBronzeAddress, "nft-drop");

  const { data: nft, isLoading, error } = useNFT(contract, "0");
  const {
    data: contractMetadata,
    isLoading: contractMetadataisLoading,
  } = useContractMetadata(contract);

  const {
    data: totalSupply,
    isLoading: totalSupplyisLoading,
  } = useTotalCount(contract);

  const {
    data: activeClaimPhase,
    isLoading: isActiveClaimPhaseLoading,
  } = useActiveClaimConditionForWallet(contract, address);

  const {
    data: claimIneligibilityReasons,
    isLoading: isClaimIneligibilityReasonsLoading,
  } = useClaimIneligibilityReasons(contract, {
    walletAddress: address || "",
    quantity: 1,
  });

  const [claimQuantity, setClaimQuantity] = useState(1);
  const increment = () => {
    if (claimQuantity < maxClaimQuantity) {
      setClaimQuantity(claimQuantity + 1);
    }
  };
  const decrement = () => {
    if (claimQuantity > 1) {
      setClaimQuantity(claimQuantity - 1);
    }
  };

  const {
    data: totalClaimed,
    isLoading: isTotalClaimedLoading,
  } = useTotalCirculatingSupply(contract);

  const maxClaimamble = parseInt(
    activeClaimPhase?.maxClaimablePerWallet || "0"
  );

  const {
    data: ownedNFTs,
    isLoading: ownedNFTsIsLoading,
  } = useOwnedNFTs(contract, address);

  const {
    data: totalClaimedSupply,
    isLoading: totalClaimedSupplyisLoading,
  } = useClaimedNFTSupply(contract);

  if (contractMetadataisLoading)
    return (
      <SlidingCard>
        <ImageContainer>
          <p>Loading....</p>
        </ImageContainer>
        <CardContent>
          <h2>Loading....</h2>
          <h5>Loading....</h5>
        </CardContent>
      </SlidingCard>
    );

  if (error || !nft)
    return (
      <SlidingCard>
        <ImageContainer>
          <p>Error....</p>
        </ImageContainer>
        <CardContent>
          <h2>Error....</h2>
          <h5>Error....</h5>
        </CardContent>
      </SlidingCard>
    );

  return (
    <SlidingCard className="rounded-[12px] border-[2px] border-portal bg-clip-border shadow-md shadow-[#27ff0059] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none !p-[14px] mt-4 mb-4">
      <ImageContainer>
        <img src={contractMetadata?.image} alt="Token Logo" />
      </ImageContainer>
      <CardContent>
        <h2 className="card-title text-portal nft-head">
        {contractMetadata?.name}        
        </h2>

        <h6 className="nft-font text-portal">
          Claim BLCG Golden Pass NFT for FREE!
        </h6>
        <TimerGrid />
        <h5 className="nft-font">{contractMetadata?.description}</h5>
        <div className="flex gap-2">
         <h5 className="nft-font">
            {" "}
            Claim Phase:{" "}
            <b className="text-bold text-portal">
            {activeClaimPhase?.metadata?.name}
            </b>
          </h5>

          <h5 className="nft-font">
            {" "}
            Price:{" "}
            <b className="text-bold text-portal">
            {activeClaimPhase?.price
                  ? ethers.utils.formatUnits(activeClaimPhase.price)
                  : "N/A"}
            </b>
          </h5>

          <h5 className="nft-font">
            {" "}
            NFT Owned:{" "}
            <b className="text-bold text-portal">
              {ownedNFTsIsLoading ? "Loading...." : `${ownedNFTs?.length}`}
            </b>
          </h5>
          <h5 className="nft-font">
            {" "}
            NFT Supply:{" "}
            <b className="text-bold text-portal">
              {totalClaimedSupplyisLoading
                ? "Loading...."
                : ` ${totalClaimedSupply?.toNumber()} `}
              /{" "}
              {totalSupplyisLoading
                ? "Loading...."
                : ` ${totalSupply?.toNumber()} `}
            </b>
          </h5>
        </div>
        {address ? (
                !isClaimIneligibilityReasonsLoading ? (
                  claimIneligibilityReasons?.length! > 0 ? (
                    claimIneligibilityReasons?.map((reason, index) => (
                      <p key={index}>{reason}</p>
                    ))
                  ) : (
                    <div>
                      <p>Eligible to claim</p>
                      <div className="claimContainer">
                        <div className="claimValue">
                          <button className="claimBtn" onClick={decrement}>-</button>
                          <input className="claimInput" type="number" value={claimQuantity} />
                          <button className="claimBtn" onClick={increment}>+</button>
                        </div>
                        <Web3Button
                          contractAddress={tokenizedBronzeAddress}
                          action={(contract) => contract.erc721.claim(claimQuantity)}
                        >
                          Claim NFT
                        </Web3Button>
                      </div>
                    </div>
                  )
                ) : (
                  <p>Checking Eligibility...</p>
                )
              ) : (
                <p>Connect Wallet to claim</p>
              )}
      </CardContent>
    </SlidingCard>
  );
}

const SlidingCard = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: row-reverse;
  background: #000;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-0.5rem);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* Center horizontally on mobile */
  }

  .event {
    gap: 10px;
  }
`;

interface CardContentProps {
  mobileCentered?: boolean;
}

const CardContent = styled.div<CardContentProps>`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: ${(props) => (props.mobileCentered ? "center" : "left")}; /* Center content on mobile if mobileCentered is true */
  align-items: ${(props) => (props.mobileCentered ? "center" : "flex-start")}; /* Center horizontally on mobile if mobileCentered is true */
  margin-top: 3px;

  @media (max-width: 768px) {
    text-align: center; /* Always center text on mobile */
    align-items: center; /* Always center horizontally on mobile */
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 15rem;
    max-width: 15rem;
    border-radius: 10%;
    object-fit: cover;
  }
`;
