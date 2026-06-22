# Análisis de Diseño y Animaciones: Nórtika (nortika.mx)

Este documento detalla el análisis de identidad visual, experiencia de usuario y arquitectura de animación del sitio web de **Nórtika** (agencia creativa), explicando cómo replicar sus efectos de alta gama utilizando nuestra infraestructura actual de **Next.js + Styled-components + Framer Motion**.

---

## 1. ¿Qué hace diferente a Nórtika? (Análisis de Identidad y UX)

El sitio web de Nórtika destaca en el sector de agencias creativas por varias razones clave:

* **Minimalismo de Alto Impacto (Dark Mode Premium):** Utiliza un fondo oscuro profundo (`#121213` / `#141414`) que contrasta de forma electrizante con acentos en tonos vibrantes (naranjas de alta saturación y blancos limpios). Esto le da un aspecto moderno, tecnológico y de estudio boutique.
* **Tipografía como Héroe Visual:** Emplea tamaños de fuente fluidos basados en el ancho de la pantalla (`vw` o viewport width) y grosores gruesos y expresivos. La tipografía no es solo texto legible, sino el elemento gráfico central del diseño.
* **Narrativa Híbrida (Texto + Imagen):** Rompe la monotonía del texto clásico mediante el uso de imágenes miniatura redondeadas incrustadas **dentro de los títulos** (inline text images), convirtiendo las oraciones en collages dinámicos.
* **Micro-interacciones Fluidas:** Cada hover, transición y scroll se siente conectado por una física constante y suave, lo que elimina la sensación de "página estática" y genera enganche visual (engagement).

---

## 2. Desglose y Réplica de Animaciones Clave

A continuación, se describen las 4 animaciones principales de Nórtika y cómo podemos implementarlas en nuestro proyecto con **React** y **Framer Motion**.

### A. Animación de Entrada: Split Text con Desenfoque (Letter Reveal Blur)
Cuando carga la página, los titulares grandes (como el `<h1>` de "Agencia Creativa") no entran de forma tosca. Las letras/palabras se revelan individualmente subiendo desde el fondo, transicionando de opacidad 0 con desenfoque (`blur(10px)`) a su estado nítido final.

#### Implementación con Framer Motion:
```jsx
import { motion } from "framer-motion";
import styled from "styled-components";

const TitleContainer = styled(motion.h1)`
  font-size: 5vw;
  font-weight: 800;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  color: var(--foreground);
`;

const WordSpan = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

export function BlurRevealTitle({ text }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Delay entre cada palabra
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      filter: "blur(10px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier (easeOutExpo)
      }
    },
  };

  const words = text.split(" ");

  return (
    <TitleContainer variants={containerVariants} initial="hidden" animate="visible">
      {words.map((word, idx) => (
        <WordSpan key={idx} variants={wordVariants}>
          {word}
        </WordSpan>
      ))}
    </TitleContainer>
  );
}
```

---

### B. Tarjetas Apilables en Scroll (Stacked Scroll Cards con `blurred_scale`)
La sección del Portafolio de Nórtika presenta un efecto espectacular: a medida que el usuario baja en la página, los casos de estudio (tarjetas de ancho y alto completo, `90vh`) se apilan uno encima del otro. El elemento anterior, al ser cubierto por el nuevo, se reduce ligeramente en escala (`scale(0.9)`) y se desenfoca suavemente.

#### Implementación con CSS Sticky y Framer Motion:
Usando CSS `position: sticky` y `useScroll` para interpolar la escala y el desenfoque de cada tarjeta de forma independiente.

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";

const ScrollSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
`;

const StickyCardContainer = styled.div`
  height: 90vh;
  width: 100%;
  max-width: 1200px;
  position: sticky;
  top: 80px; /* Offset superior */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled(motion.div)`
  width: 100%;
  height: 80vh;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 45px rgba(0,0,0,0.5);
  transform-origin: top center;
  position: relative;
`;

export function StackedCard({ image, title, index, totalCards }) {
  const containerRef = useRef(null);
  
  // Rango de scroll de este contenedor específico
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Efecto cuando el siguiente elemento cubre a este (hacia el final del scroll del contenedor)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <StickyCardContainer ref={containerRef}>
      <Card style={{ 
        backgroundImage: `url(${image})`,
        scale: index === totalCards - 1 ? 1 : scale,
        filter: index === totalCards - 1 ? "blur(0px)" : blur,
        opacity: index === totalCards - 1 ? 1 : opacity
      }}>
        {/* Contenido de la tarjeta */}
        <div style={{ position: "absolute", bottom: 40, left: 40, color: "#fff", zIndex: 2 }}>
          <h2>{title}</h2>
        </div>
      </Card>
    </StickyCardContainer>
  );
}
```

---

### C. Cursor Interactivo con Tooltip Seguidor (Mouse Follower)
Al pasar por encima del grid de portafolio, el cursor cambia de forma interactiva y aparece un tooltip negro ("Ver proyecto") que persigue al ratón de manera fluida y amortiguada (spring physics).

#### Implementación con Framer Motion:
```jsx
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styled from "styled-components";

const TooltipCursor = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  pointer-events: none;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
`;

export function CustomCursor({ isHovering }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configuración de física de resorte (spring) para un movimiento suave y fluido
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 50); // Ajuste de offset central
      mouseY.set(e.clientY - 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isHovering) return null;

  return (
    <TooltipCursor
      style={{ x: cursorX, y: cursorY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      Ver proyecto
    </TooltipCursor>
  );
}
```

---

### D. Títulos Enriquecidos con Imágenes Inline (Inline Text Images)
Nórtika implementa un truco de diseño editorial hermoso: en medio de un encabezado de texto, incorporan fotos circulares o elípticas de su equipo o productos para dar ritmo a la lectura.

#### Implementación con Styled Components:
```jsx
import styled from "styled-components";

const TitleWithImages = styled.h2`
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: 300;
  text-align: center;
  color: var(--foreground);
`;

const InlineImage = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 90px;
  height: 60px;
  margin: 0 10px;
  border-radius: 50px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border: 1px solid var(--card-border);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.15);
  }
`;

export function CreativeParagraph() {
  return (
    <TitleWithImages>
      Creamos marcas con
      <InlineImage src="/placeholder-image.jpg" />
      propósito que trascienden
      <InlineImage src="/placeholder-image.jpg" />
      y conectan en cualquier lugar del mundo.
    </TitleWithImages>
  );
}
```

---

## 3. ¿Cómo podemos aplicar esto en Papelería Notarial A&G?

Para llevar el diseño de "Papelería Notarial A&G" al siguiente nivel utilizando las ideas inspiradas en Nórtika, podemos enfocar las animaciones en tres áreas:

1. **Catálogo Stacking:** En la vista de productos de una categoría (en lugar de un grid plano), las tarjetas de productos estrella podrían apilarse en un scroll vertical con el efecto `blurred_scale`, guiando al usuario por cada producto de manera exclusiva.
2. **Nuestros Valores / Creencias:** En la sección "En qué creemos" o "Sobre nosotros", podemos implementar la composición de **títulos enriquecidos con imágenes inline** usando miniaturas de nuestros papeles premium, texturas de grabado en oro o filigranas notariales.
3. **Cursor Interactivo en el Catálogo:** Mostrar el tooltip dinámico de "Ver producto" o "Cotizar ahora" cuando el puntero pase sobre los productos del catálogo, incrementando de manera lúdica el CTR (Click-Through Rate).
