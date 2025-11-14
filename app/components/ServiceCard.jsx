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
    justify-content: flex-start; /* Changed from flex-end to flex-start */
    align-items: flex-end;
    gap: 1rem;
    cursor: pointer;
    height: 200px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding-right: 2rem;
`;

export const MotionServiceImage = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: rgba(255, 255, 255, 0.1);
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.8));
    z-index: 1;
`;

export const MotionServiceName = styled(motion.h3)`
    font-size: 1.5rem;
    color: white;
    z-index: 2;
    position: relative;
    text-align: right;
`;

export const MotionServiceDescription = styled(motion.p)`
    font-size: 1rem;
    color: #ccc;
    z-index: 2;
    position: relative;
    text-align: right;
`;
