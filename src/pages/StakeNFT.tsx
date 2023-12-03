import styled from "styled-components";
import AuthCard from "../components/dashboard/AuthCard";
import NavBar from "../components/dashboard/NavBar";
import scrollreveal from "scrollreveal";
import { Web3Button, useAddress, useContract, useOwnedNFTs, useTokenBalance } from '@thirdweb-dev/react';
import { BLC_CONTRACT_ADDRESSES, ERC721_CONTRACT_ADDRESS, NFTSTAKING_CONTRACT_ADDRESS } from '../const/addresses';
import styles from '../styles/Home.module.css';
import StakeNFTGrid from '../components/stake-nft-grid';
import StakedNFTContainer from '../components/staked-nft-container';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import StakedinfoCardNFT from "../components/StakedInfoCardNFT";
import Footerbox from "../components/dashboard/Footerbox";
import NFTStakeCard from "../components/dashboard/NFTStakeCard";
import StakedNFTRewardWidget from "../components/dashboard/StakedNFTRewardWidget";
import TRCWidget from "../components/dashboard/TRCWidget";
import MarketCapWidget from "../components/dashboard/MarketCapWidget";
import LiquidityWidget from "../components/dashboard/LiquidityWidget";
import ButtomNavbar from "../components/dashboard/ButtomNavbar";

export default function StakeNFT() {
  const address = useAddress();
  const [claimableReward, setClaimableReward] = useState<BigNumber>();

  const {
    contract: ERC721Contract
  } = useContract(ERC721_CONTRACT_ADDRESS, "nft-drop");
  const {
    contract: StakeContract
  } = useContract(NFTSTAKING_CONTRACT_ADDRESS);
  const {
    contract: ERC20Contract
  } = useContract(BLC_CONTRACT_ADDRESSES);

  const {
    data: ownedERC721Tokens,
    isLoading: ownedERC721TokensIsLoading
  } = useOwnedNFTs(ERC721Contract, address);

  const {
    data: ERC20TokenBalance,
    isLoading: ERC20TokenBalanceIsLoading
  } = useTokenBalance(ERC20Contract, address);

  useEffect(() => {
    if (!address || !StakeContract) return;

    async function getClaimableReward() {
      const claimableReward = await StakeContract?.call(
        "getStakeInfo",
        [address]
      );

      setClaimableReward(claimableReward[1]);
    };

    getClaimableReward();
  }, [address, StakeContract]);

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
      <div className="grid">
      <div className="news">
      <NFTStakeCard/>
      </div>
      </div>
      <Footerbox/>
      <ButtomNavbar/>
    </Section>
  );
};

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      height: 50%;
    }

    .news_grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
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
