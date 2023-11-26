import React from 'react';
import Logo from "../assets/TRC.png"

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content flex flex-col justify-center text-center text-white">
        <div className="container mx-auto p-4">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
      </div>
      <center><img
                            src={Logo}
                            alt="TRC"
                            width="300px"
                            className=""
                          /></center>
      <h1 className="text-4xl font-bold tracking-tight text-hero headerColor sm:text-6xl">
          Tokenized Reward Community
        </h1>          
        <p className="text-lg textHeroP max-w-prose mx-auto">Imagine being part of a decentralized social media platform where every post, like, or comment you make earns you real-life reward</p>
          <div className='gap-5 btnflex'>
          <a href="https://pancakeswap.finance/swap?outputCurrency=0x6ca7c5931af660fd258824faed3a29955d9060fd" className="btn px-8 py-3 text-lg smartbtn hover:bg-red-600 transition duration-300 mt-4 mb-4" target="_blank">Buy Now</a>
          <a href="https://coinmarketcap.com/dexscan/bsc/0xab5c1b4349d19a5cbfca255c1beb13705939ed27/" className="btn px-8 py-3 text-lg smartbtn hover:bg-red-600 transition duration-300 mt-4 mb-4" target="_blank">Chart  <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
