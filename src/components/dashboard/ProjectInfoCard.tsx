import React, { useEffect, useState } from "react";
import Card from './Card';
import { ethers } from 'ethers';
import {
  useAddress,
  useContract,
  useTokenBalance,
  useTokenSupply
} from "@thirdweb-dev/react";
import { tokenContractAddress } from '../../const/contractAddresses';

const ProjectInfoCard = () => {
  const address = useAddress();
  const { contract: tokenContract, isLoading: loadingToken } = useContract(tokenContractAddress);
  const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(tokenContract, address);
  const { data: tokenSupply, isLoading: loadingTokenSupply } = useTokenSupply(tokenContract);

  const manualUsdRate = 0.000000002434; // Set your manual USD rate here
  const [usdPrice, setUsdPrice] = useState<number | null>(null);

  useEffect(() => {
    // Calculate the USD price based on the manual rate
    if (tokenBalance?.value !== undefined) {
      const usdPrice = parseFloat(ethers.utils.formatEther(tokenBalance.value)) * manualUsdRate;
      setUsdPrice(usdPrice);
    }
  }, [tokenBalance, manualUsdRate]);

  return (
    <Card extra="!p-[14px]">
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-portal dark:text-white mb-2">Uncover the BLCG Golden Collection</h4>
        <p className="mt-4 mb-4 nft-font text-white">
          Dive into the exclusive realm of the BLCG NFT Pass Golden Collection—a rare opportunity unlocking entry to BLC Gold IDO, Mining, and Staking. With only 5000 passes available, each pass serves as your golden ticket to engage in various activities within the thriving BLCG Coin ecosystem.
        </p>
        <ul className="list-disc nft-font text-white pl-6">
          <li className="mb-2">Seize the Community Pass</li>
          <li className="mb-2">Secure Whitelisting for priority access</li>
          <li className="mb-2">Enjoy BLCG Mining privileges</li>
          <li className="mb-2">Gain IDO Access to BLC Gold</li>
          <li className="mb-2">Unlock Opportunities for Airdrop and NFT Drop</li>
        </ul>
        <p className="mt-4 mb-4 nft-font text-portal text-white">
          Here are some crucial details about the BLCG NFT Pass Golden Collection:
        </p>
        <ul className="list-disc text-white nft-font pl-6">
         <li className="mb-2">Limited Edition: Only 5000 passes available, making each one a rare gem in the crypto universe.</li>
         <li className="mb-2">Your Ticket to BLC Gold IDO, Mining, and Staking—an all-access pass to the future of blockchain innovation.</li>
  <li className="mb-2">Exclusive privileges, including the highly coveted Community Pass, granting you VIP status within the BLCG Coin community.</li>
  <li className="mb-2">Whitelisting for priority access ensures you're at the forefront of groundbreaking developments, securing your spot in the forefront of crypto trends.</li>
  <li className="mb-2">Embark on a journey of wealth creation with BLCG Mining privileges, allowing you to reap the rewards of your active participation.</li>
  <li className="mb-2">Gain IDO Access to BLC Gold, positioning yourself at the forefront of token offerings and other opportunities.</li>
  {/* Add any other relevant details about the collection */}
</ul>
      </div>
    </Card>
  );
};

export default ProjectInfoCard;
