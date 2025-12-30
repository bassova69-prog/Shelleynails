
import React, { useState, useEffect } from 'react';
import { getAdminPin, setAdminPin, resetAllData, clearJournal, getData, updateGitHubConfig, saveToGitHub, fetchFromGitHub, saveData } from '../../services/storage';
import { GitHubConfig } from '../../types';
import { Lock, Check, ShieldAlert, Github, Save, Trash2, RefreshCw, AlertTriangle, CloudUpload, CloudDownload } from 'lucide-react';

export const Settings: React.FC = () => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinStatus, setPinStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [pinMessage, setPinMessage] = useState('');

  const [githubConfig, setGithubConfig] = useState<GitHubConfig>({
    token: '', owner: '', repo: '', path: 'shelleynails-db.json', branch: 'main', enabled: false
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean, message: string } | null>(null);

  useEffect(() => {
    const data = getData();
    if (data.githubConfig) setGithubConfig(data.githubConfig);
  }, []);

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPin !== getAdminPin()) { setPinStatus('error'); setPinMessage("Ancien code incorrect."); return; }
    if (newPin.length !== 6 || isNaN(Number(newPin))) { setPinStatus('error'); setPinMessage("Le code doit faire 6 chiffres."); return; }
    if (newPin !== confirmPin) { setPinStatus('error'); setPinMessage("Les codes ne correspondent pas."); return; }
    setAdminPin(newPin); setPinStatus('success'); setPinMessage("Code mis à jour !");
    setCurrentPin(''); setNewPin(''); setConfirmPin('');
    setTimeout(() => setPinStatus('idle'), 3000);
  };

  const handleSaveToGitHub = async () => {
    setIsSyncing(true);
    updateGitHubConfig(githubConfig);
    const result = await saveToGitHub({ ...getData(), githubConfig });
    setSyncResult(result);
    setIsSyncing(false);
    setTimeout(() => setSyncResult(null), 5000);
  };

  const handleFetchFromGitHub = async () => {
    if (!window.confirm("Remplacer les données locales par celles du Cloud ?")) return;
    setIsSyncing(true);
    const remoteData = await fetchFromGitHub(githubConfig);
    if (remoteData) {
        saveData({ ...remoteData, githubConfig });
        setSyncResult({ success: true, message: "Données importées ! Redémarrage..." });
        setTimeout(() => window.location.reload(), 1500);
    } else {
        setSyncResult({ success: false, message: "Échec de l'importation." });
    }
    setIsSyncing(false);
    setTimeout(() => setSyncResult(null), 5000);
  };

  const handleReset = () => {
    if (window.confirm("🚨 TOUT EFFACER ? Cette action est irréversible et supprimera tout de cet appareil.")) {
      resetAllData();
      window.location.reload();
    }
  };

  const handleClearJournal = () => {
    if (window.confirm("🗑️ VIDER LE JOURNAL ? Cela effacera toutes les transactions de vente.")) {
      clearJournal();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
        <div>
            <h1 className="text-5xl font-gothic tracking-widest transform scale-y-110" style={{
                background: 'linear-gradient(to bottom, #F5F5F4 0%, #A8A29E 45%, #57534E 50%, #A8A29E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.4))',
                WebkitTextStroke: '1px #44403C',
            }}>Réglages</h1>
            <p className="text-stone-500 mt-2 font-medium uppercase tracking-widest text-[10px]">Sécurité & Maintenance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GITHUB SYNC */}
            <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/40 p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-stone-900 text-[#D4A373] rounded-2xl"><Github size={24} /></div>
                    <h2 className="text-xl font-bold font-serif">Synchronisation Cloud</h2>
                </div>
                
                <div className="space-y-4">
                    <input type="password" value={githubConfig.token} onChange={e => setGithubConfig({...githubConfig, token: e.target.value})} placeholder="GitHub Token (ghp_...)" className="w-full p-4 rounded-xl bg-white/60 border border-stone-200 outline-none text-sm font-mono focus:border-[#D4A373]" />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={githubConfig.owner} onChange={e => setGithubConfig({...githubConfig, owner: e.target.value})} placeholder="Owner (Pseudo GitHub)" className="w-full p-4 rounded-xl bg-white/60 border border-stone-200 outline-none text-sm" />
                        <input type="text" value={githubConfig.repo} onChange={e => setGithubConfig({...githubConfig, repo: e.target.value})} placeholder="Nom du Repo" className="w-full p-4 rounded-xl bg-white/60 border border-stone-200 outline-none text-sm" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4">
                    <button 
                        onClick={handleSaveToGitHub} 
                        disabled={isSyncing}
                        className="w-full py-6 bg-stone-900 text-[#D4A373] font-bold rounded-[2rem] shadow-xl text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-all border border-[#D4A373]"
                    >
                        {isSyncing ? <RefreshCw size={20} className="animate-spin" /> : <CloudUpload size={20} />}
                        Enregistrer dans GitHub
                    </button>
                    
                    <button 
                        onClick={handleFetchFromGitHub} 
                        disabled={isSyncing}
                        className="w-full py-4 bg-white text-stone-900 font-bold rounded-[2rem] shadow-md text-xs uppercase tracking-widest flex items-center justify-center gap-3 border-2 border-stone-200 hover:bg-stone-50 transition-all"
                    >
                        <CloudDownload size={18} /> Récupérer du Cloud
                    </button>
                </div>

                {syncResult && (
                    <div className={`p-4 rounded-2xl text-xs font-bold border flex items-center gap-2 ${syncResult.success ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {syncResult.success ? <Check size={16} /> : <AlertTriangle size={16} />}
                        {syncResult.message}
                    </div>
                )}
            </div>

            {/* PIN CODE */}
            <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/40 p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-stone-900 text-[#D4A373] rounded-2xl"><Lock size={24} /></div>
                    <h2 className="text-xl font-bold font-serif">Code d'accès</h2>
                </div>
                
                <form onSubmit={handleChangePin} className="space-y-4">
                    <input type="password" value={currentPin} onChange={e => setCurrentPin(e.target.value)} placeholder="Ancien Code" className="w-full p-4 rounded-xl bg-white/60 border border-stone-200 text-center tracking-[0.5em] text-lg font-serif" maxLength={6} />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="password" value={newPin} onChange={e => setNewPin(e.target.value)} placeholder="Nouveau Code" className="w-full p-4 rounded-xl bg-white/60 border border-stone-200 text-center tracking-[0.5em] text-lg font-serif" maxLength={6} />
                        <input type="password" value={confirmPin} onChange={e => setConfirmPin(e.target.value)} placeholder="Confirmer" className="w-full p-4 rounded-xl bg-white/60 border border-stone-200 text-center tracking-[0.5em] text-lg font-serif" maxLength={6} />
                    </div>
                    
                    {pinStatus !== 'idle' && (
                        <div className={`p-3 rounded-xl text-xs font-bold border flex items-center gap-2 ${pinStatus === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                            {pinStatus === 'success' ? <Check size={14} /> : <AlertTriangle size={14} />}
                            {pinMessage}
                        </div>
                    )}

                    <button type="submit" className="w-full py-4 bg-stone-900 text-white font-bold rounded-2xl hover:scale-[1.02] transition-all shadow-lg border border-[#D4A373]">
                        Mettre à jour le PIN
                    </button>
                </form>
            </div>
        </div>

        {/* DANGER ZONE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="bg-red-50/20 backdrop-blur-xl rounded-[2.5rem] border-2 border-red-100 p-8 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4 text-red-600">
                        <Trash2 size={24} />
                        <h2 className="text-xl font-bold font-serif">Vider le Journal</h2>
                    </div>
                    <p className="text-xs text-stone-500 italic mb-6">Efface uniquement les ventes de la page Comptabilité.</p>
                </div>
                <button onClick={handleClearJournal} className="w-full py-5 bg-white text-red-600 font-bold rounded-[2rem] border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all text-xs uppercase tracking-widest">
                    Vider le journal des ventes
                </button>
            </div>

            <div className="bg-red-600/10 backdrop-blur-xl rounded-[2.5rem] border-2 border-red-600 p-8 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4 text-red-600">
                        <AlertTriangle size={24} />
                        <h2 className="text-xl font-bold font-serif">Réinitialisation Totale</h2>
                    </div>
                    <p className="text-xs text-white/60 italic mb-6">Efface toutes les données locales (Clientes, Stocks, Fournisseurs...).</p>
                </div>
                <button onClick={handleReset} className="w-full py-6 bg-red-600 text-white font-bold rounded-[2rem] shadow-xl hover:bg-red-700 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                    <Trash2 size={18} /> Réinitialiser tout le site
                </button>
            </div>
        </div>
    </div>
  );
};
