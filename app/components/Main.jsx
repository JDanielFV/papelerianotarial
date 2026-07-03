"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HighlightText from "./HighlightText";
import { getWhatsAppUrl } from "../lib/contact";

const MainContainer = styled.main`
    position: relative;
    height: 100vh;
    height: 100dvh; /* dynamic viewport height for mobile browsers */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6rem 1.5rem 2rem; /* espacio reservado para navbar arriba */
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
    /* Padding más compacto: menos aire interno, más presencia del contenido */
    padding: 2rem 1.75rem;
    border-radius: 24px;
    max-width: 480px;     /* reducido de 650px → 480px */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;            /* reducido de 1.5rem → 1rem */
    z-index: 1;
    box-shadow: var(--shadow);
    text-align: center;

    @media (min-width: 768px) {
        padding: 2.5rem 2.25rem;
        max-width: 540px;
    }
`;

const MotionLogo = styled(motion.create(Image))`
    /* Logo más compacto: 14rem mobile, 18rem desktop (antes 18/26) */
    width: 14rem;
    height: auto;
    margin-bottom: 0;
    filter: var(--logo-filter);

    @media (min-width: 768px) {
        width: 18rem;
    }
`;

const GoldLabel = styled(motion.span)`
    color: var(--accent-color);
    font-weight: 600;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    display: inline-block;
    margin-top: -0.25rem; /* pega al logo */
`;

const Title = styled(motion.h1)`
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.2;
    color: var(--text-light);
    margin: 0;
    /* Altura fija más compacta: 4rem mobile, 5.5rem desktop (antes 5/7) */
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    strong {
        color: var(--accent-color);
        font-weight: 500;
    }

    @media (min-width: 768px) {
        font-size: 2rem;
        height: 5.5rem;
    }
`;

const SubTitle = styled(motion.p)`
    font-size: 0.85rem;
    line-height: 1.55;
    color: var(--text-muted);
    font-weight: 300;
    margin: 0;
    max-width: 90%;

    strong {
        color: var(--text-light);
        font-weight: 500;
    }

    @media (min-width: 768px) {
        font-size: 0.95rem;
    }
`;

const ButtonContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    margin-top: 0.25rem;

    @media (min-width: 480px) {
        flex-direction: row;
        justify-content: center;
    }
`;

const HeroButton = styled(motion.create(Link))`
    padding: 0.75rem 1.75rem;
    border-radius: 50px;
    font-size: 0.9rem;
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
    font-size: 0.7rem;
    color: #888888;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.25rem;
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

const titleContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08
        }
    },
    exit: {
        transition: {
            staggerChildren: 0.04,
            staggerDirection: -1
        }
    }
};

const titleWordVariants = {
    hidden: { 
        opacity: 0, 
        y: 15, 
        filter: "blur(8px)" 
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1]
        }
    },
    exit: { 
        opacity: 0, 
        y: -15, 
        filter: "blur(8px)",
        transition: {
            duration: 0.35,
            ease: "easeIn"
        }
    }
};

const PHRASES = [
    { base: "Marcando", highlight: "La Diferencia" },
    { base: "Innovación", highlight: "Continua" },
    { base: "Radicalmente", highlight: "Sorprendentes" },
    { base: "Garantía", highlight: "Total" }
];

export default function Main({
    videoSrc = "/fondo.mp4",
    logoSrc = "/logo blanco.svg",
    goldLabel = "Papelería Notarial Premium",
    title = "Confianza Escrita en <strong>Oro y Seguridad</strong>",
    subTitle = "Más que <strong>carpetas y folios</strong>, creamos identidad y resguardo institucional. Diseños meticulosos para proteger el prestigio de su Notaría Pública.",
    buttons = [
        { text: "Ver Colecciones", href: "/catalogo", primary: true },
        { text: "Contáctanos", href: getWhatsAppUrl(), primary: false }
    ],
    scrollText = "Deslizar para explorar"
}) {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const videoInView = useInView(containerRef, { amount: 0.3 });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Optimize video: only play when in view (saves bandwidth, helps perf)
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (videoInView) {
            video.play().catch(() => {
                // Autoplay may be blocked; user gesture will handle
            });
        } else {
            video.pause();
        }
    }, [videoInView]);

    const currentPhrase = PHRASES[currentPhraseIndex];

    return (
        <MainContainer ref={containerRef}>
            <Overlay />
            <FondoVideo 
                ref={videoRef}
                muted 
                loop 
                playsInline 
                preload="metadata"
                poster="/hero-poster.jpg"
            >
                {/* Modern optimized sources - much smaller than original 8MB m4v */}
                <source src="/fondo.webm" type="video/webm" />
                <source src="/fondo.mp4" type="video/mp4" />
                {/* Fallback for very old browsers using passed videoSrc if custom */}
                {videoSrc && !videoSrc.includes('fondo') && <source src={videoSrc} />}
            </FondoVideo>
            
            <FloatingCard
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <MotionLogo
                    src={logoSrc}
                    alt="Logo A&G"
                    width={120}
                    height={108}
                    priority
                    style={{ height: 'auto' }}
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                        duration: 1.2, 
                        ease: [0.16, 1, 0.3, 1], // Custom elegant easeOutExpo-like feel
                        delay: 0.15 
                    }}
                />
                
                {goldLabel && <GoldLabel>{goldLabel}</GoldLabel>}
                
                <Title>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPhraseIndex}
                            variants={titleContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", whiteSpace: "pre-wrap" }}
                        >
                            {currentPhrase.base.split(" ").map((word, i) => (
                                <motion.span
                                    key={`base-${i}`}
                                    variants={titleWordVariants}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                            {currentPhrase.highlight.split(" ").map((word, i) => (
                                <motion.strong
                                    key={`highlight-${i}`}
                                    variants={titleWordVariants}
                                    style={{ display: "inline-block", marginRight: "0.25em", color: "var(--accent-color)", fontWeight: 500 }}
                                >
                                    {word}
                                </motion.strong>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </Title>
                
                {subTitle && <HighlightText as={SubTitle} html={subTitle} />}
                
                {buttons && buttons.length > 0 && (
                    <ButtonContainer>
                        {buttons.map((btn, index) => {
                            const isExternal = btn.href.startsWith("http");
                            return (
                                <HeroButton 
                                    key={index} 
                                    href={btn.href} 
                                    $primary={btn.primary ? "true" : undefined}
                                    {...(isExternal ? { as: "a", target: "_blank", rel: "noopener noreferrer" } : {})}
                                >
                                    {btn.text}
                                </HeroButton>
                            );
                        })}
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

