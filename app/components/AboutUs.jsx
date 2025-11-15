"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const AboutUsSection = styled(motion.section)`
  padding: 80px 20px;
  text-align: center;
  background-color: var(--background);
  color: var(--foreground);
`;

const Title = styled(motion.h2)`
  font-size: 3em;
  margin-bottom: 40px;
  color: var(--color-primary);
`;

const Content = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2em;
  line-height: 1.6;
`;

const AboutUs = () => {
  return (
    <AboutUsSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Sobre Nosotros
      </Title>
      <Content
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>
          En Papelería Notarial A&G, somos un equipo apasionado dedicado a la excelencia en cada detalle. Creemos que la papelería notarial no es solo un material de oficina, sino una extensión de la profesionalidad y la seriedad que caracteriza a cada notario.
        </p>
        <p>
          Nuestra misión es proporcionar productos que no solo cumplan con los más altos estándares de calidad y durabilidad, sino que también reflejen la importancia y la solemnidad de los documentos que resguardan. Trabajamos con artesanos expertos y utilizamos materiales premium para asegurar que cada sello, cada hoja y cada encuadernación sea impecable.
        </p>
        <p>
          Nos enorgullece ser el aliado de confianza de notarios y profesionales del derecho, ofreciendo soluciones personalizadas y un servicio al cliente excepcional. Su confianza es nuestro mayor compromiso.
        </p>
      </Content>
    </AboutUsSection>
  );
};

export default AboutUs;
