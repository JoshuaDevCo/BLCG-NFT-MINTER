import Tokenomics from "../assets/trc-tokenomics.gif";


const features = [
  { name: 'Token Name', description: 'Tokenized Reward Coin' },
  { name: 'Max Supply', description: '1,000,000,000' },
  { name: 'Number of Decimal', description: '18' },
  { name: 'Circulating Supply', description: '139 Billion' },
  { name: 'Mining Reward', description: '70%' },
  { name: 'Marketing', description: '20%' },
  { name: 'Partnership', description: '10%' },
]

export default function TokenomicsCard() {
  return (
    <div className="bg-tokes">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-1 lg:px-8">
        <div>
        <div className="mx-auto max-w-2xl lg:text-center mb-4"><p className="mb-6 lg:text-5xl text-4xl font-bold tracking-tight headerColor sm:text-4xl">Tokenomics</p><p className="mt-4 text-lg leading-8 text-p">TRC is built on the Binance Smart Chain with a transparent allocation of supply and functions designed to reward holders.

</p></div>
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-heading">{feature.name}</dt>
                <dd className="mt-2 text-lg text-p">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
