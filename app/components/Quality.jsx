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
  opacity: 0.35; // Subtle effect but visible
  background-image: ${({ bg }) => bg ? `url(${bg})` : 'none'};
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.95) 85%);
  }
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

// Define background images for each feature from Unsplash
const featureBackgrounds = {
  "Materiales Premium": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop",
  "Tecnología de Punta": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
  "Atención Personalizada": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  "Seguridad Garantizada": "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200&auto=format&fit=crop",
  "Envíos Seguros": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop",
  "Sostenibilidad": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop"
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
