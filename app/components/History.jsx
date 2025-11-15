"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const HistorySection = styled(motion.section)`
  padding: 80px 20px;
  text-align: center;
  background-color: var(--color-background);
  color: var(--color-text);
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

const History = () => {
  return (
    <HistorySection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Nuestra Historia
      </Title>
      <Content
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>
          Desde nuestros humildes comienzos en [Año de Fundación], Papelería Notarial A&G ha estado dedicada a proveer productos de papelería de la más alta calidad para el sector notarial. Fundada por [Nombre del Fundador], nuestra empresa nació de la visión de combinar la tradición artesanal con la eficiencia moderna, entendiendo las necesidades únicas de los profesionales del derecho.
        </p>
        <p>
          A lo largo de los años, hemos crecido y evolucionado, pero nuestro compromiso con la excelencia y la satisfacción del cliente ha permanecido inalterable. Cada producto que ofrecemos es el resultado de una cuidadosa selección de materiales y un meticuloso proceso de fabricación, asegurando durabilidad y una presentación impecable.
        </p>
        <p>
          Hoy, Papelería Notarial A&G es sinónimo de confianza y calidad en el mercado, sirviendo a notarios en todo [Región/País] y adaptándonos continuamente a las nuevas tecnologías y demandas del mercado, sin perder la esencia que nos define.
        </p>
      </Content>
    </HistorySection>
  );
};

export default History;
