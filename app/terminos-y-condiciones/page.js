"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

const PageContainer = styled(motion.div)`
    min-height: 100vh;
    padding: 120px 5% 5%;
    background-color: #0a0a0a;
    color: white;
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
    gap: 2rem;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1rem;
`;

const Subtitle = styled.p`
    color: #888888;
    font-size: 0.95rem;
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    color: white;
`;

const Paragraph = styled.p`
    font-size: 1rem;
    line-height: 1.8;
    color: #cccccc;
`;

const BackButton = styled(Link)`
    display: inline-block;
    align-self: flex-start;
    margin-bottom: 2rem;
    color: #888888;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.3s ease;

    &:hover {
        color: white;
    }
`;

const AlertBox = styled.div`
    border-left: 4px solid #ccaa00;
    background-color: rgba(204, 170, 0, 0.05);
    padding: 1rem;
    margin: 1.5rem 0;
    border-radius: 0 8px 8px 0;
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
                <Title>Términos y Condiciones</Title>
                <Subtitle>Última actualización: 1 de junio de 2026</Subtitle>

                <Paragraph>
                    Le rogamos lea detenidamente los presentes Términos y Condiciones antes de utilizar los servicios ofrecidos por <strong>Papelería Notarial A&G</strong> a través de este portal web. Al navegar o solicitar cotizaciones a través de este sitio, usted acepta sujetarse a las siguientes disposiciones.
                </Paragraph>

                <SectionTitle>1. Objeto</SectionTitle>
                <Paragraph>
                    Papelería Notarial A&G ofrece servicios de diseño, fabricación y comercialización de productos de papelería, seguridad e identidad corporativa especializada para notarios públicos en la República Mexicana.
                </Paragraph>

                <SectionTitle>2. Restricción de Venta y Validación de Seguridad</SectionTitle>
                <AlertBox>
                    <Paragraph style={{ margin: 0, fontWeight: "600", color: "#e0d000" }}>
                        IMPORTANTE: VENTA EXCLUSIVA A NOTARIOS PÚBLICOS
                    </Paragraph>
                    <Paragraph style={{ margin: "0.5rem 0 0 0", fontSize: "0.95rem" }}>
                        Debido a la naturaleza legal de artículos como folios notariales oficiales, hologramas de seguridad y sellos oficiales, la venta de estos productos está estrictamente limitada a Notarios Públicos autorizados y en funciones. Nos reservamos el derecho de solicitar la acreditación de la patente y verificación oficial de identidad previa al procesamiento o entrega de cualquier orden.
                    </Paragraph>
                </AlertBox>

                <SectionTitle>3. Proceso de Cotización y Pedido</SectionTitle>
                <Paragraph>
                    La presentación de productos en el catálogo de este portal constituye una invitación a cotizar y no una oferta de venta vinculante. Toda orden formal se procesará mediante contacto directo (WhatsApp o correo electrónico) y estará sujeta a confirmación de precios, stock, tiempos de producción personalizada y acreditación notarial.
                </Paragraph>

                <SectionTitle>4. Mínimos de Compra</SectionTitle>
                <Paragraph>
                    Ciertos productos del catálogo especifican cantidades mínimas de compra indispensables para su fabricación. Estas condiciones se detallan individualmente en la ficha de cada producto y serán ratificadas al momento de su cotización.
                </Paragraph>

                <SectionTitle>5. Envíos y Tiempos de Entrega</SectionTitle>
                <Paragraph>
                    Realizamos envíos a toda la República Mexicana. Los tiempos de envío e impresión varían según la complejidad del pedido y la ubicación de la Notaría. Papelería Notarial A&G no se hace responsable por retrasos atribuibles de forma exclusiva a las empresas de paquetería de terceros.
                </Paragraph>

                <SectionTitle>6. Modificaciones a los Términos</SectionTitle>
                <Paragraph>
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuo del sitio posterior a cualquier cambio constituirá su aceptación del mismo.
                </Paragraph>
            </ContentWrapper>
        </PageContainer>
    );
}
