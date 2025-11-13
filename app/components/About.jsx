"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { MotionProductCard, MotionProductImage, MotionProductName, MotionProductDescription } from "./ProductCard";

const AboutContainer = styled.main`
    position: relative;
    gap: 3rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5%;
    text-align: center;
    font-family: Outfit, serif;
    overflow: hidden;
    scroll-snap-align: start;
    background-color: #0a0a0a;
`;

const Title = styled.h1`
    font-size: 2rem;
    z-index: 1;
    font-weight: lighter;
    
    
`;

const SubTitle = styled.p`
    font-size: 1.5rem;
    z-index: 1;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
`;

const MotionProductGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 900px;
    z-index: 1;
`;

// Re-using expanded view styles from Products.jsx logic
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

function About() {
    const [selectedProductId, setSelectedProductId] = useState(null);

    const aboutProductData = [
        { id: 5, name: "Hologramas", description: "Seguridad y distinción para sus documentos." },
        { id: 6, name: "Folio y Grabado Láser", description: "Personalización precisa y elegante." },
        { id: 7, name: "Impresión Offset", description: "Calidad y volumen para sus necesidades." },
        { id: 8, name: "Acabados Finos", description: "Detalles que marcan la diferencia." },
    ];

    return (
        <AboutContainer>
            <Title>Por que la <strong>primera impresion</strong> no solo se ve, <strong>se siente</strong></Title>
            
            <MotionProductGrid>
                {aboutProductData.map(product => (
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

            <SubTitle>Cuidamos cada costura, cada grabado de su logotipo y cada pliegue para que cuando su cliente
                sostenga sus documentos, <strong> sostenga también una prueba tangible de su profesionalismo.</strong></SubTitle>

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
                            <MotionProductName layoutId={`name-${selectedProductId}`}>{aboutProductData.find(p => p.id === selectedProductId).name}</MotionProductName>
                            <MotionProductDescription layoutId={`description-${selectedProductId}`}>{aboutProductData.find(p => p.id === selectedProductId).description}</MotionProductDescription>
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
        </AboutContainer>
    );
}

export default About;