import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { BusinessScenarios } from './components/BusinessScenarios';
import { ProductMatrix } from './components/ProductMatrix';
import { TechnicalStrength } from './components/TechnicalStrength';
import { CaseStudies } from './components/CaseStudies';
import { Services } from './components/Services';
import { NewsFeed } from './components/NewsFeed';
import { Footer } from './components/Footer';
import { motion } from 'motion/react';

export function HomePage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.21, 0.45, 0.32, 0.9],
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <Hero />
      
      <div className="relative">
        {[
          { id: 'scenarios', component: <BusinessScenarios /> },
          { id: 'products', component: <ProductMatrix /> },
          { id: 'tech', component: <TechnicalStrength /> },
          { id: 'cases', component: <CaseStudies /> },
          { id: 'services', component: <Services /> },
          { id: 'news', component: <NewsFeed /> }
        ].map((section, idx) => (
          <motion.div
            key={section.id}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            className="relative z-10"
          >
            {section.component}
            
            {/* Tech-inspired Section Connector */}
            {idx < 5 && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none overflow-hidden z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#fdbd00] to-transparent opacity-30" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#fdbd00] rounded-full blur-[2px] animate-bounce" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
}