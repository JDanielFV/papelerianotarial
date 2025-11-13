"use client";

import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

// Keyframes for animations (not used by MenuLink anymore, but kept for now)
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

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
`;

const CenterText = styled.div`
    color: white;
    font-family: Outfit, sans-serif;
`;

const MenuIcon = styled.div`
    width: 30px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    z-index: 12;

    span {
        display: block;
        height: 2px;
        width: 100%;
        background: white;
        border-radius: 9px;
        transition: all 0.3s ease-in-out;
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
    font-family: Outfit, sans-serif;
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
    font-family: Outfit, sans-serif;
`;


function NavBar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const controls = useAnimation();
    const lastYPos = useRef(0);

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
                <CenterText>Texto Cambiante</CenterText>
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
