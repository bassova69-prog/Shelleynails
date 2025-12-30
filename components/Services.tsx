import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../constants';

export const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
        {/* Soft Background Tribal Shadow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none">
             <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full text-black">
                <path d="M100,0 C120,80 180,100 200,100 C180,120 120,200 100,200 C80,120 20,100 0,100 C20,80 80,0 100,0 Z" />
             </svg>
        </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header - Modified to just 'Tarifs' in Serif */}
        <div className="text-center mb-16 relative">
          <div className="bg-charcoal/10 absolute inset-0 blur-3xl rounded-full transform scale-75 opacity-30"></div>
          <h2 className="font-serif italic font-medium text-6xl md:text-8xl text-charcoal relative z-10 drop-shadow-md tracking-tight">
            Tarifs
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            
            {/* Pricing Categories */}
            {SERVICE_CATEGORIES.filter(cat => cat.type === 'pricing').map((cat, idx) => (
                <div key={idx} className="bg-white/30 backdrop-blur-sm p-8 rounded-2xl border border-white/40 shadow-sm hover:bg-white/40 transition-colors">
                    <h3 className="font-gothic text-3xl text-charcoal mb-8 border-b border-charcoal/10 pb-4">{cat.category}</h3>
                    <ul className="space-y-6">
                        {cat.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="group">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-serif font-bold text-charcoal text-lg group-hover:underline decoration-1 underline-offset-4 decoration-charcoal/30">
                                        {item.name}
                                    </span>
                                    <span className="font-sans font-medium text-charcoal/80 text-base whitespace-nowrap ml-4">
                                        {item.price ? `${item.price}€` : 'Sur Devis'}
                                    </span>
                                </div>
                                <p className="text-xs text-charcoal/60 font-sans italic">{item.details}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Info Categories */}
            <div className="md:col-span-2 grid md:grid-cols-2 gap-8 mt-4">
                 {SERVICE_CATEGORIES.filter(cat => cat.type === 'info').map((cat, idx) => (
                    <div key={idx} className="bg-charcoal text-greige p-8 rounded-2xl border border-charcoal shadow-lg relative overflow-hidden group">
                        {/* Decorative background element for cards */}
                        <div className="absolute -right-10 -bottom-10 opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                             <span className="font-gothic text-9xl text-white">S</span>
                        </div>

                        <h3 className="font-gothic text-2xl mb-4 text-white/90 relative z-10">{cat.category}</h3>
                         <ul className="space-y-4 relative z-10">
                            {cat.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                    {item.name && item.name !== cat.category && (
                                        <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-greige-dark">{item.name}</h4>
                                    )}
                                    <p className="text-sm font-sans leading-relaxed text-greige/80 mb-3">{item.details}</p>
                                    {item.action && (
                                        <a href={item.action.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-greige/30 pb-1 hover:border-greige transition-colors text-white">
                                            {item.action.label} <ArrowUpRight size={12}/>
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                 ))}
            </div>

        </div>

      </div>
    </section>
  );
};