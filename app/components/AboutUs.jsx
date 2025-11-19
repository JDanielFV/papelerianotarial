"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

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

  @media (min-width: 1024px) {
    padding: 100px 10%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
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

  @media (min-width: 1024px) {
    width: 50%;
    height: 600px;
    margin-bottom: 0;
    order: 1; // Image on left
    
    // Desktop Fade: Right to Left (Fade out towards the right where text is? Or fade out towards left?)
    // User asked: "fade de derecha a izquierda a modo de fondo" -> Fade from Right (transparent) to Left (solid)?
    // Or Image on Left, fading out to the Right into the background?
    // "imagen a la izquierda... fade de derecha a izquierda" -> 
    // If image is on left, and fade is right-to-left, it means right side is transparent, left is solid.
    mask-image: linear-gradient(to left, transparent 0%, black 100%);
    -webkit-mask-image: linear-gradient(to left, transparent 0%, black 100%);
  }
`;

const TextContainer = styled(motion.div)`
  width: 100%;
  text-align: center;
  z-index: 1;

  @media (min-width: 1024px) {
    width: 50%;
    text-align: left;
    order: 2; // Text on right
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

const AboutUs = () => {
  return (
    <AboutUsSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <ImageContainer
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Placeholder Image - Replace with real image later */}
        <Image
          src="/logo blanco.png" // Using logo as placeholder since user has no images
          alt="Sobre Nosotros"
          fill
          style={{ objectFit: "cover", opacity: 0.5 }} // Low opacity for background feel
        />
      </ImageContainer>

      <TextContainer>
        <Title
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Sobre Nosotros
        </Title>
        <Content
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>
            En <Highlight>Papelería Notarial A&G</Highlight>, nos dedicamos a ofrecer soluciones de alta seguridad y elegancia para notarios en todo México. Con años de experiencia en el sector, entendemos la importancia de la <Highlight>confiabilidad</Highlight> y la <Highlight>presentación impecable</Highlight> en cada documento notarial.
          </p>
          <p>
            Nuestro compromiso es brindar productos que no solo cumplan con los estándares legales, sino que también reflejen la <Highlight>excelencia</Highlight> de su notaría. Desde hologramas de seguridad hasta folios personalizados, cada detalle es cuidado minuciosamente.
          </p>
        </Content>
      </TextContainer>
    </AboutUsSection>
  );
};

export default AboutUs;
