import React from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import { useContract, useContractEvents } from "@thirdweb-dev/react";
import { Box, Card, Flex, Heading, Spinner, Text } from "@chakra-ui/react";

import { STAKING_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import StakedCard from "./StakedCard";
import StakedCardNFT from "./StakedCardNFT";

export default function StakedinfoCardNFT() {
  function truncateAddress(address) {
    if (address) {
      return `${address.substring(0, 6)}...${address.substring(
        address.length - 4
      )}`;
    }
    return ""; // Return a default value or handle the case where address is undefined.
  }


  const { contract } = useContract(STAKING_CONTRACT_ADDRESS);


  const { data: events, isLoading: isEventsLoading } = useContractEvents(
    contract,
    "TokensStaked",
    {
      queryFilter: {
        fromBlock: -7000,
      },
    }
  );

  return (
    <SlidingCard className="glass">
      <StakedCardNFT />
      <StakedBalanceCard className="glass mt-4">
      <Heading>Recent Staking</Heading>
      <div className="cd-margin">
      {!isEventsLoading ? (
        <DataTable>
          <thead>
            <tr>
              <th>Current Stakers</th>
              <th>Amount Staked</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((event, index) => (
              <tr key={index}>
                <td>{truncateAddress(event.data.staker)}</td>
                <td>{ethers.utils.formatEther(event.data.amount)}</td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      ) : (
        <Spinner />
      )}
      </div>
      </StakedBalanceCard>
    </SlidingCard>
  );
}


const SlidingCard = styled.section`
  ${cardStyles};
  padding: 1rem;
  background-color: #000000;
  border-radius: 1rem;
  border: 3px solid #d4af37;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  color: #333;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-0.5rem);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  /* Basic form control style */
.form-control {
  display: block;
    width: 100%;
    padding: 0.600rem 0.90rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #ffc107;
    background-clip: padding-box;
    border: 1px solid hsl(96.32deg 100% 50%);
    border-radius: 0.70rem;
    transition: border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out;
}
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

`;

const StakedBalanceCard = styled.div`
  ${cardStyles};
  padding: 20px;
  border: 2px solid gold;
  justify-content: space-between;
  align-items: center;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: #000000;
    color: #ffc107;
    svg {
      color: #000000;
    }
  }

  .cd-margin {
    margin-top: 20px;
  }
`;


const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d4af37;
  border-radius: 0.5rem;

  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #d4af37;
  }

  th {
    background-color: #d4af37;
    color: #000000;
  }

  tr:nth-child(even) {
    background-color: #000000;
  }

  tr:nth-child(odd) {
    background-color: #000000;
  }

  tr:hover {
    background-color: #000000;
  }
};

`;

const CardContent = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
`;

const InputLabel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #555;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;
