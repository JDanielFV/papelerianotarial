"use client";

import styled from "styled-components";

const SkipLink = styled.a`
    position: fixed;
    top: -100%;
    left: 1rem;
    z-index: 100;
    padding: 0.75rem 1.5rem;
    background-color: var(--accent-color);
    color: var(--background-dark);
    font-weight: 600;
    font-size: 0.9rem;
    border-radius: 0 0 8px 8px;
    text-decoration: none;
    transition: top 0.2s ease;

    &:focus {
        top: 0;
    }
`;

export default function SkipLinkComponent() {
    return <SkipLink href="#main-content">Saltar al contenido principal</SkipLink>;
}
