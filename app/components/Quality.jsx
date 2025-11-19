"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const QualitySection = styled(motion.section)`
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
  margin-bottom: 4rem;
  color: #ffffff;
  font-weight: lighter;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 15px;
  text-align: left;
  transition: transform 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-weight: 600;
`;

const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #cccccc;
  font-weight: 300;
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

const Quality = () => {
  const features = [
    {
      title: "Excelencia en Materiales",
      text: "La calidad no es solo una promesa, es la esencia de todo lo que hacemos. Desde la selección de las materias primas hasta el último toque en el empaquetado, cada etapa está imbuida de un compromiso inquebrantable con la excelencia."
    },
    {
      title: "Sostenibilidad y Calidad",
      text: "Utilizamos solo los mejores papeles, tintas y materiales de encuadernación, provenientes de proveedores que comparten nuestra visión de sostenibilidad. Nuestros productos superan las expectativas de los profesionales más exigentes."
    },
    {
      title: "Precisión y Durabilidad",
      text: "Sabemos que la documentación notarial requiere precisión y una presentación impecable. Nos esforzamos por ofrecer productos que resistan el paso del tiempo y realcen la seriedad de cada acto jurídico."
    }
  ];

  return (
    <QualitySection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <Title variants={itemVariants}>
        Nuestra Calidad
      </Title>
      <Grid variants={containerVariants}>
        {features.map((feature, index) => (
          <Card key={index} variants={itemVariants}>
            <CardTitle>{feature.title}</CardTitle>
            <CardText>{feature.text}</CardText>
          </Card>
        ))}
      </Grid>
    </QualitySection>
  );
};

export default Quality;
