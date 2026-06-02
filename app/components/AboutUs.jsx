"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";
import HighlightText from "./HighlightText";

const AboutUsSection = styled(motion.section)`
  padding: 50px 5%;
  background-color: var(--background);
  color: var(--foreground);
  font-family: Raleway, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;

  @media (min-width: 768px) {
    padding: 70px 8%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    gap: 3rem;
  }
  @media (min-width: 1024px) {
    padding: 100px 10%;
    gap: 5rem;
  }
`;

const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 2rem;
  
  // Mobile Fade: Top to Bottom (Transparent at top, solid at bottom? Or fade out at bottom?)
  // User asked: "fade de arriba a abajo" -> usually means visible at top, fading out at bottom, or vice versa.
  // Context: "imagen comience con el fade de arriba a abajo" -> likely means fading IN from top?
  // Let's interpret as: Image is at the top (mobile), fading into the background at the bottom.
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);

  @media (min-width: 768px) {
    width: 45%;
    height: 420px;
    margin-bottom: 0;
    order: 1;
    mask-image: linear-gradient(to left, transparent 0%, black 100%);
    -webkit-mask-image: linear-gradient(to left, transparent 0%, black 100%);
  }
  @media (min-width: 1024px) {
    width: 50%;
    height: 600px;
  }
`;

const TextContainer = styled(motion.div)`
  width: 100%;
  text-align: center;
  z-index: 1;

  @media (min-width: 768px) {
    width: 55%;
    text-align: left;
    order: 2;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--foreground);
  font-weight: lighter;

  @media (min-width: 1024px) {
    font-size: 4rem;
    margin-bottom: 3rem;
  }
`;

const Content = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #cccccc;
  font-weight: 300;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const Highlight = styled.span`
  color: var(--foreground);
  font-weight: 600;
`;

const AboutUs = ({
  title = "Sobre Nosotros",
  imageSrc = "/logo blanco.svg",
  paragraphs = []
}) => {
  return (
    <AboutUsSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {imageSrc && (
        <ImageContainer
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            style={{ objectFit: "contain", opacity: 0.5 }}
          />
        </ImageContainer>
      )}

      <TextContainer>
        {title && (
          <Title
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </Title>
        )}
        {paragraphs && paragraphs.length > 0 && (
          <Content
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {paragraphs.map((p, index) => (
              <HighlightText key={index} as="p" html={p} />
            ))}
          </Content>
        )}
      </TextContainer>
    </AboutUsSection>
  );
};

export default AboutUs;
