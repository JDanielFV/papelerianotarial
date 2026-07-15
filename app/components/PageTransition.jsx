'use client';

import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const LoaderOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    z-index: 100;
    pointer-events: none;
`;

const LoaderBar = styled(motion.div)`
    height: 100%;
    width: 100%;
    background: var(--accent-color);
    transform-origin: left;
`;

const PageTransition = ({ children }) => {
    const pathname = usePathname();

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
            <LoaderOverlay
                key={`loader-${pathname}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.1 } }}
                exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.2 } }}
            >
                <LoaderBar
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                    exit={{ scaleX: 0, transition: { duration: 0.15 } }}
                />
            </LoaderOverlay>
        </>
    );
};

export default PageTransition;
