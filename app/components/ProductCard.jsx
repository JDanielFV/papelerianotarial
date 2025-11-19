"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const MotionProductCard = styled(motion.div)`
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        transform: translateY(-8px) scale(1.02);
        background-color: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.4);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4),
                    0 0 20px rgba(255, 255, 255, 0.1);
    }
`;

export const MotionProductImage = styled(motion.div)`
    width: 100%;
    height: 150px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease;
    
    ${MotionProductCard}:hover & {
        background-color: rgba(255, 255, 255, 0.15);
    }
`;

export const MotionProductName = styled(motion.h3)`
    font-size: 1.2rem;
    color: white;
    transition: color 0.3s ease;
    
    ${MotionProductCard}:hover & {
        color: #ffffff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
`;

export const MotionProductDescription = styled(motion.p)`
    font-size: 0.9rem;
    color: #ccc;
    transition: color 0.3s ease;
    
    ${MotionProductCard}:hover & {
        color: #fff;
    }
`;
