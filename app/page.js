import Main from "./components/Main";
import About from "./components/About";
import History from "./components/History";
import AboutUs from "./components/AboutUs";
import Quality from "./components/Quality";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <Main />
      <About />
      <Quality />
      <History />
      <AboutUs />
      <ContactSection />
    </>
  );
}