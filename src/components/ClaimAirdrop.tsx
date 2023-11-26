import React from 'react';
import AirdropImage1 from "../assets/bg1.webp";
import AirdropImage2 from "../assets/bgnft.jpg";
import AirdropImage3 from "../assets/bgcta.jpg";

const ClaimAirdrop = () => {
  const airdrops = [
    {
      title: "Early Adopters Airdrop",
      description: "An Early Adopters Airdrop is a strategy used by TRC projects to reward early supporters with free tokens, fostering community engagement and project excitement.",
      image: AirdropImage1,
      button: "Claim Airdrop",
    },
    {
      title: "Potential NFTdrop",
      description: "A Potential NFTdrop hints at an upcoming event where NFT projects distribute digital collectibles to generate interest and reward early supporters within the NFT community.",
      image: AirdropImage2,
      button: "Coming Soon",

    },
    {
      title: "Collect Free Tokens",
      description: "Collecting Free Tokens involves acquiring cryptocurrency or digital assets without investing money, often through airdrops, giveaways, or project-related activities, making it an accessible way to get started in the crypto space.",
      image: AirdropImage3,
      button: "Collect Free Coin",

    },
  ];

  return (
    <div className="bg-stats">
      <div className="mx-auto px-4 py-16 mb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="text-4xl font-bold tracking-tight headerColor sm:text-5xl">
            Claim Airdrops
          </h1>
          <p className="mt-4 text-lg leading-7 text-p">
            Discover the latest TRC airdrop opportunities.
          </p>
        </div>
        <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {airdrops.map((airdrop, index) => (
            <div key={index} className="card glass nftcards">
              <img src={airdrop.image} alt={airdrop.title} className="card-image" />
              <div className="card-body">
                <h2 className="card-title text-2xl font-semibold headerColor">{airdrop.title}</h2>
                <p className="text-p">{airdrop.description}</p>
                <div className="card-actions mt-4">
                  <button className="btn smartbtn">{airdrop.button}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClaimAirdrop;
