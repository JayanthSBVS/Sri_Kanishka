import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { UIProvider } from './context/UIContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

// Detailed Service Pages
import ITServices from './pages/services/ITServices';
import MarriageServices from './pages/services/MarriageServices';
import MeditationServices from './pages/services/MeditationServices';
import MaitriHavan from './pages/services/MaitriHavan';
import MaitriSambodhDhyaan from './pages/services/MaitriSambodhDhyaan';
import RealEstate from './pages/services/RealEstate';
import AbroadConsultancy from './pages/services/AbroadConsultancy';
import Groceries from './pages/services/Groceries';
import MatchDiscovery from './pages/services/MatchDiscovery';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/services/it" element={<PageTransition><ITServices /></PageTransition>} />
        <Route path="/services/marriage" element={<PageTransition><MarriageServices /></PageTransition>} />
        <Route path="/services/meditation" element={<PageTransition><MeditationServices /></PageTransition>} />
        <Route path="/services/maitri-havan" element={<PageTransition><MaitriHavan /></PageTransition>} />
        <Route path="/services/maitri-sambodh-dhyaan" element={<PageTransition><MaitriSambodhDhyaan /></PageTransition>} />
        <Route path="/services/real-estate" element={<PageTransition><RealEstate /></PageTransition>} />
        <Route path="/services/abroad-consultancy" element={<PageTransition><AbroadConsultancy /></PageTransition>} />
        <Route path="/services/groceries" element={<PageTransition><Groceries /></PageTransition>} />
        <Route path="/services/marriage/matches" element={<PageTransition><MatchDiscovery /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <UIProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </UIProvider>
  );
}

export default App;
