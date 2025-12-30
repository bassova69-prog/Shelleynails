import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Heart, ShieldCheck, Clock } from 'lucide-react';

const FAQ_DATA = [
    {
        question: "Combien de temps tient une pose de gel ?",
        answer: "Une pose de gel ou de Gelx tient généralement entre 3 et 4 semaines. Cela dépend de la vitesse de repousse de vos ongles naturels et du soin que vous leur apportez au quotidien. Un remplissage est conseillé toutes les 3-4 semaines pour maintenir la structure de l'ongle.",
        icon: Clock
    },
    {
        question: "Comment entretenir mes ongles après le rendez-vous ?",
        answer: "Pour une tenue optimale : \n1. Évitez le contact prolongé avec l'eau et portez des gants pour le ménage.\n2. Hydratez quotidiennement vos cuticules avec une huile adaptée.\n3. N'utilisez jamais vos ongles comme des outils (ouvrir des canettes, etc.).\n4. Ne grattez pas et ne décollez pas le gel vous-même.",
        icon: Heart
    },
    {
        question: "Est-ce que le gel abîme les ongles naturels ?",
        answer: "Contrairement aux idées reçues, le gel n'abîme pas l'ongle. C'est une préparation trop agressive ou une dépose sauvage (arrachage) qui cause des dommages. En tant que professionnelle, je veille à préserver la plaque de vos ongles avec des techniques douces et des produits de haute qualité.",
        icon: ShieldCheck
    },
    {
        question: "Combien de temps dure une prestation ?",
        answer: "Le temps varie selon la complexité : \n- Pose Gelx simple : env. 1h15\n- Remplissage avec Nail Art : 1h45 à 2h15\n- Pose artistique complexe : jusqu'à 3h.\nLa qualité demande de la précision !",
        icon: Sparkles
    },
    {
        question: "Que faire si je casse un ongle ?",
        answer: "Pas de panique ! Contactez-moi rapidement via Instagram. Une réparation est possible (gratuite sous 7 jours si le problème vient de la pose, payante au-delà). N'essayez pas de le coller avec de la glue, cela pourrait favoriser des infiltrations.",
        icon: HelpCircle
    }
];

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 relative flex items-center justify-center">
            <div className="max-w-2xl mx-auto w-full px-4 relative z-10">

                <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/60 overflow-hidden relative pb-8 transition-transform hover:scale-[1.01] duration-500">
                    {/* Header Floral/Gothic */}
                    <div className="relative h-40 bg-charcoal overflow-hidden flex flex-col justify-center items-center text-center px-6">
                        {/* Abstract Texture Overlay */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                        
                        {/* Title updated to Serif 'FAQ' */}
                        <h2 className="relative z-10 font-serif italic font-medium text-6xl md:text-7xl text-white tracking-tight drop-shadow-md">FAQ</h2>
                        <p className="relative z-10 text-greige font-serif italic text-sm mt-2 opacity-80">Tout ce qu'il faut savoir pour des ongles parfaits.</p>
                    </div>

                    <div className="p-6 space-y-3 mt-4">
                        {FAQ_DATA.map((item, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div 
                                    key={idx} 
                                    className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-[#FAEDCD]/40 border-[#D4A373]' : 'bg-white/40 border-stone-100 hover:border-stone-200 hover:bg-white/60'}`}
                                >
                                    <button 
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                        className="w-full p-5 flex items-center justify-between text-left gap-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-[#D4A373] text-white' : 'bg-stone-100 text-stone-500'}`}>
                                                <item.icon size={18} />
                                            </div>
                                            <span className="font-serif font-bold text-stone-800 leading-tight">{item.question}</span>
                                        </div>
                                        {isOpen ? <ChevronUp size={18} className="text-[#D4A373] shrink-0" /> : <ChevronDown size={18} className="text-stone-400 shrink-0" />}
                                    </button>
                                    
                                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
                                        <div className="p-5 pt-0 text-sm text-stone-600 font-medium leading-relaxed border-t border-[#D4A373]/10 whitespace-pre-wrap font-sans">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="px-8 mt-6 text-center">
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Une autre question ?</p>
                        <a 
                            href="https://ig.me/m/shel" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-[#D4A373] font-serif italic hover:underline font-medium"
                        >
                            Pose-la moi directement sur Instagram →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};