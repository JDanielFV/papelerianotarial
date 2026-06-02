import Products from "../components/Products";
import homeData from "../data/home-data.json";
import productData from "../data/products-data.json";

export default function ProductsPage() {
  return (
    <Products {...homeData.products} products={productData} />
  );
}
