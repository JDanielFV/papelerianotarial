# Proyecto: Papelería Notarial A&G - Tareas Pendientes

Esta es una lista de las tareas pendientes para completar el desarrollo del sitio web.

## Funcionalidades y Mejoras

-   [ ] **Adaptación a Escritorio (Responsiveness):**
    -   [ ] Implementar los breakpoints para tabletas (768px) y escritorios (1024px).
    -   [ ] Ajustar los layouts de los componentes principales (`Products`, `Services`, `About`) para pantallas grandes.
    -   [ ] Revisar y ajustar tamaños de fuente, márgenes y paddings en la vista de escritorio.

-   [ ] **Refactorización de Código:**
    -   [ ] Unificar la lógica duplicada entre `app/components/About.jsx` y `app/components/Products.jsx` en un componente reutilizable.

-   [ ] **Gestión de Datos:**
    -   [ ] Mover los datos de los servicios (actualmente en `Services.jsx`) a un archivo JSON (`services-data.json`) para facilitar su mantenimiento.
    -   [ ] Completar y verificar todos los datos de productos en `app/data/products-data.json`.

-   [ ] **Contenido y Páginas:**
    -   [ ] **Página de Inicio:**
        -   [ ] Diseñar y añadir la sección "Nosotros".
        -   [ ] Diseñar y añadir la sección "Calidad".
        -   [ ] Diseñar y añadir la sección "Historia".
        -   [ ] Diseñar y añadir la sección "Contacto".
    -   [ ] **Página de Contacto:**
        -   [ ] Implementar completamente la página de contacto (`app/contacto/page.js`) con un formulario funcional.
    -   [ ] **Catálogo:**
        -   [ ] Terminar de añadir todos los productos y categorías al catálogo.
    -   [ ] **Media:**
        -   [ ] Reemplazar todas las imágenes de marcador de posición con las fotos reales de los productos.
        -   [ ] Añadir los videos de fondo y de productos.

-   [ ] **Estilos y UI:**
    -   [ ] Realizar una revisión y actualización general de los estilos para asegurar consistencia y elegancia.

## Calidad y Despliegue

-   [ ] **Pruebas:**
    -   [ ] Realizar pruebas de usabilidad en dispositivos móviles y de escritorio.
    -   [ ] Verificar que todas las animaciones funcionen de manera fluida en diferentes navegadores.
-   [ ] **Optimización:**
    -   [ ] Optimizar el peso de las imágenes y videos para mejorar los tiempos de carga.
    -   [ ] Revisar el rendimiento general del sitio con Lighthouse o herramientas similares.
