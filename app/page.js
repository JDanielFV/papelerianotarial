import Main from "./components/Main";
import About from "./components/About";
import Processes from "./components/Processes";
import Products from "./components/Products";
import AboutUs from "./components/AboutUs";
import Quality from "./components/Quality";
import ContactSection from "./components/ContactSection";
import Beliefs from "./components/Beliefs";

// Import unified static data
import homeData from "./data/home-data.json";
import productData from "./data/products-data.json";
import { CONTACT } from "./lib/contact";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": CONTACT.company,
    "description": "Papelería notarial de alta calidad especializada en productos de seguridad para Notarías Públicas en México.",
    "url": "https://papelerianotarial.net",
    "telephone": CONTACT.phone,
    "email": CONTACT.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tulipanes 29, Izcalli Ecatepec",
      "addressLocality": "Ecatepec de Morelos",
      "addressRegion": "Estado de México",
      "postalCode": "55030",
      "addressCountry": "MX"
    },
    "areaServed": "México",
    "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-15:00",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Main {...homeData.main} />
      <About {...homeData.about} />
      <Processes {...homeData.processes} />
      <Products {...homeData.products} products={productData} />
      <Quality {...homeData.quality} />
      <Beliefs />
      <AboutUs {...homeData.aboutUs} />
      <ContactSection {...homeData.contactSection} />
    </>
  );
}