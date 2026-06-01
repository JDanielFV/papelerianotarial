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
  title: "Papelería Notarial A&G | Elegancia y Seguridad",
  description: "Papelería notarial de alta calidad, hologramas, folios y artículos personalizados para notarios en México.",
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
