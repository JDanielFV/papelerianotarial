"use client";

import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HighlightText from "./HighlightText";

const AboutContainer = styled(motion.section)`
    padding: 30px 5%;
    background-color: var(--background);
    position: relative;
    overflow: hidden;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 1024px) {
        padding: 50px 8%;
    }
`;

const SplitLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;

    @media (min-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: stretch;
    }
`;

const MobileBackground = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-image: ${({ $bg }) => $bg ? `url(${$bg})` : 'none'};
    background-size: cover;
    background-position: center;
    pointer-events: none;

    @media (min-width: 1024px) {
        display: none;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--overlay-gradient);
    }
`;

const ImageContainer = styled(motion.div)`
    display: none;
    
    @media (min-width: 1024px) {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 400px;
        border-radius: 28px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
        order: 1; /* Desktop: Image on left */
    }
`;

const StyledImage = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--image-overlay);
    z-index: 1;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    text-align: left;
    order: 1; /* Mobile first: Content on top */

    @media (min-width: 1024px) {
        order: 2; /* Desktop: Content on right */
    }
`;

const HeaderGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Title = styled(motion.h2)`
    font-size: 2rem;
    font-weight: lighter;
    line-height: 1.3;
    color: var(--text-light);
    margin: 0;

    strong {
        color: var(--accent-color);
        font-weight: 500;
    }
    
    @media (min-width: 768px) {
        font-size: 2.4rem;
    }
    
    @media (min-width: 1024px) {
        font-size: 3rem;
    }
`;

const SubTitle = styled(motion.p)`
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.6;
    font-weight: 300;
    margin: 0;

    @media (min-width: 1024px) {
        font-size: 1.1rem;
    }
`;

const AdvantageList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
`;

const AdvantageCard = styled(motion.div)`
    background: ${({ $active }) => $active ? 'rgba(212, 163, 23, 0.05)' : 'var(--card-background)'};
    border: 1px solid ${({ $active }) => $active ? 'rgba(212, 163, 23, 0.3)' : 'var(--card-border)'};
    border-radius: 20px;
    padding: 1.2rem;
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);

    &:hover {
        background: rgba(212, 163, 23, 0.05);
        border-color: rgba(212, 163, 23, 0.3);
        transform: translateX(5px);
        box-shadow: var(--shadow);
    }
`;

const NumberBadge = styled.span`
    font-size: 1.8rem;
    font-weight: 200;
    color: ${({ $active }) => $active ? '#d4a317' : 'var(--card-border-hover)'};
    line-height: 1;
    transition: color 0.3s ease;
`;

const CardTextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const AdvantageName = styled.h3`
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-light);
    margin: 0;
    transition: color 0.3s ease;
    
    ${AdvantageCard}:hover & {
        color: #d4a317;
    }
    
    ${({ $active }) => $active && `
        color: #d4a317;
    `}
`;

const AdvantageDesc = styled.p`
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-muted);
    font-weight: 300;
    margin: 0;
`;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About({
    title = "La primera impresión no solo se ve, <strong>se siente</strong>",
    subTitle = "Diseño, resguardo y tecnología avanzada para proyectar y proteger el prestigio de su Notaría Pública en todo México.",
    processes = []
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!processes || processes.length === 0) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % processes.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [processes, activeIndex]);

    const activeImage = processes[activeIndex]?.image || (processes[0]?.image || "");

    return (
        <AboutContainer
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <AnimatePresence mode="wait">
                <MobileBackground
                    key={activeIndex}
                    $bg={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                />
            </AnimatePresence>

            <SplitLayout>
                <ImageContainer variants={itemVariants}>
                    <AnimatePresence mode="wait">
                        <StyledImage
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.45, ease: "easeInOut" }}
                        >
                            <Image
                                src={activeImage}
                                alt={processes[activeIndex]?.name || "Ventaja"}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </StyledImage>
                    </AnimatePresence>
                    <ImageOverlay />
                </ImageContainer>

                <InfoContainer>
                    <HeaderGroup>
                        {title && (
                            <HighlightText 
                                as={Title} 
                                html={title} 
                                variants={itemVariants} 
                            />
                        )}
                        {subTitle && (
                            <SubTitle variants={itemVariants}>
                                {subTitle}
                            </SubTitle>
                        )}
                    </HeaderGroup>

                    {processes && processes.length > 0 && (
                        <AdvantageList>
                            {processes.map((proc, index) => (
                                <AdvantageCard
                                    key={proc.id || index}
                                    variants={itemVariants}
                                    $active={activeIndex === index}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <NumberBadge $active={activeIndex === index}>
                                        0{index + 1}
                                    </NumberBadge>
                                    <CardTextGroup>
                                        <AdvantageName $active={activeIndex === index}>
                                            {proc.name}
                                        </AdvantageName>
                                        <AdvantageDesc>
                                            {proc.description}
                                        </AdvantageDesc>
                                    </CardTextGroup>
                                </AdvantageCard>
                            ))}
                        </AdvantageList>
                    )}
                </InfoContainer>
            </SplitLayout>
        </AboutContainer>
    );
}