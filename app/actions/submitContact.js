'use server';

/**
 * Server Action for contact form submissions.
 * Currently logs the lead (for dev) and returns success.
 * Ready to be extended with Resend / email / CRM / database.
 */
export async function submitContact(data) {
  // Basic server-side validation (defense in depth)
  if (!data?.nombre || !data?.email || !data?.mensaje) {
    return { success: false, error: 'Datos incompletos' };
  }

  // TODO: Integrate real email/lead capture here, e.g.
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({...});

  console.log('[LEAD] Nueva cotización recibida:', {
    nombre: data.nombre,
    email: data.email,
    telefono: data.telefono || 'N/A',
    tipo: data.tipo,
    mensaje: data.mensaje,
    timestamp: new Date().toISOString(),
  });

  // Simulate slight processing
  await new Promise((r) => setTimeout(r, 200));

  return {
    success: true,
    message: 'Solicitud recibida. Te contactaremos pronto por WhatsApp o email.',
  };
}
