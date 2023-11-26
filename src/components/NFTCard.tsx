import {
    ThirdwebNftMedia,
    useContract,
    useNFT,
    Web3Button,
  } from "@thirdweb-dev/react";
  import type { FC } from "react";
  import {
    BLC_CONTRACT_ADDRESSES,
    ERC721_CONTRACT_ADDRESS,
    NFTSTAKING_CONTRACT_ADDRESS,
  } from "../const/addresses";
  
  interface NFTCardProps {
    tokenId: number;
  }
  
  const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
    const { contract } = useContract(ERC721_CONTRACT_ADDRESS, "nft-drop");
    const { data: nft } = useNFT(contract, tokenId);
  
    return (
      <>
        {nft && (
          <div className="bg-gray-100 p-4 rounded-lg">
            {nft.metadata && (
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className="w-32 h-32 mx-auto"
              />
            )}
            <h3 className="text-xl font-bold mt-2">{nft.metadata.name}</h3>
            <Web3Button
              action={(contract) => contract?.call("withdraw", [[nft.metadata.id]])}
              contractAddress={ERC721_CONTRACT_ADDRESS}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
            >
              Withdraw
            </Web3Button>
          </div>
        )}
      </>
    );
  };
  
  export default NFTCard;
  