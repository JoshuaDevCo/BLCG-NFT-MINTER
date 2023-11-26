import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';

// About Page Component
export default function AboutPage() {
  return (
    <div className="bg-features-1">
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="lg:max-w-7xl mx-auto lg:px-8">
        <section className="mb-12">
          <h1 className="mb-2 lg:text-5xl text-4xl font-bold tracking-tight headerColor sm:text-4xl">
            About TRC
          </h1>
          <p className="mt-2 text-lg leading-7 text-heading">
            Tokenized Reward Community ($TRC), the premier tokenized social reward ecosystem on the Binance Smart Chain.
          </p>
        </section>

        <section className="mb-12">
        <h2 className="text-3xl font-semibold text-heading headerColor">
          Introducing Tokenized Reward Coin
            </h2>
        <p className="mt-4 font-medium leading-7 text-p">
        Tokenized Reward Coin ($TRC) represents the forefront of cryptocurrency innovation, residing on the Binance blockchain. It serves as a beacon of decentralization, challenging the conventions of traditional payment systems with the transformative power of blockchain technology. Empowered by Binance's robust proof of stake (P.O.S) algorithm, $TRC harnesses cutting-edge algorithms to autonomously stabilize its reserve currency. This foundation enables programmable payments and nurtures the development of a robust financial infrastructure. <br/> <br/> What truly distinguishes Tokenized Reward Coin ($TRC) is its remarkable origin story. Unlike many others in the crypto realm, it was not nurtured by external venture capital, didn't rely on an initial coin offering (ICO), and shunned seed funding. Instead, it has grown organically, following the path of Bitcoin's distribution and strategy. This unique approach underscores $TRC's unwavering commitment to community-driven development, ensuring an equitable and transparent distribution of this cryptocurrency. <br/><br/>Moreover, holders of Tokenized Mining NFTs enjoy the extraordinary privilege of compounding interest on their holdings. This not only maximizes the potential of their investments but also seamlessly integrates them into the dynamic world of decentralized finance.</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <h2 className="text-3xl font-semibold text-heading">
              Our Vision
            </h2>
            <p className="mt-4 font-medium leading-7 text-p">
            We are on the cusp of a new era for decentralized communities. Tokenized Reward Community ($TRC) will soon be the key link between decentralized and global communities, making our vision of widespread cryptocurrency adoption a reality. We thank each one of you for your essential contributions. The time has come for us to begin this journey.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-heading">
              Our Mission
            </h2>
            <p className="mt-4 font-medium leading-7 text-p">
              The Tokenized Reward Community embarked on its journey from the seeds of an idea. It pondered the possibilities in the absence of a centralized team, financial backing, and singular leadership akin to a "CEO." Could decentralization truly prove effective? Could we navigate the tumultuous waters of digital currencies, such as BTC and BNB, while choreographing a wholly community-driven initiative instead?
            </p>
          </section>
        </div>

        
      </div>
    </div>
    </div>

  );
}
