"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const MotionServiceCard = styled(motion.div)`
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 1rem;
    cursor: pointer;
    height: 200px;
    border: 1px solid var(--card-border);
    padding-right: 2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        transform: translateY(-5px);
        border-color: var(--card-border-hover);
        box-shadow: var(--shadow);
    }
`;

export const MotionServiceImage = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-image: ${({ $bg }) => $bg ? `url(${$bg})` : 'none'};
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    transition: all 0.4s ease;
    
    ${MotionServiceCard}:hover & {
        transform: scale(1.05);
        opacity: 0.35;
    }
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.8));
    z-index: 1;
    transition: background 0.4s ease;
    
    ${MotionServiceCard}:hover & {
        background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.6));
    }
`;

export const MotionServiceName = styled(motion.h3)`
    font-size: 1.5rem;
    color: white;
    z-index: 2;
    position: relative;
    text-align: right;
    transition: all 0.3s ease;
    
    ${MotionServiceCard}:hover & {
        color: #ffffff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        transform: translateX(-5px);
    }
`;

export const MotionServiceDescription = styled(motion.p)`
    font-size: 1rem;
    color: #ccc;
    z-index: 2;
    position: relative;
    text-align: right;
    transition: all 0.3s ease;
    
    ${MotionServiceCard}:hover & {
        color: #fff;
        transform: translateX(-5px);
    }
`;
