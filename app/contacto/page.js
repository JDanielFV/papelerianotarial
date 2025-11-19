"use client";

import React, { useState } from "react";
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

const FormColumn = styled(motion.div)`
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-size: 0.9rem;
    color: #cccccc;
    margin-left: 0.5rem;
`;

const Input = styled.input`
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 1rem;
    color: white;
    font-family: Raleway, serif;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: white;
    }
`;

const TextArea = styled.textarea`
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 1rem;
    color: white;
    font-family: Raleway, serif;
    font-size: 1rem;
    outline: none;
    min-height: 150px;
    resize: vertical;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: white;
    }
`;

const SubmitButton = styled(motion.button)`
    background-color: white;
    color: #0a0a0a;
    border: none;
    border-radius: 50px;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
    align-self: flex-start;
    font-family: Raleway, serif;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hola, mi nombre es ${formData.name}. Mi correo es ${formData.email}. Mensaje: ${formData.message}`;
    const whatsappUrl = `https://wa.me/5215512345678?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <PageContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header variants={itemVariants}>
        <Title>Contáctanos</Title>
        <SubTitle>
          Estamos aquí para atenderte. Cuéntanos qué necesitas y nos pondremos en contacto contigo a la brevedad.
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
              Sábados: 9:00 AM - 2:00 PM
            </InfoText>
          </InfoItem>
        </InfoColumn>

        <FormColumn variants={itemVariants}>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Escribe tu nombre"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@correo.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="message">Mensaje</Label>
              <TextArea
                id="message"
                name="message"
                placeholder="¿En qué podemos ayudarte?"
                required
                value={formData.message}
                onChange={handleChange}
              />
            </InputGroup>
            <SubmitButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
            >
              Enviar Mensaje
            </SubmitButton>
          </Form>
        </FormColumn>
      </ContentWrapper>
    </PageContainer>
  );
}
