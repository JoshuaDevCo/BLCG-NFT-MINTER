import { MdBarChart } from "react-icons/md";
import Card from "./Card";
import React, { useEffect, useState } from "react";

interface CoinInfo {
  address: string;
  chainId: number;
  priceUsd: number;
  priceUsd24hAgo: number;
  marketCapUsd: number;
  totalReserveUsd: number;
}

const LiquidityWidget = () => {
  const [coinData, setCoinData] = useState<CoinInfo[]>([]);

  useEffect(() => {
    async function fetchCoinData() {
      const url = "https://api.coinbrain.com/public/coin-info";

      const payload = {
        "56": [
          "0x6ca7c5931AF660fd258824Faed3A29955D9060FD"
        ],
      };

      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const coinData = await response.json() as CoinInfo[];
          setCoinData(coinData);
        } else {
          console.error("Failed to fetch data.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchCoinData();
  }, []);

  const formatMoney = (value: number | null | undefined) => {
    if (value !== null && value !== undefined) {
      return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }
    return "N/A"; // or any other suitable placeholder
  };

  const stats = [
    { id: 1, name: 'Market Cap (USD)', value: coinData.length > 0 ? formatMoney(coinData[0].marketCapUsd) : "N/A" },
    { id: 2, name: 'Total Known Liquidity (USD)', value: coinData.length > 0 ? formatMoney(coinData[0].totalReserveUsd) : "N/A" },
    { id: 3, name: 'Price 24h Ago (USD)', value: coinData.length > 0 ? formatMoney(coinData[0].priceUsd24hAgo) : "N/A" },
  ];

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
        <p className="font-dm text-sm font-medium text-portal">Total Known Liquidity (USD)</p>
          <h4 className="text-xl font-bold text-white">
              <p>{stats[1].value}</p>
          </h4>
      </div>
    </Card>
  );
};

export default LiquidityWidget;