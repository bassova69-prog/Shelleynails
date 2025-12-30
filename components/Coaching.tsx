import React, { useState } from 'react';
import { GraduationCap, Mail, Send, X, Loader2, Check, Copy, ExternalLink } from 'lucide-react';

export const Coaching = () => {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: 'Débutant',
    message: ''
  });

  // Lien classique pour Outlook, Apple Mail, iPhone
  const generateMailtoLink = () => {
    const subject = encodeURIComponent(`Demande de Coaching - ${formData.level} - ${formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\nNiveau souhaité: ${formData.level}\n\nMessage / Disponibilités :\n${formData.message}`
    );
    return `mailto:shelley.gervais88@gmail.com?subject=${subject}&body=${body}`;
  };

  // Lien spécifique pour ouvrir Gmail dans le navigateur
  const generateGmailLink = () => {
    const subject = encodeURIComponent(`Demande de Coaching - ${formData.level} - ${formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\nNiveau souhaité: ${formData.level}\n\nMessage / Disponibilités :\n${formData.message}`
    );
    // URL magique de Google pour composer un message
    return `https://mail.google.com/mail/?view=cm&fs=1&to=shelley.gervais88@gmail.com&su=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulation d'un petit temps de chargement pour l'UX
    setTimeout(() => {
        setStatus('success');
    }, 800);
  };

  const copyToClipboard = () => {
     const text = `Email: shelley.gervais88@gmail.com\n\nNom: ${formData.name}\nMessage: ${formData.message}`;
     navigator.clipboard.writeText(text);
     alert("Détails copiés !");
  };

  const resetForm = () => {
      setStatus('idle');
      setFormData({
        name: '',
        email: '',
        level: 'Débutant',
        message: ''
      });
      setShowForm(false);
  }

  return (
    <section id="coaching" className="py-24 relative flex items-center justify-center overflow-hidden">
       {/* Abstract Background Element */}
       <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3">
            <svg width="400" height="400" viewBox="0 0 100 100" className="text-charcoal animate-[spin_60s_linear_infinite]">
                <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="currentColor"/>
            </svg>
       </div>

       <div className="max-w-5xl w-full px-6 relative z-10">
          {/* The Cartouche Container */}
          <div className="relative group">
            {/* Outline Glow Effect on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-charcoal/10 to-transparent rounded-[40px] blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="border border-charcoal/30 bg-white/30 backdrop-blur-md p-8 md:p-14 rounded-[40px] shadow-2xl relative overflow-hidden text-center transition-all duration-500">
                
                {/* Decorative Inner Line (Outline style) */}
                <div className="absolute inset-4 border border-charcoal/10 rounded-[30px] pointer-events-none"></div>
                
                {/* Header Block */}
                <div className="mb-6 flex flex-col items-center">
                    {/* Top Supertitle */}
                    <div className="flex items-center gap-2 text-charcoal/70 mb-2">
                        <GraduationCap size={16} />
                        <span className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.3em]">
                            Session Privée
                        </span>
                    </div>

                    {/* Main Title */}
                    <h2 className="font-serif italic text-5xl md:text-7xl text-charcoal relative inline-block drop-shadow-sm leading-tight">
                       Coaching Exclusif
                       <span className="absolute -top-4 -right-8 text-3xl animate-bounce">✨</span>
                    </h2>
                </div>
                
                <h3 className="font-sans font-light text-xl md:text-2xl tracking-[0.3em] uppercase text-charcoal/80 mb-10">
                    Individuel & Sur Mesure
                </h3>

                <p className="font-sans text-sm md:text-base max-w-lg mx-auto text-charcoal/70 leading-relaxed mb-10">
                   Plonge dans l'univers du <span className="font-bold text-charcoal">Nail Art</span>. 
                   J'analyse ta technique, corrige tes gestes et t'apprends mes designs signature.
                   Un moment privilégié pour développer ton propre style.
                </p>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10 relative z-10 items-stretch text-left">
                    <div className="bg-white/40 p-6 rounded-2xl border border-white/50 hover:bg-white/60 transition-colors flex flex-col justify-start">
                        <span className="block font-gothic text-2xl mb-2 text-charcoal">01</span>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-2 text-center md:text-left">Débutant</h4>
                        <p className="text-[11px] text-charcoal/70 font-medium leading-relaxed">
                            Accents discrets, french manucure ou boucles souples.
                        </p>
                    </div>
                    <div className="bg-white/40 p-6 rounded-2xl border border-white/50 hover:bg-white/60 transition-colors flex flex-col justify-start">
                        <span className="block font-gothic text-2xl mb-2 text-charcoal">02</span>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-2 text-center md:text-left">Confirmé</h4>
                        <p className="text-[11px] text-charcoal/70 font-medium leading-relaxed">
                            Plus de détails : pensez art abstrait, motifs superposés ou finitions chromées.
                        </p>
                    </div>
                    <div className="bg-white/40 p-6 rounded-2xl border border-white/50 hover:bg-white/60 transition-colors flex flex-col justify-start">
                        <span className="block font-gothic text-2xl mb-2 text-charcoal">03</span>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-2 text-center md:text-left">Expert</h4>
                        <p className="text-[11px] text-charcoal/70 font-medium leading-relaxed">
                            Poses complètes et audacieuses avec breloques 3D, motifs peints à la main ou textures variées.
                            <br/><span className="block mt-2 opacity-60 italic">Utilisation d’un gel de haute qualité et d’extensions structurées conçues pour durer.</span>
                        </p>
                    </div>
                </div>

                {/* Formulaire ou Bouton d'ouverture */}
                {!showForm ? (
                    <button 
                       onClick={() => setShowForm(true)}
                       className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-greige font-medium uppercase tracking-widest text-xs rounded-lg hover:bg-black transition-all hover:scale-105 shadow-lg shadow-charcoal/20 relative z-20"
                    >
                      <Mail size={14}/>
                      Réserver un créneau
                    </button>
                ) : (
                    <div className="relative z-20 max-w-lg mx-auto bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white shadow-xl animate-in fade-in slide-in-from-bottom-4">
                        <button 
                            onClick={() => setShowForm(false)}
                            className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <h4 className="font-serif italic text-2xl text-charcoal mb-6">Demande de session</h4>
                        
                        {status === 'success' ? (
                             <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in">
                                <div className="w-12 h-12 bg-charcoal text-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                                    <Check size={24} />
                                </div>
                                <p className="font-serif italic text-xl text-charcoal mb-2">Message prêt !</p>
                                <p className="text-xs text-charcoal/60 max-w-xs mx-auto mb-6">
                                    Choisissez comment vous souhaitez envoyer votre demande :
                                </p>
                                
                                <div className="flex flex-col w-full gap-3 mb-6">
                                    {/* BOUTON GMAIL */}
                                    <a 
                                        href={generateGmailLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest px-4 py-3 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors shadow-md"
                                    >
                                        <Mail size={14} /> Ouvrir via Gmail
                                    </a>

                                    {/* BOUTON CLASSIQUE */}
                                    <a 
                                        href={generateMailtoLink()}
                                        className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest px-4 py-3 bg-charcoal text-white rounded-lg hover:bg-black transition-colors shadow-md"
                                    >
                                        <ExternalLink size={14} /> App Mail par défaut
                                    </a>
                                </div>

                                <div className="w-full h-px bg-charcoal/10 mb-6"></div>

                                <div className="bg-white/50 p-4 rounded-lg border border-charcoal/10 mb-4 w-full flex flex-col gap-2">
                                    <p className="text-[10px] text-charcoal/50 uppercase">Ou copier manuellement</p>
                                    <p className="font-bold text-charcoal select-all">shelley.gervais88@gmail.com</p>
                                    <button 
                                        type="button"
                                        onClick={copyToClipboard}
                                        className="text-[10px] uppercase flex items-center justify-center gap-1 text-charcoal/60 hover:text-charcoal mt-1"
                                    >
                                        <Copy size={10} /> Copier le texte
                                    </button>
                                </div>

                                <button 
                                    onClick={resetForm}
                                    className="text-[10px] uppercase tracking-widest border-b border-charcoal/30 pb-1 hover:border-charcoal transition-colors"
                                >
                                    Fermer
                                </button>
                             </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-charcoal/60 mb-1">Nom complet</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-white/50 border border-charcoal/10 rounded-lg p-3 text-sm focus:outline-none focus:border-charcoal/40"
                                        placeholder="Votre nom"
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-charcoal/60 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-white/50 border border-charcoal/10 rounded-lg p-3 text-sm focus:outline-none focus:border-charcoal/40"
                                        placeholder="votre@email.com"
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-charcoal/60 mb-1">Niveau souhaité</label>
                                    <select 
                                        value={formData.level}
                                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                                        className="w-full bg-white/50 border border-charcoal/10 rounded-lg p-3 text-sm focus:outline-none focus:border-charcoal/40 text-charcoal"
                                        disabled={status === 'submitting'}
                                    >
                                        <option value="Débutant">Niveau 01 - Débutant</option>
                                        <option value="Confirmé">Niveau 02 - Confirmé</option>
                                        <option value="Expert">Niveau 03 - Expert</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-charcoal/60 mb-1">Message</label>
                                    <textarea 
                                        required
                                        rows={3}
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className="w-full bg-white/50 border border-charcoal/10 rounded-lg p-3 text-sm focus:outline-none focus:border-charcoal/40 resize-none"
                                        placeholder="Vos disponibilités ou objectifs particuliers..."
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-charcoal text-white font-medium py-3 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2 uppercase tracking-wider text-xs mt-2 disabled:opacity-70"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 size={12} className="animate-spin"/> Préparation...
                                        </>
                                    ) : (
                                        <>
                                            Préparer l'email <Send size={12} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                )}

                {/* Bottom Signature */}
                <div className="mt-8 opacity-30 font-gothic text-xl text-charcoal">
                    Shelley Nails Academy
                </div>
            </div>
          </div>
       </div>
    </section>
  )
}