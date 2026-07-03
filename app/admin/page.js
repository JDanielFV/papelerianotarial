"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { getProductsData, saveProductsData } from "./actions";

/* =========================================================================
 * Estilos
 * ========================================================================= */
const PageWrapper = styled(motion.div)`
    min-height: 100vh;
    padding: 120px 2% 5%;
    background-color: var(--background);
    color: var(--foreground);
    font-family: Raleway, serif;
`;

const Header = styled.header`
    max-width: 1400px;
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
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
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

const ResetButton = styled(motion.button)`
    background: transparent;
    color: var(--foreground);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 0.7rem 1.5rem;
    font-weight: bold;
    font-size: 0.95rem;
    cursor: pointer;
    font-family: inherit;
`;

const StatusBar = styled(motion.div)`
    max-width: 1400px;
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

const TableContainer = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    overflow: hidden;
`;

const ScrollWrapper = styled.div`
    overflow-x: auto;
    overflow-y: visible;
    max-height: 75vh;
    position: relative;
`;

const Table = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    font-size: 0.85rem;

    th,
    td {
        border-bottom: 1px solid var(--card-border);
        border-right: 1px solid var(--card-border);
        padding: 0.5rem 0.6rem;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
    }

    thead th {
        position: sticky;
        top: 0;
        z-index: 10;
        background: var(--card-background);
        font-weight: 600;
        color: var(--foreground);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    th:first-child,
    td:first-child {
        position: sticky;
        left: 0;
        z-index: 5;
        background: var(--card-background);
        text-align: left;
        min-width: 240px;
        max-width: 280px;
        white-space: normal;
        font-weight: 500;
    }

    thead th:first-child {
        z-index: 15;
    }

    tbody tr:hover td {
        background: rgba(212, 163, 23, 0.04);
    }
`;

const CategoryHeader = styled.tr`
    td {
        background: rgba(212, 163, 23, 0.08);
        font-weight: bold;
        text-align: left;
        color: var(--accent-color);
        font-size: 0.95rem;
        padding: 0.8rem 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
`;

const SubcategoryHeader = styled.tr`
    td {
        background: rgba(255, 255, 255, 0.02);
        font-weight: 600;
        text-align: left;
        font-size: 0.9rem;
        padding: 0.6rem 0.8rem;
        color: rgba(255, 255, 255, 0.7);
    }
`;

const Checkbox = styled.input`
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--accent-color);
`;

const MinInput = styled.input`
    display: inline-block;
    width: 70px;
    margin-left: 0.5rem;
    padding: 0.2rem 0.4rem;
    background: var(--input-background);
    border: 1px solid var(--card-border);
    border-radius: 4px;
    color: #d4a317;
    font-size: 0.78rem;
    font-weight: 500;
    font-family: inherit;
    text-align: center;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
    }

    /* Hide spinner arrows */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    -moz-appearance: textfield;
`;

const NewFinishWrapper = styled.div`
    display: flex;
    gap: 0.4rem;
    align-items: center;
`;

const NewFinishInput = styled.input`
    width: 200px;
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

    &::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }
`;

const AddFinishButton = styled(motion.button)`
    background: transparent;
    color: var(--accent-color);
    border: 1px solid var(--accent-color);
    border-radius: 8px;
    padding: 0.6rem 1.1rem;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const FinishHeader = styled.th`
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    min-width: 50px;
    max-width: 50px;
    height: 180px;
    padding: 0.4rem;
    font-weight: 500;
    font-size: 0.78rem;
`;

const Stats = styled.div`
    max-width: 1400px;
    margin: 1rem auto 0;
    padding: 0 1rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
`;

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
    const [newFinishName, setNewFinishName] = useState("");
    // Acabados recién agregados (todavía no confirmados para ningún producto).
    // Se renderizan como columna pero los checkboxes aparecen desmarcados.
    const [pendingFinishes, setPendingFinishes] = useState([]);

    // Cargar al montar
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

    /* ---- Universo de acabados (columnas) ---- */
    const allFinishes = useMemo(() => {
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
        // Sumar acabados pendientes (recién agregados, aún sin asignar)
        for (const f of pendingFinishes) {
            if (!map.has(f.name)) {
                map.set(f.name, f);
            }
        }
        return Array.from(map.values());
    }, [draftData, pendingFinishes]);

    /* ---- Detección de cambios ---- */
    const isDirty = useMemo(() => {
        if (!originalData || !draftData) return false;
        if (pendingFinishes.length > 0) return true;
        return JSON.stringify(originalData) !== JSON.stringify(draftData);
    }, [originalData, draftData, pendingFinishes]);

    const changeCount = useMemo(() => {
        if (!originalData || !draftData) return 0;
        let count = 0;
        for (const cat of draftData) {
            const origCat = originalData.find((c) => c.id === cat.id);
            if (!origCat) continue;
            for (const sub of cat.subcategories || []) {
                const origSub = origCat.subcategories?.find((s) => s.id === sub.id);
                if (!origSub) continue;
                for (const p of sub.products || []) {
                    const origProd = origSub.products?.find((op) => op.id === p.id);
                    if (!origProd) continue;
                    if (JSON.stringify(p.finishes) !== JSON.stringify(origProd.finishes)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }, [originalData, draftData]);

    /* ---- Helpers de mutación ---- */
    const isFinishActive = (product, finishName) => {
        return (product.finishes || []).some((f) => f.name === finishName);
    };

    const toggleFinish = (catId, subId, prodId, finish) => {
        const isPending = pendingFinishes.some((f) => f.name === finish.name);
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
                                const has = isFinishActive(p, finish.name);
                                let newFinishes;
                                if (has) {
                                    newFinishes = p.finishes.filter(
                                        (f) => f.name !== finish.name
                                    );
                                } else {
                                    // Reusar id del acabado si ya existe en otro producto
                                    // o si está en pendientes
                                    const existingId = findFinishId(finish.name);
                                    newFinishes = [
                                        ...(p.finishes || []),
                                        {
                                            id: existingId || `F-${prodId}-${Date.now()}`,
                                            name: finish.name,
                                            image: "/placeholder-image.jpg",
                                        },
                                    ];
                                }
                                return { ...p, finishes: newFinishes };
                            }),
                        };
                    }),
                };
            })
        );
        // Si era un acabado pendiente, al primer toggle lo confirmamos
        // (sigue existiendo como columna porque ahora está en draftData)
        if (isPending) {
            // No removemos de pendingFinishes porque al volver a renderizar
            // allFinishes lo encuentra en draftData y ya no es necesario.
            // Pero por seguridad y para no acumular, lo quitamos:
            setPendingFinishes((prev) => prev.filter((f) => f.name !== finish.name));
        }
        setStatus({ type: "info", message: "Cambio sin guardar (marca los demás y luego guarda todo junto)." });
    };

    const findFinishId = (finishName) => {
        for (const cat of draftData || []) {
            for (const sub of cat.subcategories || []) {
                for (const p of sub.products || []) {
                    const f = (p.finishes || []).find((f) => f.name === finishName);
                    if (f) return f.id;
                }
            }
        }
        // Buscar también en pendientes
        const pending = pendingFinishes.find((f) => f.name === finishName);
        if (pending) return pending.id;
        return null;
    };

    const handleAddFinish = () => {
        const name = newFinishName.trim();
        if (!name) {
            setStatus({ type: "error", message: "Escribe un nombre para el acabado." });
            return;
        }
        // Verificar que no exista ya (en productos O en pendientes)
        if (allFinishes.some((f) => f.name.toLowerCase() === name.toLowerCase())) {
            setStatus({
                type: "error",
                message: `El acabado "${name}" ya existe en el sistema.`,
            });
            return;
        }
        // Agregar a pendientes (no a productos). Aparece como columna
        // con todos los checkboxes desmarcados. Al marcar el primero,
        // se quita de pendientes y se asigna al producto.
        const newId = `F-NEW-${Date.now()}`;
        setPendingFinishes((prev) => [
            ...prev,
            { id: newId, name, image: "/placeholder-image.jpg" },
        ]);
        setNewFinishName("");
        setStatus({
            type: "info",
            message: `Acabado "${name}" agregado. Marca los productos que lo llevan y guarda.`,
        });
    };

    const updateMinPurchase = (catId, subId, prodId, newMin) => {
        const value = parseInt(newMin, 10);
        if (isNaN(value) || value < 0) return; // no permitir inválidos
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

    const handleSave = async () => {
        if (!isDirty && pendingFinishes.length === 0) return;
        setIsSaving(true);
        setStatus({ type: null, message: "" });
        try {
            const result = await saveProductsData(draftData);
            if (result.success) {
                setOriginalData(JSON.parse(JSON.stringify(draftData)));
                setPendingFinishes([]);
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
        setPendingFinishes([]);
        setNewFinishName("");
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
                        cat.subcategories.some(
                            (sub) => sub.products.length > 0
                        )
                );
        }
        return data;
    }, [draftData, categoryFilter, searchQuery]);

    /* ---- Render ---- */
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
                    <Subtitle>{status.message || "No se pudo cargar el catálogo."}</Subtitle>
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
                    Edita qué acabados tiene cada producto del catálogo. Los cambios se
                    guardan en <code>app/data/products-data.json</code>.
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
                <NewFinishWrapper>
                    <NewFinishInput
                        type="text"
                        placeholder="Nombre del nuevo acabado..."
                        value={newFinishName}
                        onChange={(e) => setNewFinishName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddFinish();
                        }}
                    />
                    <AddFinishButton
                        onClick={handleAddFinish}
                        disabled={!newFinishName.trim() || isSaving}
                        whileHover={
                            newFinishName.trim() && !isSaving ? { y: -2 } : undefined
                        }
                        whileTap={
                            newFinishName.trim() && !isSaving ? { y: 1 } : undefined
                        }
                    >
                        + Acabado
                    </AddFinishButton>
                </NewFinishWrapper>
                <ResetButton
                    onClick={handleReset}
                    disabled={!isDirty || isSaving}
                    whileHover={isDirty ? { y: -2 } : undefined}
                    whileTap={isDirty ? { y: 1 } : undefined}
                >
                    Descartar
                </ResetButton>
                <SaveButton
                    onClick={handleSave}
                    disabled={!isDirty || isSaving}
                    whileHover={isDirty ? { y: -2 } : undefined}
                    whileTap={isDirty ? { y: 1 } : undefined}
                >
                    {isSaving ? "Guardando..." : `Guardar ${changeCount > 0 ? `(${changeCount})` : ""}`}
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

            <TableContainer>
                <ScrollWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                {allFinishes.map((finish) => (
                                    <FinishHeader key={finish.name} title={finish.name}>
                                        {finish.name}
                                    </FinishHeader>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((cat) => (
                                <React.Fragment key={cat.id}>
                                    <CategoryHeader>
                                        <td colSpan={1 + allFinishes.length}>
                                            {cat.name}
                                        </td>
                                    </CategoryHeader>
                                    {(cat.subcategories || []).map((sub) =>
                                        (sub.products || []).length > 0 ? (
                                            <React.Fragment key={sub.id}>
                                                <SubcategoryHeader>
                                                    <td colSpan={1 + allFinishes.length}>
                                                        {sub.name}
                                                    </td>
                                                </SubcategoryHeader>
                                                {(sub.products || []).map((p) => (
                                                    <tr key={p.id}>
                                                        <td>
                                                            {p.name}
                                                            <MinInput
                                                                key={`${p.id}-${p.minPurchaseQuantity}`}
                                                                type="number"
                                                                min="0"
                                                                defaultValue={p.minPurchaseQuantity}
                                                                title="Mínimo de compra (pz)"
                                                                onBlur={(e) =>
                                                                    updateMinPurchase(
                                                                        cat.id,
                                                                        sub.id,
                                                                        p.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        e.target.blur();
                                                                    }
                                                                }}
                                                            />
                                                        </td>
                                                        {allFinishes.map((finish) => (
                                                            <td key={finish.name}>
                                                                <Checkbox
                                                                    type="checkbox"
                                                                    checked={isFinishActive(
                                                                        p,
                                                                        finish.name
                                                                    )}
                                                                    onChange={() =>
                                                                        toggleFinish(
                                                                            cat.id,
                                                                            sub.id,
                                                                            p.id,
                                                                            finish
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ) : null
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </ScrollWrapper>
            </TableContainer>

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
                productos · {allFinishes.length} acabados únicos en el sistema
            </Stats>
        </PageWrapper>
    );
}
