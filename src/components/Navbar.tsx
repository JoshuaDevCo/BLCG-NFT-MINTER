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
        <img
          src={BLCGLogo}
          width={60}
        />
         <h1>BLCG</h1>
      </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal  z-[10] px-1">
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/tokenized-nfts">TokenizedNFT</NavLink></li>
      <li><NavLink to="/news">News</NavLink></li>
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