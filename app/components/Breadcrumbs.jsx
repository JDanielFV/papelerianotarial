"use client";

import styled from "styled-components";
import Link from "next/link";

const BreadcrumbNav = styled.nav`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    flex-wrap: wrap;
`;

const BreadcrumbLink = styled(Link)`
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
        color: var(--accent-color);
    }
`;

const BreadcrumbSeparator = styled.span`
    color: rgba(255, 255, 255, 0.2);
    user-select: none;
`;

const BreadcrumbCurrent = styled.span`
    color: var(--foreground);
    font-weight: 500;
`;

export default function Breadcrumbs({ items = [] }) {
    if (items.length === 0) return null;

    return (
        <BreadcrumbNav aria-label="Breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <span key={index} style={{ display: "contents" }}>
                        {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
                        {isLast ? (
                            <BreadcrumbCurrent aria-current="page">
                                {item.label}
                            </BreadcrumbCurrent>
                        ) : (
                            <BreadcrumbLink href={item.href}>
                                {item.label}
                            </BreadcrumbLink>
                        )}
                    </span>
                );
            })}
        </BreadcrumbNav>
    );
}
