import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import { cardStyles } from "./ReusableStyles";

import image1 from "../assets/04.jpg";
import image2 from "../assets/05.png";
import image3 from "../assets/06.png";

const slides = [
  {
    image: image1,
    title: "Welcome to TagenLab Web3 Ecosystem",
    subTitle: "We are thrilled to have you join us in this exciting journey into the world of Web3. Our ecosystem is a hub of innovation, where cutting-edge technologies, decentralized applications, and blockchain solutions come together to redefine the way we interact with the digital realm.",
    eventDate: new Date("2023-09-01T12:00:00"),
  },
  {
    image: image2,
    title: "Our Web3 Beginner Guide - Get Started",
    subTitle: "Welcome to our Web3 Beginner Guide, your gateway to the exciting world of Web3 technology. Whether you're completely new to the concept or looking to deepen your understanding, this guide is designed to help you take your first steps into the decentralized future.",
    eventDate: new Date("2023-09-15T15:30:00"),
  },
  {
    image: image3,
    title: "Our Community Disscussion & Forums ",
    subTitle: "Welcome to our vibrant Community Discussion and Forums! This is the heart of our online community, where enthusiasts, experts, and newcomers come together to exchange ideas, share knowledge, and engage in thoughtful conversations about all things related to our shared interests.",
    eventDate: new Date("2023-10-05T10:00:00"),
  },
];

export default function AnnouncementCard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const { image, title, subTitle, eventDate } = slides[currentSlide];

  const timeRemaining = eventDate - new Date();
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <SlidingCard>
      <ImageContainer>
        <img src={image2} alt="Token Logo" />
      </ImageContainer>
      <CardContent>
        <h2>{title}</h2>
        <h5>{subTitle}</h5>
      </CardContent>
    </SlidingCard>
  );
}

const SlidingCard = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  background-color: #000;
  border-radius: 1rem;
  border: 3px solid #d4af37;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-0.5rem);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* Center horizontally on mobile */
  }

  .event {
    gap: 10px;
  }
`;

const CardContent = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: ${(props) => (props.mobileCentered ? "center" : "left")}; /* Center content on mobile if mobileCentered is true */
  align-items: ${(props) => (props.mobileCentered ? "center" : "flex-start")}; /* Center horizontally on mobile if mobileCentered is true */
  margin-top: 31px;

  @media (max-width: 768px) {
    text-align: center; /* Always center text on mobile */
    align-items: center; /* Always center horizontally on mobile */
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 10rem;
    max-width: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    margin: 0;
  }
`;

const Paragraph = styled.p`
  flex: 1;
`;

const EventButton = styled.div`
  display: flex;
  align-items: flex-end;

  button {
    padding: 0.5rem 1rem;
    background-color: #d4af37;
    color: black;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #b38927;
    }
  }
`;
