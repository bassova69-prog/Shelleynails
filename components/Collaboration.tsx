import React, { useState } from 'react';
import { Briefcase, Sparkles, Check } from 'lucide-react';

export const Collaboration: React.FC = () => {
    const [collabForm, setCollabForm] = useState({ type: 'Marque', name: '', email: '', message: '' });
    const [collabStatus, setCollabStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleCollabSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCollabStatus('submitting');
        
        // Simulation d'envoi
        setTimeout(() => {
            setCollabStatus('success');
            // Reset form after success logic if needed
        }, 1500);
    };

    return (
        <section id="collaboration" className="py-24 relative flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute left-0 bottom-0 opacity-5 pointer-events-none transform -translate-x-1/4 translate-y-1/4">
                 <svg width="600" height="600" viewBox="0 0 200 200" className="text-charcoal animate-[spin_120s_linear_infinite]">
                    <path d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z" fill="currentColor"/>
                 </svg>
            </div>

            <div className="max-w-2xl mx-auto w-full px-6 relative z-10">
                <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/60 overflow-hidden p-8 md:p-12 transition-all hover:shadow-2xl hover:bg-white/50">
                    
                    {collabStatus === 'success' ? (
                        <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-charcoal text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-charcoal/20">
                                <Check size={32} />
                            </div>
                            <h3 className="font-serif italic text-3xl text-charcoal mb-4">Proposition Envoyée</h3>
                            <p className="font-sans text-charcoal/70 max-w-sm">
                                Je vous remercie pour cette opportunité. Je l'étudierai avec attention et reviendrai vers vous rapidement.
                            </p>
                            <button 
                                onClick={() => {
                                    setCollabStatus('idle');
                                    setCollabForm({ type: 'Marque', name: '', email: '', message: '' });
                                }}
                                className="mt-8 text-xs uppercase tracking-widest border-b border-charcoal/30 pb-1 hover:border-charcoal transition-colors"
                            >
                                Nouvelle demande
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-10 text-center">
                                <div className="inline-flex items-center justify-center p-3 bg-charcoal rounded-full mb-4 shadow-sm text-greige">
                                    <Sparkles size={18} strokeWidth={1.5} />
                                </div>
                                <h2 className="font-serif italic font-medium text-4xl md:text-5xl text-charcoal mb-2">Collab & Partenariat</h2>
                                <p className="font-gothic text-3xl md:text-4xl text-charcoal/80 mt-2">Créons ensemble</p>
                            </div>

                            <form onSubmit={handleCollabSubmit} className="space-y-6">
                                
                                {/* Type Selector */}
                                <div className="flex bg-white/40 p-1.5 rounded-2xl border border-white/50">
                                    {['Marque', 'Evénement', 'Projet'].map(type => (
                                        <button 
                                            key={type}
                                            type="button"
                                            onClick={() => setCollabForm({...collabForm, type: type})}
                                            className={`flex-1 py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${collabForm.type === type ? 'bg-charcoal text-white shadow-md' : 'text-charcoal/40 hover:text-charcoal hover:bg-white/40'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <div className="group">
                                        <input required type="text" className="w-full p-4 bg-white/60 rounded-xl border border-transparent focus:border-charcoal/20 focus:bg-white focus:ring-0 outline-none transition-all font-serif placeholder-charcoal/40 text-charcoal" 
                                            placeholder="Nom du Contact / Marque"
                                            value={collabForm.name} onChange={e => setCollabForm({...collabForm, name: e.target.value})}
                                        />
                                    </div>

                                    <div className="group">
                                        <input required type="email" className="w-full p-4 bg-white/60 rounded-xl border border-transparent focus:border-charcoal/20 focus:bg-white focus:ring-0 outline-none transition-all font-serif placeholder-charcoal/40 text-charcoal" 
                                            placeholder="Email Professionnel"
                                            value={collabForm.email} onChange={e => setCollabForm({...collabForm, email: e.target.value})}
                                        />
                                    </div>

                                    <div className="group">
                                        <textarea required rows={5} className="w-full p-4 bg-white/60 rounded-xl border border-transparent focus:border-charcoal/20 focus:bg-white focus:ring-0 outline-none transition-all text-sm font-sans placeholder-charcoal/40 text-charcoal resize-none" 
                                            placeholder="Détails de la collaboration..."
                                            value={collabForm.message} onChange={e => setCollabForm({...collabForm, message: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={collabStatus === 'submitting'}
                                    className="w-full py-5 bg-charcoal text-white font-medium uppercase tracking-widest text-xs rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-charcoal/10 hover:shadow-charcoal/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                                >
                                    {collabStatus === 'submitting' ? 'Envoi...' : 'Soumettre'} 
                                    {!collabStatus.startsWith('submit') && <Briefcase size={14} />}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};