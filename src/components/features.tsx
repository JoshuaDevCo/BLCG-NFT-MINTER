import React from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Partners from './Partners';
import Faqs from './Faqs';
import TokenomicsCard from './TokenomicsCard';
import Stats from './stats';
import NFTPackage from './NFTPackage';

import FTLogo1 from "../assets/reason1.png";
import FTLogo2 from "../assets/reason2.png";
import FTLogo3 from "../assets/reason3.png";
import FTLogo4 from "../assets/reason4.png";
import FTLogo5 from "../assets/reason5.png";
import FTLogo6 from "../assets/reason6.png";
import FTLogo7 from "../assets/reason7.png";
import FTLogo8 from "../assets/reason8.png";

interface FeatureItemProps {
  logo: string;
  title: string;
  description: string;
}

const featuresData = [
  { logo: FTLogo1, title: 'Feature 1', description: 'We believe in complete transparency and open communication with our clients, providing regular updates and reports on the progress of our work.' },
  { logo: FTLogo2, title: 'Feature 2', description: 'We believe in complete transparency and open communication with our clients, providing regular updates and reports on the progress of our work.  ' },
  { logo: FTLogo3, title: 'Feature 3', description: 'We believe in complete transparency and open communication with our clients, providing regular updates and reports on the progress of our work.' },
  { logo: FTLogo4, title: 'Feature 4', description: 'We believe in complete transparency and open communication with our clients, providing regular updates and reports on the progress of our work.' },
  { logo: FTLogo5, title: 'Feature 5', description: 'We believe in complete transparency and open communication with our clients, providing regular updates and reports on the progress of our work.' },
  { logo: FTLogo6, title: 'Feature 6', description: 'We believe in complete transparency and open communication with our clients, providing regular updates and reports on the progress of our work.' },
  { logo: FTLogo7, title: 'Feature 7', description: 'We believe in complete transparency and open communication with our clients, providing regular updates and reports on the progress of our work.' },
  { logo: FTLogo8, title: 'Feature 8', description: 'We believe in complete transparency and open communication with our clients, providing regular updates and reports on the progress of our work.' },
];

const FeatureItem: React.FC<FeatureItemProps> = ({ logo, title, description }) => (
  <div className="features__item">
    <div className="features__icon">
      <img decoding="async" src={logo} alt={title} />
    </div>
    <div className="features__title text3xl text-portal">
      <p>{title}</p>
    </div>
    <div className="">
      <p>{description}</p>
    </div>
  </div>
);

const Features: React.FC = () => (
  <div className="bg-features-1 py-24">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-2 lg:text-5xl text-4xl font-bold tracking-tight headerColor sm:text-4xl">
          Tokenized Reward Ecosystem
        </p>
        <p className="mt-4 text-lg leading-8 text-p">
          If you're a crypto enthusiast looking for the next big thing, you've come to the right place.
        </p>
      </div>
      <div className="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {featuresData.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Features;
