"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, usePresence } from "framer-motion";
import { WhatsAppIcon } from "./Icons";
import { MotionProductName } from "./ProductCard";
import { getWhatsAppUrl } from "../lib/contact";

const ExpandedViewContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.7);
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

const LeftPanel = styled.div`
    position: relative;
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;

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

    @media (min-width: 768px) {
        width: 50%;
        height: 100%;
        border-top: none;
        border-left: 1px solid var(--card-border);
        padding: 3rem;
    }
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
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;

    @media (min-width: 768px) {
        padding: 2.5rem;
    }
`;

const SubCategoryText = styled.h3`
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: 0;
    margin-bottom: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
`;

const CatchyDescription = styled.p`
    font-size: 1rem;
    font-style: italic;
    color: var(--foreground);
    line-height: 1.4;
    margin-bottom: 0.3rem;
`;

const MinQuantity = styled.p`
    font-size: 0.85rem;
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
    font-size: 0.75rem;
    color: #d4a317;
    background-color: rgba(212, 163, 23, 0.08);
    padding: 0.4rem 0.8rem;
    border-left: 2px solid #d4a317;
    border-radius: 0 4px 4px 0;
    margin-top: 0.3rem;
    line-height: 1.3;
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

const ModalPortalWrapper = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
`;

function ModalInner({ selectedProduct, onClose }) {
    const [isPresent, safeToRemove] = usePresence();
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(selectedProduct.minPurchaseQuantity || 100);
    const [error, setError] = useState("");

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

        const minQty = selectedProduct.minPurchaseQuantity || 1;
        if (cantidad < minQty) {
            setError(`La cantidad mínima de compra es de ${minQty} unidades`);
            return;
        }

        setError("");

        // Build premium detailed WhatsApp inquiry message
        const message = `Hola, me interesa cotizar el siguiente producto:\n\n` +
            `• Producto: ${selectedProduct.name}\n` +
            `• Categoría: ${selectedProduct.subCategoryName || "Catálogo"}\n` +
            `• Cantidad: ${cantidad} unidades\n` +
            `• Solicitado por: ${nombre}`;

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
            <ExpandedViewContainer
                key="overlay"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            />
            <ExpandedCardWrapper key="card-wrapper" onClick={onClose}>
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
                    <LeftPanel>
                        <ExpandedBackground
                            style={{ backgroundImage: `url(${selectedProduct.image || '/placeholder-image.jpg'})` }}
                            layoutId={isPresent ? `image-${selectedProduct.id}` : undefined}
                        />

                        <ExpandedContent>
                            <SubCategoryText>
                                {selectedProduct.subCategoryName}
                            </SubCategoryText>

                            <MotionProductName style={{ fontSize: '1.8rem', marginBottom: '0.3rem', lineHeight: 1.1, color: 'var(--foreground)' }}>
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
                                    Venta exclusiva a Notarios Públicos. Se requiere acreditación.
                                </LegalDisclaimer>
                            )}
                        </ExpandedContent>
                    </LeftPanel>

                    <RightPanel>
                        <FormTitle>Cotizar Artículo</FormTitle>
                        <FormSubtitle>Consulta precios especiales y detalles de envío rápido a tu Notaría.</FormSubtitle>
                        
                        <Form onSubmit={handleFormSubmit} noValidate>
                            <FormGroup>
                                <Label htmlFor="modal-nombre">Nombre / Notaría *</Label>
                                <Input
                                    id="modal-nombre"
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
                                <Label htmlFor="modal-cantidad">Cantidad * (Min: {selectedProduct.minPurchaseQuantity || 100})</Label>
                                <Input
                                    id="modal-cantidad"
                                    type="number"
                                    value={cantidad}
                                    onChange={(e) => {
                                        setCantidad(parseInt(e.target.value) || 0);
                                        if (error) setError("");
                                    }}
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
                    
                    {/* Positioned last to ensure stacking order sits on top of flex panels */}
                    <CloseButton onClick={onClose} aria-label="Cerrar modal">&times;</CloseButton>
                </ExpandedCard>
            </ExpandedCardWrapper>
        </ModalPortalWrapper>
    );
}

export default function ExpandedProductModal({ selectedProduct, onClose }) {
    const handleClose = () => {
        console.log("ExpandedProductModal: onClose triggered");
        if (onClose) onClose();
    };

    return (
        <AnimatePresence>
            {selectedProduct && (
                <ModalInner selectedProduct={selectedProduct} onClose={handleClose} />
            )}
        </AnimatePresence>
    );
}
