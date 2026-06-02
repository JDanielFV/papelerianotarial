"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, usePresence } from "framer-motion";
import { WhatsAppIcon } from "./Icons";
import { getWhatsAppUrl, CONTACT } from "../lib/contact";

const ExpandedOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    z-index: 50;
    pointer-events: auto;
`;

const ExpandedCardWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 51;
    padding: 20px;
`;

const ExpandedCard = styled(motion.div)`
    width: 100%;
    max-width: 500px;
    height: 85vh;
    max-height: 800px;
    background-color: var(--color-secondary);
    border: 1px solid var(--card-border);
    border-radius: 25px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow);
    pointer-events: auto;

    @media (min-width: 768px) {
        max-width: 920px;
        flex-direction: row;
        height: 70vh;
        max-height: 600px;
    }
`;

const LeftPanel = styled.div`
    position: relative;
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(212, 163, 23, 0.3);
    }

    @media (min-width: 768px) {
        width: 50%;
        height: 100%;
    }
`;

const RightPanel = styled.div`
    width: 100%;
    height: 55%;
    background-color: rgba(255, 255, 255, 0.01);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top: 1px solid var(--card-border);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(212, 163, 23, 0.3);
    }

    @media (min-width: 768px) {
        width: 50%;
        height: 100%;
        border-top: none;
        border-left: 1px solid var(--card-border);
        padding: 3rem;
    }
`;

const ExpandedHeader = styled.div`
    height: 140px;
    position: relative;
    background: #111;
    background-image: ${({ $bg }) => $bg ? `url(${$bg})` : 'none'};
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;
    flex-shrink: 0;
    
    @media (min-width: 768px) {
        height: 180px;
        padding: 2rem;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(var(--background-rgb), 0.1), rgba(var(--background-rgb), 0.95));
        z-index: 0;
    }
`;

const ExpandedContent = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    
    @media (min-width: 768px) {
        padding: 2rem;
    }
`;

const ExpandedTitle = styled(motion.h2)`
    font-size: 1.6rem;
    color: var(--text-light);
    z-index: 1;
    margin: 0;
    line-height: 1.2;
    
    @media (min-width: 768px) {
        font-size: 2.2rem;
    }
`;

const ExpandedDescription = styled.p`
    font-size: 0.95rem;
    color: var(--foreground);
    line-height: 1.5;
`;

const FeaturesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
`;

const FeatureItem = styled.li`
    font-size: 0.9rem;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.6rem 0.8rem;
    background: var(--card-background);
    border-radius: 10px;
    border: 1px solid var(--card-border);
    
    &:before {
        content: "✓";
        color: #d4a317;
        font-weight: bold;
        font-size: 1.1rem;
    }
`;

const FormTitle = styled.h3`
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-light);
    margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

const Label = styled.label`
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.55);
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
`;

const Input = styled.input`
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    height: 48px;
    padding: 0 1rem;
    color: var(--foreground);
    font-family: inherit;
    font-size: 0.95rem;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.3s ease;

    &:hover {
        border-color: rgba(212, 163, 23, 0.25);
    }

    &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(212, 163, 23, 0.15);
        background: rgba(255, 255, 255, 0.04);
    }
`;

const Textarea = styled.textarea`
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 0.8rem 1rem;
    color: var(--foreground);
    font-family: inherit;
    font-size: 0.95rem;
    min-height: 180px;
    resize: vertical;
    line-height: 1.4;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.3s ease;

    &:hover {
        border-color: rgba(212, 163, 23, 0.25);
    }

    &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(212, 163, 23, 0.15);
        background: rgba(255, 255, 255, 0.04);
    }
`;

const ErrorText = styled.span`
    color: #e57373;
    font-size: 0.75rem;
`;

const WhatsappButton = styled(motion.button)`
    margin-top: 0.5rem;
    background-color: #d4a317;
    color: #050811;
    border: none;
    border-radius: 50px;
    height: 48px;
    font-weight: bold;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    
    &:hover:not(:disabled) {
        background-color: #e6b422;
        transform: translateY(-1px);
        box-shadow: 0 8px 16px rgba(212, 163, 23, 0.25);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.25s ease;
    backdrop-filter: blur(5px);
    line-height: 1;
    padding-bottom: 3px;

    &:hover {
        background-color: var(--accent-color);
        border-color: var(--accent-color);
        color: var(--background-dark);
        transform: scale(1.08);
    }
`;

const ModalPortalWrapper = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
`;

function ServiceModalInner({ service, onClose }) {
    const [isPresent, safeToRemove] = usePresence();
    const [nombre, setNombre] = useState("");
    const [detalles, setDetalles] = useState("");
    const [error, setError] = useState("");

    const getPlaceholderText = () => {
        const placeholders = {
            1: "Detalles sobre las tarjetas o documentos donde deseas integrar chips NFC (ej: cantidad, tipo de papel, si requieren pre-programación, etc.)",
            2: "Describe qué tipo de portal necesitas (ej: cotizador en línea, sistema de agendado de citas, gestión documental, cantidad de páginas, etc.)",
            3: "Cuéntanos sobre los documentos que llevarán los códigos QR (ej: actas, escrituras, volumen estimado de generación mensual, etc.)",
            4: "Platícanos qué redes te interesa manejar (ej: LinkedIn, Facebook, Instagram), objetivos de tu notaría y frecuencia de publicaciones deseada.",
            5: "Especifica la cantidad de tarjetas de contacto digitales (vCards) requeridas para tu equipo de trabajo y si las deseas físicas con NFC.",
            6: "Indica el tipo de empastado (ej: piel, tela), grabado (oro o plata), cantidad de libros de protocolo y si es con recolección a domicilio."
        };
        return placeholders[service.id] || "Detalles sobre lo que necesitas (cantidades, fechas, personalización, etc.)";
    };

    useEffect(() => {
        if (!isPresent && safeToRemove) {
            const timer = setTimeout(safeToRemove, 250);
            return () => clearTimeout(timer);
        }
    }, [isPresent, safeToRemove]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (!nombre.trim()) {
            setError("Por favor ingresa tu nombre o Notaría");
            return;
        }

        setError("");

        // Build premium detailed WhatsApp inquiry message
        const message = `Hola, me interesa cotizar el siguiente servicio:\n\n` +
            `• Servicio: ${service.name}\n` +
            `• Solicitado por: ${nombre}\n` +
            (detalles.trim() ? `• Especificaciones: ${detalles}` : "");

        const waUrl = getWhatsAppUrl(message);
        window.open(waUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <ModalPortalWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <ExpandedOverlay
                key="overlay"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            />
            <ExpandedCardWrapper key="card-wrapper" onClick={onClose}>
                <ExpandedCard
                    layoutId={`card-${service.id}`}
                    onClick={(e) => e.stopPropagation()}
                    exit={{ 
                        opacity: 0, 
                        y: 40, 
                        scale: 0.95, 
                        transition: { duration: 0.2, ease: "easeIn" } 
                    }}
                >
                    <LeftPanel>
                        <ExpandedHeader $bg={service.image}>
                            <ExpandedTitle layoutId={`title-${service.id}`}>
                                {service.name}
                            </ExpandedTitle>
                        </ExpandedHeader>

                        <ExpandedContent>
                            <ExpandedDescription>
                                {service.detailDescription || service.description}
                            </ExpandedDescription>

                            {service.features && (
                                <FeaturesList>
                                    {service.features.map((feature, i) => (
                                        <FeatureItem key={i}>{feature}</FeatureItem>
                                    ))}
                                </FeaturesList>
                            )}
                        </ExpandedContent>
                    </LeftPanel>

                    <RightPanel>
                        <FormTitle>Cotizar Servicio</FormTitle>
                        <FormSubtitle>Solicita una propuesta formal y personalizada para tu Notaría.</FormSubtitle>
                        
                        <Form onSubmit={handleFormSubmit} noValidate>
                            <FormGroup>
                                <Label htmlFor="service-nombre">Nombre / Notaría *</Label>
                                <Input
                                    id="service-nombre"
                                    type="text"
                                    placeholder="Tu nombre completo o Notaría"
                                    value={nombre}
                                    onChange={(e) => {
                                        setNombre(e.target.value);
                                        if (error) setError("");
                                    }}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="service-detalles">Especificaciones o Comentarios</Label>
                                <Textarea
                                    id="service-detalles"
                                    placeholder={getPlaceholderText()}
                                    value={detalles}
                                    onChange={(e) => setDetalles(e.target.value)}
                                />
                            </FormGroup>

                            {error && <ErrorText>{error}</ErrorText>}

                            <WhatsappButton
                                type="submit"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <WhatsAppIcon size={20} />
                                Enviar Cotización
                            </WhatsappButton>
                        </Form>
                    </RightPanel>

                    <CloseButton onClick={onClose} aria-label="Cerrar modal">&times;</CloseButton>
                </ExpandedCard>
            </ExpandedCardWrapper>
        </ModalPortalWrapper>
    );
}

export default function ExpandedServiceModal({ selectedId, servicesData, onClose }) {
    const service = servicesData.find((s) => s.id === selectedId);
    
    const handleClose = () => {
        console.log("ExpandedServiceModal: onClose triggered");
        if (onClose) onClose();
    };

    return (
        <AnimatePresence>
            {selectedId && service && (
                <ServiceModalInner service={service} onClose={handleClose} />
            )}
        </AnimatePresence>
    );
}
