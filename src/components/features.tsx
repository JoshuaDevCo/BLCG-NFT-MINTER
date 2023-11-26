import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Partners from './Partners'
import Faqs from './Faqs'
import TokenomicsCard from './TokenomicsCard'
import Stats from './stats'
import NFTPackage from './NFTPackage'
import FTLogo1 from "../assets/nft.webp"
import FTLogo2 from "../assets/academy.webp"
import FTLogo3 from "../assets/stake.webp"
import FTLogo4 from "../assets/swap.webp"



export default function Features() {
  return (
    <div className="bg-features-1 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 lg:text-5xl text-4xl font-bold tracking-tight headerColor sm:text-4xl">
          Tokenized Reward Ecosystem
          </p>
          <p className="mt-4 text-lg leading-8 text-p">
          If you're a crypto enthusiast looking for the next big thing
you've come to the right place.
          </p>
        </div>
  <div className="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
  <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
  <div className="flex items-start gap-12 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
 style={{ opacity: 1, transform: "none" }}>
    <img src={FTLogo4} alt="Mining NFTs" className="w-16 h-16" />
    <div className="flex flex-col">
      <h3 className="mb-4 text-2xl font-bold text-primary">Mining NFTs</h3>
      <p className="mt-2 text-base font-medium leading-7 leading-relaxed text-p">Explore a new dimension of cryptocurrency mining with our Tokenized Mining NFTs. Own unique digital assets that grant you access to exclusive mining resources and rewards within our ecosystem.</p>
    </div>
  </div>
  <div className="flex items-start gap-12 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]" style={{ opacity: 1, transform: "none" }}>
    <img src={FTLogo3} alt="Real-Life Earning" className="w-16 h-16" />
    <div className="flex flex-col">
      <h3 className="mb-4 text-2xl font-bold text-primary">Real-Life Earning</h3>
      <p className="mt-2 text-base leading-7 font-medium text-p leading-relaxed">Earn digital tokens by achieving real-life goals and milestones. Our Tokenized Real-Life Earning feature lets you connect your personal achievements with our blockchain-based rewards system.</p>
    </div>
  </div>
  <div className="flex items-start gap-12 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]" style={{ opacity: 1, transform: "none" }}>
    <img src={FTLogo2} alt="Drops Edition" className="w-16 h-16" />
    <div className="flex flex-col">
      <h3 className="mb-4 text-2xl font-bold text-primary">Drops Edition</h3>
      <p className="mt-2 text-base font-medium leading-7 text-p leading-relaxed">Don't miss out on our limited edition NFTs and tokens with Tokenized Drops Edition. Participate in special events, contribute to our project's growth, and complete exciting in-app challenges to get your hands on exclusive digital assets.</p>
    </div>
  </div>
  <div className="flex items-start gap-12 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]" style={{ opacity: 1, transform: "none" }}>
    <img src={FTLogo1} alt="Wallet Recovery" className="w-16 h-16" />
    <div className="flex flex-col">
      <h3 className="mb-4 text-2xl font-bold text-primary"> Wallet Recovery</h3>
      <p className="mt-2 text-base font-medium leading-7 text-p leading-relaxed">Keep your digital assets safe and secure with our Tokenized Wallet Recovery feature. Set up a robust wallet recovery process, including multi-signature and trusted contacts, to ensure you never lose access to your assets.</p>
    </div>
  </div>
</div>
  </div>

      </div>
    </div>
  )
}
