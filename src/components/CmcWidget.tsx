import React from 'react';

interface CoinMarketCapWidgetProps {
  coins: string;
  currency: string;
  theme: string;
  transparent: string;
  showSymbolLogo: string;
}

function CoinMarketCapWidget({
  coins,
  currency,
  theme,
  transparent,
  showSymbolLogo,
}: CoinMarketCapWidgetProps) {
  return (
    <div>
      <script
        type="text/javascript"
        src="https://files.coinmarketcap.com/static/widget/coinMarquee.js"
      ></script>
      <div
        id="coinmarketcap-widget-marquee"
        data-coins={coins}
        data-currency={currency}
        data-theme={theme}
        data-transparent={transparent}
        data-show-symbol-logo={showSymbolLogo}
      ></div>
    </div>
  );
}

export default CoinMarketCapWidget;
