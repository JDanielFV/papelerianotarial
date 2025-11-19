"use client";

import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import Image from "next/image";

const MainContainer = styled(motion.main)`
    position: relative;
    height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10%;
    padding: 15%;
    text-align: center;
    font-family: Raleway,serif;
    overflow: hidden;
    scroll-snap-align: start;

    @media (min-width: 1024px) {
        padding: 5%;
        gap: 5%;
    }
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
`;

const Logo = styled(motion(Image))`
    width: 10rem;
    height: auto;
    z-index: 1;
    margin-top: 4rem;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: scale(1.1);
        filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
    }

    @media (min-width: 1024px) {
        width: 15rem;
        margin-top: 0;
    }
`;
const Icono = styled.img`
    width: 15px;
    z-index: 1;
    margin-left: 5%;
`

const Title = styled(motion.h1)`
    font-size: 3rem;
    z-index: 1;

    @media (min-width: 1024px) {
        font-size: 5rem;
    }
`
const SubTitle = styled(motion.p)`
    font-size: 1.5rem;
    z-index: 1;
    align-items: center;
    justify-content: center;

    @media (min-width: 1024px) {
        font-size: 2rem;
        max-width: 60%;
    }
`

const FondoVideo = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`

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

function Main() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 }); // Trigger once when 50% in view

    return (
        <MainContainer
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <Overlay />
            <FondoVideo autoPlay muted loop playsInline src={"/fondo.m4v"} />
            <Logo
                src={"/logo blanco.png"}
                alt="Logo A&G"
                width={240} // Approximate width based on 15rem
                height={240} // Aspect ratio needs to be maintained, assuming square or adjusting via CSS
                priority // Important for LCP since it's above the fold
                variants={itemVariants}
            />
            <Title
                variants={itemVariants}
            >
                Somos A&G
            </Title>
            <SubTitle
                variants={itemVariants}
            >
                Más que <strong>carpetas</strong>, creamos confianza. Piezas diseñadas para proteger los actos que
                definen vidas, patrimonios y legados.
            </SubTitle>
            <SubTitle
                variants={itemVariants}
            >
                Baja para conocer más <Icono src={"/abajo.svg"} />
            </SubTitle>
        </MainContainer>
    );
}

export default Main;
