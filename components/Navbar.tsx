import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS, ASSETS } from '../constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        if (targetId === '' || targetId === 'home') {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
             const element = document.getElementById(targetId);
             if (element) {
                 element.scrollIntoView({ behavior: 'smooth' });
             }
        }
        setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-greige/80 backdrop-blur-md border-b border-charcoal/10 py-3 shadow-sm' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Image */}
        <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="cursor-pointer hover:opacity-80 transition-opacity block relative group"
        >
          <div className="relative">
             {/* Effet de lueur derrière le logo rond */}
             <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-full blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
             <img 
                src={ASSETS.LOGO_URL} 
                alt="Shelley Nails Logo" 
                className="relative h-14 w-14 md:h-20 md:w-20 rounded-full object-cover border-2 border-white/50 shadow-md"
             />
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs uppercase tracking-[0.2em] font-medium text-charcoal/70 hover:text-charcoal transition-colors relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-charcoal transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </a>
          ))}
          <div className="flex items-center gap-4">
            <a 
              href={SOCIAL_LINKS.INSTAGRAM} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-charcoal hover:text-charcoal/60 transition-all"
            >
              <Instagram size={18} />
            </a>
            <a 
              href={SOCIAL_LINKS.TIKTOK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-charcoal hover:text-charcoal/60 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-charcoal hover:opacity-70 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-greige border-b border-charcoal/10 transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100 shadow-xl' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col items-center py-10 space-y-8 bg-greige/95 backdrop-blur">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-gothic text-3xl text-charcoal hover:text-charcoal/60 transition-colors cursor-pointer tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-6 pt-4">
              <a href={SOCIAL_LINKS.INSTAGRAM} className="text-charcoal"><Instagram size={24} /></a>
              <a href={SOCIAL_LINKS.TIKTOK} className="text-charcoal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
          </div>
        </div>
      </div>
    </nav>
  );
};