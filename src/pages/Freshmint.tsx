import React, { useEffect } from "react";
import styled from "styled-components";
import AuthCard from "../components/dashboard/AuthCard";
import NavBar from "../components/dashboard/NavBar";
import scrollreveal from "scrollreveal";
import { useAddress } from "@thirdweb-dev/react";
import Footerbox from "../components/dashboard/Footerbox";
import TokenMinter from "../components/dashboard/TokenMinter";
import ButtomNavbar from "../components/dashboard/ButtomNavbar";

export default function FreshMint() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
        .news
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);

  const address = useAddress();

  
  if (!address) {
    return (
      <Section>
      <NavBar />
      <AuthCard />
      <Footerbox />
    </Section>

    );
  }

  return (
    <Section>
    <NavBar />
    <TokenMinter/>
    <ButtomNavbar/>
  </Section>
  );
};


const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
