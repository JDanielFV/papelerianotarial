"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import {
    MotionProductCard,
    MotionProductImage,
    MotionProductName,
    MotionProductDescription
} from "./ProductCard";

// --- Styled Components (now with motion) ---
const MotionProductsContainer = styled(motion.section)`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5%;
    padding: 5%;
    margin-top: 12%;
    text-align: center;
    font-family: Outfit, serif;
    overflow-x: hidden;
    scroll-snap-align: start;
    background-color: #0a0a0a;
`;

const MotionTitle = styled(motion.h1)`
    font-size: 2rem;
    color: white;
    z-index: 1;
    padding: 2rem 0 2rem 0;
`;

const MotionProductGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 900px;

    z-index: 1;
`;

// --- Styles for Expanded View ---

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

const VerMasButton = styled(motion.button)`
    background-color: #ffffff;
    color: #171717;
    border: none;
    border-radius: 50px;
    padding: 10px 25px;
    font-family: Outfit, sans-serif;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    align-self: center;
`;

const ExpandedProductImage = styled(motion.div)`
    width: 100%;
    height: 25rem;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
`;


function Products() {
    const [selectedProductId, setSelectedProductId] = useState(null);

    const productData = [
        { id: 1, name: "Articulos de Papelería", description: "Elegancia y durabilidad en un diseño atemporal." },
        { id: 2, name: "Carpetas", description: "Máxima seguridad para documentos vitales." },
        { id: 3, name: "Articulos Promocionales", description: "Protección superior con un acabado profesional." },
        { id: 4, name: "Articulos Personalizados", description: "Diseño exclusivo para el notario moderno." },
    ];

    return (
        <MotionProductsContainer>
            <MotionTitle>Nuestros Productos</MotionTitle>
            
            <MotionProductGrid>
                {productData.map(product => (
                    <MotionProductCard 
                        key={product.id} 
                        layoutId={`card-${product.id}`}
                        onClick={() => setSelectedProductId(product.id)}
                    >
                        <MotionProductImage layoutId={`image-${product.id}`} />
                        <MotionProductName layoutId={`name-${product.id}`}>{product.name}</MotionProductName>
                        <MotionProductDescription layoutId={`description-${product.id}`}>{product.description}</MotionProductDescription>
                    </MotionProductCard>
                ))}
            </MotionProductGrid>

            <AnimatePresence>
                {selectedProductId && (
                    <ExpandedViewContainer 
                        onClick={() => setSelectedProductId(null)}
                        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                        animate={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                        exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    >
                        <ExpandedCard layoutId={`card-${selectedProductId}`} onClick={(e) => e.stopPropagation()}>
                            <ExpandedProductImage layoutId={`image-${selectedProductId}`} />
                            <MotionProductName layoutId={`name-${selectedProductId}`}>{productData.find(p => p.id === selectedProductId).name}</MotionProductName>
                            <MotionProductDescription layoutId={`description-${selectedProductId}`}>{productData.find(p => p.id === selectedProductId).description}</MotionProductDescription>
                            <VerMasButton
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
        </MotionProductsContainer>
    );
}

export default Products;

