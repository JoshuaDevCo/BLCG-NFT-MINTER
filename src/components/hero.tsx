import React, { useEffect } from 'react';
import Logo from "../assets/BLCG-PASS.png";
import heroVideo from "../assets/hero.mp4";
import { useMemo, useState, useRef } from "react";
import NFTlogo from "../assets/BLCG-PASS.png";
import NFTlogo2 from "../assets/BLCG-PASS-COVER.png";
import { ConnectWallet, Web3Button, useActiveClaimConditionForWallet, useAddress, useClaimIneligibilityReasons, useClaimedNFTSupply, useContract, useContractMetadata, useNFT, useOwnedNFTs, useTotalCirculatingSupply, useTotalCount } from '@thirdweb-dev/react';
import { goldenPassNFTAddress } from '../const/contractAddresses';
import FromTimer from './dashboard/FromTimer';
import { toast } from 'react-toastify';


const Hero = () => {
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
    <div className="hero bg-base-200 mx-auto ">
    <video
      src={heroVideo}
      autoPlay
      loop
      muted
      className="object-cover w-full h-full absolute -z-10"
    />
    <div className="hero-overlay bg-opacity-50"></div>
<div className="hero-content gap-4 flex-col lg:flex-row-reverse">
  <div className="text-center lg:text-left">
  <h1 className="text-mobile font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl dark:text-black heroFont">CLAIM BLCG GOLDEN PASS!</h1>
    <p className="py-4 text-black font-bold">The BLCG NFT Pass Golden Collection introduces a limited-edition series of 5000 NFT passes unlocking exclusive access to the thriving ecosystem of BLC Gold.</p>
    <FromTimer />
  </div>
  <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
    <div className="card-body">
        <p>Loading....</p>
    </div>
  </div>
</div>
</div>
  );

if (error || !nft)
  return (
    <div className="hero bg-base-200 mx-auto ">
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        className="object-cover w-full h-full absolute -z-10"
      />
      <div className="hero-overlay bg-opacity-50"></div>
  <div className="hero-content gap-4 flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    <h1 className="text-mobile font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl dark:text-black heroFont">CLAIM BLCG GOLDEN PASS!</h1>
      <p className="py-4 text-black font-bold">The BLCG NFT Pass Golden Collection introduces a limited-edition series of 5000 NFT passes unlocking exclusive access to the thriving ecosystem of BLC Gold.</p>
      <FromTimer />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
      <div className="card-body">
          <p>Error Occured...</p>
      </div>
    </div>
  </div>
</div>
  );


  return (
    <div className="hero bg-blc mx-auto ">
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        className="object-cover w-full h-full absolute -z-10"
      />
      <div className="hero-overlay bg-opacity-50"></div>
  <div className="hero-content gap-4 flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    <h1 className="text-mobile font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl heroFont" style={{
    textTransform: 'uppercase',
    color: 'gold',
    borderBottom: '2px solid #42cc13',
    paddingBottom: '14px',
    textShadow: '1px 1px 0px black'
}}>CLAIM BLCG GOLDEN PASS!</h1>
      <p className="py-4 text-white font-bold">The BLCG NFT Pass Golden Collection introduces a limited-edition series of 5000 NFT passes unlocking exclusive access to the thriving ecosystem of BLC Gold.</p>
      <div className="lg:hidden text-center lg:text-left "><FromTimer/></div>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
      <div className="card-body">
          <img className="w-50 item-center rounded-lg" src={contractMetadata?.image} alt="Gpass" />
          <center>
        <h2 className="text-center card-title text-black nft-head">
        {contractMetadata?.name}        
        </h2>
        </center>
        <h6 className="nft-font text-center text-portal font-bold mb-4 mt-2">
          Claim BLCG Golden Pass NFT for FREE!
        </h6>
        <center><div className="hidden lg:flex text-center"><FromTimer/></div></center>
        <h5 className="nft-font text-center text-black">{contractMetadata?.description}</h5>
        <div className="form-control">
        <center className="mb-4 mt-4">
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

                        <div className="claimValue mt-2 mb-2">
                          <button className="claimBtn" onClick={decrement}>-</button>
                          <input className="input input-bordered w-full nft-width" type="number" value={claimQuantity} />
                          <button className="claimBtn" onClick={increment}>+</button>
                        </div>

                        <Web3Button
                          contractAddress={goldenPassNFTAddress}
                          action={(contract) => contract.erc721.claim(claimQuantity)}
                          onError={(err) => {
                            console.error(err);
                            console.log({ err });
                            toast.error(`Failed to mint drop get a gas fees: ${(err as any).reason || ""}`, {
                              position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                            }}
                        
                          onSuccess={() => {
                            toast.success('🦄 Successfully minted! - The NFT has been transferred to your wallet', {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              });
                          }}
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
                  <p>Checking Eligibility...</p>
                )
              ) : (
                <p>Connect Wallet to claim</p>
              )}
       </center>
        </div>
      </div>
    </div>
  </div>
</div>
 );
};

export default Hero