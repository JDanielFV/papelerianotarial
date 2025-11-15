"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const QualitySection = styled(motion.section)`
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

const Quality = () => {
  return (
    <QualitySection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Nuestra Calidad
      </Title>
      <Content
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>
          En Papelería Notarial A&G, la calidad no es solo una promesa, es la esencia de todo lo que hacemos. Desde la selección de las materias primas hasta el último toque en el empaquetado, cada etapa de nuestro proceso está imbuida de un compromiso inquebrantable con la excelencia.
        </p>
        <p>
          Utilizamos solo los mejores papeles, tintas y materiales de encuadernación, provenientes de proveedores que comparten nuestra visión de sostenibilidad y responsabilidad. Nuestros productos son sometidos a rigurosos controles de calidad para asegurar que cumplen y superan las expectativas de los profesionales más exigentes.
        </p>
        <p>
          Sabemos que la documentación notarial requiere precisión, durabilidad y una presentación impecable. Por eso, nos esforzamos por ofrecer productos que no solo resistan el paso del tiempo, sino que también realcen la seriedad y la importancia de cada acto jurídico. Con Papelería Notarial A&G, elige la tranquilidad de saber que estás utilizando lo mejor.
        </p>
      </Content>
    </QualitySection>
  );
};

export default Quality;
