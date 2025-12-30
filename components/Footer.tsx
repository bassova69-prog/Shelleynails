import React from 'react';
import { SOCIAL_LINKS } from '../constants';

export const Footer = () => {
  return (
    <footer className="bg-transparent text-charcoal py-12 border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h2 className="font-gothic text-4xl mb-4">Shelley Nails</h2>
        <div className="flex space-x-6 mb-8 text-sm font-medium">
            <a href={SOCIAL_LINKS.INSTAGRAM} className="hover:opacity-50 transition-opacity uppercase tracking-wider">Instagram</a>
            <a href={SOCIAL_LINKS.TIKTOK} className="hover:opacity-50 transition-opacity uppercase tracking-wider">TikTok</a>
            <a href="mailto:contact@shelleynails.com" className="hover:opacity-50 transition-opacity uppercase tracking-wider">Email</a>
        </div>
        <p className="text-[10px] uppercase tracking-widest opacity-40">
          © {new Date().getFullYear()} Shelley Nails.
        </p>
      </div>
    </footer>
  );
};