"use client";

import { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";

const HistorySection = styled(motion.section)`
  padding: 100px 5%;
  text-align: center;
  background-color: var(--background);
  color: var(--foreground);
  font-family: Raleway, serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    padding: 150px 10%;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 3rem;
  color: var(--foreground);
  font-weight: lighter;

  @media (min-width: 1024px) {
    font-size: 4rem;
  }
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

  @media (min-width: 1024px) {
    max-width: 1000px;
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
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked or failed:", err);
      });
    }
  }, [isInView]);

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
        <video
          preload="auto"
          muted
          loop
          playsInline
          ref={videoRef}
        >
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
