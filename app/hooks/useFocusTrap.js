"use client";

import { useEffect, useRef } from "react";

/**
 * useFocusTrap — atrapa el foco del teclado dentro de un contenedor modal.
 *
 * Uso:
 *   const focusTrapRef = useFocusTrap(isOpen);
 *   return isOpen ? <div ref={focusTrapRef}>...contenido del modal...</div> : null;
 *
 * Al abrirse, enfoca el primer elemento focusable dentro del ref.
 * Al cerrarse, restaura el foco al elemento que lo tenía antes de abrir.
 */
export default function useFocusTrap(isOpen) {
    const ref = useRef(null);
    const previousActiveElement = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Guardar el elemento que tenía el foco antes de abrir el modal
            previousActiveElement.current = document.activeElement;

            // Enfocar el primer elemento focusable dentro del modal
            const timer = setTimeout(() => {
                if (ref.current) {
                    const focusable = ref.current.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    if (focusable.length > 0) {
                        focusable[0].focus();
                    }
                }
            }, 50);

            return () => clearTimeout(timer);
        } else {
            // Restaurar el foco al elemento anterior
            if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
                previousActiveElement.current.focus();
            }
        }
    }, [isOpen]);

    // Atrapar Tab/Shift+Tab dentro del contenedor
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key !== "Tab" || !ref.current) return;

            const focusable = ref.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    return ref;
}
