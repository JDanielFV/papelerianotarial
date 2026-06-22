"use client";

import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { WhatsAppIcon } from "./Icons";
import { CONTACT } from "../lib/contact";
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
    transition: border-color 0.5s ease, box-shadow 0.5s ease, padding 0.5s ease;

    &:hover {
        border-color: var(--accent-color);
        box-shadow: 0 20px 45px rgba(212, 163, 23, 0.12);
    }

    @media (min-width: 1024px) {
        height: 100%;
        
        ${({ $isMinimized }) => $isMinimized && css`
            padding: 1.2rem;
            justify-content: center;
        `}
    }
`;

const CloseButton = styled(motion.button)`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: var(--accent-color);
        transform: scale(1.1);
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
        transform: scale(1.06);
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
        rgba(5, 5, 5, 0.1) 100%
    );
    z-index: 1;
    transition: opacity 0.5s ease;

    ${({ $isMinimized }) => $isMinimized && css`
        background: rgba(5, 5, 5, 0.85); /* Darken minimized cards to focus on protagonist */
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

    ${({ $isMinimized }) => $isMinimized && css`
        font-size: 1.2rem;
        margin-bottom: 0;
        @media (min-width: 768px) {
            font-size: 1.3rem;
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
    transition: opacity 0.4s ease, max-height 0.4s ease, margin 0.4s ease;

    ${({ $isMinimized }) => $isMinimized && css`
        opacity: 0;
        max-height: 0;
        margin-bottom: 0;
        overflow: hidden;
    `}
`;

const TagList = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
    max-height: 100px;
    opacity: 1;
    transition: opacity 0.4s ease, max-height 0.4s ease;

    ${({ $isMinimized }) => $isMinimized && css`
        opacity: 0;
        max-height: 0;
        overflow: hidden;
    `}
`;

const Tag = styled.span`
    font-size: 0.75rem;
    color: #ccc;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 0.35rem 0.75rem;
    border-radius: 50px;
`;

const ExplorerButton = styled(motion.div)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--accent-color);
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 1rem;
    cursor: pointer;
    
    span {
        transition: transform 0.3s ease;
    }
    
    &:hover span {
        transform: translateX(4px);
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

    const handleCardClick = (idx, productId) => {
        if (activeIndex === idx) {
            handleSeeMore(productId);
        } else {
            setActiveIndex(idx);
        }
    };

    // Calculate layout parameters dynamically based on which index is active
    const getCardLayout = (idx, active) => {
        // Normal state (no active/selected card)
        if (active === null) {
            if (idx === 0) return { gridColumn: "1 / 3", gridRow: "1 / 4", isMinimized: false };
            if (idx === 1) return { gridColumn: "3 / 4", gridRow: "1 / 4", isMinimized: false };
            if (idx === 2) return { gridColumn: "1 / 2", gridRow: "4 / 7", isMinimized: false };
            if (idx === 3) return { gridColumn: "2 / 4", gridRow: "4 / 7", isMinimized: false };
        }

        // Hero state (current card is active/expanded)
        if (active === idx) {
            const gridColumn = idx === 0 || idx === 2 ? "1 / 3" : "2 / 4";
            return { gridColumn, gridRow: "1 / 7", isMinimized: false };
        }

        // Minimized state (another card is active, current card shrinks to sidebar)
        const targetCol = (active === 0 || active === 2) ? "3 / 4" : "1 / 2";
        const remainingIdxs = [0, 1, 2, 3].filter(i => i !== active);
        const positionInSidebar = remainingIdxs.indexOf(idx);
        const gridRow = positionInSidebar === 0 ? "1 / 3" : positionInSidebar === 1 ? "3 / 5" : "5 / 7";

        return { gridColumn: targetCol, gridRow, isMinimized: true };
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
                    <AnimatePresence>
                        {products.map((product, idx) => {
                            const { gridColumn, gridRow, isMinimized } = getCardLayout(idx, activeIndex);
                            
                            return (
                                <BentoCard
                                    key={product.id}
                                    layout
                                    style={{ gridColumn, gridRow }}
                                    onClick={() => handleCardClick(idx, product.id)}
                                    $isMinimized={isMinimized}
                                    whileHover={{ y: isMinimized ? 0 : -4 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 150, 
                                        damping: 25,
                                        mass: 0.8
                                    }}
                                >
                                    <CardBgImage style={{ backgroundImage: `url(${product.image || '/placeholder-image.jpg'})` }} />
                                    <BentoOverlay $isMinimized={isMinimized} />
                                    
                                    {idx === activeIndex && (
                                        <CloseButton 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveIndex(null);
                                            }}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                        >
                                            ✕
                                        </CloseButton>
                                    )}

                                    <CardContent>
                                        <CategoryName $isMinimized={isMinimized}>{product.name}</CategoryName>
                                        <CategoryDesc $isMinimized={isMinimized}>{product.description}</CategoryDesc>
                                        
                                        <TagList $isMinimized={isMinimized}>
                                            {product.subcategories?.slice(0, 4).map((sub, sIdx) => (
                                                <Tag key={sIdx}>{sub.name}</Tag>
                                            ))}
                                        </TagList>

                                        {idx === activeIndex && (
                                            <ExplorerButton
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                Explorar Colección <span>➔</span>
                                            </ExplorerButton>
                                        )}
                                    </CardContent>
                                </BentoCard>
                            );
                        })}
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