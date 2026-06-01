import React from 'react';

export const WhatsAppIcon = ({ size = 24, color = "currentColor", ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} {...props}>
        <path d="M12.004 2C6.48 2 2.001 6.479 2.001 12.004c0 1.902.533 3.7 1.554 5.269L2 22l4.876-1.477a9.917 9.917 0 0 0 5.128 1.482c5.52 0 10-4.479 10-10.001C22.004 6.479 17.524 2 12.004 2zm.004 1.834c4.502 0 8.166 3.665 8.166 8.17s-3.664 8.17-8.166 8.17a8.125 8.125 0 0 1-4.148-1.129l-.297-.176-3.08.932.95-2.995-.195-.31a8.13 8.13 0 0 1-1.23-4.492c0-4.505 3.664-8.17 8.17-8.17zm3.602 11.286c-.198-.1-1.172-.578-1.354-.644-.182-.066-.314-.1-.447.1-.132.2-.512.645-.628.777-.116.133-.232.149-.43.05-.199-.1-1.848-.68-2.617-1.365-.598-.533-.948-1.164-1.064-1.363-.116-.2-.012-.307.087-.406.09-.09.198-.232.298-.348.1-.116.132-.198.198-.33.067-.133.033-.249-.016-.349-.05-.1-.447-1.075-.612-1.472-.16-.388-.337-.336-.463-.342a3.784 3.784 0 0 0-.331-.005c-.15 0-.397.056-.604.282-.207.225-.79.772-.79 1.884 0 1.11.81 2.181.926 2.33.115.15 1.597 2.438 3.868 3.418.54.233.962.373 1.29.477.543.173 1.037.149 1.428.09.435-.065 1.354-.553 1.545-1.087.19-.533.19-1 .133-1.099-.058-.1-.215-.15-.413-.249z" />
    </svg>
);

export const PhoneIcon = ({ size = 24, color = "currentColor", ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

export const MailIcon = ({ size = 24, color = "currentColor", ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

export const FacebookIcon = ({ size = 24, color = "currentColor", ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

export const InstagramIcon = ({ size = 24, color = "currentColor", ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

export const TwitterIcon = ({ size = 24, color = "currentColor", ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
);

export const GlobeIcon = ({ size = 24, color = "currentColor", ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);
