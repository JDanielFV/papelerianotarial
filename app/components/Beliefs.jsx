"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

const BeliefsSection = styled(motion.section)`
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
  
  // Mobile Fade
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);

  @media (min-width: 1024px) {
    width: 50%;
    height: 500px;
    margin-bottom: 0;
    order: 2; // Image on the right for alternation
    
    // Desktop Fade: Left to Right
    mask-image: linear-gradient(to right, transparent 0%, black 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 100%);
  }
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.4;
`;

const TextContainer = styled(motion.div)`
  width: 100%;
  text-align: center;
  z-index: 1;

  @media (min-width: 1024px) {
    width: 50%;
    text-align: left;
    order: 1; // Text on the left
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
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-muted);
  font-weight: 300;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p strong {
    color: var(--accent-color);
    font-weight: 500;
  }

  @media (min-width: 1024px) {
    margin: 0;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2.5rem;
  width: 100%;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const CTAButton = styled(Link)`
  padding: 0.9rem 2.2rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${({ $primary }) => $primary ? `
    background-color: var(--accent-color);
    color: var(--background-dark);
    border: 1px solid var(--accent-color);
    &:hover {
      background-color: var(--accent-hover);
      border-color: var(--accent-hover);
      box-shadow: 0 10px 25px rgba(212, 163, 23, 0.4);
      transform: translateY(-2px);
    }
  ` : `
    background-color: transparent;
    color: var(--foreground);
    border: 1px solid var(--card-border);
    &:hover {
      border-color: var(--foreground);
      background-color: var(--card-background-hover);
      transform: translateY(-2px);
    }
  `}
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Beliefs({
  title = "En Qué Creemos",
  imageSrc = "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=800&auto=format&fit=crop",
  paragraphs = [
    "Creemos firmemente que en el ámbito legal, la <strong>primera impresión no es solo estética: es el cimiento de la confianza</strong>. Un documento impecable, presentado en carpetas y folios de calidad excepcional, comunica de forma inmediata el rigor, la seriedad y el respeto con el que trata cada caso.",
    "El prestigio notarial se construye en los detalles. Cuando sus clientes sostienen una escritura con grabados perfectos y papel de alto gramaje, sienten la seguridad y el respaldo institucional de su Notaría. Diseñamos soluciones que proyectan autoridad y garantizan el resguardo de su legado."
  ],
  primaryButtonText = "Ver Catálogo",
  primaryButtonHref = "/catalogo",
  secondaryButtonText = "Contactar un Asesor",
  secondaryButtonHref = "/contacto"
}) {
  return (
    <BeliefsSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
        <ImageContainer variants={itemVariants}>
          <StyledImage
            src={imageSrc}
            alt={title}
          />
        </ImageContainer>

      <TextContainer>
        {title && (
          <Title variants={itemVariants}>
            {title}
          </Title>
        )}
        {paragraphs && paragraphs.length > 0 && (
          <Content variants={itemVariants}>
            {paragraphs.map((p, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </Content>
        )}
        
        <ButtonGroup variants={itemVariants}>
          {primaryButtonText && (
            <CTAButton href={primaryButtonHref} $primary="true">
              {primaryButtonText}
            </CTAButton>
          )}
          {secondaryButtonText && (
            <CTAButton href={secondaryButtonHref}>
              {secondaryButtonText}
            </CTAButton>
          )}
        </ButtonGroup>
      </TextContainer>
    </BeliefsSection>
  );
}
