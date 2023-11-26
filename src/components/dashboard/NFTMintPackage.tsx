import React, { useEffect, useState } from 'react'
import goldimage from "../../assets/1.png";
import silverimage from "../../assets/2.png";
import bronzeimage from "../../assets/3.png";
import { Web3Button, useAddress, useContract, useContractRead, useOwnedNFTs, useTokenBalance } from '@thirdweb-dev/react';
import { stakingAddress, tokenContractAddress, tokenizedBronzeAddress } from '../../const/contractAddresses';
import { BigNumber } from 'ethers';

const NFTMintPackage = () => {
  const address = useAddress();
  
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );

  const { contract: tokenizednftContract } = useContract(tokenizedBronzeAddress, "nft-drop");
  const { contract: stakingContract } = useContract(stakingAddress);
  const { data: myTokenizedNFTs } = useOwnedNFTs(tokenizednftContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const { data: stakedTokens } = useContractRead(stakingContract, "getStakeInfo", [
    address,
  ]);

  useEffect(() => {
    if (!stakingContract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContract]);
  
  async function StakeNFT(id: string) {
    if (!address) return;

    const isApproved = await tokenizednftContract?.isApproved(
      address,
      stakingAddress
    );

    if (!isApproved) {
      await tokenizednftContract?.setApprovalForAll(stakingAddress, true);
    }

    await stakingContract?.call("stake", [[id]]);
  }
  return (
    <div
className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8 mt-4"
>
<div
className="nftcards glass divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm"
>
<div className="p-6 sm:px-8">
<img src={goldimage} alt="Shoes" className="rounded-xl" />
<div className='flex gap-8'>
<h2 className="text-lg font-medium text-heading mt-2 mb-2">
  TOKENIZED GOLD NFT 
</h2>

<p className="mt-2 sm:mt-2">
  <strong className="text-3xl font-bold text-p sm:text-4xl">
 50
  </strong>

  <span className="text-sm font-medium text-p">/Total supply</span>
</p>
</div>
</div>
<div className="p-6 sm:px-8">
<p className="text-lg font-medium text-heading sm:text-xl">
  Holders Benefits:
</p>

<ul className="mt-2 space-y-2 sm:mt-4">
  <li className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p">Round 1 Mint = 10  </span>
  </li>

  <li className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> Minting Price = 0.6646 BNB </span>
  </li>

  <li className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> Actual earning value = 1.66 BNB  </span>
  </li>

  <li className="flex items-center gap-1">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> $TRC per Epoch = 500,000 </span>
  </li>

  <li className="flex items-center gap-1">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> NFT to Token ratio saves = 0.9991 BNB </span>
  </li>

  <li className="flex items-center gap-1">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> Community access </span>
  </li>
</ul>
</div>
</div>

<div
className="glass nftcards divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm"
>
<div className="p-6 sm:px-8">
<img src={silverimage} alt="Shoes" className="rounded-xl" />
<div className='flex gap-8'>
<h2 className="text-lg font-medium text-heading mt-2 mb-2">
  TOKENIZED SILVER NFT 
</h2>

<p className="mt-2 sm:mt-2">
  <strong className="text-3xl font-bold text-p sm:text-4xl">
 500
  </strong>

  <span className="text-sm font-medium text-p">/Total supply</span>
</p>
</div>
</div>

<div className="p-6 sm:px-8">
<p className="text-lg font-medium text-heading sm:text-xl">
  Holders Benefits:
</p>

<ul className="mt-2 space-y-2 sm:mt-4">
  <li className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p">Round 1 Mint = 40  </span>
  </li>

  <li className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> Minting Price = 0.2458 BNB </span>
  </li>

  <li className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> Actual earning value = 0.7226 BNB </span>
  </li>

  <li className="flex items-center gap-1">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> $TRC per Epoch = 250,000 </span>
  </li>

  <li className="flex items-center gap-1">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> NFT to Token ratio saves = 0.4768 BNB </span>
  </li>

  <li className="flex items-center gap-1">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> Community access </span>
  </li>
</ul>
</div>
</div>

<div
className="glass nftcards divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm"
>
<div className="p-6 sm:px-8">
<img src={bronzeimage} alt="Shoes" className="rounded-xl" />
<div className='flex gap-8'>
<h2 className="text-lg font-medium text-heading mt-2 mb-2">
  TOKENIZED BRONZE NFT 
</h2>

<p className="mt-2 sm:mt-2">
  <strong className="text-3xl font-bold text-p sm:text-4xl">
 2000
  </strong>

  <span className="text-sm font-medium text-p">/Total supply</span>
</p>
</div>
<Web3Button 
        className="linear container mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-4 py-4 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
         contractAddress={tokenizedBronzeAddress}
         action={(tokenizednftContract) => tokenizednftContract.erc721.claim(1)}
         >Claim and Mint</Web3Button>
</div>
<div className="p-6 sm:px-8">
<p className="text-lg font-medium text-heading sm:text-xl">
  Holders Benefits:
</p>

<ul className="mt-2 space-y-2 sm:mt-4">
  <li className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p">Round 1 Mint = 50  </span>
  </li>

  <li className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> Minting Price = 0.1104 BNB </span>
  </li>

  <li className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> Actual earning value = 0.3142 BNB</span>
  </li>

  <li className="flex items-center gap-1">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> $TRC per Epoch = 100,000 </span>
  </li>

  <li className="flex items-center gap-1">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> NFT to Token ratio saves = 0.2018 BNB </span>
  </li>

  <li className="flex items-center gap-1">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-heading"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>

    <span className="text-p"> Community access </span>
  </li>
</ul>
</div>
</div>
</div> 
  )
}

export default NFTMintPackage