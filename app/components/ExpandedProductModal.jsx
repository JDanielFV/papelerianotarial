"use client";

import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence, usePresence } from "framer-motion";
import { WhatsAppIcon } from "./Icons";
import { MotionProductName } from "./ProductCard";

const ExpandedViewContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.7);
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
    pointer-events: none;
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
    justify-content: flex-end;
    box-shadow: var(--shadow);
    pointer-events: auto;
`;

const ExpandedBackground = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2a2a2a;
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
        background: var(--modal-overlay-gradient);
    }
`;

const ExpandedContent = styled.div`
    position: relative;
    z-index: 1;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
`;

const SubCategoryText = styled.h3`
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-top: 0;
    margin-bottom: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
`;

const CatchyDescription = styled.p`
    font-size: 1.1rem;
    font-style: italic;
    color: var(--foreground);
    line-height: 1.5;
    margin-bottom: 0.5rem;
`;

const MinQuantity = styled.p`
    font-size: 0.9rem;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &::before {
        content: '•';
        color: var(--foreground);
    }
`;

const LegalDisclaimer = styled.p`
    font-size: 0.8rem;
    color: #d4a317;
    background-color: rgba(212, 163, 23, 0.08);
    padding: 0.5rem 1rem;
    border-left: 2px solid #d4a317;
    border-radius: 0 4px 4px 0;
    margin-top: 0.5rem;
    line-height: 1.4;
`;

const WhatsappButton = styled(motion.a)`
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
    text-align: center;
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

function ModalInner({ selectedProduct, onClose }) {
    const [isPresent] = usePresence();

    return (
        <>
            <ExpandedViewContainer
                key="overlay"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            />
            <ExpandedCardWrapper key="card-wrapper">
                <ExpandedCard
                    layoutId={isPresent ? `card-${selectedProduct.id}` : undefined}
                    onClick={(e) => e.stopPropagation()}
                    exit={{ 
                        opacity: 0, 
                        y: 40, 
                        scale: 0.95, 
                        transition: { duration: 0.2, ease: "easeIn" } 
                    }}
                >
                    <ExpandedBackground
                        style={{ backgroundImage: `url(${selectedProduct.image || '/placeholder-image.jpg'})` }}
                        layoutId={isPresent ? `image-${selectedProduct.id}` : undefined}
                    />

                    <ExpandedContent>
                        <SubCategoryText>
                            {selectedProduct.subCategoryName}
                        </SubCategoryText>

                        <MotionProductName style={{ fontSize: '2rem', marginBottom: '0.5rem', lineHeight: 1.1, color: 'var(--foreground)' }}>
                            {selectedProduct.name}
                        </MotionProductName>

                        <CatchyDescription>
                            {selectedProduct.catchyDescription}
                        </CatchyDescription>

                        <MinQuantity>
                            Min. compra: {selectedProduct.minPurchaseQuantity}
                        </MinQuantity>

                        {/* Legal Disclaimer for restricted products */}
                        {(selectedProduct.name.toLowerCase().includes("folio") ||
                          selectedProduct.name.toLowerCase().includes("holograma") ||
                          selectedProduct.name.toLowerCase().includes("sello")) && (
                            <LegalDisclaimer>
                                Venta exclusiva a Notarios Públicos en funciones. Se requerirá acreditación oficial antes de procesar el pedido.
                            </LegalDisclaimer>
                        )}

                        <WhatsappButton
                            href={`https://wa.me/525576162856?text=${encodeURIComponent(selectedProduct.whatsappInquiry)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon size={20} />
                            Cotizar ahora
                        </WhatsappButton>
                    </ExpandedContent>
                </ExpandedCard>
            </ExpandedCardWrapper>
        </>
    );
}

export default function ExpandedProductModal({ selectedProduct, onClose }) {
    return (
        <AnimatePresence>
            {selectedProduct && (
                <ModalInner selectedProduct={selectedProduct} onClose={onClose} />
            )}
        </AnimatePresence>
    );
}
