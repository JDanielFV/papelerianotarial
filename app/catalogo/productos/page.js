"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamicImport from 'next/dynamic';
import productData from '../../data/products-data.json';

import {
    MotionProductCard,
    MotionProductImage,
    Overlay,
    MotionProductName,
    MotionProductDescription
} from '../../components/ProductCard';

const ExpandedProductModal = dynamicImport(
  () => import('../../components/ExpandedProductModal'),
  { ssr: false, loading: () => null }
);

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const CatalogContainer = styled.div`
    padding: 8rem 5% 5%;
    background-color: var(--background);
    color: var(--foreground);
    font-family: 'Raleway', sans-serif;
`;

const BackButton = styled(Link)`
    display: inline-block;
    background-color: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 15px;
    padding: 0.8rem 1.5rem;
    color: var(--foreground);
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 2rem;
    align-self: flex-start;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
        background-color: var(--card-background-hover);
        color: var(--foreground);
    }
`;

const CategorySection = styled.section`
    margin-bottom: 4rem;
`;

const CategoryTitle = styled.h1`
    font-size: 3rem;
    font-weight: lighter;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--card-border);
    padding-bottom: 1rem;

    @media (min-width: 1024px) {
        font-size: 4rem;
    }
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
    }
`;

const SubCategoryTitle = styled.h2`
    font-size: 1.8rem;
    color: var(--text-light);
    margin-top: 2rem;
    margin-bottom: 1rem;
`;

/**
 * Normaliza una categoría a una lista plana de productos con su contexto (subcategoría/categoría).
 * Soporta dos formas:
 *   - { products: [...] } (categoría plana)
 *   - { subcategories: [{ products: [...] }] } (categoría con subcategorías)
 */
function flattenCategoryProducts(category) {
    if (Array.isArray(category.products)) {
        return category.products.map(p => ({
            ...p,
            subCategoryName: null,
        }));
    }
    if (Array.isArray(category.subcategories)) {
        return category.subcategories.flatMap(sub =>
            sub.products.map(p => ({
                ...p,
                subCategoryName: sub.name,
            }))
        );
    }
    return [];
}

/**
 * Busca un producto en cualquier parte del catálogo.
 * Acepta IDs string (PROD-...) o number (los antiguos).
 */
function findProduct(productId) {
    // Comparación flexible: string vs number
    for (const category of productData) {
        // Forma plana
        if (Array.isArray(category.products)) {
            const product = category.products.find(
                p => String(p.id) === String(productId)
            );
            if (product) {
                return { ...product, subCategoryName: null };
            }
        }
        // Forma con subcategorías
        if (Array.isArray(category.subcategories)) {
            for (const subCategory of category.subcategories) {
                const product = subCategory.products.find(
                    p => String(p.id) === String(productId)
                );
                if (product) {
                    return { ...product, subCategoryName: subCategory.name };
                }
            }
        }
    }
    return null;
}

function CatalogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryId = searchParams.get('categoryId');
    const subcategoryId = searchParams.get('subcategoryId');
    const productId = searchParams.get('productId');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredCategories = categoryId
        ? productData.filter(category => String(category.id) === String(categoryId))
        : productData;

    const handleCardClick = (productId) => {
        const product = findProduct(productId);
        setSelectedProduct(product);
    };

    /**
     * Renderiza un producto como card clickeable.
     */
    const renderProductCard = (product, key) => (
        <MotionProductCard
            key={key}
            layoutId={`card-${product.id}`}
            onClick={() => handleCardClick(product.id)}
        >
            <MotionProductImage
                layoutId={`image-${product.id}`}
                style={{ backgroundImage: `url(${product.image || '/placeholder-image.jpg'})` }}
            />
            <Overlay />
            <MotionProductName>{product.name}</MotionProductName>
            <MotionProductDescription>{product.description}</MotionProductDescription>
        </MotionProductCard>
    );

    return (
        <CatalogContainer>
            <BackButton href="/catalogo">
                ← Volver al Catálogo
            </BackButton>
            {filteredCategories.map(category => {
                // Si la categoría tiene productos planos, render directo.
                if (Array.isArray(category.products)) {
                    let productsToShow = category.products;
                    // Soporte futuro: ?productId=N para scroll/highlight
                    if (productId) {
                        productsToShow = category.products.filter(
                            p => String(p.id) === String(productId)
                        );
                    }
                    return (
                        <CategorySection key={category.id}>
                            <CategoryTitle>{category.name}</CategoryTitle>
                            <ProductGrid>
                                {productsToShow.map(p => renderProductCard(p, `flat-${p.id}`))}
                            </ProductGrid>
                        </CategorySection>
                    );
                }

                // Forma con subcategorías (legacy).
                if (Array.isArray(category.subcategories)) {
                    return (
                        <CategorySection key={category.id}>
                            <CategoryTitle>{category.name}</CategoryTitle>
                            {category.subcategories
                                .filter(sub => !subcategoryId || String(sub.id) === String(subcategoryId))
                                .map(subCategory => (
                                <div key={subCategory.id}>
                                    <SubCategoryTitle>{subCategory.name}</SubCategoryTitle>
                                    <ProductGrid>
                                        {subCategory.products.map(product => (
                                            renderProductCard(product, `sub-${subCategory.id}-${product.id}`)
                                        ))}
                                    </ProductGrid>
                                </div>
                            ))}
                        </CategorySection>
                    );
                }

                return null;
            })}

            <ExpandedProductModal
                selectedProduct={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </CatalogContainer>
    );
}

function CatalogPage() {
    return (
        <React.Suspense fallback={<div>Cargando catálogo...</div>}>
            <CatalogContent />
        </React.Suspense>
    );
}

export default CatalogPage;
