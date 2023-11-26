import React from 'react'
import Card from './Card'

const TokenMinter = () => {
  return (
    <div className="flex justify-center items-center h-full mt-4">
    <Card extra={"w-full p-3"}>
    <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-portal dark:text-white">
          Buy TRC Tokens With Coinbrain
        </h4>
        <p className="mt-2 nft-font text-white">To buy TRC tokens on PancakeSwap, a decentralized exchange (DEX) that operates on the Binance Smart Chain (BSC).</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <iframe width={"100%"} height="640" frameBorder="0" scrolling="no" src="https://coinbrain.com/embed/trade?theme=dark&padding=16&chainId=56&chainLocked=1&inputAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outputAddress=0x6ca7c5931af660fd258824faed3a29955d9060fd&outputLocked=1"></iframe>
      <iframe width="100%" height="640" frameBorder="0" scrolling="no" src="https://coinbrain.com/embed/bnb-0x6ca7c5931af660fd258824faed3a29955d9060fd?theme=dark&padding=16&chart=0&trades=1"></iframe></div>
    </Card>
    </div>
  )
}

export default TokenMinter