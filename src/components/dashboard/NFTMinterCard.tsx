import { MdFileUpload } from "react-icons/md";
import Card from "./Card";
import banner from "./TRC.png";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
} from "@thirdweb-dev/react";
import {
  stakingAddress,
  tokenContractAddress,
  tokenizedBronzeAddress,
} from "../../const/contractAddresses";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";

const NFTminterCard = () => {
  const address = useAddress();

  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );

  const { contract: tokenizednftContract } = useContract(
    tokenizedBronzeAddress,
    "nft-drop"
  );
  const { contract: stakingContract } = useContract(stakingAddress);
  const { data: myTokenizedNFTs } = useOwnedNFTs(
    tokenizednftContract,
    address
  );
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
    <Card className="grid grid-cols-1 lg:grid-cols-2 gap-3 rounded-[20px] bg-portal bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-10 mt-2 mb-2">
      <div className="flex h-full flex-col justify-center overflow-hidden rounded-xl bg-white dark:!bg-navy-800">
        <button className="flex h-full w-full items-center justify-center rounded-xl py-3 dark:!border-navy-700 lg:pb-0">
          <img width="500px" src={banner} alt="" />
        </button>
      </div>

      <div className="flex h-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
        <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
          Mint & Claim Tokenized Bronze
        </h5>
        <p className="leading-1 mt-2 mb-2 text-base font-normal text-gray-600">
          Unlock your gateway to our Tokenized Mining NFTs — a futuristic mining
          machine for earning $TRC. Experience our innovative proof of hold
          consensus on the path to proof of stake, managed through our exclusive
          Dapp, providing constant access to your NFTs and $TRC rewards.
        </p>
        <div className="p-2 mb-2 sm:px-8">
          {/* ... (unchanged) */}
        </div>

        <Web3Button
          className="linear container mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-4 py-4 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          contractAddress={tokenizedBronzeAddress}
          action={(tokenizednftContract) =>
            tokenizednftContract.erc721.claim(1)
          }
        >
          Claim and Mint
        </Web3Button>
      </div>
    </Card>
  );
};

export default NFTminterCard;
