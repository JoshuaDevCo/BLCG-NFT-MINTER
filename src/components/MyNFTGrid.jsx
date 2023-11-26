import React, { useState } from "react";
// import styles from "../styles/NFT.module.css";
// import StakeNFTCard from "./stake-nft-card";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS, NFTSTAKING_CONTRACT_ADDRESS } from "../const/addresses";
import StakeNFTCard from "./StakeNFTGridcard";

export default function StakeNFTGrid({ 
    isLoading, 
    data, 
    emptyText = "No NFTs"
}) {
    const address = useAddress();
    const [selectedNFTs, setSelectedNFTs] = useState([]);

    function handleSelectNFT(nftId) {
        if (selectedNFTs.includes(nftId)) {
            setSelectedNFTs(selectedNFTs.filter((id) => id !== nftId));
        } else {
            setSelectedNFTs([...selectedNFTs, nftId]);
        }
    }

    const {
        contract: ERC721Contract
    } = useContract(ERC721_CONTRACT_ADDRESS, "Signature-drop");

    const {
        contract: StakeContract
    } = useContract(NFTSTAKING_CONTRACT_ADDRESS);

    async function stakeNFT(nftId) {
        if (!address) return;

        const isApproved = await ERC721Contract?.isApproved(
            address,
            NFTSTAKING_CONTRACT_ADDRESS,
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
        <div className="">
            <div className="">
                <h3>Owned:</h3>
               
            </div>
            <hr />

            <div className="">
                {isLoading ? (
                    [...Array(20)].map((_, index) => (
                        <div key={index} className="">
                            <p>Loading...</p>
                        </div>
                    ))
                ) : data && data.length > 0 ? (
                    data.map((nft, index) => (
                        <div 
                            key={index}
                            className=""
                            onClick={() => handleSelectNFT(parseInt(nft.metadata.id))}
                        >
                              <StakeNFTCard
                                nft={nft}
                            />
                        </div>
                    ))
                ) : (
                    <p>{emptyText}</p>
                )}
            </div>
        </div>
    );
}
