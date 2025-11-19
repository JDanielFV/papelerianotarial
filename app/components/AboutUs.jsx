"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const AboutUsSection = styled(motion.section)`
  padding: 100px 5%;
  text-align: center;
  background-color: #0a0a0a;
  color: #ffffff;
  font-family: Raleway, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 3rem;
  color: #ffffff;
  font-weight: lighter;
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
  color: #ffffff;
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
          En Papelería Notarial A&G, somos un equipo apasionado dedicado a la excelencia en cada detalle. Creemos que la papelería notarial no es solo un material de oficina, sino una <Highlight>extensión de la profesionalidad</Highlight> y la seriedad que caracteriza a cada notario.
        </p>
        <p>
          Nuestra misión es proporcionar productos que no solo cumplan con los más altos estándares de calidad y durabilidad, sino que también reflejen la importancia y la solemnidad de los documentos que resguardan. Trabajamos con <Highlight>artesanos expertos</Highlight> y utilizamos materiales premium para asegurar que cada sello, cada hoja y cada encuadernación sea impecable.
        </p>
        <p>
          Nos enorgullece ser el aliado de confianza de notarios y profesionales del derecho, ofreciendo soluciones personalizadas y un servicio al cliente excepcional. <Highlight>Su confianza es nuestro mayor compromiso.</Highlight>
        </p>
      </Content>
    </AboutUsSection>
  );
};

export default AboutUs;
