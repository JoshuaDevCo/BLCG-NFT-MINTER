import React, { useEffect } from "react";
import styled from "styled-components";
import AuthCard from "../components/dashboard/AuthCard";
import NavBar from "../components/dashboard/NavBar";
import scrollreveal from "scrollreveal";
import { useAddress } from "@thirdweb-dev/react";
import BLCGCard from "../components/BLCGCard";
import ConverterCard from "../components/ConverterCard";
import AnnouncementCard from "../components/AnnouncementCard";
import { Container } from "@chakra-ui/react";
import Footerbox from "../components/dashboard/Footerbox";
import TRCWidget from "../components/dashboard/TRCWidget";
import StakedNFTRewardWidget from "../components/dashboard/StakedNFTRewardWidget";
import MarketCapWidget from "../components/dashboard/MarketCapWidget";
import LiquidityWidget from "../components/dashboard/LiquidityWidget";
import TokenomicsCard from "../components/dashboard/TokenomicsCard";
import ProjectInfoCard from "../components/dashboard/ProjectInfoCard";
import NFTMembership from "../components/NFTmembershipCard";
import ButtomNavbar from "../components/dashboard/ButtomNavbar";


export default function Home() {
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
      <NFTMembership />
      <div className="grid">
        <div className="row__two">
          <ProjectInfoCard />
          <TokenomicsCard />
        </div>
      </div>
      <Footerbox/>
      <ButtomNavbar/>
    </Section>
  );
}

const Section = styled(Container)`
  margin-left: 18vw;
  padding: 2rem;

  .grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    .row__one {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .row__two {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .news_grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  @media screen and (max-width: 1080px) {
    margin-left: 0;

    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
