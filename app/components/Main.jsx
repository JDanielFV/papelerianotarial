"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const MainContainer = styled.main`
    position: relative;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    overflow: hidden;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--overlay-gradient);
    z-index: 0;
`;

const FondoVideo = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`;

const FloatingCard = styled(motion.div)`
    background: var(--card-background);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(15px);
    padding: 3rem 2rem;
    border-radius: 28px;
    max-width: 650px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    z-index: 1;
    box-shadow: var(--shadow);
    text-align: center;
    
    @media (min-width: 768px) {
        padding: 4rem 3rem;
    }
`;

const Logo = styled(Image)`
    width: 14rem;
    height: auto;
    margin-bottom: 0.5rem;
    filter: var(--logo-filter);
    
    @media (min-width: 768px) {
        width: 20rem;
    }
`;

const GoldLabel = styled(motion.span)`
    color: var(--accent-color);
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    display: inline-block;
`;

const Title = styled(motion.h1)`
    font-size: 2.2rem;
    font-weight: 300;
    line-height: 1.25;
    color: var(--text-light);
    margin: 0;
    
    strong {
        color: var(--accent-color);
        font-weight: 500;
    }

    @media (min-width: 768px) {
        font-size: 3.2rem;
    }
`;

const SubTitle = styled(motion.p)`
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text-muted);
    font-weight: 300;
    margin: 0;

    strong {
        color: var(--text-light);
        font-weight: 500;
    }

    @media (min-width: 768px) {
        font-size: 1.1rem;
    }
`;

const ButtonContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;

    @media (min-width: 480px) {
        flex-direction: row;
        justify-content: center;
    }
`;

const HeroButton = styled(motion(Link))`
    padding: 0.9rem 2.2rem;
    border-radius: 50px;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    ${({ $primary }) => $primary ? `
        background-color: var(--accent-color);
        color: var(--background-dark);
        border: 1px solid var(--accent-color);
        &:hover {
            background-color: var(--accent-hover);
            border-color: var(--accent-hover);
            box-shadow: 0 10px 25px rgba(212, 163, 23, 0.4);
            transform: translateY(-2px);
        }
    ` : `
        background-color: transparent;
        color: var(--foreground);
        border: 1px solid var(--card-border);
        &:hover {
            border-color: var(--foreground);
            background-color: var(--card-background-hover);
            transform: translateY(-2px);
        }
    `}
`;

const ScrollText = styled(motion.div)`
    font-size: 0.8rem;
    color: #888888;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    letter-spacing: 1px;
    text-transform: uppercase;
`;

const DownArrow = styled.span`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-right: 1px solid var(--text-muted);
    border-bottom: 1px solid var(--text-muted);
    transform: rotate(45deg);
    animation: bounce 2s infinite;

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0) rotate(45deg); }
        40% { transform: translateY(-4px) rotate(45deg); }
        60% { transform: translateY(-2px) rotate(45deg); }
    }
`;

export default function Main({
    videoSrc = "/fondo.m4v",
    logoSrc = "/logo blanco.svg",
    goldLabel = "Papelería Notarial Premium",
    title = "Confianza Escrita en <strong>Oro y Seguridad</strong>",
    subTitle = "Más que <strong>carpetas y folios</strong>, creamos identidad y resguardo institucional. Diseños meticulosos para proteger el prestigio de su Notaría Pública.",
    buttons = [
        { text: "Ver Colecciones", href: "/productos", primary: true },
        { text: "Asesoría Directa", href: "/contacto", primary: false }
    ],
    scrollText = "Deslizar para explorar"
}) {
    return (
        <MainContainer>
            <Overlay />
            <FondoVideo autoPlay muted loop playsInline src={videoSrc} />
            
            <FloatingCard
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Logo
                    src={logoSrc}
                    alt="Logo A&G"
                    width={120}
                    height={108}
                    priority
                />
                
                {goldLabel && <GoldLabel>{goldLabel}</GoldLabel>}
                
                {title && <Title dangerouslySetInnerHTML={{ __html: title }} />}
                
                {subTitle && <SubTitle dangerouslySetInnerHTML={{ __html: subTitle }} />}
                
                {buttons && buttons.length > 0 && (
                    <ButtonContainer>
                        {buttons.map((btn, index) => (
                            <HeroButton 
                                key={index} 
                                href={btn.href} 
                                $primary={btn.primary ? "true" : undefined}
                            >
                                {btn.text}
                            </HeroButton>
                        ))}
                    </ButtonContainer>
                )}
                
                {scrollText && (
                    <ScrollText>
                        {scrollText}
                        <DownArrow />
                    </ScrollText>
                )}
            </FloatingCard>
        </MainContainer>
    );
}

