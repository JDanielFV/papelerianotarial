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

# Development Conventions

- **Styling:** The project uses `styled-components` for styling. Components are styled in the same file where they are defined.
- **Animations:** Animations are handled with `framer-motion`. The components make extensive use of this library to create a dynamic and engaging user experience.
- **Components:** The code is organized into reusable components located in the `app/components` directory.
- **Routing:** The routing is handled by Next.js's file-system based router. Pages are located in the `app` directory, with each page in its own subdirectory.
- **Linting:** The project uses ESLint for code quality. The configuration is in the `eslint.config.mjs` file.

# Recent Changes

- **Services Page Enhancements:**
    - Modified `Services.jsx` to change the interaction of service cards: instead of opening a modal, they now expand in height to reveal more details.
    - Implemented a "Ver más" button that appears when the card is expanded.
    - Adjusted the positioning of elements within the expanded service card to be top-aligned.
    - Added a small gap between the description and the "Ver más" button.
    - Improved animation smoothness by adding `layout` prop and removing explicit `y` animations.
- **Products Catalog Page Implementation:**
    - Created `app/data/products-data.json` to store nested product categories and items.
    - Created a new page `app/productos/catalogo/page.js` to display product categories and their items.
    - Implemented navigation from the "Ver más" button in `Products.jsx` to the new catalog page, passing the `categoryId` as a query parameter.
    - Modified `app/productos/catalogo/page.js` to filter displayed categories based on the `categoryId` query parameter.
    - Added a "Back" button to the catalog page to return to the `Products` page.
    - Implemented modal-style expandable product cards in the catalog page, showing image, title, subcategory name, catchy description, min purchase quantity, and a WhatsApp contact button, all centered.
    - Added `image`, `catchyDescription`, `minPurchaseQuantity`, and `whatsappInquiry` fields to `products-data.json`.
    - Fixed a build error in `products-data.json` (typo `.name` to `"name"`).
    - Fixed console error "React does not recognize the `layoutId` prop" by removing `layoutId` from `ProductName` and `ProductDescription` in `app/productos/catalogo/page.js`.
- **Page Transition Improvements:**
    - Adjusted `PageTransition.jsx` to use `y` offset and `tween` transition for smoother page transitions.
- **Typography Update:**
    - Switched the main application font from Geist/Outfit to Raleway in `app/layout.js`.
- **Services Page Update:**
    - Added a new service "Empastado" to the `serviceData` array in `app/components/Services.jsx`.
- **WhatsApp Icon Color Fix:**
    - Applied a CSS filter to the `WhatsappIcon` styled component in `app/components/Products.jsx` to force its color to white.
- **Desktop View Adaptation Discussion:**
    - Discussed and planned the strategy for adapting the mobile-first design to a desktop view using breakpoints and media queries in `styled-components`. Implementation pending user's instruction.
- **Project TODO List Creation:**
    - Created `TODO.md` to track pending tasks, including desktop responsiveness, code refactoring, data management, content creation (new homepage sections, contact page, catalog completion), style updates, and media integration (photos and videos).