"use client";

import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
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
        min-height: 640px;
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
    transition: border-color 0.5s ease, box-shadow 0.5s ease;

    &:hover {
        border-color: var(--accent-color);
        box-shadow: 0 20px 45px rgba(212, 163, 23, 0.12);
    }

    @media (min-width: 1024px) {
        height: 100%;
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
    background-image: linear-gradient(
        to top,
        rgba(5, 5, 5, 0.95) 0%,
        rgba(5, 5, 5, 0.65) 50%,
        rgba(5, 5, 5, 0.1) 100%
    );
    z-index: 1;
    transition: all 0.5s ease;
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
    /* Altura fija reservada para 2 líneas: line-height * font-size * 2 + gap.
       Garantiza que todas las cards tengan el mismo alto en el bloque del título,
       sin importar si el texto wrappea en 1 o 2 líneas. */
    line-height: 1.15;
    font-size: 1.6rem;
    /* 1.15 * 1.6rem * 2 = 3.68rem + un pequeño margen visual */
    min-height: calc(1.15em * 2);

    @media (min-width: 768px) {
        font-size: 1.9rem;
        /* En desktop escalamos: 1.15 * 1.9rem * 2 = 4.37rem */
        min-height: calc(1.15em * 2);
    }

    @media (min-width: 1024px) {
        font-size: 2.1rem;
    }
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
`;

const TagList = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
    max-height: 100px;
    opacity: 1;
    transition: all 0.4s ease;
`;

const Tag = styled.span`
    font-size: 0.75rem;
    color: #ccc;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 0.35rem 0.75rem;
    border-radius: 50px;
    transition: all 0.3s ease;
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

    // Estado para coordinar la hero animation: la card clickeada se "expande"
    // y las otras cards hacen fade-out. Después de la animación, navegamos.
    const [transitioningId, setTransitioningId] = useState(null);

    const handleCardClick = (categoryId) => {
        if (transitioningId !== null) return; // evitar doble click
        setTransitioningId(categoryId);
        // Tiempo de la animación de salida (stagger de fade + scale de la card activa)
        // antes de navegar a la página de detalle
        setTimeout(() => {
            router.push(`/catalogo/productos?categoryId=${categoryId}`);
        }, 550);
    };

    // Layout del bento grid: 1 card grande (2x3) + 3 cards de apoyo
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
                        const { gridColumn, gridRow } = getCardLayout(idx);
                        const isTransitioning = transitioningId !== null;
                        const isActive = transitioningId === product.id;

                        return (
                            <BentoCard
                                key={product.id}
                                role="button"
                                tabIndex={0}
                                style={{ gridColumn, gridRow }}
                                onClick={() => handleCardClick(product.id)}
                                animate={
                                    isActive
                                        ? { scale: 1.04, y: -8 }
                                        : isTransitioning
                                        ? { opacity: 0, scale: 0.92, y: 10 }
                                        : { scale: 1, y: 0 }
                                }
                                transition={{
                                    duration: 0.55,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                whileHover={!isTransitioning ? { y: -4 } : undefined}
                                whileTap={!isTransitioning ? { y: 1 } : undefined}
                            >
                                <CardBgImage style={{ backgroundImage: `url(${product.image || '/placeholder-image.jpg'})` }} />
                                <BentoOverlay />

                                <CardContent>
                                    <CategoryName>{product.name}</CategoryName>
                                    <CategoryDesc>{product.description}</CategoryDesc>

                                    <TagList>
                                        {(() => {
                                            // Categoría plana: mostrar nombres de productos
                                            if (Array.isArray(product.products)) {
                                                return product.products.slice(0, 5).map((p, sIdx) => (
                                                    <Tag key={`p-${sIdx}`}>{p.name}</Tag>
                                                ));
                                            }
                                            // Categoría con subcategorías: mostrar nombres de subcategorías
                                            return (product.subcategories || []).slice(0, 5).map((sub, sIdx) => (
                                                <Tag key={`s-${sIdx}`}>{sub.name}</Tag>
                                            ));
                                        })()}
                                    </TagList>

                                    <motion.div
                                        style={{ color: "var(--accent-color)", fontSize: "0.9rem", fontWeight: "600", marginTop: "1.2rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                                        animate={
                                            isTransitioning
                                                ? { opacity: 0, x: -10 }
                                                : { opacity: 1, x: 0 }
                                        }
                                        transition={{ duration: 0.3 }}
                                    >
                                        Explorar Colección <span>➔</span>
                                    </motion.div>
                                </CardContent>
                            </BentoCard>
                        );
                    })}
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
                    whileHover={{ y: -4 }}
                    whileTap={{ y: 1 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                    <WhatsAppIcon size={24} />
                    <span>{whatsappText}</span>
                </ContactButton>
            )}
        </MotionProductsContainer>
    );
}

export default Products;
