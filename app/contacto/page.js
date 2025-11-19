"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const PageContainer = styled(motion.div)`
    min-height: 100vh;
    padding: 120px 5% 5%;
    background-color: #0a0a0a;
    color: white;
    font-family: Raleway, serif;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled(motion.div)`
    text-align: center;
    margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    font-weight: lighter;
    margin-bottom: 1rem;

    @media (min-width: 1024px) {
        font-size: 4rem;
    }
`;

const SubTitle = styled(motion.p)`
    font-size: 1.2rem;
    color: #cccccc;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
`;

const ContentWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    width: 100%;
    max-width: 1200px;

    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2rem;
    }
`;

const InfoColumn = styled(motion.div)`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const InfoLabel = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
`;

const InfoText = styled.p`
    font-size: 1.1rem;
    color: #cccccc;
    line-height: 1.6;
`;

const ContactColumn = styled(motion.div)`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
    align-items: center;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
    max-width: 500px;
`;

const ButtonsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
`;

const ContactButton = styled(motion.a)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1.2rem 2rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
    }
`;

const ButtonIcon = styled.span`
    font-size: 1.5rem;
`;

const SocialSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const SocialIcons = styled.div`
    display: flex;
    gap: 1.5rem;
    justify-content: center;

    @media (min-width: 1024px) {
        justify-content: flex-start;
    }
`;

const SocialIcon = styled(motion.a)`
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    color: white;
    font-size: 1.5rem;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
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

export default function ContactPage() {
  return (
    <PageContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header variants={itemVariants}>
        <Title>Contáctanos</Title>
        <SubTitle>
          Estamos aquí para atenderte. Elige tu medio de contacto preferido.
        </SubTitle>
      </Header>

      <ContentWrapper variants={containerVariants}>
        <InfoColumn variants={itemVariants}>
          <InfoItem>
            <InfoLabel>Ubicación</InfoLabel>
            <InfoText>
              Ciudad de México, México.<br />
              Atendemos a toda la república.
            </InfoText>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Contacto Directo</InfoLabel>
            <InfoText>
              Teléfono: +52 55 1234 5678<br />
              Email: contacto@papelerianotarial.com
            </InfoText>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Horario de Atención</InfoLabel>
            <InfoText>
              Lunes a Viernes: 9:00 AM - 6:00 PM<br />
              Sábados: 9:00 AM - 3:00 PM
            </InfoText>
          </InfoItem>
        </InfoColumn>

        <ContactColumn variants={itemVariants}>
          <ContentContainer>
            <ButtonsSection>
              <SectionTitle>Canales de Contacto</SectionTitle>

              <ContactButton
                href="https://wa.me/5215512345678"
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonIcon>📱</ButtonIcon>
                WhatsApp
              </ContactButton>

              <ContactButton
                href="tel:+525512345678"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonIcon>📞</ButtonIcon>
                Llamada Telefónica
              </ContactButton>

              <ContactButton
                href="mailto:contacto@papelerianotarial.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonIcon>✉️</ButtonIcon>
                Correo Electrónico
              </ContactButton>
            </ButtonsSection>

            <SocialSection>
              <SectionTitle>Redes Sociales</SectionTitle>
              <SocialIcons>
                <SocialIcon
                  href="https://facebook.com"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Facebook"
                >
                  📘
                </SocialIcon>
                <SocialIcon
                  href="https://instagram.com"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Instagram"
                >
                  📷
                </SocialIcon>
                <SocialIcon
                  href="https://papelerianotarial.com"
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Sitio Web"
                >
                  🌐
                </SocialIcon>
              </SocialIcons>
            </SocialSection>
          </ContentContainer>
        </ContactColumn>
      </ContentWrapper>
    </PageContainer>
  );
}
