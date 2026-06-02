"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
    MotionProductCard,
    MotionProductImage,
    MotionProductName,
    MotionProductDescription,
    Overlay
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

export default function ProductGridSection({ products, onSeeMore, variants }) {
    const handleCardClick = (id) => {
        if (onSeeMore) {
            onSeeMore(id);
        }
    };

    return (
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
    );
}
