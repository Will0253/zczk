import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './HomePage';
import AboutPage from './AboutPage';
import ProductsPage from './ProductsPage';
import SolutionsPage from './SolutionsPage';
import NewsPage from './NewsPage';
import ContactPage from './ContactPage';
import ProductDetailPage from './ProductDetailPage';
import NewsDetailPage from './NewsDetailPage';
import { HighwaySolutionDetail } from './components/HighwaySolutionDetail';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white relative selection:bg-[#fdbd00] selection:text-[#11345b]">
        {/* Global Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#fdbd00] origin-left z-[100] shadow-[0_0_10px_#fdbd00]"
          style={{ scaleX }}
        />

        {/* Tech Background Architecture */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Deep Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, #11345b 1px, transparent 0),
                linear-gradient(rgba(17, 52, 91, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(17, 52, 91, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px, 120px 120px, 120px 120px'
            }}
          />
          
          {/* Advanced Atmosphere Glows */}
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#11345b]/10 rounded-full blur-[150px] mix-blend-multiply" />
          <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-[#fdbd00]/5 rounded-full blur-[120px] mix-blend-screen" />
          
          {/* Tech Circuit Elements (Simulated with CSS lines) */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#11345b]/10 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#11345b]/10 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col">
          <Navigation />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/solutions/highway-safety" element={<HighwaySolutionDetail />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/5g-smart-cone" element={<NewsDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/products/smart-cone" element={<ProductDetailPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}