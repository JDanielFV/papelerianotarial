"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, usePresence } from "framer-motion";
import { WhatsAppIcon } from "./Icons";
import { getWhatsAppUrl } from "../lib/contact";

const ExpandedViewContainer = styled(motion.div)`
    position: fixed;
    inset: 0;
    z-index: 50;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.7);
    pointer-events: auto;
`;

const ExpandedCardWrapper = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 51;
    padding: 16px;

    @media (min-width: 768px) {
        padding: 32px;
    }
`;

const ExpandedCard = styled(motion.div)`
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    background-color: var(--color-secondary);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow);
    pointer-events: auto;

    @media (min-width: 768px) {
        flex-direction: row;
        width: 90vw;
        max-width: 1280px;
        height: 80vh;
        max-height: 720px;
        border-radius: 24px;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 30;
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

// --- Left panel: name + full-bleed image ---
const LeftPanel = styled.div`
    position: relative;
    width: 100%;
    flex: 1 1 auto;
    min-height: 45%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #1a1a1a;

    @media (min-width: 768px) {
        width: 65%;
        height: 100%;
        flex: 0 0 65%;
    }
`;

const ProductName = styled.h2`
    position: absolute;
    top: 1.25rem;
    left: 1.5rem;
    right: 4rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    z-index: 2;
    margin: 0;
    line-height: 1.2;
    pointer-events: none;

    @media (min-width: 768px) {
        font-size: 1.8rem;
        top: 1.75rem;
        left: 2rem;
    }
`;

const HeroImage = styled(motion.div)`
    position: absolute;
    inset: 0;
    background-color: #2a2a2a;
    background-size: cover;
    background-position: center;
    z-index: 0;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--modal-overlay-gradient);
    }
`;

// --- Right panel: finish list + quote button ---
const RightPanel = styled.div`
    width: 100%;
    flex: 0 0 auto;
    background-color: rgba(255, 255, 255, 0.01);
    padding: 1.5rem 1.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border-top: 1px solid var(--card-border);
    overflow-y: auto;

    @media (min-width: 768px) {
        width: 35%;
        flex: 0 0 35%;
        height: 100%;
        border-top: none;
        border-left: 1px solid var(--card-border);
        padding: 2.25rem 2rem;
    }
`;

const SectionTitle = styled.h4`
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: var(--text-muted);
    font-weight: 600;
    margin: 0;
`;

const FinishesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1 1 auto;
`;

const FinishRow = styled(motion.button)`
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.75rem 0.9rem;
    background: ${({ $selected }) =>
        $selected
            ? "rgba(212, 163, 23, 0.12)"
            : "rgba(255, 255, 255, 0.03)"};
    border: 1px solid
        ${({ $selected }) =>
            $selected ? "var(--accent-color)" : "transparent"};
    border-radius: 10px;
    color: var(--foreground);
    font-size: 0.9rem;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
    width: 100%;

    &:hover {
        background: rgba(212, 163, 23, 0.08);
        border-color: ${({ $selected }) =>
            $selected ? "var(--accent-color)" : "rgba(212, 163, 23, 0.3)"};
    }

    &:focus-visible {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(212, 163, 23, 0.2);
    }
`;

const FinishNumber = styled.span`
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${({ $selected }) =>
        $selected ? "var(--accent-color)" : "rgba(255, 255, 255, 0.06)"};
    color: ${({ $selected }) => ($selected ? "#050811" : "var(--text-muted)")};
    font-size: 0.7rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, color 0.2s ease;
`;

const FinishName = styled.span`
    flex: 1;
    line-height: 1.2;
`;

const EmptyState = styled.p`
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.4;
    margin: 0;
`;

const QuoteButton = styled(motion.button)`
    background-color: var(--accent-color);
    color: #050811;
    border: none;
    border-radius: 12px;
    height: 46px;
    font-weight: bold;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    transition: background 0.2s ease, transform 0.15s ease;
    width: 100%;
    font-family: inherit;
    margin-top: auto;

    &:hover:not(:disabled) {
        background-color: #e6b422;
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;

// --- Sub-modal (quote form) ---
const SubModalOverlay = styled(motion.div)`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
`;

const SubModalCard = styled(motion.div)`
    background-color: var(--color-secondary);
    border: 1px solid var(--card-border);
    border-radius: 18px;
    width: 100%;
    max-width: 360px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    box-shadow: var(--shadow);
`;

const SubModalTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-light);
    margin: 0;
`;

const SubModalSubtitle = styled.p`
    font-size: 0.8rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.4;
`;

const SubModalForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
`;

const SubModalFormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

const SubModalLabel = styled.label`
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.55);
    font-weight: 600;
    letter-spacing: 0.7px;
    text-transform: uppercase;
`;

const SubModalInput = styled.input`
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 10px;
    height: 42px;
    padding: 0 0.85rem;
    color: var(--foreground);
    font-family: inherit;
    font-size: 0.9rem;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(212, 163, 23, 0.15);
    }
`;

const SubModalError = styled.span`
    color: #e57373;
    font-size: 0.75rem;
`;

const SubModalSendButton = styled(motion.button)`
    background-color: #d4a317;
    color: #050811;
    border: none;
    border-radius: 50px;
    height: 46px;
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    transition: background 0.2s ease;
    font-family: inherit;

    &:hover {
        background-color: #e6b422;
    }
`;

const SubModalBackButton = styled.button`
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 0.8rem;
    cursor: pointer;
    font-family: inherit;
    padding: 0;
    text-align: center;
    transition: color 0.2s ease;

    &:hover {
        color: var(--foreground);
    }
`;

const ModalPortalWrapper = styled(motion.div)`
    position: fixed;
    inset: 0;
    z-index: 50;
`;

function QuoteForm({ product, finish, onBack }) {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [error, setError] = useState("");

    const minQty = product?.minPurchaseQuantity || 100;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim()) {
            setError("Por favor ingresa tu nombre o Notaría");
            return;
        }
        const parsed = parseInt(cantidad);
        if (cantidad === "" || isNaN(parsed) || parsed < minQty) {
            setError("No se puede realizar la cotización con la cantidad seleccionada");
            return;
        }
        setError("");

        const finishLine = finish ? `• Acabado: ${finish.name}\n` : "";

        const message =
            `Hola, me interesa cotizar el siguiente producto:\n\n` +
            `• Producto: ${product.name}\n` +
            `• Categoría: ${product.subCategoryName || "Catálogo"}\n` +
            finishLine +
            `• Cantidad: ${parsed} unidades\n` +
            `• Solicitado por: ${nombre}`;

        const waUrl = getWhatsAppUrl(message);
        window.open(waUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <SubModalCard
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
        >
            <SubModalTitle>Cotizar Artículo</SubModalTitle>
            <SubModalSubtitle>
                {product.name}
                {finish && ` · ${finish.name}`}
            </SubModalSubtitle>

            <SubModalForm onSubmit={handleSubmit} noValidate>
                <SubModalFormGroup>
                    <SubModalLabel htmlFor="quote-nombre">Nombre / Notaría *</SubModalLabel>
                    <SubModalInput
                        id="quote-nombre"
                        type="text"
                        placeholder="Tu nombre completo o Notaría"
                        value={nombre}
                        onChange={(e) => {
                            setNombre(e.target.value);
                            if (error) setError("");
                        }}
                    />
                </SubModalFormGroup>

                <SubModalFormGroup>
                    <SubModalLabel htmlFor="quote-cantidad">
                        Cantidad * (Min: {minQty})
                    </SubModalLabel>
                    <SubModalInput
                        id="quote-cantidad"
                        type="number"
                        placeholder={minQty}
                        value={cantidad}
                        onChange={(e) => {
                            setCantidad(e.target.value);
                            const parsed = parseInt(e.target.value);
                            if (e.target.value !== "" && (isNaN(parsed) || parsed < minQty)) {
                                setError("No se puede realizar la cotización con la cantidad seleccionada");
                            } else {
                                setError("");
                            }
                        }}
                    />
                </SubModalFormGroup>

                {error && <SubModalError>{error}</SubModalError>}

                <SubModalSendButton
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <WhatsAppIcon size={18} />
                    Enviar Cotización
                </SubModalSendButton>

                <SubModalBackButton type="button" onClick={onBack}>
                    ← Volver a acabados
                </SubModalBackButton>
            </SubModalForm>
        </SubModalCard>
    );
}

function ModalInner({ selectedProduct, onClose }) {
    const [isPresent, safeToRemove] = usePresence();
    const [selectedFinishId, setSelectedFinishId] = useState(null);
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const [prevProductId, setPrevProductId] = useState(selectedProduct?.id);

    // Adjust state during render when the product changes (React 19 idiom).
    if (selectedProduct?.id !== prevProductId) {
        setPrevProductId(selectedProduct?.id);
        setSelectedFinishId(null);
        setShowQuoteForm(false);
    }

    const finishes = selectedProduct?.finishes || [];
    const selectedFinish =
        finishes.find((f) => f.id === selectedFinishId) || null;

    useEffect(() => {
        if (!isPresent && safeToRemove) {
            const timer = setTimeout(safeToRemove, 250);
            return () => clearTimeout(timer);
        }
    }, [isPresent, safeToRemove]);

    const heroImage =
        (selectedFinish && selectedFinish.image) ||
        selectedProduct?.image ||
        "/placeholder-image.jpg";

    const canQuote = finishes.length === 0 || selectedFinishId !== null;

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
                        transition: { duration: 0.2, ease: "easeIn" },
                    }}
                >
                    <LeftPanel>
                        <ProductName>{selectedProduct.name}</ProductName>
                        <AnimatePresence mode="wait">
                            <HeroImage
                                key={`hero-${selectedFinishId || "default"}`}
                                style={{ backgroundImage: `url(${heroImage})` }}
                                layoutId={isPresent ? `image-${selectedProduct.id}` : undefined}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>
                    </LeftPanel>

                    <RightPanel>
                        <SectionTitle>Acabados</SectionTitle>

                        {finishes.length > 0 ? (
                            <FinishesList>
                                {finishes.map((finish, idx) => {
                                    const isActive = finish.id === selectedFinishId;
                                    return (
                                        <FinishRow
                                            key={finish.id}
                                            type="button"
                                            $selected={isActive}
                                            onClick={() => setSelectedFinishId(finish.id)}
                                            whileTap={{ scale: 0.98 }}
                                            aria-pressed={isActive}
                                        >
                                            <FinishNumber $selected={isActive}>
                                                {idx + 1}
                                            </FinishNumber>
                                            <FinishName>{finish.name}</FinishName>
                                        </FinishRow>
                                    );
                                })}
                            </FinishesList>
                        ) : (
                            <EmptyState>
                                Este artículo no tiene acabados configurados.
                            </EmptyState>
                        )}

                        <QuoteButton
                            type="button"
                            onClick={() => setShowQuoteForm(true)}
                            disabled={!canQuote}
                            whileHover={canQuote ? { scale: 1.01 } : {}}
                            whileTap={canQuote ? { scale: 0.99 } : {}}
                        >
                            <WhatsAppIcon size={18} />
                            {finishes.length > 0 && !selectedFinishId
                                ? "Selecciona un acabado"
                                : "Cotizar por WhatsApp"}
                        </QuoteButton>
                    </RightPanel>

                    <AnimatePresence>
                        {showQuoteForm && (
                            <SubModalOverlay
                                key="quote-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setShowQuoteForm(false)}
                            >
                                <QuoteForm
                                    product={selectedProduct}
                                    finish={selectedFinish}
                                    onBack={() => setShowQuoteForm(false)}
                                />
                            </SubModalOverlay>
                        )}
                    </AnimatePresence>

                    <CloseButton onClick={onClose} aria-label="Cerrar modal">
                        &times;
                    </CloseButton>
                </ExpandedCard>
            </ExpandedCardWrapper>
        </ModalPortalWrapper>
    );
}

export default function ExpandedProductModal({ selectedProduct, onClose }) {
    const handleClose = () => {
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
