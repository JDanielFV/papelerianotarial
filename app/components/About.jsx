"use client";

import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HighlightText from "./HighlightText";

const AboutContainer = styled(motion.section)`
    padding: 60px 5%;
    background-color: var(--background);
    position: relative;
    overflow: hidden;
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 1024px) {
        padding: 100px 8%;
    }
`;

const BackgroundWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
`;

const BackgroundImageContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.25;

    @media (max-width: 1023px) {
        opacity: 0.35;
    }
`;

const BackgroundOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, var(--background) 80%), var(--overlay-gradient);
    z-index: 1;
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
`;

const HeaderGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
`;

const Title = styled(motion.h2)`
    font-size: 3rem;
    font-weight: 300;
    line-height: 1.2;
    color: var(--text-light);
    margin: 0;

    strong {
        color: var(--accent-color);
        font-weight: 400;
    }
    
    @media (min-width: 1024px) {
        font-size: 4rem;
    }
`;

const SubTitle = styled(motion.p)`
    font-size: 1.1rem;
    color: var(--text-muted);
    line-height: 1.6;
    font-weight: 300;
    margin: 0;

    @media (min-width: 1024px) {
        font-size: 1.25rem;
    }
`;

const CategoryGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    @media (min-width: 1024px) {
        flex-direction: row;
        align-items: stretch;
        height: 500px; /* Fixed height to avoid jumps during flex transitions */
    }
`;

const CategoryCard = styled(motion.div)`
    background: ${({ $active }) => $active ? 'rgba(212, 163, 23, 0.05)' : 'rgba(255, 255, 255, 0.02)'};
    border: 1px solid ${({ $active }) => $active ? 'rgba(212, 163, 23, 0.35)' : 'rgba(255, 255, 255, 0.08)'};
    border-radius: 28px;
    padding: 2.2rem;
    cursor: pointer;
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1.5rem;
    overflow: hidden;
    
    /* CSS transition for flex-grow width is buttery smooth compared to JS layout triggers */
    transition: flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                min-height 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    
    box-shadow: ${({ $active }) => $active ? '0 20px 40px rgba(212, 163, 23, 0.08)' : '0 10px 30px rgba(0, 0, 0, 0.2)'};

    &:hover {
        border-color: rgba(212, 163, 23, 0.5);
        background: rgba(212, 163, 23, 0.06);
    }

    @media (min-width: 1024px) {
        flex: ${({ $active }) => $active ? '1.8' : '0.8'};
    }

    @media (max-width: 1023px) {
        min-height: ${({ $active }) => $active ? '400px' : '150px'};
    }
`;

const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const CardBadge = styled.span`
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent-color);
    font-weight: 500;
`;

const CategoryName = styled.h3`
    font-size: 1.8rem;
    font-weight: 400;
    color: var(--text-light);
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span.arrow {
        font-size: 1.4rem;
        color: var(--accent-color);
        transition: transform 0.4s ease;
        transform: ${({ $active }) => $active ? 'rotate(90deg)' : 'rotate(0deg)'};
    }
`;

const CategoryDesc = styled.p`
    font-size: 1.05rem;
    line-height: 1.5;
    color: var(--text-muted);
    font-weight: 300;
    margin: 0;
`;

const PointList = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const PointItem = styled(motion.div)`
    display: flex;
    gap: 1rem;
    align-items: flex-start;
`;

const BulletBadge = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(212, 163, 23, 0.1);
    border: 1px solid rgba(212, 163, 23, 0.3);
    color: var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    flex-shrink: 0;
    margin-top: 2px;
`;

const PointTextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const PointTitle = styled.h4`
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-light);
    margin: 0;
`;

const PointText = styled.p`
    font-size: 0.95rem;
    line-height: 1.4;
    color: var(--text-muted);
    font-weight: 300;
    margin: 0;
`;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Symmetric Fade & Blur Variants
const pointListVariants = {
    active: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    },
    inactive: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
};

const pointItemVariants = {
    active: { 
        opacity: 1, 
        filter: "blur(0px)", 
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
    inactive: { 
        opacity: 0, 
        filter: "blur(10px)", 
        y: 15,
        transition: { duration: 0.4, ease: "easeIn" }
    }
};

export default function About({
    title = "La primera impresión no solo se ve, <strong>se siente</strong>",
    subTitle = "Diseño, resguardo y tecnología avanzada para proyectar y proteger el prestigio de su Notaría Pública en todo México.",
    categories = []
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const [activeIndex, setActiveIndex] = useState(0);
    const [bgImageIndex, setBgImageIndex] = useState(0);

    // Auto-cycle effect
    useEffect(() => {
        if (!categories || categories.length === 0) return;
        
        const interval = setInterval(() => {
            setBgImageIndex((prev) => {
                const next = prev + 1;
                if (next >= (categories[activeIndex]?.images?.length || 1)) {
                    setActiveIndex((curr) => (curr + 1) % categories.length);
                    return 0;
                }
                return next;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [categories, activeIndex, bgImageIndex]);

    const handleHover = (index) => {
        if (activeIndex !== index) {
            setActiveIndex(index);
            setBgImageIndex(0);
        }
    };

    const activeImage = categories[activeIndex]?.images?.[bgImageIndex] || "";

    return (
        <AboutContainer
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            id="servicios-seccion"
        >
            <BackgroundWrapper>
                <AnimatePresence initial={false}>
                    <BackgroundImageContainer
                        key={`${activeIndex}-${bgImageIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.25 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    >
                        {activeImage && (
                            <Image
                                src={activeImage}
                                alt="Fondo de la sección"
                                fill
                                sizes="100vw"
                                style={{ objectFit: 'cover' }}
                                loading="lazy"
                            />
                        )}
                    </BackgroundImageContainer>
                </AnimatePresence>
                <BackgroundOverlay />
            </BackgroundWrapper>

            <ContentWrapper>
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

                {categories && categories.length > 0 && (
                    <CategoryGrid>
                        {categories.map((cat, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <CategoryCard
                                    key={cat.id || index}
                                    $active={isActive}
                                    onClick={() => handleHover(index)}
                                >
                                    <CardHeader>
                                        <CardBadge>0{index + 1} • Línea de Negocio</CardBadge>
                                        <CategoryName $active={isActive}>
                                            {cat.name}
                                            <span className="arrow">→</span>
                                        </CategoryName>
                                        <CategoryDesc>{cat.description}</CategoryDesc>
                                    </CardHeader>

                                    <AnimatePresence mode="wait">
                                        {isActive && (
                                            <PointList
                                                initial="inactive"
                                                animate="active"
                                                exit="inactive"
                                                variants={pointListVariants}
                                            >
                                                {cat.points?.map((pt, pIdx) => (
                                                    <PointItem
                                                        key={pIdx}
                                                        variants={pointItemVariants}
                                                    >
                                                        <BulletBadge>✓</BulletBadge>
                                                        <PointTextGroup>
                                                            <PointTitle>{pt.title}</PointTitle>
                                                            <PointText>{pt.text}</PointText>
                                                        </PointTextGroup>
                                                    </PointItem>
                                                ))}
                                            </PointList>
                                        )}
                                    </AnimatePresence>
                                </CategoryCard>
                            );
                        })}
                    </CategoryGrid>
                )}
            </ContentWrapper>
        </AboutContainer>
    );
}