import React from 'react'
import { NavLink } from "react-router-dom"; // Import NavLink


const Footer = () => {
  return (
    <footer className="p-4 bg-dark md:p-8 lg:p-10 dark:bg-gray-800">
    <div className="mx-auto max-w-screen-xl text-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2021-2022 <a href="#" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
  </footer>
  )
}

export default Footer