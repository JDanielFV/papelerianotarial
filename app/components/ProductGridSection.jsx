"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
    MotionProductCard,
    MotionProductImage,
    MotionProductName,
    MotionProductDescription
} from "./ProductCard";

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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.3);
`;

const ExpandedCard = styled(motion.div)`
    width: 80%;
    height: 75%;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: .5rem .5rem 1.2rem .5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2.5rem;
`;

const ExpandedProductImage = styled(motion.div)`
    width: 100%;
    height: 25rem;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
`;

const VerMasButton = styled(motion.button)`
    background-color: #ffffff;
    color: #171717;
    border: none;
    border-radius: 50px;
    padding: 10px 25px;
    font-family: Raleway, sans-serif;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    align-self: center;
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
                        <MotionProductImage layoutId={`image-${product.id}`} />
                        <MotionProductName layoutId={`name-${product.id}`}>{product.name}</MotionProductName>
                        <MotionProductDescription layoutId={`description-${product.id}`}>{product.description}</MotionProductDescription>
                    </MotionProductCard>
                ))}
            </MotionProductGrid>

            <AnimatePresence>
                {selectedProductId && selectedProduct && (
                    <ExpandedViewContainer
                        onClick={handleClose}
                        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                        animate={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                        exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    >
                        <ExpandedCard layoutId={`card-${selectedProductId}`} onClick={(e) => e.stopPropagation()}>
                            <ExpandedProductImage layoutId={`image-${selectedProductId}`} />
                            <MotionProductName layoutId={`name-${selectedProductId}`}>{selectedProduct.name}</MotionProductName>
                            <MotionProductDescription layoutId={`description-${selectedProductId}`}>{selectedProduct.description}</MotionProductDescription>
                            <VerMasButton
                                onClick={() => onSeeMore && onSeeMore(selectedProductId)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                                exit={{ opacity: 0 }}
                            >
                                Ver más
                            </VerMasButton>
                        </ExpandedCard>
                    </ExpandedViewContainer>
                )}
            </AnimatePresence>
        </>
    );
}
