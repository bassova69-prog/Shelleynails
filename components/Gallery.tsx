import React from 'react';
import { GALLERY_IMAGES, SOCIAL_LINKS } from '../constants';
import { ArrowRight } from 'lucide-react';

export const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-transparent text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-charcoal/20">
          <div>
            <h2 className="font-gothic text-4xl md:text-6xl text-charcoal drop-shadow-sm">Portfolio</h2>
          </div>
          <a 
            href={SOCIAL_LINKS.INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white transition-colors border border-charcoal px-4 py-2 hover:bg-charcoal"
          >
            Instagram <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {GALLERY_IMAGES.map((src, idx) => (
            <div key={idx} className="relative group aspect-square overflow-hidden rounded-sm bg-greige/50 shadow-inner">
              <img 
                src={src} 
                alt={`Nail Art ${idx + 1}`} 
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay with Sharp Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-white/20 backdrop-blur-[2px]">
                 <div className="w-full h-full border-[10px] border-greige/30 flex items-center justify-center">
                    <span className="font-gothic text-3xl text-charcoal font-blade tracking-widest drop-shadow-md">0{idx + 1}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};