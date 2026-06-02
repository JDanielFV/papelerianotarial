"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const QualitySection = styled(motion.section)`
  padding: 100px 5%;
  text-align: center;
  background-color: var(--background);
  color: var(--foreground);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

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
  opacity: 0.35;
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
    background: var(--overlay-gradient);
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
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background-color: #d4a317;
    margin: 1rem auto 0 auto;
  }

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
  background: var(--card-background);
  border: 1px solid var(--card-border);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  backdrop-filter: blur(10px);

  &:hover {
    background: var(--card-background-hover);
    transform: translateY(-5px);
    border-color: var(--card-border-hover);
    box-shadow: var(--shadow);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #d4a317;
  font-weight: 500;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-muted);
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

const Quality = ({
  title = "Nuestra Calidad",
  features = []
}) => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const getFeatureBg = (featureTitle) => {
    const feat = features.find(f => f.title === featureTitle);
    return feat ? feat.bg : null;
  };

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
            bg={getFeatureBg(hoveredFeature)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <ContentWrapper>
        {title && <Title variants={itemVariants}>{title}</Title>}
        {features && features.length > 0 && (
          <Grid>
            {features.map((feature, index) => (
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
        )}
      </ContentWrapper>
    </QualitySection>
  );
};

export default Quality;
