"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const MotionProductCard = styled(motion.div)`
    position: relative;
    height: 300px;
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
    background-color: #0a0a0a; // Fallback

    @media (min-width: 768px) {
        height: 420px;
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
    }
`;

export const MotionProductImage = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: 0;
    transition: transform 0.5s ease;
    background-color: #222; // Fallback color

    ${MotionProductCard}:hover & {
        transform: scale(1.05);
    }
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
    z-index: 1;
    transition: opacity 0.3s ease;
`;

export const MotionProductName = styled(motion.h3)`
    font-size: 1rem;
    color: white;
    z-index: 2;
    margin-bottom: 0.5rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    min-height: 2.2rem;

    @media (min-width: 768px) {
        font-size: 1.5rem;
        min-height: 3.6rem;
    }
`;

export const MotionProductDescription = styled(motion.p)`
    font-size: 0.95rem;
    color: #ddd;
    z-index: 2;
    line-height: 1.4;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    min-height: 2.8rem;

    @media (min-width: 768px) {
        min-height: 3.2rem;
    }
`;
