import React, { useState } from "react";
import styled from "styled-components";
import {
  BsFillCalendar2WeekFill,
  BsCheckCircle,
  BsCircle,
} from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { cardStyles } from "./ReusableStyles";
import {
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import {
  ERC721_CONTRACT_ADDRESS,
  NFTSTAKING_CONTRACT_ADDRESS,
} from "../const/addresses";

const MyNFTCard = () => {
  const address = useAddress();

  const { contract: ERC721Contract } = useContract(
    ERC721_CONTRACT_ADDRESS,
    "signature-drop"
  );

  const { contract: StakeContract } = useContract(
    NFTSTAKING_CONTRACT_ADDRESS
  );

  const { data: ownedNFTs, isLoading: ownedNFTsIsLoading } = useOwnedNFTs(
    ERC721Contract,
    address
  );

  const [selectedNFTs, setSelectedNFTs] = useState([]);

  function handleSelectNFT(nftId) {
    if (selectedNFTs.includes(nftId)) {
      setSelectedNFTs(selectedNFTs.filter((id) => id !== nftId));
    } else {
      setSelectedNFTs([...selectedNFTs, nftId]);
    }
  }

  async function stakeNFT(nftId) {
    if (!address) return;

    const isApproved = await ERC721Contract?.isApproved(
      address,
      NFTSTAKING_CONTRACT_ADDRESS
    );

    if (!isApproved) {
      await ERC721Contract?.setApprovalForAll(
        NFTSTAKING_CONTRACT_ADDRESS,
        true
      );
    }

    await StakeContract?.call("stake", [nftId]);
  }

  return (
    <Section>
      <CustomTitle>Owned NFTs</CustomTitle>
      <p>Embrace the opportunity to maximize your crypto assets by staking your BLCT tokens. By becoming a Validator, you'll not only secure the network but also unlock a continuous stream of daily rewards in the form of BLCG Tokens.</p>
      <Web3Button
        contractAddress={NFTSTAKING_CONTRACT_ADDRESS}
        action={() => stakeNFT(selectedNFTs)}
        onSuccess={() => {
          alert("Staked NFTs");
          setSelectedNFTs([]);
        }}
        isDisabled={selectedNFTs.length === 0}
      >
        {`Stake NFTs (${selectedNFTs.length})`}
      </Web3Button>
      {ownedNFTsIsLoading ? (
        <p>Loading...</p>
      ) : (
        <CardRow>
          {ownedNFTs?.map((nft) => (
            <Card
              key={nft.metadata.id}
              onClick={() => handleSelectNFT(parseInt(nft.metadata.id))}
              selected={selectedNFTs.includes(parseInt(nft.metadata.id))}
            >
              <ThirdwebNftMedia
                metadata={nft.metadata}
                style={{ width: "128px", height: "128px", borderRadius: "5px", // Add this line
              }}
              />
              <div className="cardText">
                <h2>{nft.metadata.name}</h2>
                <p>Token: #{nft.metadata.id}</p>
              </div>
            </Card>
          ))}
        </CardRow>
      )}
    </Section>
  );
};

const CardRow = styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: 0.1rem;
    flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack cards vertically on screens with a max-width of 768px (adjust as needed) */
  }
`;

const Card = styled.div`
  ${cardStyles};
  flex: 1; /* Take up the full width of the container */
  margin: 0.5rem; /* Add some spacing between cards on mobile */
  padding: 1rem;
  border: 2px solid gold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: ${(props) => (props.selected ? "#ffc107" : "#ffffff")};
  color: #000000;
  cursor: pointer;
  transform-origin: center;
  transform: scale(1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${(props) => (props.selected ? "#ffc107" : "#ffc107")};
    color: #000000;
    svg {
      color: ${(props) => (props.selected ? "#ffffff" : "#ffffff")};
    }
    transform: scale(1.05);
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    flex: 1; /* Take up the full width on mobile */
  }
`;


const Section = styled.section`
  display: grid;
  gap: 1rem;
`;

const CustomTitle = styled.h5`
  font-size: 1.5rem;
  color: white;
`;

export default MyNFTCard;
