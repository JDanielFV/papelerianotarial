#!/usr/bin/env python3
"""
Genera un cuestionario en markdown listando todos los productos del catálogo
y los acabados disponibles para cada uno. Pensado para que clientes y
vendedores marquen qué acabados quieren en cada pedido.

Uso:
    python3 scripts/generate-finish-questionnaire.py
    python3 scripts/generate-finish-questionnaire.py --output archivo.md
"""
import json
import argparse
from datetime import datetime
from pathlib import Path


def generate_markdown(products_json_path: Path) -> str:
    with open(products_json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    md = []
    md.append("# Cuestionario de Acabados por Producto")
    md.append("")
    md.append(f"_Generado: {datetime.now().strftime('%Y-%m-%d')}_")
    md.append("")
    md.append("**Instrucciones:**")
    md.append("")
    md.append("1. Marca con ✓ los acabados que **SÍ quieres** en tu pedido.")
    md.append("2. Deja en blanco los que **NO quieres**.")
    md.append("3. Si tienes dudas, consulta con tu vendedor.")
    md.append("4. **Mínimo de compra** está indicado junto a cada producto.")
    md.append("")
    md.append("---")
    md.append("")

    for cat in data:
        md.append(f"## {cat['name']}")
        md.append("")
        if cat.get("description"):
            md.append(f"_{cat['description']}_")
            md.append("")
        for sub in cat.get("subcategories", []):
            md.append(f"### {sub['name']}")
            md.append("")
            for p in sub.get("products", []):
                md.append(f"#### ☐ {p['name']}")
                md.append("")
                minimo = p.get("minPurchaseQuantity", "?")
                md.append(f"**Mínimo de compra:** {minimo} pz")
                md.append("")
                if p.get("description"):
                    md.append(f"_{p['description']}_")
                    md.append("")
                finishes = p.get("finishes", [])
                if finishes:
                    md.append("**Acabados disponibles:**")
                    md.append("")
                    md.append("| # | Acabado | ✓ |")
                    md.append("|---|---------|---|")
                    for i, f in enumerate(finishes, 1):
                        md.append(f"| {i} | {f['name']} | ☐ |")
                    md.append("")
                else:
                    md.append("_(Sin acabados configurados)_")
                    md.append("")
            md.append("---")
            md.append("")

    md.append("## Resumen del Pedido")
    md.append("")
    md.append("- **Total de productos seleccionados:** ____")
    md.append("- **Total de acabados marcados:** ____")
    md.append("- **Cliente:** ________________________")
    md.append("- **Fecha:** ____ / ____ / ________")
    md.append("- **Vendedor:** ________________________")
    md.append("- **Notas especiales:**")
    md.append("")
    md.append("```")
    md.append("")
    md.append("```")
    md.append("")
    md.append("---")
    md.append("")
    md.append("_Documento generado automáticamente desde `app/data/products-data.json`._")
    md.append("_Para regenerar: `python3 scripts/generate-finish-questionnaire.py`_")

    return "\n".join(md)


def main():
    parser = argparse.ArgumentParser(
        description="Genera un cuestionario de acabados en markdown desde products-data.json"
    )
    parser.add_argument(
        "--json",
        default="app/data/products-data.json",
        help="Ruta al archivo JSON de productos (default: app/data/products-data.json)",
    )
    parser.add_argument(
        "--output",
        default="CUESTIONARIO_ACABADOS.md",
        help="Archivo de salida (default: CUESTIONARIO_ACABADOS.md)",
    )
    args = parser.parse_args()

    json_path = Path(args.json)
    if not json_path.exists():
        parser.error(f"No se encontró el archivo JSON: {json_path}")

    content = generate_markdown(json_path)
    output_path = Path(args.output)
    output_path.write_text(content, encoding="utf-8")

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    total_products = sum(
        1 for c in data for s in c.get("subcategories", []) for p in s.get("products", [])
    )
    total_finishes = len(
        set(
            f["name"]
            for c in data
            for s in c.get("subcategories", [])
            for p in s.get("products", [])
            for f in p.get("finishes", [])
        )
    )

    print(f"✅ Cuestionario generado en: {output_path}")
    print(f"   Productos: {total_products}")
    print(f"   Acabados únicos: {total_finishes}")


if __name__ == "__main__":
    main()
