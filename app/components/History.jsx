"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const HistorySection = styled(motion.section)`
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

const VideoContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 4rem auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);

  video {
    width: 100%;
    height: auto;
    display: block;
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

const History = () => {
  return (
    <HistorySection
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
        Nuestra Historia
      </Title>
      <VideoContainer
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <video controls autoPlay muted loop playsInline>
          <source src="/fondo.m4v" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </VideoContainer>
      <Content
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p>
          Desde nuestros humildes comienzos, Papelería Notarial A&G ha estado dedicada a proveer productos de papelería de la más alta calidad para el sector notarial. Nacimos de la visión de combinar la tradición artesanal con la eficiencia moderna, entendiendo las necesidades únicas de los profesionales del derecho.
        </p>
        <p>
          A lo largo de los años, hemos crecido y evolucionado, pero nuestro compromiso con la excelencia y la satisfacción del cliente ha permanecido inalterable. Cada producto que ofrecemos es el resultado de una cuidadosa selección de materiales y un meticuloso proceso de fabricación.
        </p>
        <p>
          Hoy, somos sinónimo de confianza y calidad, sirviendo a notarios y adaptándonos continuamente a las nuevas tecnologías y demandas del mercado, sin perder la esencia que nos define.
        </p>
      </Content>
    </HistorySection>
  );
};

export default History;
