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
    border-top: 1px solid var(--card-border);
    overflow-y: auto;
    gap: 1.5rem;

    @media (min-width: 768px) {
        width: 50%;
        height: 100%;
        border-top: none;
        border-left: 1px solid var(--card-border);
        padding: 2.5rem 3rem;
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

const RightPanelHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

const SectionTitle = styled.h4`
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: var(--text-muted);
    font-weight: 600;
    margin: 0 0 0.75rem 0;
`;

const FinishesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;

    @media (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const FinishChip = styled(motion.button)`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.55rem 0.8rem;
    background: ${({ $selected }) =>
        $selected
            ? "rgba(212, 163, 23, 0.12)"
            : "rgba(255, 255, 255, 0.04)"};
    border: 1px solid
        ${({ $selected }) =>
            $selected ? "var(--accent-color)" : "var(--card-border)"};
    border-radius: 12px;
    color: var(--foreground);
    font-size: 0.85rem;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;

    &:hover {
        border-color: var(--accent-color);
        background: rgba(212, 163, 23, 0.08);
    }

    &:focus-visible {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(212, 163, 23, 0.2);
    }
`;

const FinishThumb = styled.span`
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background-size: cover;
    background-position: center;
    background-color: #2a2a2a;
    border: 1px solid var(--card-border);
`;

const FinishName = styled.span`
    flex: 1;
    line-height: 1.2;
`;

const SelectedFinishBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(212, 163, 23, 0.1);
    border: 1px solid rgba(212, 163, 23, 0.3);
    color: var(--accent-color);
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 0.25rem 0.6rem;
    border-radius: 50px;
    margin-top: 0.2rem;
    align-self: flex-start;
`;

const QuoteButton = styled(motion.button)`
    margin-top: auto;
    background-color: var(--accent-color);
    color: #050811;
    border: none;
    border-radius: 12px;
    height: 48px;
    font-weight: bold;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    transition: all 0.25s ease;
    width: 100%;
    font-family: inherit;

    &:hover:not(:disabled) {
        background-color: #e6b422;
        transform: translateY(-1px);
        box-shadow: 0 8px 16px rgba(212, 163, 23, 0.25);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

// --- Sub-modal (quote form) ---
const SubModalOverlay = styled(motion.div)`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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

        const finishLine = finish
            ? `• Acabado: ${finish.name}\n`
            : "";

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
    // Avoids the cascading-render anti-pattern flagged by react-hooks/set-state-in-effect.
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

    // Image shown in the LeftPanel: finish image if selected, else product image
    const heroImage =
        (selectedFinish && selectedFinish.image) ||
        selectedProduct?.image ||
        "/placeholder-image.jpg";

    const isLegalRestricted =
        selectedProduct &&
        (selectedProduct.name.toLowerCase().includes("folio") ||
            selectedProduct.name.toLowerCase().includes("holograma") ||
            selectedProduct.name.toLowerCase().includes("sello"));

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
                        <AnimatePresence mode="wait">
                            <ExpandedBackground
                                key={`bg-${selectedFinishId || "default"}`}
                                style={{ backgroundImage: `url(${heroImage})` }}
                                layoutId={isPresent ? `image-${selectedProduct.id}` : undefined}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>

                        <ExpandedContent>
                            <SubCategoryText>
                                {selectedProduct.subCategoryName}
                            </SubCategoryText>

                            <MotionProductName
                                style={{
                                    fontSize: "1.8rem",
                                    marginBottom: "0.3rem",
                                    lineHeight: 1.1,
                                    color: "var(--foreground)",
                                }}
                            >
                                {selectedProduct.name}
                            </MotionProductName>

                            <CatchyDescription>
                                {selectedProduct.catchyDescription}
                            </CatchyDescription>

                            <MinQuantity>
                                Min. compra: {selectedProduct.minPurchaseQuantity}
                            </MinQuantity>

                            {isLegalRestricted && (
                                <LegalDisclaimer>
                                    Venta exclusiva a Notarios Públicos. Se requiere acreditación.
                                </LegalDisclaimer>
                            )}
                        </ExpandedContent>
                    </LeftPanel>

                    <RightPanel>
                        <RightPanelHeader>
                            <SectionTitle>Acabados disponibles</SectionTitle>
                            {selectedFinish && (
                                <SelectedFinishBadge>
                                    Seleccionado: {selectedFinish.name}
                                </SelectedFinishBadge>
                            )}
                        </RightPanelHeader>

                        {finishes.length > 0 ? (
                            <FinishesGrid>
                                {finishes.map((finish) => {
                                    const isActive = finish.id === selectedFinishId;
                                    return (
                                        <FinishChip
                                            key={finish.id}
                                            type="button"
                                            $selected={isActive}
                                            onClick={() => setSelectedFinishId(finish.id)}
                                            whileTap={{ scale: 0.97 }}
                                            aria-pressed={isActive}
                                        >
                                            <FinishThumb
                                                style={{
                                                    backgroundImage: `url(${finish.image || "/placeholder-image.jpg"})`,
                                                }}
                                            />
                                            <FinishName>{finish.name}</FinishName>
                                        </FinishChip>
                                    );
                                })}
                            </FinishesGrid>
                        ) : (
                            <SubModalSubtitle style={{ marginTop: "-0.5rem" }}>
                                Este artículo no tiene acabados configurados.
                            </SubModalSubtitle>
                        )}

                        <QuoteButton
                            type="button"
                            onClick={() => setShowQuoteForm(true)}
                            disabled={finishes.length > 0 && !selectedFinishId}
                            whileHover={finishes.length === 0 || selectedFinishId ? { scale: 1.01 } : {}}
                            whileTap={finishes.length === 0 || selectedFinishId ? { scale: 0.99 } : {}}
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
