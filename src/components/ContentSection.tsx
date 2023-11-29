import React from 'react'
import NFTlogo from "../assets/BLCG-PASS.png";
import NFTlogo2 from "../assets/BLCG-PASS-COVER.png";



const ContentSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black gd-font">BLCG GOLDEN PASS</h2>
          <p className="">
          Dive into the exclusive realm of the BLCG NFT Pass Golden Collection—a rare opportunity unlocking entry to BLC Gold IDO, Mining, and Staking. With only 5000 passes available, each pass serves as your golden ticket to engage in various activities within the thriving BLCG Coin ecosystem.
        </p>
        <ul className="list-disc pl-6 mt-4 mb-4">
          <li className="mb-2">Seize the Community Pass</li>
          <li className="mb-2">Secure Whitelisting for priority access</li>
          <li className="mb-2">Enjoy BLCG Mining privileges</li>
          <li className="mb-2">Gain IDO Access to BLC Gold</li>
          <li className="mb-2">Unlock Opportunities for Airdrop and NFT Drop</li>
        </ul> 
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img className="w-full rounded-lg" src={NFTlogo} alt="office content 1" />
          <img className="mt-4 w-full lg:mt-12 rounded-lg" src={NFTlogo2} alt="office content 2" />
        </div>
      </div>
    </section>
  );
};
 

export default ContentSection