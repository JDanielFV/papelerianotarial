"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import termsData from "../data/terms-data.json";

const PageContainer = styled(motion.div)`
    min-height: 100vh;
    padding: 120px 5% 5%;
    background-color: var(--background);
    color: var(--foreground);
    font-family: Raleway, serif;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentWrapper = styled(motion.div)`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--card-border);
    padding-bottom: 1rem;
`;

const Subtitle = styled.p`
    color: var(--text-muted);
    font-size: 0.95rem;
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    color: var(--text-light);
`;

const Paragraph = styled.p`
    font-size: 1rem;
    line-height: 1.8;
    color: var(--text-muted);
    white-space: pre-wrap;
`;

const BackButton = styled(Link)`
    display: inline-block;
    align-self: flex-start;
    margin-bottom: 2rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.3s ease;

    &:hover {
        color: var(--foreground);
    }
`;

export default function TermsAndConditionsPage() {
    return (
        <PageContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ContentWrapper>
                <BackButton href="/">← Volver al Inicio</BackButton>
                <Title>{termsData.title}</Title>
                <Subtitle>Última actualización: {termsData.lastUpdated}</Subtitle>

                <Paragraph dangerouslySetInnerHTML={{ __html: termsData.introduction }} />

                {termsData.sections.map((section, idx) => (
                    <React.Fragment key={idx}>
                        <SectionTitle>{section.title}</SectionTitle>
                        {section.content && section.content.map((p, pIdx) => (
                            <Paragraph key={pIdx} dangerouslySetInnerHTML={{ __html: p }} />
                        ))}
                    </React.Fragment>
                ))}
            </ContentWrapper>
        </PageContainer>
    );
}
