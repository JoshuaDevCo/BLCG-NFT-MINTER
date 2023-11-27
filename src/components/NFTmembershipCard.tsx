import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import {
  Web3Button,
  useAddress,
  useClaimIneligibilityReasons,
  useClaimedNFTSupply,
  useClaimerProofs,
  useContract,
  useContractMetadata,
  useNFT,
  useOwnedNFTs,
  useTotalCount,
  useActiveClaimConditionForWallet,
  useTotalCirculatingSupply,
  MediaRenderer,
  useClaimConditions,
} from "@thirdweb-dev/react";
import { tokenizedBronzeAddress } from "../const/contractAddresses";
import TimerGrid from "./dashboard/TimerGrid";
import Mint from "./dashboard/Mint";
import { BigNumber, ethers, utils } from "ethers";
import { parseIneligibility } from "../utils/parseIneligibility";


export default function NFTMembership() {
  const address = useAddress();
  const maxClaimQuantity = 2;
  const { contract } = useContract(tokenizedBronzeAddress, "nft-drop");
  const claimConditions = useClaimConditions(contract);

  const [quantity, setQuantity] = useState(1);


  const activeClaimCondition = useActiveClaimConditionForWallet(
    contract,
    address,
  );

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

  const priceToMint = useMemo(() => {
    const bnPrice = BigNumber.from(
      activeClaimCondition.data?.currencyMetadata.value || 0,
    );
    return `${utils.formatUnits(
      bnPrice.mul(quantity).toString(),
      activeClaimCondition.data?.currencyMetadata.decimals || 18,
    )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
  }, [
    activeClaimCondition.data?.currencyMetadata.decimals,
    activeClaimCondition.data?.currencyMetadata.symbol,
    activeClaimCondition.data?.currencyMetadata.value,
    quantity,
  ]);

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

  const claimerProofs = useClaimerProofs(contract, address || "");

  const canClaim = useMemo(() => {
    return (
      activeClaimCondition.isSuccess &&
      claimIneligibilityReasons.isSuccess &&
      claimIneligibilityReasons.data?.length === 0 &&
      !isSoldOut
    );
  }, [
    activeClaimCondition.isSuccess,
    claimIneligibilityReasons.data?.length,
    claimIneligibilityReasons.isSuccess,
    isSoldOut,
  ]);


  if (canClaim) {
    const pricePerToken = BigNumber.from(
      activeClaimCondition.data?.currencyMetadata.value || 0,
    );
    if (pricePerToken.eq(0)) {
      return "Mint (Free)";
    }
    return `Mint (${priceToMint})`;
  }
  if (claimIneligibilityReasons.data?.length) {
    return parseIneligibility(claimIneligibilityReasons.data, quantity);
  }
  if (buttonLoading) {
    return "Checking eligibility...";
  }

  return "Minting not available";
}, [
  isSoldOut,
  canClaim,
  claimIneligibilityReasons.data,
  buttonLoading,
  activeClaimCondition.data?.currencyMetadata.value,
  priceToMint,
  quantity,
]);


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
        
        <div className="tagen-flex gap-2">
        <h5 className="nft-font">
  {" "}
  Claim Phase:{" "}
  <b className="text-bold text-portal">
    {activeClaimPhase?.metadata?.name || "N/A"}
  </b>
</h5>

          <h5 className="nft-font">
            {" "}
            Price:{" "}
            <b className="text-bold text-portal">
            {activeClaimPhase?.price
                  ? ethers.utils.formatUnits(activeClaimPhase.price)
                  : "N/A"} BNB
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
            Remaining:{" "}
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
                      <p className="text-portal text-lg font-bold">Eligible to claim</p>
                      <div className="">

                        <div className="claimValue mt-4 mb-4">
                          <button className="claimBtn" onClick={decrement}>-</button>
                          <input className="input input-bordered w-full nft-width" type="number" value={claimQuantity} />
                          <button className="claimBtn" onClick={increment}>+</button>
                        </div>

                        <Web3Button
                          contractAddress={tokenizedBronzeAddress}
                          action={(contract) => contract.erc721.claim(claimQuantity)}
                          className="min-w-218 min-h-50 border-3 border-solid border-ebc45b font-bold uppercase bg-green-500 animate-pulse"
                          style={{
                                animationDuration: '1s', // Adjust the duration as needed
                             }}
                             isDisabled={!canClaim || buttonLoading}

                        >
                         {buttonLoading ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                                className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-blue-600 dark:text-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        buttonText
                      )}
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
    max-height: 25rem;
    max-width: 25rem;
    border-radius: 10%;
    object-fit: cover;
  }
`;
