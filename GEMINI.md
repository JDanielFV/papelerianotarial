# Project Overview

This is a Next.js project for "Papelería Notarial A&G", a company that creates and sells high-quality stationery for notaries. The website showcases their products and services with a modern and elegant design.

The main technologies used are:
- **Next.js:** A React framework for building server-side rendered and static web applications.
- **React:** A JavaScript library for building user interfaces.
- **Styled-components:** A library for styling React components.
- **Framer Motion:** A library for creating animations in React.

The project is structured with a main landing page that introduces the company and its products. It also has separate pages for products, services, and contact. The UI is highly animated and visually appealing, with a focus on showcasing the quality of the products.

# Building and Running

To get the development environment running, use the following command:

```bash
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

Other available scripts:
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the code using ESLint.

# Development & Design Conventions

To maintain visual excellence and code quality, please adhere to the following design systems and coding guidelines:

### 1. Typography & Hierarchy
* **Global Heading Weight & Size**: Section and main page titles must share a uniform typography scale:
  * **Mobile**: `3rem`
  * **Desktop (min-width: 1024px)**: `4rem`
  * **Weight**: `lighter` / `300` (e.g. `font-weight: lighter;` on headings).
* **Font Family**: Main body and heading typeface is **Raleway** (configured in `app/layout.js`).

### 2. Autoplay & Interaction
* **Autoplay Timers**: Elements that rotate automatically (like the process grid in `About.jsx`) should run on a 4-second cycle (`4000ms`).
* **Autoplay Reset**: Always clean up and reset the interval when the active index changes due to manual user interaction (hover or click) so the item stays active for a full 4 seconds post-interaction.
* **Responsive Backgrounds**: Mobile dynamic backgrounds should be rendered with subdued opacity (e.g. `0.35`) and use `var(--overlay-gradient)` to guarantee automatic readability in both dark and light color schemes.

### 3. Motion & Animation Standards
* **Symmetric Transitions**: Avoid mechanical typing or asymmetric entries/exits on dynamic headlines. Use a premium **Fade & Blur** transition:
  * **Entrance**: `opacity: 0, filter: blur(10px)` to `opacity: 1, filter: blur(0px)`.
  * **Exit**: `opacity: 1, filter: blur(0px)` to `opacity: 0, filter: blur(10px)`.
* **Stable Bounding Boxes**: Always specify a fixed `height` (not `min-height`) on containers with changing text sizes/lines (like the main banner title) to prevent layout shifts of surrounding elements (such as buttons below).
* **Flexbox Text Nodes**: Flex containers collapse trailing spaces in text node children. Always wrap inline dynamic text in a span with `white-space: pre-wrap;` to prevent words from sticking together.
* **Layout Morphing Modals (`layoutId`)**:
  * To ensure shared layout exits morph back to the grid correctly when unmounted, the backdrop overlay (which fades out via `AnimatePresence` `exit` prop) and the morphing card container **must be rendered as siblings with unique keys** (e.g., `key="overlay"` and `key="card-wrapper"`) rather than nested. This allows direct unmounting of the card node and triggers Framer Motion's layout interpolation.

# Recent Changes

- **Symmetric Transitions and Modal Morphing Fixes (June 2, 2026):**
  - **Shared Layout Exit Morphing**: Resolved a critical layout morphing bug in `ExpandedProductModal.jsx` where the card disappeared instantly instead of morphing back to the grid on close. Separated the backdrop overlay and card container into siblings under `AnimatePresence` with unique keys, enabling correct unmount hooks.
  - **Fade & Blur Dynamic Headlines**: Replaced the typewriter typewriter effect in `Main.jsx` with a symmetric and elegant Fade & Blur text transition. Added a fixed height of `7rem` (mobile) / `10rem` (desktop) with flex centering to completely eliminate layout shifting.
  - **Typewriter Space Collapse Fix**: Added `TitleText` wrapper with `white-space: pre-wrap;` inside the flex title container to prevent flexbox from collapsing spaces between dynamic words.
  - **Autoplay Carousels**: Configured an autoplay cycle of 4 seconds on `About.jsx` that automatically increments the active process. Connected `activeIndex` to the effect dependencies so manual mouse hovers or touch clicks reset the timer seamlessly.
  - **Beliefs Section**: Implemented the new "En qué creemos" section (`Beliefs.jsx`) before the "Sobre Nosotros" section, with alternating desktop layout (image on the right) and custom-crafted copy on brand image, trust, and explicit CTAs.
  - **Responsive Mobile Backgrounds**: Configured the mobile background layer in `About.jsx` to adapt to light/dark themes by transitioning from custom linear colors to `var(--overlay-gradient)`.
  - **Logo Aspect Ratio**: Fixed cut-off/clipped edges of the A&G monogram logo in `AboutUs.jsx` by changing Next.js Image component `objectFit` from `cover` to `contain`.

- **Optimization and Comprehensive Core Fixes (June 1, 2026):**
    - **React Versions Sync:** Fixed a critical build/dev crash due to React version mismatches by locking `react` and `react-dom` to `19.2.0` and configuring npm package `overrides` in `package.json`.
    - **Language Routing Unification:** Renamed `/products` route to `/productos` to standardize routes in Spanish. Updated all references across NavBar, Footer, and redirects.
    - **SPA Navigation Transition:** Replaced standard HTML `<a>` elements in NavBar links with Next.js `Link` components (`styled(Link)`) to enable smooth client-side transitions and fixed mobile menu automatic closing (`setMenuOpen(false)`).
    - **Contact/Domain Unification:** Standardized the contact email to `.com` and the web reference link to `.net` in the footer.
    - **Asset Fixes:** Created and copied a premium `placeholder-image.jpg` asset to `public/` to prevent broken image 404 errors. Replaced the generic outlined WhatsApp logo with the official brand icon in `Icons.jsx`.
    - **Deduplication:** Configured `About.jsx` to display manufacturing processes using `about-products-data.json` instead of replicating the product catalog. Replaced duplicated Styled Components in `catalogo/page.js` by importing `MotionProductCard`, `MotionProductImage`, etc., directly from `ProductCard.jsx`.
    - **Animation Optimization:** Replaced explicit `height` animations in `Services.jsx` with Framer Motion `layout` dynamics combined with spring transitions to avoid layout thrashing and boost frame rates on mobile. Stopped event bubbling on the "Cotiza aquí" button.
    - **Resource and Performance Tuning:** Configured the historical video in `History.jsx` to load and loop automatically without controls when it enters the viewport (using Framer Motion `useInView`). Added `preload="auto"`, `muted`, and `loop`, and removed the static poster. Updated `window.pageYOffset` to `window.scrollY` in `ScrollToTop.jsx`. Restructured `globals.css` to only apply horizontal overflow restrictions to `body`.
    - **SEO Hierarchy:** Downgraded section titles on the Home page from `<h1>` to `<h2>` to preserve a single `<h1>` title. Created `layout.js` files for contact, services, and product directories to define unique server-side titles and descriptions.
    - **Quality Page Hover Images:** Configured Unsplash thematic background images for the hover effects on the "Nuestra Calidad" component cards, styled with a custom radial-gradient overlay to maintain text legibility.