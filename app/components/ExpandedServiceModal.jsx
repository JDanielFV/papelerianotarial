"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "./Icons";
import { getWhatsAppUrl, CONTACT } from "../lib/contact";

const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const ExpandedOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const ExpandedCard = styled(motion.div)`
    width: 90%;
    max-width: 600px;
    max-height: 85vh;
    background: var(--expanded-gradient);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
    border-radius: 25px;
    overflow: hidden;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow);
    border: 1px solid var(--card-border);

    /* Custom Scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
    }
`;

const ExpandedHeader = styled.div`
    height: 150px;
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
        height: 200px;
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
    gap: 1.5rem;
    
    @media (min-width: 768px) {
        padding: 2.5rem;
    }
`;

const ExpandedTitle = styled(motion.h2)`
    font-size: 1.8rem;
    color: var(--text-light);
    z-index: 1;
    margin: 0;
    
    @media (min-width: 768px) {
        font-size: 2.5rem;
    }
`;

const ExpandedDescription = styled.p`
    font-size: 1rem;
    color: var(--foreground);
    line-height: 1.6;
    
    @media (min-width: 768px) {
        font-size: 1.1rem;
    }
`;

const FeaturesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
`;

const FeatureItem = styled.li`
    font-size: 1rem;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    background: var(--card-background);
    border-radius: 10px;
    border: 1px solid var(--card-border);
    
    &:before {
        content: "✓";
        color: #d4a317;
        font-weight: bold;
        font-size: 1.2rem;
    }
`;

const ContactButton = styled(motion.a)`
    margin-top: 1rem;
    background-color: #d4a317;
    color: #050811;
    border: none;
    border-radius: 50px;
    padding: 12px 30px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    
    &:hover {
        background-color: #e6b422;
        transform: scale(1.02);
        box-shadow: 0 10px 20px rgba(212, 163, 23, 0.3);
    }
`;

export default function ExpandedServiceModal({ selectedId, servicesData, onClose }) {
    const service = servicesData.find((s) => s.id === selectedId);

    return (
        <AnimatePresence>
            {selectedId && service && (
                <ExpandedOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <ExpandedCard
                        layoutId={`card-${service.id}`}
                        onClick={(e) => e.stopPropagation()}
                    >
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

                            <ContactButton
                                href={getWhatsAppUrl(`${CONTACT.defaultMessages.service}${service.name}`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <WhatsAppIcon size={24} />
                                Cotizar Servicio
                            </ContactButton>
                        </ExpandedContent>
                    </ExpandedCard>
                </ExpandedOverlay>
            )}
        </AnimatePresence>
    );
}
