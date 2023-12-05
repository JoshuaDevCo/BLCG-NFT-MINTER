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
import { goldenPassNFTAddress } from "../const/contractAddresses";
import TimerGrid from "./dashboard/TimerGrid";
import Mint from "./dashboard/Mint";
import { ethers } from "ethers";
import Card from "./dashboard/Card";

export default function NFTMembership() {
  const address = useAddress();
  const maxClaimQuantity = 2;
  const { contract } = useContract(goldenPassNFTAddress, "nft-drop");

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
   <Card extra="!p-[20px] radius-10 w-100 mt-4">
    <SlidingCard>
    <ImageContainer>
        <img src={contractMetadata?.image} alt="Token Logo" className="w-60 item-center shadow-lg rounded-lg"/>
      </ImageContainer>
      <CardContent>
        <h2 className="card-title text-portal nft-head">
        {contractMetadata?.name}        
        </h2>

        <h6 className="nft-font text-portal">
           Golden Pass NFT Collection FREE! minting will end in:
        </h6>
        <TimerGrid />
        <h5 className="nft-font">{contractMetadata?.description}</h5>
        
        <div className="tagen-flex gap-2">
        <h5 className="nft-font">
  {" "}
  NFT Pass Distribution Phase:{" "}
  <b className="text-bold text-portal">
    {activeClaimPhase?.metadata?.name || "N/A"}
  </b>
</h5>


<h5 className="nft-font">
            {" "}
            Claiming Duration:{" "}
            <b className="text-bold text-portal">
            48 Hours
            </b>
          </h5>

          <h5 className="nft-font">
            {" "}
           Claiming Fees:{" "}
            <b className="text-bold text-portal">
            {activeClaimPhase?.price
                  ? ethers.utils.formatUnits(activeClaimPhase.price)
                  : "N/A"} BNB
            </b>
          </h5>
        
          <h5 className="nft-font">
            {" "}
            NFT Claimed:{" "}
            <b className="text-bold text-portal">
              {ownedNFTsIsLoading ? "Loading...." : `${ownedNFTs?.length}`}
            </b>
          </h5>

          <h5 className="nft-font">
            {" "}
            Total Available:{" "}
            <b className="text-bold text-portal">
             {" "}
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
                      <p className="text-red" key={index}>The claiming process will be open at the end of the countdown.</p>
                    ))
                  ) : (
                    <div>
                      <p className="text-portal text-lg font-bold">Eligible to claim</p>
                      <div className="">

                        <div className="claimValue mt-4 mb-4">
                          <button className="claimBtn" onClick={decrement}>-</button>
                          <input className="input input-bordered w-full nft-width" type="number" value={claimQuantity} />
                          <button className="claimBtn" onClick={increment}>+</button>
                        </div>

                        <Web3Button
                          contractAddress={goldenPassNFTAddress}
                          action={(contract) => contract.erc721.claim(claimQuantity)}
                          className="min-w-218 min-h-50 border-3 border-solid border-ebc45b font-bold uppercase bg-green-500 animate-pulse"
                          style={{
                                animationDuration: '1s', // Adjust the duration as needed
                             }}
                        >
                          Claim and Mint NFT
                        </Web3Button>
                      </div>
                    </div>
                  )
                ) : (
                  <p className='text-base text-red'>Checking Eligibility...</p>
                )
              ) : (
                <p className='text-base text-red'>Connect Wallet to claim</p>
              )}
      </CardContent>
      </SlidingCard>
    </Card>
  );
}

const SlidingCard = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: row-reverse;
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
`;


