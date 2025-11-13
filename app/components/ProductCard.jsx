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
`;

export const MotionProductImage = styled(motion.div)`
    width: 100%;
    height: 150px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
`;

export const MotionProductName = styled(motion.h3)`
    font-size: 1.25rem;
    color: white;
`;

export const MotionProductDescription = styled(motion.p)`
    font-size: 0.9rem;
    color: #ccc;
`;
