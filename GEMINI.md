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

- **Framer Motion Animations:**
    - Added entrance animations to `Main.jsx`, `About.jsx`, and `Products.jsx` using Framer Motion's `useInView` hook for scroll-triggered animations.
    - Implemented a `mounted` state to prevent hydration mismatches in `Main.jsx`, `About.jsx`, `Products.jsx`, and `Services.jsx`.
- **Products Page Enhancements:**
    - Added a "Contact us" subtitle and a WhatsApp button to `Products.jsx`.
- **Services Page Implementation:**
    - Created a new `Services.jsx` component and `ServiceCard.jsx` for the services page, with 5 placeholder service cards.
    - Modified `ServiceCard.jsx` to use `MotionServiceImage` as a background with a gradient overlay and right-aligned text.
    - Fixed a build error in `Services.jsx` by adding the `"use client";` directive.