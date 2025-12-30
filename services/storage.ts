
import { AppData, Client, Transaction, Supplier, GiftCard, Order, TaxDeclaration, InventoryItem, CoachingRequest, CollabRequest, GitHubConfig } from '../types';

const STORAGE_KEY = 'shelleynails_data_v6';
const PIN_STORAGE_KEY = 'shelleynails_admin_pin';

const MOCK_DATA: AppData = {
  clients: [],
  transactions: [],
  suppliers: [],
  giftCards: [],
  orders: [],
  taxDeclarations: [],
  inventory: [],
  coachingRequests: [],
  collabRequests: [],
  githubConfig: {
    token: '',
    owner: '',
    repo: '',
    path: 'db.json',
    branch: 'main',
    enabled: false
  }
};

export const getAdminPin = (): string => {
  return localStorage.getItem(PIN_STORAGE_KEY) || '123456';
};

export const setAdminPin = (newPin: string) => {
  localStorage.setItem(PIN_STORAGE_KEY, newPin);
};

export const getData = (): AppData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
    return MOCK_DATA;
  }
  try {
    const data = JSON.parse(stored);
    if (!data.githubConfig) data.githubConfig = MOCK_DATA.githubConfig;
    return data;
  } catch (e) {
    return MOCK_DATA;
  }
};

export const saveData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const clearJournal = () => {
    const data = getData();
    data.transactions = [];
    saveData(data);
};

export const updateGitHubConfig = (config: GitHubConfig) => {
    const data = getData();
    data.githubConfig = config;
    saveData(data);
};

// --- GITHUB SYNC LOGIC ---

export const fetchFromGitHub = async (config: GitHubConfig): Promise<AppData | null> => {
    if (!config.token || !config.owner || !config.repo) return null;
    try {
        const response = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${config.branch}`, {
            headers: { 'Authorization': `token ${config.token}` }
        });
        if (!response.ok) return null;
        const json = await response.json();
        const content = atob(json.content);
        return JSON.parse(content);
    } catch (e) {
        console.error("GitHub Fetch Error", e);
        return null;
    }
};

export const saveToGitHub = async (data: AppData): Promise<{ success: boolean, message: string }> => {
    const config = data.githubConfig;
    if (!config?.token || !config.owner || !config.repo) return { success: false, message: "Configuration manquante." };

    try {
        const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}`;
        const getFile = await fetch(url, {
            headers: { 'Authorization': `token ${config.token}` }
        });

        let sha = "";
        if (getFile.ok) {
            const fileData = await getFile.json();
            sha = fileData.sha;
        }

        const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
        const putResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${config.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: "Update database from Shelleynails WebApp",
                content: content,
                sha: sha,
                branch: config.branch
            })
        });

        if (putResponse.ok) return { success: true, message: "Synchronisé avec succès !" };
        const errorData = await putResponse.json();
        return { success: false, message: errorData.message || "Erreur lors de l'envoi." };
    } catch (e: any) {
        return { success: false, message: e.message };
    }
};

// --- REST OF DATA FUNCTIONS (Minified for space) ---
export const addTransaction = (t: Transaction) => { const data = getData(); data.transactions.push(t); saveData(data); return data; };
export const deleteTransaction = (id: string) => { const data = getData(); data.transactions = data.transactions.filter(t => t.id !== id); saveData(data); return data; };
export const updateTransaction = (t: Transaction) => { const data = getData(); data.transactions = data.transactions.map(tr => tr.id === t.id ? t : tr); saveData(data); return data; };
export const addClient = (c: Client) => { const data = getData(); data.clients.push(c); saveData(data); return data; };
export const updateClient = (c: Client) => { const data = getData(); data.clients = data.clients.map(client => client.id === c.id ? c : client); saveData(data); return data; };
export const deleteClient = (id: string) => { const data = getData(); data.clients = data.clients.filter(c => c.id !== id); saveData(data); return data; };
export const addSupplier = (s: Supplier) => { const data = getData(); data.suppliers.push(s); saveData(data); return data; };
export const updateSupplier = (s: Supplier) => { const data = getData(); data.suppliers = data.suppliers.map(sup => sup.id === s.id ? s : sup); saveData(data); return data; };
export const deleteSupplier = (id: string) => { const data = getData(); data.suppliers = data.suppliers.filter(s => s.id !== id); saveData(data); return data; };
export const addGiftCard = (g: GiftCard) => { const data = getData(); data.giftCards.push(g); saveData(data); return data; };
export const deleteGiftCard = (id: string) => { const data = getData(); data.giftCards = data.giftCards.filter(g => g.id !== id); saveData(data); return data; };
export const toggleGiftCardRedeemed = (id: string) => {
  const data = getData();
  const cardIndex = data.giftCards.findIndex(g => g.id === id);
  if (cardIndex !== -1 && !data.giftCards[cardIndex].isRedeemed) {
    data.giftCards[cardIndex].isRedeemed = true;
    data.transactions.push({ id: Date.now().toString(), date: new Date().toISOString(), amount: data.giftCards[cardIndex].amount, type: 'Carte Cadeaux', category: 'Prestation', description: `Encaissement Carte Cadeau ${data.giftCards[cardIndex].code}` });
    saveData(data);
  }
  return data;
};
export const addOrder = (o: Order) => { const data = getData(); data.orders.push(o); saveData(data); return data; };
export const updateOrder = (o: Order) => { const data = getData(); data.orders = data.orders.map(order => order.id === o.id ? o : order); saveData(data); return data; };
export const deleteOrder = (id: string) => { const data = getData(); data.orders = data.orders.filter(o => o.id !== id); saveData(data); return data; };
export const addTaxDeclaration = (tax: TaxDeclaration) => { const data = getData(); data.taxDeclarations.push(tax); saveData(data); return data; };
export const updateTaxDeclaration = (tax: TaxDeclaration) => { const data = getData(); data.taxDeclarations = data.taxDeclarations.map(d => d.id === tax.id ? tax : d); saveData(data); return data; };
export const deleteTaxDeclaration = (id: string) => { const data = getData(); data.taxDeclarations = data.taxDeclarations.filter(d => d.id !== id); saveData(data); return data; };
export const updateInventoryItem = (item: InventoryItem) => { const data = getData(); const idx = data.inventory.findIndex(i => i.productName === item.productName); if (idx >= 0) { data.inventory[idx] = { ...item, lastUpdated: new Date().toISOString() }; } else { data.inventory.push({ ...item, lastUpdated: new Date().toISOString() }); } saveData(data); return data; };
export const submitCoachingRequest = (req: CoachingRequest) => { const data = getData(); data.coachingRequests.push(req); saveData(data); return data; };
export const submitCollabRequest = (req: CollabRequest) => { const data = getData(); data.collabRequests.push(req); saveData(data); return data; };
