"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5%;
    background-color: #0a0a0a;
    color: white;
    font-family: Raleway, serif;
    text-align: center;
`;

const ErrorCode = styled(motion.h1)`
    font-size: 8rem;
    font-weight: 300;
    margin: 0;
    background: linear-gradient(135deg, #ffffff 0%, #666666 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media (min-width: 1024px) {
        font-size: 12rem;
    }
`;

const Title = styled(motion.h2)`
    font-size: 2rem;
    font-weight: 400;
    margin: 1rem 0;
    
    @media (min-width: 1024px) {
        font-size: 3rem;
    }
`;

const Description = styled(motion.p)`
    font-size: 1.1rem;
    color: #cccccc;
    max-width: 600px;
    margin: 1.5rem auto;
    line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    flex-wrap: wrap;
    justify-content: center;
`;

const Button = styled(motion(Link))`
    padding: 1rem 2.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
    }
`;

const PrimaryButton = styled(Button)`
    background: white;
    color: #0a0a0a;
    border-color: white;
    
    &:hover {
        background: #e0e0e0;
        border-color: #e0e0e0;
    }
`;

export default function NotFound() {
    return (
        <Container>
            <ErrorCode
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                404
            </ErrorCode>
            <Title
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Página No Encontrada
            </Title>
            <Description
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                Lo sentimos, la página que buscas no existe o ha sido movida.
                Te invitamos a explorar nuestros productos y servicios.
            </Description>
            <ButtonGroup
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <PrimaryButton href="/">
                    Volver al Inicio
                </PrimaryButton>
                <Button href="/catalogo">
                    Ver Catálogo
                </Button>
                <Button href="/contacto">
                    Contacto
                </Button>
            </ButtonGroup>
        </Container>
    );
}
