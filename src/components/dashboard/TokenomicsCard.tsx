import React from 'react';
import Card from './Card';
import BLCGlogo from './BLCG.png';

const TokenomicsCard = () => {
  return (
    <Card extra="!p-[20px] radius-10 w-100">
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-portal dark:text-white">BLCG NFT Pass Golden Allocation</h4>
        <p className="mt-2 nft-font text-white">
          Welcome to the exclusive realm of the BLCG NFT Pass Golden Allocation, where meaningful engagement meets unparalleled privileges. Dive into a world of opportunities tailored for you as a proud holder of the Golden NFT Pass.
        </p>
        {/* Additional content about BLCG NFT Pass Golden Allocation */}
        <p className="mt-4 nft-font text-white">
          <strong>Key Details:</strong>
        </p>
        <ul className="list-disc text-white nft-font pl-6">
          <li className="mb-2">Limited Access: The Golden Allocation is a select offering, with a finite number of passes available. Only 5000 lucky individuals will secure their entry into the heart of the BLCG ecosystem.</li>
          <li className="mb-2">Gateway to BLCG Gold IDO: Your Golden NFT Pass is your golden ticket to the BLCG Gold Initial DEX Offering (IDO). Gain early access to one of the most anticipated events in the blockchain space and be at the forefront of revolutionary developments.</li>
          <li className="mb-2">Mining and Staking Privileges: Unlock the power of BLCG Coin through exclusive mining and staking privileges. Your Golden NFT Pass is not just a ticket; it's your key to actively participating in the growth and sustainability of the BLCG network.</li>
        </ul>
        {/* Engage Beyond Limits, Community-Centric Experience, Exclusive Privileges Await */}
        <p className="mt-4 nft-font text-white">
          Embrace the journey of your project with a wealth of information at your fingertips. Stay connected and informed, as the Golden Allocation provides a gateway to a trove of details about your projects. From real-time updates to intricate project nuances, we keep you engaged with the heartbeat of BLCG.
        </p>
        <p className="mt-4 nft-font text-white">
          Join a vibrant community of like-minded individuals who share your passion for blockchain and innovative projects. The BLCG NFT Pass Golden Allocation isn't just about ownership; it's about becoming an integral part of a thriving ecosystem, where every participant plays a crucial role.
        </p>
        <p className="mt-4 nft-font text-white">
          Explore a range of exclusive privileges including Community Pass, Whitelisting, BLCG Mining, IDO Access, Airdrops, and NFT Drops. Your Golden Allocation opens doors to an array of opportunities designed to enhance your journey in the BLCG universe.
        </p>
      </div>
    </Card>
  );
};

export default TokenomicsCard;
