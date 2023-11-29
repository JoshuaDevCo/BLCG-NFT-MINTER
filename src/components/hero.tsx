import React, { useEffect } from 'react';
import Logo from "../assets/BLCG-PASS.png";
import heroVideo from "../assets/hero.mp4";
import { useMemo, useState, useRef } from "react";
import NFTlogo from "../assets/BLCG-PASS.png";
import NFTlogo2 from "../assets/BLCG-PASS-COVER.png";

const Hero = () => {

  return (

    <div className="hero bg-base-200">
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
    <h1 className="text-2xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl dark:text-black heroFont">CLAIM BLCG GOLDEN PASS!</h1>
      <p className="py-4 text-black">The BLCG NFT Pass Golden Collection introduces a limited-edition series of 5000 NFT passes unlocking exclusive access to the thriving ecosystem of BLC Gold. These passes offer entry to BLC Gold's IDO, Mining, and Staking, along with a range of privileges and opportunities within the BLCG Coin community.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
      <form className="card-body">
      <div className="grid grid-cols-2 gap-4 mt-8">
          <img className="w-full rounded-lg" src={NFTlogo} alt="office content 1" />
          <img className="mt-4 w-full lg:mt-12 rounded-lg" src={NFTlogo2} alt="office content 2" />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
 );
};

    // <section className="hero min-h-screen bg-cover dark:bg-gray-900">
    //   <video
    //     src={heroVideo
    //     autoPlay
    //     loop
    //     muted
    //     className="object-cover hero min-h-screen bg-cover w-full h-full absolute -z-10"
    //   />
    //   <div className="hero-overlay bg-opacity-50"></div>
    // <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    //     <div className="mr-auto place-self-center lg:col-span-7">
    //         <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Payments tool for software companies</h1>
    //         <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
    //         <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
    //             Get started
    //             <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    //         </a>
    //         <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
    //             Speak to Sales
    //         </a> 
    //     </div>
    //     <div className="lg:mt-0 lg:col-span-5 lg:flex">
    //         <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup"/>
    //     </div>                
    // </div>
      {/* <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <center>
          <img
            src={Logo}
            alt="BLCG"
            width="300px"
            className=""
          />
        </center>
        <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white heroFont">Billion Local Coin Gold</h1>
        <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Welcome! Here is where you get on board the BLCG vessel that takes you through the portal which connects to the future of money</p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a href="#" className="inline-flex justify-center smartbtn items-center py-3 px-5 text-base font-medium text-center btn hover:bg-red-600 transition duration-300 rounded-lg border border-gray-300 hover:bg-red-600 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
           Launch Smart Portal</a>
        </div>
      </div> */}
        //  </section>
 
export default Hero;
