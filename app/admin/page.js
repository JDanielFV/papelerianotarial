"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { getProductsData, saveProductsData } from "./actions";

/* =========================================================================
 * Estilos globales del panel
 * ========================================================================= */
const PageWrapper = styled(motion.div)`
    min-height: 100vh;
    padding: 120px 2% 5%;
    background-color: var(--background);
    color: var(--foreground);
    font-family: Raleway, serif;
`;

const Header = styled.header`
    max-width: 1200px;
    margin: 0 auto 2rem;
    padding: 0 1rem;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2.4rem;
    font-weight: lighter;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
        font-size: 3rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1rem;
`;

const Toolbar = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto 2rem;
    padding: 0 1rem;
`;

const SearchInput = styled.input`
    flex: 1 1 240px;
    max-width: 360px;
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 0.6rem 0.9rem;
    color: var(--foreground);
    font-size: 0.95rem;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
    }
`;

const FilterSelect = styled.select`
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 0.6rem 0.9rem;
    color: var(--foreground);
    font-size: 0.95rem;
    font-family: inherit;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
    }
`;

const ToolButton = styled(motion.button)`
    background: transparent;
    color: var(--foreground);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 0.6rem 1.1rem;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const SaveButton = styled(motion.button)`
    background: var(--accent-color);
    color: #050811;
    border: none;
    border-radius: 8px;
    padding: 0.7rem 1.5rem;
    font-weight: bold;
    font-size: 0.95rem;
    cursor: pointer;
    font-family: inherit;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const StatusBar = styled(motion.div)`
    max-width: 1200px;
    margin: 0 auto 1.5rem;
    padding: 0.8rem 1.2rem;
    border-radius: 8px;
    text-align: center;
    font-size: 0.95rem;

    &.success {
        background: rgba(40, 200, 100, 0.15);
        color: #4ade80;
        border: 1px solid rgba(40, 200, 100, 0.3);
    }
    &.error {
        background: rgba(220, 38, 38, 0.15);
        color: #f87171;
        border: 1px solid rgba(220, 38, 38, 0.3);
    }
    &.info {
        background: rgba(212, 163, 23, 0.1);
        color: #d4a317;
        border: 1px solid rgba(212, 163, 23, 0.3);
    }
`;

const Stats = styled.div`
    max-width: 1200px;
    margin: 2rem auto 0;
    padding: 0 1rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
`;

/* =========================================================================
 * Agrupación por categoría / subcategoría
 * ========================================================================= */
const CategorySection = styled.section`
    max-width: 1200px;
    margin: 0 auto 2.5rem;
    padding: 0 1rem;
`;

const CategoryHeader = styled.h2`
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--accent-color);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 0.5rem;
`;

const SubcategoryHeader = styled.h3`
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.55);
    margin: 1.2rem 0 0.7rem;
    padding-left: 0.3rem;
    border-left: 2px solid rgba(255, 255, 255, 0.1);
    padding: 0.4rem 0 0.4rem 0.8rem;
`;

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

/* =========================================================================
 * Tarjeta de producto
 * ========================================================================= */
const ProductCardContainer = styled(motion.article)`
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1.1rem 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    transition: border-color 0.2s;

    &:hover {
        border-color: rgba(212, 163, 23, 0.4);
    }

    &.dirty {
        border-color: var(--accent-color);
    }
`;

const ProductCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.6rem;
`;

const ProductName = styled.h4`
    margin: 0;
    font-size: 1.05rem;
    font-weight: 500;
    line-height: 1.3;
`;

const ProductDescription = styled.textarea`
    width: 100%;
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 6px;
    padding: 0.5rem 0.7rem;
    color: var(--foreground);
    font-size: 0.82rem;
    font-family: inherit;
    line-height: 1.4;
    resize: vertical;
    min-height: 60px;
    max-height: 200px;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.3);
        font-style: italic;
    }
`;

const MinControl = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.55);

    label {
        white-space: nowrap;
    }
`;

const MinInput = styled.input`
    width: 70px;
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    color: #d4a317;
    font-size: 0.78rem;
    font-weight: 500;
    font-family: inherit;
    text-align: center;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    -moz-appearance: textfield;
`;

const FinishesList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-height: 40px;
`;

const FinishChip = styled(motion.li)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.4rem 0.7rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--card-border);
    border-radius: 6px;
    font-size: 0.88rem;
`;

const RemoveChipButton = styled(motion.button)`
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    padding: 0 0.3rem;
    font-size: 1rem;
    line-height: 1;

    &:hover {
        color: #f87171;
    }
`;

const EmptyState = styled.div`
    color: rgba(255, 255, 255, 0.35);
    font-size: 0.85rem;
    font-style: italic;
    padding: 0.5rem 0;
`;

const AddFinishRow = styled.div`
    position: relative;
    display: flex;
    gap: 0.4rem;
    margin-top: 0.2rem;
`;

const AddFinishInput = styled.input`
    flex: 1;
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 6px;
    padding: 0.4rem 0.7rem;
    color: var(--foreground);
    font-size: 0.88rem;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
    }
`;

const AddFinishButton = styled(motion.button)`
    background: transparent;
    color: var(--accent-color);
    border: 1px solid var(--accent-color);
    border-radius: 6px;
    padding: 0.4rem 0.7rem;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const AutocompleteDropdown = styled(motion.ul)`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.3rem;
    background: var(--card-background);
    border: 1px solid var(--accent-color);
    border-radius: 8px;
    list-style: none;
    padding: 0.3rem 0;
    z-index: 50;
    max-height: 240px;
    overflow-y: auto;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
`;

const AutocompleteItem = styled.li`
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    font-size: 0.88rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background: rgba(212, 163, 23, 0.12);
    }
`;

const AutocompleteHint = styled.span`
    color: rgba(255, 255, 255, 0.45);
    font-size: 0.75rem;
    font-style: italic;
`;

const ProductCardActions = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
`;

const CopyButton = styled(motion.button)`
    background: transparent;
    color: var(--foreground);
    border: 1px solid var(--card-border);
    border-radius: 6px;
    padding: 0.4rem 0.7rem;
    font-size: 0.8rem;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;

    &:hover {
        border-color: var(--accent-color);
    }
`;

/* =========================================================================
 * Modal de copiar acabados
 * ========================================================================= */
const ModalOverlay = styled(motion.div)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
`;

const ModalCard = styled(motion.div)`
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 14px;
    width: 100%;
    max-width: 480px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 1.4rem;
    border-bottom: 1px solid var(--card-border);

    h2 {
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0;
    }
`;

const ModalCloseButton = styled.button`
    background: transparent;
    border: none;
    color: var(--foreground);
    font-size: 1.4rem;
    cursor: pointer;
    line-height: 1;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

const ModalBody = styled.div`
    padding: 1rem 1.4rem;
    overflow-y: auto;
    flex: 1;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.4rem;
    border-top: 1px solid var(--card-border);
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
`;

const ProductOption = styled(motion.button)`
    width: 100%;
    text-align: left;
    background: transparent;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 0.6rem 0.8rem;
    margin-bottom: 0.5rem;
    color: var(--foreground);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    &:hover {
        background: rgba(212, 163, 23, 0.08);
        border-color: var(--accent-color);
    }

    .ctx {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.5);
    }
`;

const SourceFinishList = styled.div`
    margin-top: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
`;

const SourceFinishBadge = styled.span`
    font-size: 0.7rem;
    background: rgba(212, 163, 23, 0.15);
    color: #d4a317;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
`;

const ApplyButton = styled(motion.button)`
    background: var(--accent-color);
    color: #050811;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1.2rem;
    font-weight: bold;
    font-size: 0.85rem;
    cursor: pointer;
    font-family: inherit;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const CancelButton = styled(motion.button)`
    background: transparent;
    color: var(--foreground);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 0.5rem 1.2rem;
    font-weight: 500;
    font-size: 0.85rem;
    cursor: pointer;
    font-family: inherit;
`;

/* =========================================================================
 * Modal de renombrar / eliminar (reusado de la versión anterior)
 * ========================================================================= */
const RenameModal = styled(ModalCard)`
    max-width: 560px;
`;

const FinishRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    &:last-child {
        border-bottom: none;
    }
`;

const FinishRowIndex = styled.span`
    min-width: 24px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.8rem;
    text-align: right;
`;

const DeleteCheckbox = styled.input`
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #f87171;
`;

const FinishRowInput = styled.input`
    flex: 1;
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 6px;
    padding: 0.4rem 0.7rem;
    color: var(--foreground);
    font-size: 0.9rem;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
    }
`;

/* =========================================================================
 * Tarjeta de producto — subcomponente
 * ========================================================================= */
function ProductCard({
    product,
    catId,
    subId,
    allFinishesUniverse,
    onUpdateMin,
    onUpdateDescription,
    onRemoveFinish,
    onAddFinish,
    onCopyFrom,
    dirty,
}) {
    const [addInput, setAddInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIdx, setHighlightedIdx] = useState(0);
    const inputRef = useRef(null);

    const finishes = product.finishes || [];

    // Autocomplete: filtrar acabados del universo que NO estén ya
    // en este producto, que coincidan con el input
    const suggestions = useMemo(() => {
        const q = addInput.trim().toLowerCase();
        if (!q) return [];
        return allFinishesUniverse
            .filter(
                (f) =>
                    f.name.toLowerCase().includes(q) &&
                    !finishes.some((pf) => pf.name === f.name)
            )
            .slice(0, 6);
    }, [addInput, allFinishesUniverse, finishes]);

    // Si no hay sugerencias pero el texto es válido, permite crear uno nuevo
    const isExactMatch = allFinishesUniverse.some(
        (f) => f.name.toLowerCase() === addInput.trim().toLowerCase()
    );
    const canCreateNew =
        addInput.trim().length > 0 && !isExactMatch && suggestions.length === 0;

    const handleAdd = (name) => {
        const finalName = (name ?? addInput).trim();
        if (!finalName) return;
        onAddFinish(catId, subId, product.id, finalName);
        setAddInput("");
        setShowSuggestions(false);
        setHighlightedIdx(0);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIdx >= 0 && suggestions[highlightedIdx]) {
                handleAdd(suggestions[highlightedIdx].name);
            } else if (canCreateNew || addInput.trim()) {
                handleAdd();
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIdx((i) => Math.min(i + 1, suggestions.length));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIdx((i) => Math.max(i - 1, 0));
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    return (
        <ProductCardContainer className={dirty ? "dirty" : ""}>
            <ProductCardHeader>
                <ProductName>{product.name}</ProductName>
                <MinControl>
                    <label>min:</label>
                    <MinInput
                        type="number"
                        min="0"
                        defaultValue={product.minPurchaseQuantity}
                        key={`${product.id}-${product.minPurchaseQuantity}`}
                        onBlur={(e) =>
                            onUpdateMin(catId, subId, product.id, e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.target.blur();
                        }}
                    />
                </MinControl>
            </ProductCardHeader>

            <ProductDescription
                placeholder="Descripción del producto..."
                defaultValue={product.description || ""}
                key={`${product.id}-desc`}
                onBlur={(e) => {
                    const next = e.target.value;
                    if (next !== (product.description || "")) {
                        onUpdateDescription(catId, subId, product.id, next);
                    }
                }}
            />

            {finishes.length > 0 ? (
                <FinishesList>
                    <AnimatePresence initial={false}>
                        {finishes.map((f) => (
                            <FinishChip
                                key={f.id}
                                layout
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 8 }}
                                transition={{ duration: 0.18 }}
                            >
                                <span>{f.name}</span>
                                <RemoveChipButton
                                    onClick={() =>
                                        onRemoveFinish(
                                            catId,
                                            subId,
                                            product.id,
                                            f.name
                                        )
                                    }
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={`Quitar ${f.name}`}
                                >
                                    ×
                                </RemoveChipButton>
                            </FinishChip>
                        ))}
                    </AnimatePresence>
                </FinishesList>
            ) : (
                <EmptyState>Sin acabados asignados</EmptyState>
            )}

            <AddFinishRow>
                <AddFinishInput
                    ref={inputRef}
                    type="text"
                    placeholder="Añadir acabado..."
                    value={addInput}
                    onChange={(e) => {
                        setAddInput(e.target.value);
                        setShowSuggestions(true);
                        setHighlightedIdx(0);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    onKeyDown={handleKeyDown}
                />
                <AddFinishButton
                    onClick={() => handleAdd()}
                    disabled={!addInput.trim()}
                    whileHover={addInput.trim() ? { y: -2 } : undefined}
                    whileTap={addInput.trim() ? { y: 1 } : undefined}
                >
                    + Añadir
                </AddFinishButton>
                <AnimatePresence>
                    {showSuggestions && (suggestions.length > 0 || canCreateNew) && (
                        <AutocompleteDropdown
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                        >
                            {suggestions.map((s, i) => (
                                <AutocompleteItem
                                    key={s.name}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleAdd(s.name);
                                    }}
                                    style={
                                        highlightedIdx === i
                                            ? {
                                                  background:
                                                      "rgba(212, 163, 23, 0.12)",
                                              }
                                            : undefined
                                    }
                                    onMouseEnter={() => setHighlightedIdx(i)}
                                >
                                    <span>{s.name}</span>
                                </AutocompleteItem>
                            ))}
                            {canCreateNew && (
                                <AutocompleteItem
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleAdd();
                                    }}
                                    style={
                                        highlightedIdx === suggestions.length
                                            ? {
                                                  background:
                                                      "rgba(212, 163, 23, 0.12)",
                                              }
                                            : undefined
                                    }
                                    onMouseEnter={() =>
                                        setHighlightedIdx(suggestions.length)
                                    }
                                >
                                    <span>
                                        Crear &ldquo;
                                        {addInput.trim()}&rdquo;
                                    </span>
                                    <AutocompleteHint>nuevo</AutocompleteHint>
                                </AutocompleteItem>
                            )}
                        </AutocompleteDropdown>
                    )}
                </AnimatePresence>
            </AddFinishRow>

            <ProductCardActions>
                <CopyButton
                    onClick={() => onCopyFrom({ catId, subId, product })}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                >
                    📋 Copiar acabados de...
                </CopyButton>
            </ProductCardActions>
        </ProductCardContainer>
    );
}

/* =========================================================================
 * Componente principal
 * ========================================================================= */
export default function AdminPage() {
    const [originalData, setOriginalData] = useState(null);
    const [draftData, setDraftData] = useState(null);
    const [status, setStatus] = useState({ type: null, message: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    // Modales
    const [copyModal, setCopyModal] = useState(null); // { catId, subId, product }
    const [renameModalOpen, setRenameModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await getProductsData();
                setOriginalData(data);
                setDraftData(data);
            } catch (err) {
                setStatus({ type: "error", message: err.message });
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    /* ---- Universo de acabados (para autocomplete) ---- */
    const allFinishesUniverse = useMemo(() => {
        if (!draftData) return [];
        const map = new Map();
        for (const cat of draftData) {
            for (const sub of cat.subcategories || []) {
                for (const p of sub.products || []) {
                    for (const f of p.finishes || []) {
                        if (!map.has(f.name)) {
                            map.set(f.name, { id: f.id, name: f.name });
                        }
                    }
                }
            }
        }
        return Array.from(map.values()).sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }, [draftData]);

    /* ---- Detección de cambios ---- */
    const isDirty = useMemo(() => {
        if (!originalData || !draftData) return false;
        return JSON.stringify(originalData) !== JSON.stringify(draftData);
    }, [originalData, draftData]);

    /* ---- Helpers ---- */
    const findFinishPrototype = (finishName) => {
        for (const cat of draftData || []) {
            for (const sub of cat.subcategories || []) {
                for (const p of sub.products || []) {
                    const f = (p.finishes || []).find((f) => f.name === finishName);
                    if (f) return f; // devuelve el primer {id, name, image} que coincida
                }
            }
        }
        return null;
    };

    const onAddFinish = (catId, subId, prodId, name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const existing = findFinishPrototype(trimmed);
        setDraftData((prev) =>
            prev.map((cat) => {
                if (cat.id !== catId) return cat;
                return {
                    ...cat,
                    subcategories: (cat.subcategories || []).map((sub) => {
                        if (sub.id !== subId) return sub;
                        return {
                            ...sub,
                            products: (sub.products || []).map((p) => {
                                if (p.id !== prodId) return p;
                                // Evitar duplicado
                                if ((p.finishes || []).some((f) => f.name === trimmed))
                                    return p;
                                const newFinish = existing
                                    ? { ...existing, id: existing.id }
                                    : {
                                          id: `F-NEW-${Date.now()}-${Math.floor(
                                              Math.random() * 1000
                                          )}`,
                                          name: trimmed,
                                          image: "/placeholder-image.jpg",
                                      };
                                return {
                                    ...p,
                                    finishes: [...(p.finishes || []), newFinish],
                                };
                            }),
                        };
                    }),
                };
            })
        );
    };

    const onRemoveFinish = (catId, subId, prodId, finishName) => {
        setDraftData((prev) =>
            prev.map((cat) => {
                if (cat.id !== catId) return cat;
                return {
                    ...cat,
                    subcategories: (cat.subcategories || []).map((sub) => {
                        if (sub.id !== subId) return sub;
                        return {
                            ...sub,
                            products: (sub.products || []).map((p) => {
                                if (p.id !== prodId) return p;
                                return {
                                    ...p,
                                    finishes: (p.finishes || []).filter(
                                        (f) => f.name !== finishName
                                    ),
                                };
                            }),
                        };
                    }),
                };
            })
        );
    };

    const onUpdateMin = (catId, subId, prodId, newMin) => {
        const value = parseInt(newMin, 10);
        if (isNaN(value) || value < 0) return;
        setDraftData((prev) =>
            prev.map((cat) => {
                if (cat.id !== catId) return cat;
                return {
                    ...cat,
                    subcategories: (cat.subcategories || []).map((sub) => {
                        if (sub.id !== subId) return sub;
                        return {
                            ...sub,
                            products: (sub.products || []).map((p) => {
                                if (p.id !== prodId) return p;
                                return { ...p, minPurchaseQuantity: value };
                            }),
                        };
                    }),
                };
            })
        );
    };

    const onUpdateDescription = (catId, subId, prodId, newDescription) => {
        setDraftData((prev) =>
            prev.map((cat) => {
                if (cat.id !== catId) return cat;
                return {
                    ...cat,
                    subcategories: (cat.subcategories || []).map((sub) => {
                        if (sub.id !== subId) return sub;
                        return {
                            ...sub,
                            products: (sub.products || []).map((p) => {
                                if (p.id !== prodId) return p;
                                return { ...p, description: newDescription };
                            }),
                        };
                    }),
                };
            })
        );
    };

    const onCopyFrom = ({ catId, subId, product }) => {
        setCopyModal({ catId, subId, product });
    };

    const applyCopy = (sourceProduct) => {
        if (!copyModal || !sourceProduct) return;
        const { catId, subId, product: targetProduct } = copyModal;
        // Construir los finishes a aplicar: nombre + (id, image) de source
        const newFinishes = (sourceProduct.finishes || []).map((sf) => ({
            id: sf.id,
            name: sf.name,
            image: sf.image || "/placeholder-image.jpg",
        }));
        setDraftData((prev) =>
            prev.map((cat) => {
                if (cat.id !== catId) return cat;
                return {
                    ...cat,
                    subcategories: (cat.subcategories || []).map((sub) => {
                        if (sub.id !== subId) return sub;
                        return {
                            ...sub,
                            products: (sub.products || []).map((p) => {
                                if (p.id !== targetProduct.id) return p;
                                return { ...p, finishes: newFinishes };
                            }),
                        };
                    }),
                };
            })
        );
        setStatus({
            type: "info",
            message: `Acabados copiados de "${sourceProduct.name}" a "${targetProduct.name}". Revisa y guarda.`,
        });
        setCopyModal(null);
    };

    const handleSave = async () => {
        if (!isDirty) return;
        setIsSaving(true);
        setStatus({ type: null, message: "" });
        try {
            const result = await saveProductsData(draftData);
            if (result.success) {
                setOriginalData(JSON.parse(JSON.stringify(draftData)));
                setStatus({ type: "success", message: result.message });
            } else {
                setStatus({ type: "error", message: result.error });
            }
        } catch (err) {
            setStatus({ type: "error", message: err.message });
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        if (!originalData) return;
        setDraftData(JSON.parse(JSON.stringify(originalData)));
        setStatus({ type: "info", message: "Cambios descartados." });
    };

    /* ---- Filtros ---- */
    const filteredData = useMemo(() => {
        if (!draftData) return [];
        let data = draftData;
        if (categoryFilter !== "all") {
            data = data.filter((c) => String(c.id) === categoryFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            data = data
                .map((cat) => ({
                    ...cat,
                    subcategories: (cat.subcategories || []).map((sub) => ({
                        ...sub,
                        products: (sub.products || []).filter(
                            (p) =>
                                p.name.toLowerCase().includes(q) ||
                                (p.finishes || []).some((f) =>
                                    f.name.toLowerCase().includes(q)
                                )
                        ),
                    })),
                }))
                .filter(
                    (cat) =>
                        cat.name.toLowerCase().includes(q) ||
                        cat.subcategories.some((sub) => sub.products.length > 0)
                );
        }
        return data;
    }, [draftData, categoryFilter, searchQuery]);

    /* ---- Catálogo de productos para el modal de copiar ---- */
    const allProductsList = useMemo(() => {
        if (!draftData) return [];
        const list = [];
        for (const cat of draftData) {
            for (const sub of cat.subcategories || []) {
                for (const p of sub.products || []) {
                    list.push({
                        catId: cat.id,
                        subId: sub.id,
                        product: p,
                        ctx: `${cat.name} › ${sub.name}`,
                    });
                }
            }
        }
        return list;
    }, [draftData]);

    if (isLoading) {
        return (
            <PageWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Header>
                    <Title>Cargando catálogo...</Title>
                </Header>
            </PageWrapper>
        );
    }
    if (!draftData) {
        return (
            <PageWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Header>
                    <Title>Error</Title>
                    <Subtitle>
                        {status.message || "No se pudo cargar el catálogo."}
                    </Subtitle>
                </Header>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <Header>
                <Title>Panel de Acabados</Title>
                <Subtitle>
                    Edita los acabados por producto. Escribe para ver
                    sugerencias, o copia los acabados de otro producto.
                </Subtitle>
            </Header>

            <Toolbar>
                <SearchInput
                    type="text"
                    placeholder="Buscar producto o acabado..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FilterSelect
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="all">Todas las categorías</option>
                    {draftData.map((cat) => (
                        <option key={cat.id} value={String(cat.id)}>
                            {cat.name}
                        </option>
                    ))}
                </FilterSelect>
                <ToolButton
                    onClick={() => setRenameModalOpen(true)}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                >
                    ✏️ Renombrar / eliminar
                </ToolButton>
                <ToolButton
                    onClick={handleReset}
                    disabled={!isDirty || isSaving}
                    whileHover={isDirty ? { y: -2 } : undefined}
                    whileTap={isDirty ? { y: 1 } : undefined}
                >
                    Descartar
                </ToolButton>
                <SaveButton
                    onClick={handleSave}
                    disabled={!isDirty || isSaving}
                    whileHover={isDirty ? { y: -2 } : undefined}
                    whileTap={isDirty ? { y: 1 } : undefined}
                >
                    {isSaving ? "Guardando..." : "Guardar cambios"}
                </SaveButton>
            </Toolbar>

            <AnimatePresence>
                {status.message && (
                    <StatusBar
                        key={status.message}
                        className={status.type}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        {status.message}
                    </StatusBar>
                )}
            </AnimatePresence>

            {filteredData.map((cat) => (
                <CategorySection key={cat.id}>
                    <CategoryHeader>{cat.name}</CategoryHeader>
                    {(cat.subcategories || []).map((sub) =>
                        (sub.products || []).length > 0 ? (
                            <div key={sub.id}>
                                <SubcategoryHeader>{sub.name}</SubcategoryHeader>
                                <ProductsGrid>
                                    {(sub.products || []).map((p) => {
                                        // Detectar si el producto tiene cambios
                                        // respecto a original
                                        const origP = originalData
                                            ?.find((c) => c.id === cat.id)
                                            ?.subcategories?.find((s) => s.id === sub.id)
                                            ?.products?.find((op) => op.id === p.id);
                                        const productDirty = origP
                                            ? JSON.stringify(origP.finishes) !==
                                              JSON.stringify(p.finishes) ||
                                              origP.minPurchaseQuantity !==
                                                  p.minPurchaseQuantity ||
                                              (origP.description || "") !==
                                                  (p.description || "")
                                            : false;
                                        return (
                                            <ProductCard
                                                key={p.id}
                                                product={p}
                                                catId={cat.id}
                                                subId={sub.id}
                                                allFinishesUniverse={
                                                    allFinishesUniverse
                                                }
                                                onUpdateMin={onUpdateMin}
                                                onUpdateDescription={
                                                    onUpdateDescription
                                                }
                                                onAddFinish={onAddFinish}
                                                onRemoveFinish={onRemoveFinish}
                                                onCopyFrom={onCopyFrom}
                                                dirty={productDirty}
                                            />
                                        );
                                    })}
                                </ProductsGrid>
                            </div>
                        ) : null
                    )}
                </CategorySection>
            ))}

            <Stats>
                {draftData.length} categorías ·{" "}
                {draftData.reduce(
                    (acc, c) =>
                        acc +
                        (c.subcategories || []).reduce(
                            (a, s) => a + (s.products || []).length,
                            0
                        ),
                    0
                )}{" "}
                productos · {allFinishesUniverse.length} acabados únicos
            </Stats>

            {/* Modal: copiar acabados */}
            <AnimatePresence>
                {copyModal && (
                    <ModalOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setCopyModal(null)}
                    >
                        <ModalCard
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalHeader>
                                <h2>
                                    Copiar acabados a &ldquo;
                                    {copyModal.product.name}&rdquo;
                                </h2>
                                <ModalCloseButton
                                    onClick={() => setCopyModal(null)}
                                    aria-label="Cerrar"
                                >
                                    ×
                                </ModalCloseButton>
                            </ModalHeader>
                            <ModalBody>
                                {allProductsList
                                    .filter(
                                        (entry) =>
                                            entry.product.id !==
                                            copyModal.product.id
                                    )
                                    .map((entry) => (
                                        <ProductOption
                                            key={entry.product.id}
                                            onClick={() => applyCopy(entry.product)}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ y: 1 }}
                                        >
                                            <strong>{entry.product.name}</strong>
                                            <span className="ctx">{entry.ctx}</span>
                                            <SourceFinishList>
                                                {(entry.product.finishes || []).map(
                                                    (f) => (
                                                        <SourceFinishBadge
                                                            key={f.id}
                                                        >
                                                            {f.name}
                                                        </SourceFinishBadge>
                                                    )
                                                )}
                                            </SourceFinishList>
                                        </ProductOption>
                                    ))}
                            </ModalBody>
                            <ModalFooter>
                                <span>
                                    Selecciona un producto. Sus acabados
                                    reemplazarán los actuales de &ldquo;
                                    {copyModal.product.name}&rdquo;.
                                </span>
                            </ModalFooter>
                        </ModalCard>
                    </ModalOverlay>
                )}
            </AnimatePresence>

            {/* Modal: renombrar / eliminar acabados */}
            <RenameModalWrapper
                open={renameModalOpen}
                onClose={() => setRenameModalOpen(false)}
                draftData={draftData}
                allFinishes={allFinishesUniverse}
                onApply={(changes) => {
                    setDraftData(changes);
                    setRenameModalOpen(false);
                    setStatus({
                        type: "info",
                        message: "Cambios aplicados. Revisa la tabla y guarda.",
                    });
                }}
                setStatus={setStatus}
            />
        </PageWrapper>
    );
}

/* =========================================================================
 * Modal de renombrar/eliminar — extraído para mantener AdminPage legible
 * ========================================================================= */
function RenameModalWrapper({
    open,
    onClose,
    draftData,
    allFinishes,
    onApply,
    setStatus,
}) {
    const [pendingRenames, setPendingRenames] = useState({});
    const [pendingDeletes, setPendingDeletes] = useState(new Set());

    const updatePendingRename = (oldName, newName) => {
        setPendingRenames((prev) => ({ ...prev, [oldName]: newName }));
    };
    const togglePendingDelete = (oldName) => {
        setPendingDeletes((prev) => {
            const next = new Set(prev);
            if (next.has(oldName)) next.delete(oldName);
            else next.add(oldName);
            return next;
        });
    };

    // Initialize pendingRenames when the modal opens. Done in render
    // (React 19 idiom) so we don't trigger setState-in-effect lint.
    if (open && Object.keys(pendingRenames).length === 0 && allFinishes.length > 0) {
        const init = {};
        for (const f of allFinishes) init[f.name] = f.name;
        setPendingRenames(init);
        setPendingDeletes(new Set());
    }

    const applyChanges = () => {
        const renames = Object.entries(pendingRenames).filter(
            ([o, n]) => o !== n && n.trim() !== ""
        );
        const deletes = Array.from(pendingDeletes);
        if (renames.length === 0 && deletes.length === 0) {
            setStatus({ type: "info", message: "No hubo cambios." });
            onClose();
            return;
        }
        if (renames.length > 0) {
            const newNames = renames.map(([, n]) => n.trim());
            const seen = new Set();
            for (const n of newNames) {
                if (!n) {
                    setStatus({
                        type: "error",
                        message: "No puedes dejar nombres vacíos.",
                    });
                    return;
                }
                if (seen.has(n.toLowerCase())) {
                    setStatus({
                        type: "error",
                        message: `Nombre duplicado: "${n}".`,
                    });
                    return;
                }
                seen.add(n.toLowerCase());
            }
        }
        for (const [oldName] of renames) {
            if (deletes.includes(oldName)) {
                setStatus({
                    type: "error",
                    message: `"${oldName}" está marcado para eliminar y renombrar.`,
                });
                return;
            }
        }
        if (deletes.length > 0) {
            const ok = window.confirm(
                `¿Eliminar ${deletes.length} acabado(s)?\n\n` +
                    deletes.map((n) => `  • ${n}`).join("\n") +
                    `\n\nSe quitarán de TODOS los productos.`
            );
            if (!ok) return;
        }
        const renameMap = new Map(renames);
        const deleteSet = new Set(deletes);
        const updated = draftData.map((cat) => ({
            ...cat,
            subcategories: (cat.subcategories || []).map((sub) => ({
                ...sub,
                products: (sub.products || []).map((p) => ({
                    ...p,
                    finishes: (p.finishes || [])
                        .filter((f) => !deleteSet.has(f.name))
                        .map((f) =>
                            renameMap.has(f.name)
                                ? { ...f, name: renameMap.get(f.name) }
                                : f
                        ),
                })),
            })),
        }));
        const summary = [];
        if (renames.length > 0) summary.push(`${renames.length} renombrado(s)`);
        if (deletes.length > 0) summary.push(`${deletes.length} eliminado(s)`);
        setStatus({
            type: "info",
            message: `${summary.join(", ")}. Revisa la tabla y guarda.`,
        });
        onApply(updated);
    };

    return (
        <AnimatePresence>
            {open && (
                <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                >
                    <RenameModal
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ModalHeader>
                            <h2>Renombrar / eliminar acabados</h2>
                            <ModalCloseButton
                                onClick={onClose}
                                aria-label="Cerrar"
                            >
                                ×
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody>
                            {allFinishes.map((finish, idx) => (
                                <FinishRow key={finish.name}>
                                    <DeleteCheckbox
                                        type="checkbox"
                                        checked={pendingDeletes.has(finish.name)}
                                        onChange={() =>
                                            togglePendingDelete(finish.name)
                                        }
                                        title="Marcar para eliminar"
                                    />
                                    <FinishRowIndex>{idx + 1}</FinishRowIndex>
                                    <FinishRowInput
                                        type="text"
                                        value={
                                            pendingRenames[finish.name] ??
                                            finish.name
                                        }
                                        onChange={(e) =>
                                            updatePendingRename(
                                                finish.name,
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter")
                                                e.target.blur();
                                        }}
                                    />
                                </FinishRow>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <span>
                                {pendingDeletes.size > 0 ? (
                                    <>
                                        <strong style={{ color: "#f87171" }}>
                                            {pendingDeletes.size} marcado(s).
                                        </strong>{" "}
                                        Se eliminarán de todos los productos.
                                    </>
                                ) : (
                                    <>Edita nombres o marca para eliminar.</>
                                )}
                            </span>
                            <div style={{ display: "flex", gap: "0.6rem" }}>
                                <CancelButton
                                    onClick={onClose}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 1 }}
                                >
                                    Cancelar
                                </CancelButton>
                                <ApplyButton
                                    onClick={applyChanges}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 1 }}
                                >
                                    {pendingDeletes.size > 0
                                        ? `Eliminar (${pendingDeletes.size})`
                                        : "Aplicar"}
                                </ApplyButton>
                            </div>
                        </ModalFooter>
                    </RenameModal>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
}
