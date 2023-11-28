import React from 'react'
import { NavLink } from "react-router-dom"; // Import NavLink


const Footer = () => {
  return (
    <footer className="p-4 bg-dark md:p-8 lg:p-10 dark:bg-gray-800">
    <div className="mx-auto max-w-screen-xl text-center">
        <a href="#" className="flex justify-center items-center text-2xl font-semibold text-portal dark:text-white">
            Flowbite    
        </a>
        <p className="my-6 text-portal dark:text-gray-400">Open-source library of over 400+ web components and interactive elements built for better web.</p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">cryptorization</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">Tokenomics</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">News</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Market</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">FAQs</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Contact</a>
            </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2021-2022 <a href="#" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
  </footer>
  )
}

export default Footer