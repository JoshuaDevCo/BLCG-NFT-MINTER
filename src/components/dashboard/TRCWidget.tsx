import { useEffect, useState } from "react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { tokenContractAddress } from "../../const/contractAddresses";
import { MdBarChart } from "react-icons/md";
import { ethers } from "ethers";
import Card from "./Card";

export default function TRCWidget() {
  const address = useAddress();
  const { contract: tokenContract, isLoading: loadingToken } = useContract(tokenContractAddress);
  const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(tokenContract, address);
  const manualUsdRate = 0.000000002434; // Set your manual USD rate here
  const [usdPrice, setUsdPrice] = useState<number | null>(null);

  useEffect(() => {
    // Calculate the USD price based on the manual rate
    if (tokenBalance?.value !== undefined) {
      const usdPrice = parseFloat(ethers.utils.formatEther(tokenBalance.value)) * manualUsdRate;
      setUsdPrice(usdPrice);
    }
  }, [tokenBalance, manualUsdRate]);

  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
      <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
        <span className="flex items-center text-brand-500 dark:text-white">
          <MdBarChart className="h-7 w-7" />
        </span>
      </div>
    </div>

      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-portal">Wallet Balance</p>
        {!loadingToken && !loadingTokenBalance && tokenBalance?.value !== undefined ? (
          <>
            <h4 className="text-xl font-bold text-white dark:text-white">
              {`${parseFloat(ethers.utils.formatEther(tokenBalance.value)).toLocaleString()} ${tokenBalance.symbol}`}
            </h4>
            {usdPrice !== null && (
              <p className="coinprice text-portal">
              {`${usdPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} USD
              </p>
            )}
          </>
        ) : (
          <div className="skeleton-loader">
            <div className="loading-animation">Loading...</div>
          </div>
        )}
      </div>
    </Card>
  );
}
