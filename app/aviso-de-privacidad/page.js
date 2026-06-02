"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import { CONTACT } from "../lib/contact";

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
    gap: 2rem;
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
`;

const UnorderedList = styled.ul`
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const ListItem = styled.li`
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-muted);
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

export default function PrivacyPolicyPage() {
    return (
        <PageContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ContentWrapper>
                <BackButton href="/">← Volver al Inicio</BackButton>
                <Title>Aviso de Privacidad</Title>
                <Subtitle>Última actualización: 1 de junio de 2026</Subtitle>

                <Paragraph>
                    En <strong>Papelería Notarial A&G</strong>, con domicilio en Izcalli Ecatepec, Estado de México, la seguridad y confidencialidad de sus datos personales es de suma importancia. De conformidad con la <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</em>, hacemos de su conocimiento este Aviso de Privacidad.
                </Paragraph>

                <SectionTitle>1. Datos Personales que Recopilamos</SectionTitle>
                <Paragraph>
                    Recopilamos únicamente los datos necesarios para brindar nuestros servicios de cotización, personalización y entrega de material notarial. Estos datos incluyen:
                </Paragraph>
                <UnorderedList>
                    <ListItem>Nombre completo del Notario o del contacto autorizado.</ListItem>
                    <ListItem>Número de Notaría y entidad federativa correspondiente.</ListItem>
                    <ListItem>Dirección de correo electrónico.</ListItem>
                    <ListItem>Teléfono de contacto (fijo y/o celular).</ListItem>
                    <ListItem>Dirección de envío y facturación fiscal.</ListItem>
                    <ListItem>Documentación de acreditación oficial (requerida exclusivamente para la venta de folios notariales y hologramas de seguridad).</ListItem>
                </UnorderedList>

                <SectionTitle>2. Finalidad del Tratamiento de Datos</SectionTitle>
                <Paragraph>
                    Los datos recopilados serán utilizados con las siguientes finalidades necesarias:
                </Paragraph>
                <UnorderedList>
                    <ListItem>Procesar sus solicitudes de información, cotizaciones y pedidos.</ListItem>
                    <ListItem>Verificar la personalidad legal y acreditación de Notario Público para los productos restringidos.</ListItem>
                    <ListItem>Realizar la entrega de materiales a su domicilio.</ListItem>
                    <ListItem>Emisión de facturas y comprobantes fiscales.</ListItem>
                    <ListItem>Brindar servicio al cliente y seguimiento postventa.</ListItem>
                </UnorderedList>

                <SectionTitle>3. Seguridad y Protección de Datos</SectionTitle>
                <Paragraph>
                    Hemos implementado medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.
                </Paragraph>

                <SectionTitle>4. Derechos ARCO</SectionTitle>
                <Paragraph>
                    Usted tiene derecho a conocer qué datos personales tenemos de usted (Acceso), solicitar su corrección (Rectificación), cancelarlos cuando considere que no se requieren para las finalidades señaladas (Cancelación) u oponerse al tratamiento de los mismos para fines específicos (Oposición). Para ejercer sus derechos ARCO, puede ponerse en contacto enviando un correo electrónico a: <strong>{CONTACT.email}</strong>.
                </Paragraph>

                <SectionTitle>5. Modificaciones al Aviso de Privacidad</SectionTitle>
                <Paragraph>
                    Cualquier cambio o modificación a este aviso de privacidad será publicado de forma inmediata a través de este sitio web.
                </Paragraph>
            </ContentWrapper>
        </PageContainer>
    );
}
