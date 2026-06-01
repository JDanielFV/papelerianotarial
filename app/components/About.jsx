"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import ProductGridSection from "./ProductGridSection";

const AboutContainer = styled(motion.main)`
    position: relative;
    gap: 3rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5%;
    text-align: center;
    font-family: Raleway, serif;
    overflow: hidden;
    scroll-snap-align: start;
    background-color: var(--background);

    @media (min-width: 1024px) {
        padding: 2%;
        gap: 2rem;
    }
`;

const Title = styled(motion.h2)`
    font-size: 2rem;
    z-index: 1;
    font-weight: lighter;
    
    @media (min-width: 1024px) {
        font-size: 3rem;
        max-width: 70%;
    }
`;

const SubTitle = styled(motion.p)`
    font-size: 1.5rem;
    z-index: 1;
    align-items: center;
    justify-content: center;
    font-weight: lighter;

    @media (min-width: 1024px) {
        font-size: 1.8rem;
        max-width: 60%;
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

import productData from '../data/products-data.json';
import { useRouter } from 'next/navigation';

function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 }); // Trigger once when 50% in view
    const router = useRouter();

    const handleSeeMore = (id) => {
        router.push(`/productos/catalogo?categoryId=${id}`);
    };

    return (
        <AboutContainer
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <Title
                variants={itemVariants}
            >
                Por que la <strong>primera impresion</strong> no solo se ve, <strong>se siente</strong>
            </Title>

            <ProductGridSection
                products={productData}
                variants={itemVariants}
                onSeeMore={handleSeeMore}
            />

            <SubTitle
                variants={itemVariants}
            >
                Cuidamos cada costura, cada grabado de su logotipo y cada pliegue para que cuando su cliente
                sostenga sus documentos, <strong> sostenga también una prueba tangible de su profesionalismo.</strong>
            </SubTitle>
        </AboutContainer>
    );
}

export default About;