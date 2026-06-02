"use client";

import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getWhatsAppUrl } from "../lib/contact";

// Styled Components
const MotionNavContainer = styled(motion.nav)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 70px;
    padding: 0 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--card-background);
    border-bottom: 1px solid var(--card-border);
    backdrop-filter: blur(15px);
    z-index: 10;
`;

const NavContent = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled(Image)`
    height: 35px;
    width: auto;
    cursor: pointer;
    transition: all 0.3s ease;
    filter: var(--logo-filter);
    
    &:hover {
        transform: scale(1.05);
        filter: var(--logo-filter) brightness(1.2);
    }
`;

const DesktopLinks = styled.div`
    display: none;
    
    @media (min-width: 768px) {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
`;

const NavLink = styled(Link)`
    color: var(--foreground);
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    padding: 0.5rem 0;
    transition: color 0.3s ease;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--accent-color);
        transition: width 0.3s ease;
    }
    
    &:hover {
        color: var(--accent-color);
    }
    
    &:hover::after {
        width: 100%;
    }
`;

const CTAButton = styled.a`
    display: none;
    
    @media (min-width: 768px) {
        display: inline-block;
        padding: 0.55rem 1.3rem;
        background-color: var(--accent-color);
        color: var(--background-dark);
        border-radius: 50px;
        font-weight: 600;
        font-size: 0.85rem;
        text-decoration: none;
        transition: all 0.3s ease;
        
        &:hover {
            background-color: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(212, 163, 23, 0.3);
        }
    }
`;

const MenuIcon = styled.div.withConfig({
    shouldForwardProp: (prop) => !['isOpen'].includes(prop)
})`
    width: 30px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    z-index: 12;
    transition: transform 0.3s ease;

    @media (min-width: 768px) {
        display: none;
    }

    &:hover {
        transform: scale(1.1);
    }

    span {
        display: block;
        height: 2px;
        width: 100%;
        background: var(--foreground);
        border-radius: 9px;
        transition: all 0.3s ease-in-out;
    }
    
    ${({ isOpen }) => isOpen && css`
        span:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        span:nth-child(2) {
            opacity: 0;
        }
        span:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
    `}
`;

const MenuContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => !['isOpen'].includes(prop)
})`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s ease-in-out;
    
    ${({ isOpen }) =>
        isOpen &&
        css`
            opacity: 1;
            pointer-events: auto;
        `}
`;

const MenuLink = styled(Link)`
    color: var(--foreground);
    font-size: 2.5rem;
    text-decoration: none;
    margin: 1.5rem 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0.5rem 2rem;
    border-radius: 10px;
    font-weight: 300;
    
    &:hover{
        font-weight: bold;
        color: var(--background);
        background-color: var(--accent-color);
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(212, 163, 23, 0.4);
    }
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
                setMenuOpen(false);
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
        hidden: { y: "-100%", opacity: 0 },
    };

    return (
        <>
            <MotionNavContainer
                variants={navVariants}
                initial="visible"
                animate={controls}
                transition={{ ease: "easeInOut", duration: 0.4 }}
            >
                <NavContent>
                    <Link href="/">
                        <Logo 
                            src="/logo blanco.svg" 
                            alt="Papelería Notarial A&G" 
                            width={140} 
                            height={35} 
                            priority 
                        />
                    </Link>
                    
                    <DesktopLinks>
                        <NavLink href="/">Inicio</NavLink>
                        <NavLink href="/catalogo">Catálogo</NavLink>
                        <NavLink href="/servicios">Servicios</NavLink>
                        <NavLink href="/contacto">Contacto</NavLink>
                    </DesktopLinks>

                    <CTAButton 
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Cotizar ahora
                    </CTAButton>

                    <MenuIcon 
                        as="button" 
                        type="button"
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isMenuOpen}
                        isOpen={isMenuOpen} 
                        onClick={toggleMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </MenuIcon>
                </NavContent>
            </MotionNavContainer>
            
            <MenuContainer isOpen={isMenuOpen}>
                <MenuLink href="/" onClick={() => setMenuOpen(false)}>Inicio</MenuLink>
                <MenuLink href="/catalogo" onClick={() => setMenuOpen(false)}>Catálogo</MenuLink>
                <MenuLink href="/servicios" onClick={() => setMenuOpen(false)}>Servicios</MenuLink>
                <MenuLink href="/contacto" onClick={() => setMenuOpen(false)}>Contacto</MenuLink>
            </MenuContainer>
        </>
    );
}

export default NavBar;
