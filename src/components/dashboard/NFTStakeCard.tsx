import Card from "./Card";
import banner from "../../../../assets/img/profile/3.png";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { tokenizedBronzeAddress, tokenContractAddress, stakingAddress } from "../../const/contractAddresses";
import numeral from "numeral";


const NFTStakeCard = () => {
  const address = useAddress();
  
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );

  const { contract: tokenizednftContract } = useContract(tokenizedBronzeAddress, "nft-drop");
  const { contract: stakingContract } = useContract(stakingAddress);
  const { data: myTokenizedNFTs } = useOwnedNFTs(tokenizednftContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const { data: stakedTokens } = useContractRead(stakingContract, "getStakeInfo", [
    address,
  ]);

  useEffect(() => {
    if (!stakingContract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await stakingContract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, stakingContract]);
  
  async function StakeNFT(id: string) {
    if (!address) return;

    const isApproved = await tokenizednftContract?.isApproved(
      address,
      stakingAddress
    );

    if (!isApproved) {
      await tokenizednftContract?.setApprovalForAll(stakingAddress, true);
    }

    await stakingContract?.call("stake", [[id]]);
  }
  
    
  return (
    <Card extra={"w-full h-full p-3"}>
         <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow card bg-dark rounded-box place-items-center"><h4 className="px-2 mb-2 text-xl font-bold text-navy-700 dark:text-white">
          My Golden Pass NFT 
        </h4>
        <div>
        {myTokenizedNFTs?.map((nft) => (
          <div className="container">
          <div className="card place-items-center">
            {nft.metadata && (
             <center>
                 <ThirdwebNftMedia
              height='160px'
              width='180px'
                metadata={nft.metadata}
              />
            </center>
            )}
        <h5 className="card-title text-center">{nft.metadata.name}</h5>
        {/* <div className="badge badge-primary mt-2 mb-2">Not Mining</div> */}
        {/* <Web3Button
      contractAddress={stakingAddress}
      action={() => StakeNFT(nft.metadata.id)}
    >
      Start Mining Reward
    </Web3Button> */}
          </div>
          </div>
))} 
</div>
        </div> 
  <div className="divider lg:divider-horizontal"></div> 
  {/* <div className="grid flex-grow card bg-dark rounded-box place-items-center">
  <h4 className="px-2 mb-2 text-xl font-bold text-navy-700 dark:text-white">
          Active Mining NFT 
        </h4> 
  {stakedTokens &&
              stakedTokens[0]?.map((stakedToken: BigNumber) => (
                <NFTCard
                  tokenId={stakedToken.toNumber()}
                  key={stakedToken.toString()}
                />
              ))}
              </div> */}
</div>
    </Card>
  );
};

export default NFTStakeCard;
