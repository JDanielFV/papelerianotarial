"use client";

import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { WhatsAppIcon } from "./Icons";
import { CONTACT, getWhatsAppUrl } from "../lib/contact";
import { Overlay } from "./ProductCard";

// --- Styled Components ---
const MotionProductsContainer = styled(motion.section)`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5%;
    padding: 5%;
    margin-top: 12%;
    text-align: center;
    background-color: var(--background);

    @media (min-width: 1024px) {
        margin-top: 5%;
        padding: 5% 2%;
    }
`;

const MotionTitle = styled(motion.h2)`
    font-size: 2.6rem;
    font-weight: lighter;
    color: var(--foreground);
    z-index: 1;
    padding: 1.5rem 0 1.5rem 0;

    @media (min-width: 768px) {
        font-size: 3.2rem;
        padding: 2rem 0;
    }

    @media (min-width: 1024px) {
        font-size: 4rem;
        margin-bottom: 2rem;
    }
`;

const SubTitle = styled(motion.p)`
    font-size: 1.5rem;
    z-index: 1;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
    color: var(--foreground);
    margin-top: 3rem;
`;

const ContactButton = styled(motion.a)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border: 1px solid #d4a317;
    border-radius: 15px;
    padding: 1rem 2rem;
    color: #d4a317;
    text-decoration: none;
    font-size: 1.2rem;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10;

    &:hover {
        background-color: #d4a317;
        color: #0a0a0a;
        border-color: #d4a317;
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(212, 163, 23, 0.4);
    }
`;

// --- Bento Box Containers ---
const BentoGrid = styled(motion.div)`
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;
    margin: 2rem auto;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(6, 90px);
        gap: 2rem;
        height: 640px; /* Fixed height to allow clean scaling within the grid */
    }
`;

const BentoCard = styled(motion.div)`
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid var(--card-border);
    cursor: pointer;
    background-color: #0c0c0c;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.8rem;
    height: 320px;
    transition: border-color 0.5s ease, box-shadow 0.5s ease, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
        border-color: var(--accent-color);
        box-shadow: 0 20px 45px rgba(212, 163, 23, 0.12);
    }

    @media (min-width: 1024px) {
        height: 100%;
    }

    ${({ $isDimmed }) => $isDimmed && css`
        opacity: 0;
        pointer-events: none;
    `}
`;

const ExpandedOverlayContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(12px);
    border-radius: 24px;
    cursor: pointer;
`;

const ExpandedCardWrapper = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 25;
    pointer-events: none;
`;

const ExpandedCard = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid var(--card-border);
    background-color: #0c0c0c;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    pointer-events: auto;

    @media (min-width: 768px) {
        padding: 3rem;
    }

    @media (min-width: 1024px) {
        padding: 4rem;
    }
`;

const CloseButton = styled(motion.button)`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    font-size: 1.1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: var(--accent-color);
        transform: scale(1.1) rotate(90deg);
        box-shadow: 0 0 15px rgba(212, 163, 23, 0.4);
    }
`;

const CardBgImage = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: 0;
    transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);

    ${BentoCard}:hover & {
        transform: scale(1.04);
    }
`;

const BentoOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to top, 
        rgba(5, 5, 5, 0.95) 0%, 
        rgba(5, 5, 5, 0.65) 50%, 
        rgba(5, 5, 5, 0.1) 100-percent
    );
    background-image: linear-gradient(
        to top, 
        rgba(5, 5, 5, 0.95) 0%, 
        rgba(5, 5, 5, 0.65) 50%, 
        rgba(5, 5, 5, 0.1) 100%
    );
    z-index: 1;
    transition: all 0.5s ease;

    ${({ $isExpanded }) => $isExpanded && css`
        background-image: linear-gradient(
            to right, 
            rgba(5, 5, 5, 0.98) 0%, 
            rgba(5, 5, 5, 0.9) 35%, 
            rgba(5, 5, 5, 0.55) 60%, 
            rgba(5, 5, 5, 0.1) 100%
        );

        @media (max-width: 1023px) {
            background-image: linear-gradient(
                to top, 
                rgba(5, 5, 5, 0.98) 0%, 
                rgba(5, 5, 5, 0.85) 60%, 
                rgba(5, 5, 5, 0.3) 100%
            );
        }
    `}
`;

const CardContent = styled.div`
    position: relative;
    z-index: 2;
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease;

    ${({ $isExpanded }) => $isExpanded && css`
        height: 100%;
        justify-content: center;
        
        @media (min-width: 1024px) {
            max-width: 55%;
        }
    `}
`;

const CategoryName = styled(motion.h3)`
    color: white;
    font-weight: 300;
    margin-bottom: 0.8rem;
    line-height: 1.2;
    font-size: 1.6rem;
    
    @media (min-width: 768px) {
        font-size: 1.9rem;
    }

    ${({ $isExpanded }) => $isExpanded && css`
        font-size: 2rem;
        margin-bottom: 1rem;
        
        @media (min-width: 1024px) {
            font-size: 2.8rem;
        }
    `}
`;

const CategoryDesc = styled(motion.p)`
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 1.5rem;
    font-weight: 300;
    max-height: 200px;
    opacity: 1;
    transition: all 0.4s ease;

    ${({ $isExpanded }) => $isExpanded && css`
        font-size: 1.05rem;
        line-height: 1.6;
        margin-bottom: 1.8rem;
        color: #e0e0e0;
        max-height: 400px;
        
        @media (min-width: 1024px) {
            font-size: 1.15rem;
        }
    `}
`;

const TagList = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
    max-height: 100px;
    opacity: 1;
    transition: all 0.4s ease;

    ${({ $isExpanded }) => $isExpanded && css`
        margin-bottom: 2rem;
        gap: 0.75rem;
    `}
`;

const Tag = styled.span`
    font-size: 0.75rem;
    color: #ccc;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 0.35rem 0.75rem;
    border-radius: 50px;
    transition: all 0.3s ease;

    ${({ $isExpanded }) => $isExpanded && css`
        font-size: 0.8rem;
        padding: 0.4rem 0.9rem;
        border-color: rgba(212, 163, 23, 0.3);
        background: rgba(212, 163, 23, 0.05);
        color: #e5e5e5;
    `}
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
`;

const PrimaryButton = styled(motion.button)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background-color: var(--accent-color);
    color: #0a0a0a;
    border: 1px solid var(--accent-color);
    border-radius: 12px;
    padding: 0.8rem 1.6rem;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(212, 163, 23, 0.4);
        background-color: #e5b427;
        border-color: #e5b427;
    }
`;

const SecondaryButton = styled(motion.a)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background-color: transparent;
    color: var(--accent-color);
    border: 1px solid var(--accent-color);
    border-radius: 12px;
    padding: 0.8rem 1.6rem;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateY(-2px);
        background-color: rgba(212, 163, 23, 0.1);
        box-shadow: 0 10px 25px rgba(212, 163, 23, 0.1);
    }
`;

// --- Animations ---
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function Products({
    title = "Nuestros Productos",
    products = [],
    subTitle = "¿No encuentras lo que buscas? Contáctanos",
    whatsappLink = CONTACT.whatsappBase,
    whatsappText = "Chatea con nosotros"
}) {
    const router = useRouter();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });

    const [activeIndex, setActiveIndex] = useState(null);

    const handleSeeMore = (id) => {
        router.push(`/catalogo/productos?categoryId=${id}`);
    };

    const handleCardClick = (idx) => {
        if (activeIndex === null) {
            setActiveIndex(idx);
        }
    };

    // Calculate layout parameters for grid positions
    const getCardLayout = (idx) => {
        if (idx === 0) return { gridColumn: "1 / 3", gridRow: "1 / 4" };
        if (idx === 1) return { gridColumn: "3 / 4", gridRow: "1 / 4" };
        if (idx === 2) return { gridColumn: "1 / 2", gridRow: "4 / 7" };
        if (idx === 3) return { gridColumn: "2 / 4", gridRow: "4 / 7" };
        return {};
    };

    return (
        <MotionProductsContainer
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {title && (
                <MotionTitle variants={itemVariants}>
                    {title}
                </MotionTitle>
            )}

            {products && products.length > 0 && (
                <BentoGrid variants={itemVariants}>
                    {products.map((product, idx) => {
                        const isAnyActive = activeIndex !== null;
                        const isActive = activeIndex === idx;
                        const isHidden = isAnyActive && !isActive;
                        const { gridColumn, gridRow } = getCardLayout(idx);
                        
                        return (
                            <BentoCard
                                key={product.id}
                                layoutId={`card-${product.id}`}
                                style={{ gridColumn, gridRow }}
                                onClick={() => handleCardClick(idx)}
                                $isDimmed={isHidden}
                                whileHover={{ y: isAnyActive ? 0 : -4 }}
                            >
                                <CardBgImage style={{ backgroundImage: `url(${product.image || '/placeholder-image.jpg'})` }} />
                                <BentoOverlay />
                                
                                <CardContent>
                                    <CategoryName>{product.name}</CategoryName>
                                    <CategoryDesc>{product.description}</CategoryDesc>
                                    
                                    <TagList>
                                        {product.subcategories?.slice(0, 4).map((sub, sIdx) => (
                                            <Tag key={sIdx}>{sub.name}</Tag>
                                        ))}
                                    </TagList>

                                    <div style={{ color: "var(--accent-color)", fontSize: "0.9rem", fontWeight: "600", marginTop: "1.2rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                                        Explorar Colección <span>➔</span>
                                    </div>
                                </CardContent>
                            </BentoCard>
                        );
                    })}

                    <AnimatePresence>
                        {activeIndex !== null && (
                            <>
                                <ExpandedOverlayContainer
                                    key="overlay"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                    onClick={() => setActiveIndex(null)}
                                />
                                <ExpandedCardWrapper
                                    key="card-wrapper"
                                >
                                    <ExpandedCard
                                        layoutId={`card-${products[activeIndex].id}`}
                                        transition={{ 
                                            type: "spring", 
                                            stiffness: 90, 
                                            damping: 22,
                                            mass: 0.95
                                        }}
                                    >
                                        <CardBgImage style={{ backgroundImage: `url(${products[activeIndex].image || '/placeholder-image.jpg'})` }} />
                                        <BentoOverlay $isExpanded={true} />
                                        
                                        <CloseButton 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveIndex(null);
                                            }}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            ✕
                                        </CloseButton>

                                        <CardContent $isExpanded={true}>
                                            <CategoryName $isExpanded={true}>{products[activeIndex].name}</CategoryName>
                                            <CategoryDesc $isExpanded={true}>{products[activeIndex].description}</CategoryDesc>
                                            
                                            <TagList $isExpanded={true}>
                                                {products[activeIndex].subcategories?.slice(0, 4).map((sub, sIdx) => (
                                                    <Tag key={sIdx} $isExpanded={true}>{sub.name}</Tag>
                                                ))}
                                            </TagList>

                                            <ButtonGroup
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15, duration: 0.4 }}
                                            >
                                                <PrimaryButton onClick={() => handleSeeMore(products[activeIndex].id)}>
                                                    Explorar Colección ➔
                                                </PrimaryButton>
                                                <SecondaryButton 
                                                    href={getWhatsAppUrl(`Hola, me interesa solicitar una cotización sobre la colección de ${products[activeIndex].name}`)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <WhatsAppIcon size={18} />
                                                    Cotizar por WhatsApp
                                                </SecondaryButton>
                                            </ButtonGroup>
                                        </CardContent>
                                    </ExpandedCard>
                                </ExpandedCardWrapper>
                            </>
                        )}
                    </AnimatePresence>
                </BentoGrid>
            )}

            {subTitle && (
                <SubTitle variants={itemVariants}>
                    {subTitle}
                </SubTitle>
            )}

            {whatsappLink && (
                <ContactButton
                    href={whatsappLink.includes('?') ? whatsappLink : `${whatsappLink}?text=${encodeURIComponent(CONTACT.defaultMessages.generalQuote)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                >
                    <WhatsAppIcon size={24} />
                    <span>{whatsappText}</span>
                </ContactButton>
            )}
        </MotionProductsContainer>
    );
}

export default Products;