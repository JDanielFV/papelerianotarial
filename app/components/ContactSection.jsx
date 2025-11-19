"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

const ContactSectionWrapper = styled(motion.section)`
  padding: 100px 5%;
  text-align: center;
  background-color: #0a0a0a;
  color: #ffffff;
  font-family: Raleway, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #ffffff;
  font-weight: lighter;
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
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  font-family: Raleway, serif;

  &:hover {
    background-color: #ffffff;
    color: #0a0a0a;
    border-color: #ffffff;
  }
`;

const ContactSection = () => {
  return (
    <ContactSectionWrapper
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Title
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        ¿Listo para Elevar tu Papelería Notarial?
      </Title>
      <Description
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Contáctanos hoy mismo para descubrir cómo Papelería Notarial A&G puede satisfacer tus necesidades con productos de la más alta calidad y un servicio excepcional.
      </Description>
      <Link href="/contacto">
        <ContactButton
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
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
