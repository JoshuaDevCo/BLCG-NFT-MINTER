import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiTwirlCenter } from "react-icons/gi";
import scrollreveal from "scrollreveal";
import BLCGlogo from "../assets/BLCG.png";
import { NavLink } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { MdHome, MdRecycling, MdSpaceDashboard, MdWallet } from "react-icons/md";

interface NavLinkProps {
  to: string;
  label: string;
  icon: JSX.Element;
}

const navLinks: NavLinkProps[] = [
  { to: "/", label: "Main Website", icon: <MdHome className="text-xl" /> },
  { to: "/smart-portal", label: "Smart Portal", icon: <MdSpaceDashboard className="text-xl" /> },
  { to: "/my-nfts", label: "My Golden Pass", icon: <MdRecycling className="text-xl" /> },
  { to: "/workshop", label: "Newbie Workshop", icon: <GiTwirlCenter className="text-xl" /> },
];

const Sidebar: React.FC = () => {
  const [navbarState, setNavbarState] = useState<boolean>(false);

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(".nav-link", {
      opacity: 0,
      interval: 300,
    });
  }, []);

  const toggleNavbar = () => setNavbarState(!navbarState);
  const closeNavbar = () => setNavbarState(false);

  return (
   
    <SidebarContainer className={`bg-side text-white ${navbarState ? 'active' : ''}`}>
      <SidebarHeader className="container p-4">
       <div className="navflex"><img src="https://www.billionlocalcoin.io/public/images/logo.png" alt="Logo" className="w-20 h-20 mr-2" />
        <span className="text-xl font-bold tagen-margin">Smart Portal</span>
        </div>
        <ul className="menu p-4 min-h-full">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="nav-link"
                onClick={closeNavbar}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </SidebarHeader>
      <Transition
        show={navbarState}
        enter="transition-transform transform duration-300 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform transform duration-300 ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="lg:hidden fixed inset-0 bg-gray-900 bg-opacity-75" onClick={closeNavbar}></div>
      </Transition>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.section`
  position: fixed;
  left: 0;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  // Add your styling for the sidebar container

  @media (max-width: 1080px) {
    display: none; // Hide on screens smaller than 1080px (adjust the value as needed)
  }

  @media (max-width: 1023px), (max-width: 768px) {
    display: none; // Hide on tablets and screens smaller than 768px
  }

  @media (max-width: 1023px) and (orientation: landscape) {
    display: none; // Hide on landscape view of tablets and mobile devices
  }
`;


const SidebarHeader = styled.div`
  display: relative;
  items: center;
  justify-content: space-between;
  padding: 4;
`;

const SidebarNav = styled.nav`
  flex-grow: 1;
  overflow-y: auto;
  padding: 4;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li {
    // Add your styling for list items
    margin: 0;
    padding: 0;
  }


  .nav-link {
    // Add your styling for the navigation links
    display: flex;
    align-items: center;
    padding: 0.6rem 1rem;
    border-radius: 0.6rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ffc107;
      color: black;
    }

    span {
      margin-left: 1rem;
    }
  }
`;

export default Sidebar;
