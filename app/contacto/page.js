"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { WhatsAppIcon, PhoneIcon, MailIcon, FacebookIcon, InstagramIcon } from "../components/Icons";
import { CONTACT, getWhatsAppUrl, getPhoneHref, getEmailHref, getSocialUrl } from "../lib/contact";
import { submitContact } from "../actions/submitContact";

// Contact form schema (robust validation)
const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Ingresa un email válido"),
  telefono: z.string().optional(),
  tipo: z.enum(["Productos", "Servicios", "Cotización general", "Otro"]),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

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

const Header = styled(motion.div)`
    text-align: center;
    margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    font-weight: lighter;
    margin-bottom: 1rem;

    @media (min-width: 1024px) {
        font-size: 4rem;
    }
`;

const SubTitle = styled(motion.p)`
    font-size: 1.2rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
`;

const ContentWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    width: 100%;
    max-width: 1200px;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2.5rem;
    }
`;

const InfoColumn = styled(motion.div)`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1.25rem;
    border-left: 2px solid var(--card-border);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        border-left-color: var(--accent-color);
        padding-left: 1.5rem;
    }
`;

const InfoLabel = styled.h3`
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--text-light);
`;

const InfoText = styled.p`
    font-size: 1.05rem;
    color: var(--text-muted);
    line-height: 1.6;
`;

const ContactLink = styled.a`
  color: var(--foreground);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
  padding-bottom: 1px;
  
  &:hover {
    color: var(--accent-color);
    border-bottom-color: var(--accent-color);
  }
`;

// Unified contact actions (quick channels + socials) placed under Horario
const InfoActions = styled.div`
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--card-border);
`;

const InfoActionsLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

const InfoActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CompactIcon = styled(motion.a)`
  width: 42px;
  height: 42px;
  min-width: 42px;
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-background);
  border: 1px solid var(--card-border);
  border-radius: 999px;
  color: var(--foreground);
  font-size: 1.05rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;

  &:hover {
    background: rgba(212, 163, 23, 0.05);
    border-color: var(--accent-color);
    color: var(--accent-color);
    transform: translateY(-1px) scale(1.06);
  }
`;

const ContactColumn = styled(motion.div)`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
    align-items: center;

    @media (max-width: 767px) {
      order: -1; /* Form appears higher on mobile, before info */
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 500px;
`;

// Primary form container - elevated for focus per conversion-optimized + trust patterns
const FormWrapper = styled.div`
  background: var(--card-background);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 1.75rem 1.5rem;
  width: 100%;
  box-shadow: var(--shadow);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 768px) {
    padding: 2rem 1.75rem;
  }

  &:hover {
      border-color: rgba(212, 163, 23, 0.2);
      box-shadow: 0 30px 70px rgba(212, 163, 23, 0.05), var(--shadow);
  }
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--text-light);
    margin-bottom: 1rem;
`;

const ContactButton = styled(motion.a)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1.2rem 2rem;
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 15px;
    color: var(--foreground);
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &:hover {
        background: rgba(212, 163, 23, 0.03);
        border-color: rgba(212, 163, 23, 0.4);
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(212, 163, 23, 0.15);
    }
`;


// Form styles (elegant, matching site design system)
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  width: 100%;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.4rem;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  background: var(--input-background);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  height: 52px;
  padding: 0 1.1rem;
  color: var(--foreground);
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(212, 163, 23, 0.25);
  }

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 4px rgba(212, 163, 23, 0.15);
    background: rgba(255, 255, 255, 0.04);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    right: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid var(--accent-color);
    pointer-events: none;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Select = styled.select`
  background: var(--input-background);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  height: 52px;
  padding: 0 1.1rem;
  color: var(--foreground);
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(212, 163, 23, 0.25);
  }

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 4px rgba(212, 163, 23, 0.15);
    background: rgba(255, 255, 255, 0.04);
  }
`;

const Textarea = styled.textarea`
  background: var(--input-background);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1rem 1.1rem;
  color: var(--foreground);
  font-family: inherit;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  line-height: 1.5;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(212, 163, 23, 0.25);
  }

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 4px rgba(212, 163, 23, 0.15);
    background: rgba(255, 255, 255, 0.04);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const ErrorText = styled.span`
  color: #e57373;
  font-size: 0.75rem;
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: var(--background-dark);
  border: none;
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover:not(:disabled) {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(212, 163, 23, 0.35);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessBox = styled(motion.div)`
  background: rgba(212, 163, 23, 0.08);
  border: 1px solid rgba(212, 163, 23, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      tipo: "Cotización general",
    },
  });

  const onSubmit = async (data) => {
    // 1. Build rich message for WhatsApp / email (primary fast path)
    const fullMessage = `Hola, soy ${data.nombre}.\n` +
      `Email: ${data.email}${data.telefono ? `\nTel: ${data.telefono}` : ''}\n` +
      `Interés: ${data.tipo}\n\n` +
      `${data.mensaje}`;

    const waUrl = getWhatsAppUrl(fullMessage);
    
    // Open WhatsApp URL synchronously to prevent browser popup blockers
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // 2. Log / future email via Server Action in parallel (non-blocking for user popup)
    try {
      submitContact(data).catch((e) => {
        console.error('Server action failed (non-critical):', e);
      });
    } catch (e) {
      console.error(e);
    }

    const emailSubject = `Cotización - ${data.tipo} - ${data.nombre}`;
    const emailBody = fullMessage;

    setSubmittedData({
      ...data,
      waUrl,
      emailHref: getEmailHref(emailSubject, emailBody),
    });
    setIsSuccess(true);

    setTimeout(() => {
      reset();
    }, 800);
  };

  const handleNewMessage = () => {
    setIsSuccess(false);
    setSubmittedData(null);
  };

  return (
    <PageContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header variants={itemVariants}>
        <Title>Contáctanos</Title>
      </Header>

      <ContentWrapper variants={containerVariants}>
        <InfoColumn variants={itemVariants}>
          <InfoItem>
            <InfoLabel>Ubicación</InfoLabel>
            <InfoText>
              {CONTACT.address.city}.<br />
              {CONTACT.address.note}
            </InfoText>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Contacto Directo</InfoLabel>
            <InfoText>
              Teléfono: <ContactLink href={getPhoneHref()}>{CONTACT.phone}</ContactLink><br />
              Email: <ContactLink href={getEmailHref()}>{CONTACT.email}</ContactLink>
            </InfoText>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Horario de Atención</InfoLabel>
            <InfoText>
              {CONTACT.hours.weekday}<br />
              {CONTACT.hours.saturday}
            </InfoText>
          </InfoItem>

          {/* Unified quick channels + socials, placed directly under Horario per request */}
          <InfoActions>
            <InfoActionsLabel>Contacto rápido</InfoActionsLabel>
            <InfoActionsRow>
              <CompactIcon
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Contactar por WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </CompactIcon>

              <CompactIcon
                href={getPhoneHref()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Llamar por teléfono"
              >
                <PhoneIcon size={18} />
              </CompactIcon>

              <CompactIcon
                href={getEmailHref()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Enviar correo electrónico"
              >
                <MailIcon size={18} />
              </CompactIcon>

              <CompactIcon
                href={getSocialUrl('facebook')}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </CompactIcon>

              <CompactIcon
                href={getSocialUrl('instagram')}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </CompactIcon>
            </InfoActionsRow>
          </InfoActions>
        </InfoColumn>

        <ContactColumn variants={itemVariants}>
          <ContentContainer>
            {/* Form is primary and prominent (form-focused per UX guidelines) */}
            <FormWrapper>
              <SectionTitle style={{ marginBottom: '0.5rem' }}>Envíanos un mensaje</SectionTitle>
              <div style={{ 
                fontSize: '0.78rem', 
                color: 'var(--text-muted)', 
                marginBottom: '1.1rem',
                lineHeight: 1.4 
              }}>
                Respuesta prioritaria para Notarías • Consulta sin compromiso
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <FormRow>
                    <FormField>
                      <Label htmlFor="nombre">Nombre *</Label>
                      <Input
                        id="nombre"
                        type="text"
                        placeholder="Tu nombre completo"
                        {...register("nombre")}
                        aria-invalid={!!errors.nombre}
                      />
                      {errors.nombre && <ErrorText>{errors.nombre.message}</ErrorText>}
                    </FormField>
                    <FormField>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@correo.com"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                    </FormField>
                  </FormRow>

                  <FormRow>
                    <FormField>
                      <Label htmlFor="telefono">Teléfono (opcional)</Label>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="+52 55 1234 5678"
                        {...register("telefono")}
                      />
                    </FormField>
                    <FormField>
                      <Label htmlFor="tipo">Tipo de solicitud *</Label>
                      <SelectWrapper>
                        <Select id="tipo" {...register("tipo")}>
                          <option value="Cotización general">Cotización general</option>
                          <option value="Productos">Productos / Catálogo</option>
                          <option value="Servicios">Servicios (NFC, Web, etc.)</option>
                          <option value="Otro">Otro</option>
                        </Select>
                      </SelectWrapper>
                    </FormField>
                  </FormRow>

                  <FormField>
                    <Label htmlFor="mensaje">Mensaje *</Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Cuéntanos qué necesitas: cantidad aproximada, productos específicos, fecha de entrega, etc."
                      {...register("mensaje")}
                      aria-invalid={!!errors.mensaje}
                    />
                    {errors.mensaje && <ErrorText>{errors.mensaje.message}</ErrorText>}
                  </FormField>

                  <SubmitButton
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    <WhatsAppIcon size={22} />
                    {isSubmitting ? "Enviando..." : "Enviar por WhatsApp"}
                  </SubmitButton>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.25rem' }}>
                    Al enviar se abrirá WhatsApp con tu mensaje prellenado. ¡Respuesta rápida garantizada!
                  </p>
                </Form>
              ) : (
                <SuccessBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ fontSize: '1.6rem' }}>¡Gracias, {submittedData?.nombre?.split(' ')[0] || 'amigo'}!</div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Hemos prellenado tu mensaje en WhatsApp. Te responderemos lo antes posible con una cotización personalizada.
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    <ContactButton
                      as="a"
                      href={submittedData?.waUrl}
                      target="_blank"
                      style={{ flex: 1, minWidth: 160 }}
                    >
                      <WhatsAppIcon size={20} /> Abrir WhatsApp
                    </ContactButton>
                    <ContactButton
                      as="a"
                      href={submittedData?.emailHref}
                      style={{ flex: 1, minWidth: 160 }}
                    >
                      <MailIcon size={20} /> Enviar por correo
                    </ContactButton>
                  </div>

                  <button
                    onClick={handleNewMessage}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent-color)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                    }}
                  >
                    Enviar otro mensaje →
                  </button>
                </SuccessBox>
              )}
              </AnimatePresence>
            </FormWrapper>
          </ContentContainer>
        </ContactColumn>
      </ContentWrapper>
    </PageContainer>
  );
}
