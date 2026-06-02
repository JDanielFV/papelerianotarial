"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "./Icons";
import {
    MotionProductCard,
    MotionProductImage,
    MotionProductName,
    MotionProductDescription,
    Overlay
} from "./ProductCard";

const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const MotionProductGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    z-index: 1;
    width: 100%;
    
    @media (min-width: 1024px) {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        overflow-x: auto;
        overflow-y: hidden;
        padding-top: 15px;
        padding-bottom: 1rem;
        justify-content: center;
        
        /* Scrollbar styles */
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        
        &::-webkit-scrollbar {
            height: 8px;
        }
        
        &::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        
        &::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            
            &:hover {
                background: rgba(255, 255, 255, 0.5);
            }
        }
        
        /* Make cards vertical on desktop */
        ${MotionProductCard} {
            min-width: 300px;
            max-width: 300px;
            height: 420px;
            flex-shrink: 0;
        }
    }
`;

const ExpandedViewContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
`;

const ExpandedCard = styled(motion.div)`
    width: 100%;
    max-width: 500px;
    height: 85vh;
    max-height: 800px;
    background: var(--expanded-gradient);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
    border: 1px solid var(--card-border);
    border-radius: 25px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-shadow: var(--shadow);
`;

const ExpandedBackground = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    background-image: url('/placeholder-image.jpg'); // Fallback
    background-size: cover;
    background-position: center;
    z-index: 0;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to bottom, 
            rgba(0,0,0,0) 0%, 
            rgba(0,0,0,0) 40%, 
            rgba(10,10,10,0.9) 60%, 
            rgba(10,10,10,1) 100%
        );
    }
`;

const ExpandedContent = styled.div`
    position: relative;
    z-index: 1;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

const ExpandedTitle = styled(motion.h2)`
    font-size: 2rem;
    color: white;
    margin: 0;
    line-height: 1.1;
`;

const ExpandedDescription = styled(motion.p)`
    font-size: 1.1rem;
    color: #e0e0e0;
    line-height: 1.5;
`;

const VerMasButton = styled(motion.button)`
    margin-top: 1rem;
    background-color: #d4a317;
    color: #050811;
    border: none;
    border-radius: 50px;
    padding: 12px 30px;
    font-family: Raleway, sans-serif;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    
    &:hover {
        background-color: #e6b422;
        transform: scale(1.02);
        box-shadow: 0 10px 20px rgba(212, 163, 23, 0.3);
    }
`;

const WhatsappButton = styled(motion.a)`
    background-color: transparent;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    padding: 12px 30px;
    font-family: Raleway, sans-serif;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    
    &:hover {
        background-color: rgba(212, 163, 23, 0.05);
        border-color: #d4a317;
        color: #d4a317;
        transform: scale(1.02);
    }
`;

export default function ProductGridSection({ products, onSeeMore, variants }) {
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleCardClick = (id) => {
        setSelectedProductId(id);
    };

    const handleClose = () => {
        setSelectedProductId(null);
    };

    const selectedProduct = products.find(p => p.id === selectedProductId);

    return (
        <>
            <MotionProductGrid variants={variants}>
                {products.map(product => (
                    <MotionProductCard
                        key={product.id}
                        layoutId={`card-${product.id}`}
                        onClick={() => handleCardClick(product.id)}
                    >
                        <MotionProductImage
                            layoutId={`image-${product.id}`}
                            style={{ backgroundImage: `url(${product.image || '/placeholder-image.jpg'})` }}
                        />
                        <Overlay />
                        <MotionProductName layoutId={`name-${product.id}`}>{product.name}</MotionProductName>
                        <MotionProductDescription layoutId={`description-${product.id}`}>{product.description}</MotionProductDescription>
                    </MotionProductCard>
                ))}
            </MotionProductGrid>

            <AnimatePresence>
                {selectedProductId && selectedProduct && (
                    <ExpandedViewContainer
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ExpandedCard layoutId={`card-${selectedProductId}`} onClick={(e) => e.stopPropagation()}>

                            <ExpandedBackground
                                style={{ backgroundImage: `url(${selectedProduct.image || '/placeholder-image.jpg'})` }}
                                layoutId={`image-${selectedProductId}`}
                            />

                            <ExpandedContent>
                                <ExpandedTitle layoutId={`name-${selectedProductId}`}>
                                    {selectedProduct.name}
                                </ExpandedTitle>
                                <ExpandedDescription layoutId={`description-${selectedProductId}`}>
                                    {selectedProduct.description}
                                </ExpandedDescription>
                                {onSeeMore && (
                                    <VerMasButton
                                        onClick={() => onSeeMore(selectedProductId)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                                        exit={{ opacity: 0 }}
                                    >
                                        Ver más
                                    </VerMasButton>
                                )}
                                <WhatsappButton
                                    href={`https://wa.me/525576162856?text=Hola,%20me%20interesa%20información%20sobre%20${encodeURIComponent(selectedProduct.name)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                                    exit={{ opacity: 0 }}
                                >
                                    <WhatsAppIcon size={20} />
                                    Cotizar
                                </WhatsappButton>
                            </ExpandedContent>
                        </ExpandedCard>
                    </ExpandedViewContainer>
                )}
            </AnimatePresence>
        </>
    );
}
