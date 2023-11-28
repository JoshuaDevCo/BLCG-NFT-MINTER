import React, { useEffect } from 'react';
import Logo from "../assets/BLCG-PASS.png";
import heroVideo from "../assets/hero.mp4";
import { useMemo, useState, useRef } from "react";

const Hero = () => {

  return (
    <section className="hero min-h-screen bg-cover dark:bg-gray-900">
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        className="object-cover hero min-h-screen bg-cover w-full h-full absolute -z-10"
      />
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
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
      </div>
         </section>
  );
};

export default Hero;
