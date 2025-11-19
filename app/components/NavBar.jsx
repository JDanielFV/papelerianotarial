"use client";

import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import phrases from '../data/navbar-phrases.json';

// Styled Components
const MotionNavContainer = styled(motion.nav)`
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    margin: auto;
    width: 90%;
    max-width: 800px;
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    backdrop-filter: blur(10px);
    z-index: 10;
`;

const Logo = styled.img`
    height: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.1);
        filter: brightness(1.2);
    }
`;

const CenterTextContainer = styled.div`
    position: relative;
    color: white;
    font-family: Raleway, sans-serif;
    font-size: 0.75rem;
    font-weight: 300;
    flex: 1;
    text-align: center;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    
    @media (min-width: 768px) {
        font-size: 0.95rem;
        padding: 0 20px;
    }
`;

const AnimatedText = styled(motion.span)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
`;

const MenuIcon = styled.div`
    width: 30px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    z-index: 12;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }

    span {
        display: block;
        height: 2px;
        width: 100%;
        background: white;
        border-radius: 9px;
        transition: all 0.3s ease-in-out;
    }
    
    &:hover span {
        background: rgba(255, 255, 255, 0.7);
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 30px;
    right: 50px;
    background: none;
    border: none;
    color: white;
    font-size: 4rem;
    cursor: pointer;
    z-index: 13;
    font-family: Raleway, sans-serif;
`;

const MenuContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => !['isOpen'].includes(prop)
})`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    clip-path: circle(0% at calc(100% - 50px) 50px);
    transition: clip-path 0.8s cubic-bezier(0.7, 0, 0.3, 1);
    z-index: 11;

    ${({ isOpen }) =>
        isOpen &&
        css`
            clip-path: circle(150% at calc(100% - 50px) 50px);
        `}
`;

const MenuLink = styled.a`
    color: white;
    font-size: 2.5rem;
    text-decoration: none;
    margin: 1rem 0;
    font-family: Raleway, sans-serif;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: .5rem 1rem;
    border-radius: 10px;
    
    &:hover{
        font-weight: bold;
        color: #0a0a0a;
        background-color: #ffffff;
        transform: translateX(10px) scale(1.05);
        box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
    }
`;


function NavBar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const controls = useAnimation();
    const lastYPos = useRef(0);

    // Rotate phrases every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentYPos = window.scrollY;
            if (currentYPos > lastYPos.current && currentYPos > 100) {
                // Scrolling down
                controls.start("hidden");
            } else {
                // Scrolling up
                controls.start("visible");
            }
            lastYPos.current = currentYPos;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [controls]);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const navVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 0 },
    };

    return (
        <>
            <MotionNavContainer
                variants={navVariants}
                initial="visible"
                animate={controls}
                transition={{ ease: "easeInOut", duration: 0.5 }}
            >
                <Link href="/">
                    <Logo src="/logo blanco.png" alt="Logo" />
                </Link>
                <CenterTextContainer>
                    <AnimatePresence mode="wait">
                        <AnimatedText
                            key={currentPhraseIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            {phrases[currentPhraseIndex]}
                        </AnimatedText>
                    </AnimatePresence>
                </CenterTextContainer>
                <MenuIcon onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </MenuIcon>
            </MotionNavContainer>
            <MenuContainer isOpen={isMenuOpen} onClick={toggleMenu}>
                <CloseButton onClick={toggleMenu}>&times;</CloseButton>
                <MenuLink href="/" onClick={(e) => e.stopPropagation()}>Inicio</MenuLink>
                <MenuLink href="/products" onClick={(e) => e.stopPropagation()}>Productos</MenuLink>
                <MenuLink href="/servicios" onClick={(e) => e.stopPropagation()}>Servicios</MenuLink>
                <MenuLink href="/contacto" onClick={(e) => e.stopPropagation()}>Contacto</MenuLink>
            </MenuContainer>
        </>
    );
}

export default NavBar;
