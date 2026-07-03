"use server";

import { writeFile, readFile } from "fs/promises";
import path from "path";

const DATA_PATH = path.join(
    process.cwd(),
    "app",
    "data",
    "products-data.json"
);

/**
 * Lee el JSON de productos desde el filesystem.
 * Lanza error si el archivo no existe o el JSON es inválido.
 */
export async function getProductsData() {
    try {
        const raw = await readFile(DATA_PATH, "utf-8");
        return JSON.parse(raw);
    } catch (err) {
        console.error("Error leyendo products-data.json:", err);
        throw new Error(
            "No se pudo leer el archivo de productos. Revisa que app/data/products-data.json exista."
        );
    }
}

/**
 * Sobrescribe el JSON con los cambios del admin.
 * Recibe el array completo de categorías (la estructura completa del JSON).
 *
 * Validación básica: verifica que sea un array y que tenga categorías.
 */
export async function saveProductsData(data) {
    if (!Array.isArray(data)) {
        return { success: false, error: "Los datos deben ser un array de categorías." };
    }
    if (data.length === 0) {
        return { success: false, error: "El array de categorías está vacío." };
    }
    // Validar estructura mínima
    for (const cat of data) {
        if (!cat.id || !cat.name) {
            return { success: false, error: `Categoría inválida: falta id o name.` };
        }
    }

    try {
        const json = JSON.stringify(data, null, 4);
        await writeFile(DATA_PATH, json, "utf-8");
        return { success: true, message: "Cambios guardados correctamente." };
    } catch (err) {
        console.error("Error escribiendo products-data.json:", err);
        return { success: false, error: "Error al escribir el archivo: " + err.message };
    }
}
