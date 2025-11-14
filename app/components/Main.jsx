"use client";

import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
    font-family: Outfit,serif;
    overflow: hidden;
    scroll-snap-align: start;`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
`;

const Logo = styled(motion.img)`
    width: 10rem;
    z-index: 1;
    margin-top: 4rem;
`
const Icono = styled.img`
    width: 15px;
    z-index: 1;
    margin-left: 5%;
`

const Title = styled(motion.h1)`
    font-size: 3rem;
    z-index: 1;
`
const SubTitle = styled(motion.p)`
    font-size: 1.5rem;
    z-index: 1;
    align-items: center;
    justify-content: center;
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <MainContainer
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={mounted && inView ? "visible" : "hidden"}
        >
            <Overlay/>
            <FondoVideo autoPlay muted loop playsInline src={"/fondo.m4v"}/>
            <Logo 
                src={"/logo blanco.png"}
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
                Baja para conocer más <Icono src={"/abajo.svg"}/>
            </SubTitle>
        </MainContainer>
    );
}

export default Main;
