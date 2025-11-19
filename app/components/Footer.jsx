"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const FooterContainer = styled.footer`
    background-color: #000000;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3rem 5% 2rem;
    font-family: Raleway, serif;
    color: white;
`;

const FooterContent = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FooterTitle = styled.h4`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: white;
`;

const FooterText = styled.p`
    font-size: 0.95rem;
    color: #cccccc;
    line-height: 1.6;
`;

const FooterLink = styled(Link)`
    font-size: 0.95rem;
    color: #cccccc;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
        color: white;
        transform: translateX(3px);
    }
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
`;

const SocialIcon = styled(motion.a)`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-3px);
    }
`;

const FooterBottom = styled.div`
    max-width: 1400px;
    margin: 2rem auto 0;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
`;

const Copyright = styled.p`
    font-size: 0.9rem;
    color: #999999;
`;

const Logo = styled(Image)`
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
        filter: brightness(1.2);
    }
`;

export default function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterSection>
                    <Link href="/">
                        <Logo
                            src="/logo blanco.png"
                            alt="Papelería Notarial A&G"
                            width={50}
                            height={45}
                        />
                    </Link>
                    <FooterText>
                        Soluciones premium de papelería notarial con los más altos estándares de calidad y seguridad.
                    </FooterText>
                    <SocialLinks>
                        <SocialIcon
                            href="https://facebook.com"
                            target="_blank"
                            whileHover={{ scale: 1.1 }}
                            title="Facebook"
                        >
                            📘
                        </SocialIcon>
                        <SocialIcon
                            href="https://instagram.com"
                            target="_blank"
                            whileHover={{ scale: 1.1 }}
                            title="Instagram"
                        >
                            📷
                        </SocialIcon>
                        <SocialIcon
                            href="https://papelerianotarial.com"
                            target="_blank"
                            whileHover={{ scale: 1.1 }}
                            title="Sitio Web"
                        >
                            🌐
                        </SocialIcon>
                    </SocialLinks>
                </FooterSection>

                <FooterSection>
                    <FooterTitle>Navegación</FooterTitle>
                    <FooterLink href="/">Inicio</FooterLink>
                    <FooterLink href="/products">Productos</FooterLink>
                    <FooterLink href="/servicios">Servicios</FooterLink>
                    <FooterLink href="/contacto">Contacto</FooterLink>
                </FooterSection>

                <FooterSection>
                    <FooterTitle>Contacto</FooterTitle>
                    <FooterText>
                        Ciudad de México, México
                    </FooterText>
                    <FooterText>
                        Tel: +52 55 1234 5678
                    </FooterText>
                    <FooterText>
                        contacto@papelerianotarial.com
                    </FooterText>
                </FooterSection>

                <FooterSection>
                    <FooterTitle>Horario</FooterTitle>
                    <FooterText>
                        Lunes a Viernes<br />
                        9:00 AM - 6:00 PM
                    </FooterText>
                    <FooterText>
                        Sábados<br />
                        9:00 AM - 3:00 PM
                    </FooterText>
                </FooterSection>
            </FooterContent>

            <FooterBottom>
                <Copyright>
                    © {new Date().getFullYear()} Papelería Notarial A&G. Todos los derechos reservados.
                </Copyright>
            </FooterBottom>
        </FooterContainer>
    );
}
