"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useInView } from "framer-motion";

import {
    MotionServiceCard,
    MotionServiceImage,
    MotionServiceName,
    MotionServiceDescription,
    Overlay
} from "./ServiceCard";

// --- Styled Components (now with motion) ---
const MotionServicesContainer = styled(motion.section)`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5%;
    padding: 5%;
    margin-top: 12%;
    text-align: center;
    font-family: Outfit, serif;
    overflow-x: hidden;
    scroll-snap-align: start;
    background-color: #0a0a0a;
`;

const MotionServiceTitle = styled(motion.h1)`
    font-size: 2rem;
    color: white;
    z-index: 1;
    padding: 2rem 0 2rem 0;
`;

const MotionServiceGrid = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    z-index: 1;
`;

const SeeMoreButton = styled(motion.button)`
    background-color: #ffffff;
    color: #171717;
    border: none;
    border-radius: 50px;
    padding: 10px 25px;
    font-family: Outfit, sans-serif;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 10;
    align-self: flex-end; /* Changed from center to flex-end */
    margin-top: 2.5rem; /* Added margin-top for spacing */
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


function Services() {
    const [expandedServiceId, setExpandedServiceId] = useState(null);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 }); // Trigger once when 10% in view
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const serviceData = [
        { id: 1, name: "NFC", description: "Descripción del servicio 1." },
        { id: 2, name: "Web", description: "Descripción del servicio 2." },
        { id: 3, name: "Qrs", description: "Descripción del servicio 3." },
        { id: 4, name: "Redes Sociales", description: "Descripción del servicio 4." },
        { id: 5, name: "Vcards", description: "Descripción del servicio 5." },
    ];

    const handleCardClick = (serviceId) => {
        setExpandedServiceId(expandedServiceId === serviceId ? null : serviceId);
    };

    return (
        <MotionServicesContainer
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={mounted && inView ? "visible" : "hidden"}
        >
            <MotionServiceTitle
                variants={itemVariants}
            >
                Nuestros Servicios
            </MotionServiceTitle>
            
            <MotionServiceGrid
                variants={itemVariants}
            >
                {serviceData.map(service => (
                    <MotionServiceCard 
                        key={service.id} 
                        onClick={() => handleCardClick(service.id)}
                        animate={{ height: expandedServiceId === service.id ? '350px' : '200px' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        layout
                    >
                        <MotionServiceImage />
                        <Overlay />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                            <MotionServiceName
                                layout="position"
                            >
                                {service.name}
                            </MotionServiceName>
                            <MotionServiceDescription
                                layout="position"
                            >
                                {service.description}
                            </MotionServiceDescription>
                            <AnimatePresence>
                            {expandedServiceId === service.id && (
                                <SeeMoreButton
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.3 } }}
                                    exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                                >
                                    Cotiza aquí
                                </SeeMoreButton>
                            )}
                            </AnimatePresence>
                        </div>
                    </MotionServiceCard>
                ))}
            </MotionServiceGrid>
        </MotionServicesContainer>
    );
}

export default Services;