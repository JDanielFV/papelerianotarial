"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useRouter } from 'next/navigation';
import ProductGridSection from "./ProductGridSection";
import { WhatsAppIcon } from "./Icons";
import productData from '../data/products-data.json';

// --- Styled Components (now with motion) ---
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
    overflow-x: hidden;
    scroll-snap-align: start;
    background-color: var(--background);

    @media (min-width: 1024px) {
        margin-top: 5%;
        padding: 2%;
    }
`;

const MotionTitle = styled(motion.h2)`
    font-size: 2rem;
    color: var(--foreground);
    z-index: 1;
    padding: 2rem 0 2rem 0;

    @media (min-width: 1024px) {
        font-size: 4rem;
    }
`;

const SubTitle = styled(motion.p)`
    font-size: 1.5rem;
    z-index: 1;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
    color: var(--foreground);
    margin-top: 2rem;
`;

const ContactButton = styled(motion.a)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    padding: 1rem 2rem;
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    margin-top: 1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background-color: #ffffff;
        color: #0a0a0a;
        border-color: #ffffff;
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(255, 255, 255, 0.4);
    }
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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Products() {
    const router = useRouter();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 }); // Trigger once when 50% in view

    const handleSeeMore = (id) => {
        router.push(`/productos/catalogo?categoryId=${id}`);
    };

    return (
        <MotionProductsContainer
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}>
            <MotionTitle
                variants={itemVariants}
            >
                Nuestros Productos
            </MotionTitle>

            <ProductGridSection
                products={productData}
                onSeeMore={handleSeeMore}
                variants={itemVariants}
            />

            <SubTitle variants={itemVariants}>
                ¿No encuentras lo que buscas? Contáctanos
            </SubTitle>

            <ContactButton
                href="https://wa.me/525576162856"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
            >
                <WhatsAppIcon size={24} />
                <span>Chatea con nosotros</span>
            </ContactButton>
        </MotionProductsContainer>
    );
}

export default Products;