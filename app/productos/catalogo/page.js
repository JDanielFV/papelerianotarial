"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import productData from '../../data/products-data.json';
import { WhatsAppIcon } from "../../components/Icons";

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

const ProductCard = styled(motion.div)`
    position: relative;
    height: 300px; // Adjusted for mobile
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 1.5rem;
    text-align: left;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: #0a0a0a;

    @media (min-width: 768px) {
        height: 420px; // Desktop height
    }
    
    &:hover {
        transform: translateY(-5px);
        border-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5),
                    0 0 15px rgba(255, 255, 255, 0.1);
    }
`;

const ProductImage = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: 0;
    transition: transform 0.5s ease;
    background-color: #222;
    
    ${ProductCard}:hover & {
        transform: scale(1.05);
    }
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
    z-index: 1;
    transition: opacity 0.3s ease;
`;

const ProductName = styled.h3`
    font-size: 1rem;
    color: white;
    z-index: 2;
    margin-bottom: 0.5rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    
    @media (min-width: 1024px) {
        font-size: 1.5rem;
    }
`;

const ProductDescription = styled.p`
    font-size: 0.9rem;
    color: #ddd;
    z-index: 2;
    line-height: 1.4;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    
    @media (min-width: 1024px) {
        font-size: 0.95rem;
    }
`;

const SubCategoryTitle = styled.h2`
    font-size: 1.8rem;
    color: #eee;
    margin-top: 2rem;
    margin-bottom: 1rem;
`;

// --- Styles for Expanded View ---

const ExpandedViewContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
`;

const ExpandedCard = styled(motion.div)`
    width: 100%;
    max-width: 500px;
    height: 85vh;
    max-height: 800px;
    background-color: #0a0a0a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
`;

const ExpandedBackground = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2a2a2a; // Fallback color
    background-image: url('/placeholder-image.jpg'); // Default placeholder if no image
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
        background: linear-gradient(
            to bottom, 
            rgba(0,0,0,0) 0%, 
            rgba(0,0,0,0) 40%, 
            rgba(10,10,10,0.9) 60%, 
            rgba(10,10,10,1) 100%
        );
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

const CatchyDescription = styled.p`
    font-size: 1.1rem;
    font-style: italic;
    color: #e0e0e0;
    line-height: 1.5;
    margin-bottom: 0.5rem;
`;

const MinQuantity = styled.p`
    font-size: 0.9rem;
    color: #aaa;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &::before {
        content: '•';
        color: white;
    }
`;

const WhatsappButton = styled(motion.a)`
    margin-top: 1rem;
    background-color: white;
    color: black;
    border: none;
    border-radius: 50px;
    padding: 12px 30px;
    font-family: Raleway, sans-serif;
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
        transform: scale(1.02);
        box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
    }
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
                        <div key={subCategory.id}><SubCategoryTitle>{subCategory.name}</SubCategoryTitle>
                            <ProductGrid>
                                {subCategory.products.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        layoutId={`card-${product.id}`}
                                        onClick={() => handleCardClick(product.id)}
                                    >
                                        <ProductImage
                                            layoutId={`image-${product.id}`}
                                            style={{ backgroundImage: `url(${product.image || '/placeholder-image.jpg'})` }}
                                        />
                                        <Overlay />
                                        <ProductName>{product.name}</ProductName>
                                        <ProductDescription>{product.description}</ProductDescription>
                                    </ProductCard>
                                ))}
                            </ProductGrid>
                        </div>
                    ))}
                </CategorySection>
            ))}
            <AnimatePresence>
                {selectedProduct && (
                    <ExpandedViewContainer
                        onClick={() => setSelectedProduct(null)}
                        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                        animate={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                        exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    >
                        <ExpandedCard layoutId={`card-${selectedProduct.id}`} onClick={(e) => e.stopPropagation()}>

                            <ExpandedBackground
                                style={{ backgroundImage: `url(${selectedProduct.image || '/placeholder-image.jpg'})` }}
                                layoutId={`image-${selectedProduct.id}`}
                            />

                            <ExpandedContent>
                                <SubCategoryTitle style={{
                                    fontSize: '0.9rem',
                                    color: '#aaa',
                                    marginTop: 0,
                                    marginBottom: 0,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    {selectedProduct.subCategoryName}
                                </SubCategoryTitle>

                                <ProductName style={{ fontSize: '2rem', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                                    {selectedProduct.name}
                                </ProductName>

                                <CatchyDescription>
                                    {selectedProduct.catchyDescription}
                                </CatchyDescription>

                                <MinQuantity>
                                    Min. compra: {selectedProduct.minPurchaseQuantity}
                                </MinQuantity>

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
                    </ExpandedViewContainer>
                )}
            </AnimatePresence>
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
