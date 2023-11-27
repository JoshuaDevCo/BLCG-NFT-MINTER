import { MediaRenderer, Web3Button, useActiveClaimConditionForWallet, useAddress, useClaimIneligibilityReasons, useContract, useContractMetadata, useTotalCirculatingSupply, useTotalCount } from '@thirdweb-dev/react'
import React, { useState } from 'react'
import { tokenizedBronzeAddress } from '../../const/contractAddresses';
import { ethers } from "ethers";
import { RouterProvider } from 'react-router-dom';


const Mint = () => {
    const address = useAddress();
    const maxClaimQuantity = 2;

    const {
        contract
    } = useContract (tokenizedBronzeAddress)

    const {
        data: contractMetadata,
        isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract);

    const {
        data:activeClaimPhase,
        isLoading:isActiveClaimPhaseLoading
    } = useActiveClaimConditionForWallet(contract, address);

    const {
        data: claimIneligibilityReasons,
        isLoading: isClaimIneligibilityReasonsLoading,
      } = useClaimIneligibilityReasons(
        contract,
        {
          walletAddress: address || "",
          quantity: 1,
        }
      );

    const {
        data:totalSupply,
        isLoading: isTotalSupplyLoading
    } = useTotalCount(contract);

    const {
        data:totalClaimed,
        isLoading: isTotalClaimedLoading,
    } = useTotalCirculatingSupply(contract);

    const maxClaimamble = parseInt(activeClaimPhase?.maxClaimablePerWallet || "0");
  

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

  return (
    <div className="container">
      <div>
        {!isContractMetadataLoading && (
          <div>
            <div className="collectionImage">
              <MediaRenderer src={contractMetadata?.image} />
            </div>
            <div>
              <h1>{contractMetadata.name}</h1>
              <p>{contractMetadata.description}</p>
  
              {!isActiveClaimPhaseLoading ? (
                <div>
                  <p>Claim Phase: {activeClaimPhase?.metadata?.name}</p>
                  <p>Price: {ethers.utils.formatUnits(activeClaimPhase?.price!)}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              {!isTotalSupplyLoading && !isTotalClaimedLoading ? (
                <p>Claimed: {totalClaimed?.toNumber()} / {totalSupply?.toNumber()}</p>
              ) : (
                <p>Loading...</p>
              )}
  
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mint