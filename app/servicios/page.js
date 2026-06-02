"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import servicesData from "../data/services-data.json";
import { MotionServiceCard, MotionServiceImage, Overlay, MotionServiceName, MotionServiceDescription } from "../components/ServiceCard";
import ExpandedServiceModal from "../components/ExpandedServiceModal";

const PageContainer = styled(motion.div)`
    min-height: 100vh;
    padding: 120px 5% 5%;
    background-color: var(--background);
    color: var(--foreground);
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
    color: var(--text-muted);
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

export default function ServicesPage() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <PageContainer>
      <Header>
        <Title>Nuestros Servicios</Title>
        <SubTitle>
          Soluciones integrales y especializadas para tu notaría.
        </SubTitle>
      </Header>

      <ServicesGrid>
        {servicesData.map((service) => (
          <MotionServiceCard
            key={service.id}
            layoutId={`card-${service.id}`}
            onClick={() => setSelectedId(service.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ cursor: 'pointer' }}
          >
            <MotionServiceImage $bg={service.image} />
            <Overlay />
            <MotionServiceName layoutId={`title-${service.id}`}>
              {service.name}
            </MotionServiceName>
            <MotionServiceDescription>
              {service.description}
            </MotionServiceDescription>
          </MotionServiceCard>
        ))}
      </ServicesGrid>

      <ExpandedServiceModal
        selectedId={selectedId}
        servicesData={servicesData}
        onClose={() => setSelectedId(null)}
      />
    </PageContainer>
  );
}
