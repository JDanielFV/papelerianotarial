"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

const ContactSectionWrapper = styled(motion.section)`
  padding: 100px 5%;
  text-align: center;
  background-color: var(--background);
  color: var(--foreground);
  font-family: Raleway, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 1024px) {
    padding: 150px 10%;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--foreground);
  font-weight: lighter;

  @media (min-width: 1024px) {
    font-size: 4rem;
  }
`;

const Description = styled(motion.p)`
  max-width: 800px;
  margin: 0 auto 3rem auto;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #cccccc;
  font-weight: 300;
`;

const ContactButton = styled(motion.button)`
  display: inline-block;
  padding: 1rem 3rem;
  background-color: transparent;
  color: #d4a317;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid #d4a317;
  cursor: pointer;
  font-family: Raleway, serif;

  &:hover {
    background-color: #d4a317;
    color: #0a0a0a;
    border-color: #d4a317;
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(212, 163, 23, 0.3);
  }
`;

const ContactSection = ({
  title = "¿Listo para Elevar tu Notaría?",
  description = "Contáctanos hoy mismo para descubrir cómo Papelería Notarial A&G puede satisfacer tus necesidades con productos de la más alta calidad y un servicio excepcional.",
  buttonText = "Contáctanos",
  buttonHref = "/contacto"
}) => {
  return (
    <ContactSectionWrapper
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
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
      {description && (
        <Description
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {description}
        </Description>
      )}
      {buttonHref && buttonText && (
        <Link href={buttonHref}>
          <ContactButton
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </ContactButton>
        </Link>
      )}
    </ContactSectionWrapper>
  );
};

export default ContactSection;
