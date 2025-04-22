import React from "react";
import { LanguageProvider } from "./components/LanguageContext"; 
import Navbar from "./components/Navbar";
import Products from "./components/Banners";
import CatalogSection from "./components/CatalogSection";
import Testimonials from "./components/Testimonals";
import FaqAccordion from "./components/FaqAccordion";
import BlogNews from "./components/BlogNews";
import Footer from "./components/Footer";
import DesktopsPage from "./components/DesktopsPage";
import Services from "./components/Services";
import Diskounts from "./components/Diskounts";

const App = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
    <LanguageProvider>
      <Navbar />
     <Products/>
     <CatalogSection/>
     <DesktopsPage/>
     <Services/>
     <Diskounts/>
     <Testimonials/>
     <FaqAccordion/>
     <BlogNews/>
     <Footer/>
    </LanguageProvider>
    </div>
  );
};

export default App;
