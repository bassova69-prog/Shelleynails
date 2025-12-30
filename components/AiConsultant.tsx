import React, { useState } from 'react';
import { Sparkles, Loader2, Key } from 'lucide-react';
import { generateNailConsultation } from '../utils/gemini';

export const AiConsultant = () => {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [result, setResult] = useState<{ text: string; imageUrl?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safe access to process.env for browser environments
    const envKey = typeof process !== 'undefined' ? process.env?.API_KEY : undefined;
    const keyToUse = apiKey || envKey; 

    if (!keyToUse) {
        setShowKeyInput(true);
        setError("Veuillez fournir une clé API Gemini pour utiliser l'IA.");
        return;
    }

    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await generateNailConsultation(prompt, keyToUse);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("Une erreur est survenue. Vérifiez votre clé API et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-consultant" className="py-24 bg-greige relative overflow-hidden border-t border-charcoal/5">
      
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full mb-4 shadow-sm">
            <Sparkles size={20} className="text-charcoal"/>
          </div>
          <h2 className="font-gothic text-4xl md:text-5xl text-charcoal mb-2">Designer IA</h2>
          <p className="text-charcoal/60 font-sans uppercase tracking-widest text-xs">Ton style, tes règles</p>
        </div>

        <div className="bg-white/40 backdrop-blur-md border border-white rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleConsultation} className="space-y-4">
            
            {showKeyInput && (
                <div className="bg-white/80 border border-charcoal/10 p-4 rounded-lg animate-in fade-in slide-in-from-top-2">
                    <label className="block text-xs font-bold text-charcoal uppercase mb-1 flex items-center gap-2">
                        <Key size={12} /> Clé API Requise
                    </label>
                    <input
                        type="password"
                        placeholder="Collez votre clé API Gemini ici"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-charcoal"
                    />
                </div>
            )}

            <div>
              <label htmlFor="vibe" className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">
                Décris ton vibe
              </label>
              <textarea
                id="vibe"
                rows={3}
                className="w-full bg-white/60 border border-white focus:border-charcoal/30 p-4 rounded-lg focus:outline-none transition-colors resize-none placeholder-gray-400 text-charcoal text-sm"
                placeholder="Ex: Soirée techno berlinoise. Je porte du vinyle rouge. Je veux des ongles pointus et dangereux."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-charcoal text-white font-medium py-3 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-70 uppercase tracking-wider text-sm shadow-lg shadow-charcoal/20"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Création...
                </>
              ) : (
                'Générer'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-800 text-sm rounded border border-red-100 text-center">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-8 animate-in fade-in duration-700 slide-in-from-bottom-4">
              <div className="grid md:grid-cols-2 gap-6">
                 {/* Text Result */}
                 <div className="bg-white/80 p-6 rounded-lg shadow-sm font-sans text-sm leading-relaxed whitespace-pre-line text-charcoal/90 border border-white">
                    <h3 className="font-gothic text-2xl text-charcoal mb-4 border-b border-charcoal/10 pb-2">Concept</h3>
                    {result.text}
                 </div>

                 {/* Image Result */}
                 <div className="flex flex-col gap-2">
                    {result.imageUrl ? (
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500">
                            <img 
                                src={result.imageUrl} 
                                alt="AI Generated Nail Design" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="aspect-[3/4] bg-white/50 rounded-lg flex items-center justify-center text-charcoal/40 text-xs text-center p-4 border border-dashed border-charcoal/20">
                            Image non disponible
                        </div>
                    )}
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};