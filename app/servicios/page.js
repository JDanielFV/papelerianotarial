"use client";

import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import servicesData from "../data/services-data.json";
import { MotionServiceCard, MotionServiceImage, Overlay, MotionServiceName, MotionServiceDescription } from "../components/ServiceCard";

const PageContainer = styled(motion.div)`
    min-height: 100vh;
    padding: 120px 5% 5%;
    background-color: #0a0a0a;
    color: white;
    font-family: Raleway, serif;
`;

const Header = styled(motion.div)`
    text-align: center;
    margin-bottom: 4rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    font-weight: lighter;
    margin-bottom: 1.5rem;

    @media (min-width: 1024px) {
        font-size: 4.5rem;
    }
`;

const SubTitle = styled(motion.p)`
    font-size: 1.2rem;
    color: #cccccc;
    line-height: 1.8;
    max-width: 700px;
    margin: 0 auto;
`;

const ServicesGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 2.5rem;
    }
`;

const ServiceCardWrapper = styled(motion.div)`
    height: 100%;
`;

const ExpandedService = styled(motion.div)`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2.5rem;
    margin-top: 1.5rem;
`;

const ExpandedTitle = styled.h3`
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: white;
`;

const ExpandedDescription = styled.p`
    font-size: 1.1rem;
    color: #cccccc;
    line-height: 1.8;
    margin-bottom: 1.5rem;
`;

const FeaturesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const FeatureItem = styled.li`
    font-size: 1rem;
    color: #cccccc;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:before {
        content: "✓";
        color: white;
        font-weight: bold;
        margin-right: 0.75rem;
    }
    
    &:last-child {
        border-bottom: none;
    }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ServicesPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <PageContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header variants={itemVariants}>
        <Title>Nuestros Servicios</Title>
        <SubTitle>
          Ofrecemos una amplia gama de servicios especializados en papelería notarial,
          con los más altos estándares de calidad y seguridad que tu notaría necesita.
        </SubTitle>
      </Header>

      <ServicesGrid ref={ref} variants={containerVariants}>
        {servicesData.map((service, index) => (
          <ServiceCardWrapper key={index} variants={itemVariants}>
            <MotionServiceCard
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MotionServiceImage />
              <Overlay />
              <MotionServiceName>{service.name}</MotionServiceName>
              <MotionServiceDescription>
                {service.description}
              </MotionServiceDescription>
            </MotionServiceCard>

            <ExpandedService
              initial={{ opacity: 0, height: 0 }}
              animate={inView ? { opacity: 1, height: "auto" } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            >
              <ExpandedTitle>Detalles del Servicio</ExpandedTitle>
              <ExpandedDescription>
                {service.detailDescription || service.description}
              </ExpandedDescription>
              {service.features && (
                <>
                  <ExpandedTitle style={{ fontSize: "1.3rem", marginTop: "1.5rem" }}>
                    Incluye:
                  </ExpandedTitle>
                  <FeaturesList>
                    {service.features.map((feature, i) => (
                      <FeatureItem key={i}>{feature}</FeatureItem>
                    ))}
                  </FeaturesList>
                </>
              )}
            </ExpandedService>
          </ServiceCardWrapper>
        ))}
      </ServicesGrid>
    </PageContainer>
  );
}
