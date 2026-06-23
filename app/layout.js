import { Raleway } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import StyledComponentsRegistry from "./lib/StyledComponentsRegistry";
import PageTransition from "./components/PageTransition";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://papelerianotarial.net"),
  title: {
    default: "Papelería Notarial A&G | Elegancia y Seguridad",
    template: "%s | Papelería Notarial A&G",
  },
  description: "Papelería notarial de alta calidad en México. Hologramas de seguridad, folios oficiales, carpetas de protocolo, artículos promocionales y personalizados para Notarías Públicas.",
  keywords: ["papelería notarial", "folios notariales", "hologramas", "carpetas de protocolo", "notaría", "papelería para notarios", "México", "seguridad documental"],
  authors: [{ name: "Papelería Notarial A&G" }],
  openGraph: {
    title: "Papelería Notarial A&G | Productos de Alta Seguridad para Notarías",
    description: "Soluciones premium de papelería notarial: folios, hologramas, carpetas, NFC y más. Calidad y confianza para tu Notaría en todo México.",
    images: [{ url: "/logo blanco.png" }],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={raleway.className}>
        <StyledComponentsRegistry>
          <NavBar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <ScrollToTop />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
