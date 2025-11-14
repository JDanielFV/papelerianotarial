"use client";

import React, {useState} from 'react';

import styled from 'styled-components';

import {motion, AnimatePresence} from 'framer-motion';

import {useSearchParams, useRouter} from 'next/navigation';

import productData from '../../data/products-data.json';


const CatalogContainer = styled.div`
    padding: 8rem 5% 5%;
    background-color: #0a0a0a;
    color: white;
    font-family: 'Outfit', sans-serif;
`;

const BackButton = styled(motion.button)`
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 0.8rem 1.5rem
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
`;

const ProductCard = styled(motion.div)`
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 0.5rem;
    height: 150px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: right;
    cursor: pointer;
`;

const ProductImage = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: rgba(255, 255, 255, 0.1);
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.8));
    z-index: 1;
`;

const ProductName = styled.h3`
    font-size: 1.5rem;
    color: white;
    z-index: 2;
`;

const ProductDescription = styled.p`
    font-size: 1rem;
    color: #ccc;
    z-index: 2;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.3);
`;

const ExpandedCard = styled(motion.div)`
    width: 80%;
    height: 80%;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    text-align: center;
`;

const ExpandedProductImage = styled.div`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    background: #383838;
    border: solid 1px #383838;
`;

const CatchyDescription = styled.p`
    font-size: 1.1rem;
    font-style: italic;
    color: #eee;
`;

const MinQuantity = styled.p`
    font-size: 0.9rem;
    color: #ddd;
`;

const WhatsappButton = styled(motion.a)`
    background-color: none;
    border: solid 1px ;
    color: white;
    border-radius: 50px;
    padding: 10px 25px;
    font-family: Outfit, sans-serif;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
`;

function CatalogPage() {
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
                    return {...product, subCategoryName: subCategory.name};
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
                                        <ProductImage layoutId={`image-${product.id}`}/>
                                        <Overlay/>
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
                        initial={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
                        animate={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                        exit={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
                    >
                        <ExpandedCard layoutId={`card-${selectedProduct.id}`} onClick={(e) => e.stopPropagation()}>
                            <ExpandedProductImage src={selectedProduct.image}/>
                            <ProductName>{selectedProduct.name}</ProductName>
                            <SubCategoryTitle style={{
                                fontSize: '1.2rem', color: '#ccc', marginTop: 0, marginBottom: 0
                            }}>{selectedProduct.subCategoryName}</SubCategoryTitle>
                            <CatchyDescription>"{selectedProduct.catchyDescription}"</CatchyDescription>
                            <MinQuantity>Cantidad mínima de compra: {selectedProduct.minPurchaseQuantity}</MinQuantity>
                            <WhatsappButton
                                href={`https://wa.me/5215512345678?text=${encodeURIComponent(selectedProduct.whatsappInquiry)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >Preguntar por WhatsApp
                            </WhatsappButton>
                        </ExpandedCard>
                    </ExpandedViewContainer>
                )}
            </AnimatePresence>
        </CatalogContainer>
    );
}

export default CatalogPage;
