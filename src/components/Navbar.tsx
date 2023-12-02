import { ConnectWallet } from '@thirdweb-dev/react';
import React, { useState } from 'react';
import { NavLink } from "react-router-dom"; // Import NavLink
import BLCGLogo from "../assets/logo.png"


const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar menu-lg trcNavColor">
      <div className="navbar-start gap-2">
      <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li><NavLink to="https://billionlocalcoin.io">Homepage</NavLink></li>
        <li><NavLink to="/">Claim Gpass</NavLink></li>
        <li><NavLink to="/smart-portal">Smart Portal</NavLink></li>
      </ul>
    </div>
        <img
          src={BLCGLogo}
          width={60}
        />
         <h1 className="font-bold text-2xl">BLCG</h1>
      </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal  z-[10] px-1">
      <li><NavLink to="https://billionlocalcoin.io">Homepage</NavLink></li>
      <li><NavLink to="/">Claim Gpass</NavLink></li>
      <li><NavLink to="/smart-portal">Smart Portal</NavLink></li>
    </ul>
  </div>
  <div className="navbar-end">
  <div className="relative group">
    <ConnectWallet/>
   </div>
 </div>
            
</div>
  )
}

export default Navbar