"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

const ContactSectionWrapper = styled(motion.section)`
  padding: 80px 20px;
  text-align: center;
  background-color: var(--color-secondary);
  color: var(--color-text-light);
`;

const Title = styled(motion.h2)`
  font-size: 3em;
  margin-bottom: 20px;
  color: var(--color-text-light);
`;

const Description = styled(motion.p)`
  max-width: 800px;
  margin: 0 auto 40px auto;
  font-size: 1.2em;
  line-height: 1.6;
`;

const ContactButton = styled(motion.a)`
  display: inline-block;
  padding: 15px 30px;
  background-color: var(--color-primary);
  color: var(--color-text-light);
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

const ContactSection = () => {
  return (
    <ContactSectionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        ¿Listo para Elevar tu Papelería Notarial?
      </Title>
      <Description
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Contáctanos hoy mismo para descubrir cómo Papelería Notarial A&G puede satisfacer tus necesidades con productos de la más alta calidad y un servicio excepcional. Estamos aquí para ayudarte.
      </Description>
      <Link href="/contacto" passHref legacyBehavior>
        <ContactButton
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contáctanos
        </ContactButton>
      </Link>
    </ContactSectionWrapper>
  );
};

export default ContactSection;
