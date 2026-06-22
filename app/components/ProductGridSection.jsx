"use client";

import React, { useState } from "react";
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
        
        /* Desktop hover expansion behavior */
        ${MotionProductCard} {
            min-width: 280px;
            width: 280px;
            height: 420px;
            flex-shrink: 0;
            transition: min-width 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                        width 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 0.9s ease,
                        border-color 0.9s ease;

            &.active {
                min-width: 420px;
                width: 420px;
                border-color: var(--accent-color);
                box-shadow: var(--shadow);
            }

            &.minimized {
                min-width: 220px;
                width: 220px;
                opacity: 0.55;
            }
        }

        /* Hide description on desktop unless card is active (hovered) */
        ${MotionProductDescription} {
            opacity: 0;
            max-height: 0;
            min-height: 0;
            margin-top: 0;
            overflow: hidden;
            transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                        max-height 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                        min-height 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                        margin-top 0.9s cubic-bezier(0.16, 1, 0.3, 1);
            
            .active & {
                opacity: 1;
                max-height: 100px;
                min-height: 3.2rem;
                margin-top: 0.5rem;
            }
        }
    }
`;

export default function ProductGridSection({ products, onSeeMore, variants }) {
    const [hoveredId, setHoveredId] = useState(null);

    const handleCardClick = (id) => {
        if (onSeeMore) {
            onSeeMore(id);
        }
    };

    return (
        <MotionProductGrid variants={variants}>
            {products.map(product => {
                const isActive = hoveredId === product.id;
                const isMinimized = hoveredId !== null && hoveredId !== product.id;
                const cardClass = isActive ? "active" : isMinimized ? "minimized" : "";

                return (
                    <MotionProductCard
                        key={product.id}
                        layoutId={`card-${product.id}`}
                        onClick={() => handleCardClick(product.id)}
                        className={cardClass}
                        onMouseEnter={() => setHoveredId(product.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <MotionProductImage
                            layoutId={`image-${product.id}`}
                            style={{ backgroundImage: `url(${product.image || '/placeholder-image.jpg'})` }}
                        />
                        <Overlay />
                        <MotionProductName layoutId={`name-${product.id}`}>{product.name}</MotionProductName>
                        <MotionProductDescription layoutId={`description-${product.id}`}>{product.description}</MotionProductDescription>
                    </MotionProductCard>
                );
            })}
        </MotionProductGrid>
    );
}
