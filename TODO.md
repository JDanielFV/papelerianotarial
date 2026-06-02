# Proyecto: Papelería Notarial A&G - Tareas Pendientes

Esta es una lista de las tareas pendientes para completar el desarrollo del sitio web.

> **Actualizado recientemente:** Se completó una ronda grande de mejoras (limpieza de rutas, centralización de contacto, formulario funcional, optimizaciones de performance, imágenes Next, eliminación de duplicados y código muerto, etc.). Ver git log o los cambios en la rama.

## Completado recientemente (alta prioridad)
- [x] Rutas consolidadas: `/catalogo` es ahora el canonical (con redirects permanentes desde `/productos/*`).
- [x] Datos de contacto centralizados en `app/data/contact-data.json` + `app/lib/contact.js` (helpers para WA, tel, email).
- [x] Formulario de contacto completo y funcional en `/contacto` con validación (react-hook-form + zod), prellenado rico de WhatsApp + fallback email, estados de éxito bonitos + Server Action listo para email real.
- [x] **Video hero optimizado drásticamente**: de 8.1 MB a ~370 KB (mp4) + 500 KB (webm). Nueva poster image. Control inView + preload. Gran mejora en LCP.
- [x] Optimizaciones de assets: `next/image` en logos, imágenes laterales (About/Beliefs), remotePatterns para Unsplash, variedades de imágenes en categorías del catálogo.
- [x] Modales pesados cargados dinámicamente (Expanded*Modal) para reducir bundle inicial.
- [x] Limpieza: eliminados duplicados de rutas (/productos tree), History.jsx, Services.jsx legacy, about-products-data.json, page.module.css innecesario.
- [x] Reducción de dangerouslySetInnerHTML con componente HighlightText reutilizable.
- [x] A11y + responsive: focus-visible global, aria en menú, tablet/desktop polish (768px breakpoints en Nav, forms, grids, split layouts, titles).
- [x] SEO: sitemap.js dinámico, robots.js, metadata mejorada (OG, keywords), JSON-LD LocalBusiness en home.
- [x] Build y lint limpios. Nuevas rutas estáticas: /sitemap.xml, /robots.txt.

## Funcionalidades y Mejoras restantes

-   [ ] **Adaptación a Escritorio (Responsiveness) - Parcialmente avanzado:**
    -   [ ] Pulir breakpoints tablet (768px) y escritorios grandes (1440px+).
    -   [ ] Revisar layouts horizontales de Products (scroll en home) y Services en pantallas muy anchas.
    -   [ ] Ajustes finos de tipografía, espaciado y grids en desktop (seguir GEMINI.md).

-   [ ] **Refactorización de Código:**
    -   [ ] Considerar unificar preview expandido de ProductGridSection con ExpandedProductModal (lógica/estilos duplicados menores).

-   [ ] **Gestión de Datos:**
    -   [x] Servicios movidos a JSON.
    -   [ ] Completar / verificar productos (faltan fotos reales).
    -   [x] Historia removida (datos y componente obsoletos; contenido cubierto por AboutUs/Beliefs).

-   [ ] **Contenido y Páginas:**
    -   [ ] **Página de Inicio:** (secciones principales ya presentes vía Beliefs, Quality, AboutUs, ContactSection)
        -   [ ] Añadir / pulir "Historia" si se desea recuperar.
    -   [x] **Página de Contacto:** Formulario funcional implementado (con conversión vía WA).
    -   [ ] **Catálogo:**
        -   [ ] Terminar de añadir productos/categorías faltantes.
    -   [ ] **Media (crítico para negocio):**
        -   [ ] Reemplazar **todas** las imágenes placeholder por fotos reales de productos (alta prioridad de conversión).
        -   [ ] Optimizar / reemplazar video de fondo (actualmente ~8MB).

-   [ ] **Estilos y UI:**
    -   [ ] Revisión general de consistencia (seguir estrictamente GEMINI.md: tipografía, motion, autoplay 4s, etc.).

## Calidad y Despliegue

-   [ ] **Pruebas:**
    -   [ ] Pruebas de usabilidad móvil + escritorio.
    -   [ ] Verificar animaciones en diferentes navegadores y reduced-motion.
    -   [ ] Añadir tests básicos (Vitest + RTL para formulario y lógica de catálogo).
-   [ ] **Optimización:**
    -   [ ] Reemplazar imágenes Unsplash por assets locales optimizados (mejor LCP y control).
    -   [ ] Medir Lighthouse post-cambios (objetivo >85-90 perf). Optimizar bundle (analyze).
    -   [ ] Comprimir video de fondo o usar versiones múltiples (webm/mp4).
-   [ ] **SEO / Accesibilidad:**
    -   [ ] Añadir sitemap + robots (Next genera base).
    -   [ ] OG images y JSON-LD para negocio.
    -   [ ] Mejorar alts en cards de productos (actualmente fondos visuales).
-   [ ] **Email real (futuro):** Cablear Server Action + Resend (o similar) para guardar leads además de WA.

## Notas técnicas post-mejoras
- Dependencias nuevas: `react-hook-form`, `zod`, `@hookform/resolvers`.
- Estructura más limpia: `lib/contact.js`, data centralizado.
- Rutas finales: /catalogo (overview) + /catalogo/productos (detalle con ?categoryId).
- Sigue las convenciones de GEMINI.md para motion y tipografía.

¡Buen progreso! Próximos pasos recomendados: fotos reales de productos + optimización de video + pulido desktop.
