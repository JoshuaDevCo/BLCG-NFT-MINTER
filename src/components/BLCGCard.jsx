import React from "react";
import styled from "styled-components";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { cardStyles } from "./ReusableStyles";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { BLCG_CONTRACT_ADDRESSES } from "../const/addresses";
import BLCGSupplyCard from "./BLCGSupplyCard";
import BLCSupplyCard from "./BLCSupplyCard";
import TRCCard from "./TRCCard";



export default function BLCGCard() {

       const address = useAddress();
       const { contract: blcgContract, isLoading: loadingblcgToken } = useContract(BLCG_CONTRACT_ADDRESSES);
       const { data: tokenBalance, isLoading: loadingblcgTokenBalance } = useTokenBalance(blcgContract, address);


  return (
    <Section>
      <div className="analytic glass">
        <div className="content stat">
        <h5>CTX Balance</h5>
        <p isLoaded={!loadingblcgToken && !loadingblcgTokenBalance}>
          {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>

        <p>Active Community X Token</p>
        </div>
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
      </div>
      <TRCCard />
      {/* <BLCGSupplyCard />
      <BLCSupplyCard />   */}
    </Section>
  );
}

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .card-header{
    color:#d2a710;
  }
  .analytic {
    ${cardStyles};
    padding: 1rem;
    border: 2px solid gold; /* Add a gold border */
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #ffc107;
      color: black;
      svg {
        color: white;
      }
    }
    .logo {
      background-color: #000000;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
        color: #ffc107;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      h5 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
      }
      h2 {
        font-size: 1.5rem;
        text-transform: uppercase;

      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row;
      }
    }
  }
`;
