import React from 'react';
import playImage from '../assets/bg1.webp';
import TRCLogo from '../assets/TRC.png';

const ExplainCard = () => {
  return (
    <section
      id="video"
      className="bg-cta px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
    >
      <div className="container py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 lg:pr-8">
            <h2 className="mb-6 lg:text-5xl text-4xl font-bold tracking-tight headerColor sm:text-4xl">
              Tokenized Coin Explained
            </h2>
            <p className="mb-6 text-lg text-p font-medium leading-normal lg:text-2xl">
              One day, everyone will mention Tokenized Reward Coin at least once
              a day. The day will come when everyone will know TRC.
            </p>
            <form
              action="https://www.youtube.com/@CryptoCommunity"
              method="get"
              target="_blank"
            >
              <button type="submit" className="smartbtn">
                Discover our Crypto Channel
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <img
              src={playImage}
              alt="video placeholder"
              className="rounded-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center w-full h-full">
              <button type="button">
                <img
                  src={TRCLogo}
                  alt="play btn"
                  className="z-20 h-24 max-w-full transition-all duration-300 rounded-full cursor-pointer animate-ping-pluse hover:scale-125"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplainCard;
