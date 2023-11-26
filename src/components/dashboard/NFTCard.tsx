import React, { useEffect, useState } from 'react'
import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useNFT,
    useTokenBalance,
    Web3Button,
  } from "@thirdweb-dev/react";
  import type { FC } from "react";
  import numeral from "numeral";


  import { tokenizedBronzeAddress, stakingAddress, tokenContractAddress } from '../../const/contractAddresses';
import { BigNumber, ethers } from 'ethers';

  interface NFTCardProps {
    tokenId: number;
  }

const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const address = useAddress();
  
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );

  const { 
    contract: stakingContract,
    refetch: refetchStakeInfo,
  } = useContract(stakingAddress);
  
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);


   const { contract } = useContract(tokenizedBronzeAddress, "nft-drop");
   const { data: nft } = useNFT(contract, tokenId);
   
   useEffect(() => {
    if (!stakingContract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContract]);
  
  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 1000);
  }, []);

    return (
        <div>
        {nft && (
          <div className='container'>
          <div className="card place-items-center bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            {nft.metadata && (
              <ThirdwebNftMedia
              height='160px'
              width='200px'
                metadata={nft.metadata}
              />
            )}
            <h2 className="card-title">{nft.metadata.name}</h2>
            <div className="badge badge-secondary mt-2 mb-2">Currently Mining</div>
          <div className="tooltip" data-tip="Total Mined">
          <div className="badge badge-lg">{!claimableRewards
              ? "Loading..."
              : numeral(
                  ethers.utils.formatUnits(claimableRewards, 18)
                ).format("0,0.000000")}
          {" "}
          {tokenBalance?.symbol}</div>
         </div>
            <br/>
            <Web3Button
              action={(contract) => contract?.call("withdraw", [[nft.metadata.id]])}
              contractAddress={stakingAddress}
            >
              Stop Mining
            </Web3Button>
          </div>
          </div>
        )}
      </div>
)}

export default NFTCard