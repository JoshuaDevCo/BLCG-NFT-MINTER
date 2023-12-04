import React from "react";
import styled from "styled-components";
import { Container, Heading } from "@chakra-ui/react";
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";
import BLCGlogo from "./BLCG.png"


const AuthCardContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height:75vh;
`;

const AuthCardSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #fff;
  border:1px solid #000;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
    border-radius: 50%;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  p {
    margin-bottom: 1.5rem;
    color: #555;
    text-align: center;
  }
`;

export default function AuthCard() {
  return (
    <AuthCardContainer>
      <AuthCardSection>
        <img
          src="https://www.billionlocalcoin.io/public/images/BLCG-PASS.png"
          alt="Logo"
        />
        <Heading className="text-center font-bold" as="h2" size="lg">
          Authenticate Wallet
        </Heading>
        <p className="text-center">To proceed, securely connect your TrustWallet or Metamask extension.</p>
        <p className=" text-center text-portal shadow-lg text-bold">Please connect your wallet</p>
      <ConnectWallet
        theme={"dark"}
        className="lg:hidden"
        btnTitle={"Connect Wallet"}
        modalTitle={"Authenticate Wallet"}
        switchToActiveChain={true}
        modalSize={"compact"}
        welcomeScreen={{}}
        termsOfServiceUrl={
          "https://www.billionlocalcoin.io/public/docs/Terms-conditions.pdf"
        }
        privacyPolicyUrl={
          "https://www.billionlocalcoin.io/public/docs/Privacy-Policy.pdf"
        }
      />
      </AuthCardSection>
    </AuthCardContainer>
  );
}
