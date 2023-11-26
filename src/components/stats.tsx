import React, { useEffect, useState } from "react";

interface CoinInfo {
  address: string;
  chainId: number;
  priceUsd: number;
  priceUsd24hAgo: number;
  marketCapUsd: number;
  totalReserveUsd: number;
}

export default function Stats() {
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

  const formatMoney = (value: number) => {
    if (value !== null && value !== undefined) {
      return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }
    return "N/A"; // or any other suitable placeholder
  };

  const stats = [
    { id: 1, name: 'Market Cap (USD)', value: coinData.length > 0 ? coinData[0].marketCapUsd.toFixed(2) : "N/A" },
    { id: 2, name: 'Total Known Liquidity (USD)', value: coinData.length > 0 ? formatMoney(coinData[0].totalReserveUsd) : "N/A" },
    { id: 3, name: 'Price 24h Ago (USD)', value: coinData.length > 0 ? formatMoney(coinData[0].priceUsd24hAgo) : "N/A" },
  ];

  return (
    <div className="bg-stats">
    <div className="mx-auto max-w-7xl px-6 lg:px-">
    <div className="relative max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-heading">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-p sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
    </div>
    </div>
  );
}
