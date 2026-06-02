import contactData from '../data/contact-data.json';

/**
 * Centralized contact information for Papelería Notarial A&G.
 * Import CONTACT or use helpers to keep phone/email/WA consistent across the site.
 */
export const CONTACT = contactData;

export function getWhatsAppUrl(message = CONTACT.defaultMessages.generalQuote) {
  const base = CONTACT.whatsappBase;
  const text = encodeURIComponent(message);
  return `${base}?text=${text}`;
}

export function getPhoneHref() {
  return `tel:${CONTACT.phoneRaw}`;
}

export function getEmailHref(subject = '', body = '') {
  const email = CONTACT.email;
  let href = `mailto:${email}`;
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  if (params.length) href += `?${params.join('&')}`;
  return href;
}

export function getSocialUrl(key) {
  return CONTACT.socials[key] || '#';
}
