"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import productData from '../../data/products-data.json';
import ExpandedProductModal from '../../components/ExpandedProductModal';

import {
    MotionProductCard,
    MotionProductImage,
    Overlay,
    MotionProductName,
    MotionProductDescription
} from '../../components/ProductCard';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const CatalogContainer = styled.div`
    padding: 8rem 5% 5%;
    background-color: #0a0a0a;
    color: white;
    font-family: 'Raleway', sans-serif;
`;

const BackButton = styled(motion.button)`
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 0.8rem 1.5rem;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 2rem;
    align-self: flex-start;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

const CategorySection = styled.section`
    margin-bottom: 4rem;
`;

const CategoryTitle = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 1rem;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    
    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
    }
`;

const SubCategoryTitle = styled.h2`
    font-size: 1.8rem;
    color: #eee;
    margin-top: 2rem;
    margin-bottom: 1rem;
`;

function CatalogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryId = searchParams.get('categoryId');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredCategories = categoryId
        ? productData.filter(category => category.id === parseInt(categoryId))
        : productData;

    const findProduct = (productId) => {
        for (const category of productData) {
            for (const subCategory of category.subcategories) {
                const product = subCategory.products.find(p => p.id === productId);
                if (product) {
                    return { ...product, subCategoryName: subCategory.name };
                }
            }
        }
        return null;
    };

    const handleCardClick = (productId) => {
        const product = findProduct(productId);
        setSelectedProduct(product);
    };

    return (
        <CatalogContainer>
            <BackButton onClick={() => router.back()}>
                ← Volver a Productos
            </BackButton>
            {filteredCategories.map(category => (
                <CategorySection key={category.id}>
                    <CategoryTitle>{category.name}</CategoryTitle>
                    {category.subcategories.map(subCategory => (
                        <div key={subCategory.id}>
                            <SubCategoryTitle>{subCategory.name}</SubCategoryTitle>
                            <ProductGrid>
                                {subCategory.products.map(product => (
                                    <MotionProductCard
                                        key={product.id}
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
                                ))}
                            </ProductGrid>
                        </div>
                    ))}
                </CategorySection>
            ))}
            
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
