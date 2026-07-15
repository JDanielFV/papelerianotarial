"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, GlobeIcon } from "./Icons";
import { CONTACT, getSocialUrl } from "../lib/contact";

const FooterContainer = styled.footer`
    background-color: var(--color-secondary);
    border-top: 1px solid var(--card-border);
    padding: 3rem 5% 2rem;
    color: var(--foreground);
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
    color: var(--text-light);
`;

const FooterText = styled.p`
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.6;
`;

const FooterLink = styled(Link)`
    font-size: 0.95rem;
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
        color: #d4a317;
        transform: translateX(3px);
    }
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
`;

const SocialIcon = styled(motion.a)`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 50%;
    color: var(--foreground);
    font-size: 1.2rem;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background: rgba(212, 163, 23, 0.05);
        border-color: rgba(212, 163, 23, 0.4);
        color: #d4a317;
    }
`;

const FooterBottom = styled.div`
    max-width: 1400px;
    margin: 2rem auto 0;
    padding-top: 2rem;
    border-top: 1px solid var(--card-border);
    text-align: center;
`;

const LegalLinksContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 0.8rem;
    font-size: 0.85rem;
    align-items: center;
`;

const LegalLink = styled(Link)`
    color: #888888;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: white;
    }
`;

const Copyright = styled.p`
    font-size: 0.9rem;
    color: #999999;
`;

const Logo = styled(Image)`
    cursor: pointer;
    transition: all 0.3s ease;
    filter: var(--logo-filter);
    
    &:hover {
        transform: scale(1.05);
        filter: var(--logo-filter) brightness(1.2);
    }
`;

export default function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterSection>
                    <Link href="/">
                        <Logo
                            src="/logo blanco.svg"
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
                            href={getSocialUrl('facebook')}
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 1 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            title="Facebook"
                            aria-label="Facebook"
                        >
                            <FacebookIcon size={20} />
                        </SocialIcon>
                        <SocialIcon
                            href={getSocialUrl('instagram')}
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 1 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            title="Instagram"
                            aria-label="Instagram"
                        >
                            <InstagramIcon size={20} />
                        </SocialIcon>
                        <SocialIcon
                            href={getSocialUrl('website')}
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 1 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            title="Sitio Web"
                            aria-label="Sitio Web"
                        >
                            <GlobeIcon size={20} />
                        </SocialIcon>
                    </SocialLinks>
                </FooterSection>

                <FooterSection>
                    <FooterTitle>Navegación</FooterTitle>
                    <FooterLink href="/">Inicio</FooterLink>
                    <FooterLink href="/catalogo">Catálogo</FooterLink>
                    <FooterLink href="/servicios">Servicios</FooterLink>
                    <FooterLink href="/contacto">Contacto</FooterLink>
                </FooterSection>

                <FooterSection>
                    <FooterTitle>Contacto</FooterTitle>
                    <FooterText>
                        {CONTACT.address.full}
                    </FooterText>
                    <FooterText>
                        Tel: {CONTACT.phone}
                    </FooterText>
                    <FooterText>
                        {CONTACT.email}
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
                <LegalLinksContainer>
                    <LegalLink href="/aviso-de-privacidad">Aviso de Privacidad</LegalLink>
                    <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>|</span>
                    <LegalLink href="/terminos-y-condiciones">Términos y Condiciones</LegalLink>
                </LegalLinksContainer>
                <Copyright>
                    © {new Date().getFullYear()} Papelería Notarial A&G. Todos los derechos reservados.
                </Copyright>
            </FooterBottom>
        </FooterContainer>
    );
}
