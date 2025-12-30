import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { FAQ } from './components/FAQ';
import { Coaching } from './components/Coaching';
import { Gallery } from './components/Gallery';
import { Collaboration } from './components/Collaboration';
import { AiConsultant } from './components/AiConsultant'; // Importation de l'IA
import { Footer } from './components/Footer';
import { ASSETS } from './constants';

const App = () => {
  return (
    <div className="min-h-screen bg-greige text-charcoal font-sans relative selection:bg-charcoal selection:text-white">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
            backgroundImage: `url('${ASSETS.BACKGROUND}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            // Opacity légèrement réduite pour assurer la lisibilité du texte si nécessaire
            opacity: 1
        }}
      />
      
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <AiConsultant /> {/* Ajout du composant IA ici */}
        <FAQ />
        <Coaching />
        <Collaboration />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default App;