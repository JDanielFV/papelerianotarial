import Main from "./components/Main";
import About from "./components/About";
import Products from "./components/Products";
import AboutUs from "./components/AboutUs";
import Quality from "./components/Quality";
import ContactSection from "./components/ContactSection";
import Beliefs from "./components/Beliefs";

// Import unified static data
import homeData from "./data/home-data.json";
import productData from "./data/products-data.json";

export default function Home() {
  return (
    <>
      <Main {...homeData.main} />
      <About {...homeData.about} />
      <Products {...homeData.products} products={productData} />
      <Quality {...homeData.quality} />
      <Beliefs />
      <AboutUs {...homeData.aboutUs} />
      <ContactSection {...homeData.contactSection} />
    </>
  );
}