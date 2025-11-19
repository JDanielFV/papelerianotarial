"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const QualitySection = styled(motion.section)`
  padding: 100px 5%;
  text-align: center;
  background-color: var(--background);
  color: var(--foreground);
  font-family: Raleway, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden; // Contain the background

  @media (min-width: 1024px) {
    padding: 150px 10%;
  }
`;

// Dynamic Background Layer
const DynamicBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.2; // Subtle effect
  background: ${({ bg }) => bg || 'transparent'};
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 4rem;
  color: var(--foreground);
  font-weight: lighter;

  @media (min-width: 1024px) {
    font-size: 4rem;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 15px;
  text-align: left;
  transition: transform 0.3s ease, border-color 0.3s ease;
  cursor: default;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--foreground);
  font-weight: 600;
`;

const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #cccccc;
  font-weight: 300;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Define background colors/gradients for each feature
const featureBackgrounds = {
  "Materiales Premium": "linear-gradient(45deg, #8B7355, #6B5345)", // Bronze/Brown - elegant alternative to gold
  "Tecnología de Punta": "linear-gradient(45deg, #00BFFF, #1E90FF)", // Blue
  "Atención Personalizada": "linear-gradient(45deg, #FF69B4, #FF1493)", // Pink/Red
  "Seguridad Garantizada": "linear-gradient(45deg, #32CD32, #008000)", // Green
  "Envíos Seguros": "linear-gradient(45deg, #8A2BE2, #4B0082)", // Purple
  "Sostenibilidad": "linear-gradient(45deg, #20B2AA, #008B8B)" // Teal
};

const Quality = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <QualitySection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <AnimatePresence mode="wait">
        {hoveredFeature && (
          <DynamicBackground
            key={hoveredFeature}
            bg={featureBackgrounds[hoveredFeature]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <ContentWrapper>
        <Title variants={itemVariants}>Nuestra Calidad</Title>
        <Grid>
          {[
            { title: "Materiales Premium", desc: "Utilizamos solo los mejores papeles y tintas importadas para asegurar la longevidad de sus documentos." },
            { title: "Tecnología de Punta", desc: "Impresión de alta resolución y acabados precisos con maquinaria de última generación." },
            { title: "Atención Personalizada", desc: "Cada cliente es único. Adaptamos nuestros diseños a la identidad específica de su notaría." },
            { title: "Seguridad Garantizada", desc: "Implementamos medidas de seguridad avanzadas como hologramas y microtextos." },
            { title: "Envíos Seguros", desc: "Logística especializada para garantizar que su pedido llegue en perfectas condiciones." },
            { title: "Sostenibilidad", desc: "Comprometidos con el medio ambiente, utilizamos procesos y materiales eco-amigables." }
          ].map((feature, index) => (
            <Card
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredFeature(feature.title)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardTitle>{feature.title}</CardTitle>
              <CardText>{feature.desc}</CardText>
            </Card>
          ))}
        </Grid>
      </ContentWrapper>
    </QualitySection>
  );
};

export default Quality;
