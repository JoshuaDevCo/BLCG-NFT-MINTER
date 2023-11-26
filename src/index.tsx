import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  trustWallet,
} from "@thirdweb-dev/react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/globals.css";
import Root from "./routes/root";

import ErrorPage from "./error-page";
import Portal from "./pages/Portal";
import NFT from "./pages/NFT";
import StakeNFT from "./pages/StakeNFT";
import StakeToken from "./pages/StakeToken";
import FreshMint from "./pages/Freshmint";
import Workshop from "./pages/Workshop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/", 
        element: <Portal />,
      },
      {
        path: "/smart-portal", 
        element: <Portal />,
      },
      {
        path: "/mint-nfts",
        element: <NFT />,
      },
      {
        path: "/stake-nfts",
        element: <StakeNFT />,
      },
      {
        path: "/stake-trc",
        element: <StakeToken />,
      },
      {
        path: "/swap-trc",
        element: <FreshMint />,
      },
      {
        path: "/workshop",
        element: <Workshop />,
      },
      // Add a catch-all route for unmatched routes
      {
        path: "*",
        element: <Portal />, // Redirect to "/smart-portal"
      },
    ],
  },
]);

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance-testnet";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
      <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.REACT_APP_TEMPLATE_CLIENT_ID}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        localWallet(),
        trustWallet({ recommended: true }),
      ]}
    >
    <RouterProvider router={router} />
    </ThirdwebProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
