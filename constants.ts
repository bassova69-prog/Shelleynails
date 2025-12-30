import { ServiceCategory } from './types';

// Using placeholders that mimic the provided vibe. 
// In a real deployment, these would be the uploaded assets.
// Added ?v=1 to force cache refresh (simulating git pull for assets)
export const ASSETS = {
  // Image de fond fournie
  BACKGROUND: "https://raw.githubusercontent.com/bassova69-prog/image/main/fond.png?v=1", 
  LOGO_PLACEHOLDER: "https://images.unsplash.com/photo-1522337360705-8763d39a820c?q=80&w=2670&auto=format&fit=crop",
  PROFILE_PIC: "https://images.unsplash.com/photo-1632324343640-86af9827dbe9?q=80&w=1000&auto=format&fit=crop", 
  // Lien direct (raw) vers l'image GitHub fournie
  LOGO_URL: "https://raw.githubusercontent.com/bassova69-prog/image/main/logo.png?v=1"
};

export const SOCIAL_LINKS = {
  INSTAGRAM: "https://www.instagram.com/shel",
  TIKTOK: "https://www.tiktok.com/@shel",
  BOOKING: "https://www.instagram.com/shel" 
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
    { 
        category: 'Les Extensions', 
        type: 'pricing', 
        items: [
            { name: 'Capsules Gelx (américaines)', price: '50', details: 'Extension sur mesure' },
            { name: 'Forfait dépose/repose Gelx', price: '55', details: 'Entretien complet' },
            { name: 'Capsules Gel', price: '60', details: 'Extension technique' },
            { name: 'Gainage Gel', price: '50', details: 'Sur ongles naturels' },
            { name: 'Remplissage Gel', price: '55', details: 'Entretien mensuel' },
            { name: 'Gainage base protéiné', price: '45', details: 'Renfort naturel' },
            { name: 'Remplissage protéiné', price: '50', details: 'Entretien renfort' },
            { name: 'Chablon Gel', price: '65', details: 'Extension papier forme' },
        ]
    },
    { 
        category: 'Nail Art & Extras', 
        type: 'pricing', 
        items: [
            { name: 'Dépose', price: '15', details: 'Toutes matières + manucure' },
            { name: 'Réparation/rallongement', price: '3', details: 'Par ongle (avec nail art: 5€)' },
            { name: 'Nail art easy', price: '10', details: 'Lignes, points, simple' },
            { name: 'Nail art complex', price: '20', details: 'Dessins, détails' },
            { name: 'Nail art challenging', price: '30', details: 'Personnages, 3D complexe' },
            { name: 'Nail art devis', price: '', details: 'Voir en DM' },
        ]
    },
    { 
        category: 'Avant de réserver', 
        type: 'info', 
        items: [
            { 
                name: 'Contact & Inspiration', 
                details: "Merci de me contacter par message pour choisir la prestation adaptée à tes besoins. Prévoir des photos d'inspiration !",
                action: { label: 'Message Instagram', link: 'https://ig.me/m/shel' }
            },
        ]
    },
    { 
        category: 'Règles du Salon', 
        type: 'info', 
        items: [
            { name: 'Annulation & Retard', details: "Être présent(e) le jour J. Prévenir 24h à l'avance en cas d'empêchement." },
        ]
    }
];

export const GALLERY_IMAGES = [
  "https://raw.githubusercontent.com/bassova69-prog/image/main/port3.png",
  "https://raw.githubusercontent.com/bassova69-prog/image/main/port4.png",
  "https://raw.githubusercontent.com/bassova69-prog/image/main/port5.png",
  "https://raw.githubusercontent.com/bassova69-prog/image/main/port6.png",
  "https://raw.githubusercontent.com/bassova69-prog/image/main/port2.png", 
  "https://raw.githubusercontent.com/bassova69-prog/image/main/port1.png", 
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop", // Green/Edgy
];

export const NAV_LINKS = [
  { name: 'Accueil', href: '#home' },
  { name: 'Tarifs', href: '#services' },
  { name: 'Designer IA', href: '#ai-consultant' }, /* Ajout du lien vers l'IA */
  { name: 'Coaching', href: '#coaching' },
  { name: 'Collab', href: '#collaboration' },
  { name: 'Galerie', href: '#gallery' },
];