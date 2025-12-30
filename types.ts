export interface ServiceItem {
  name: string;
  price?: string;
  details: string;
  action?: {
    label: string;
    link: string;
  };
}

export interface ServiceCategory {
  category: string;
  type: 'pricing' | 'info';
  items: ServiceItem[];
}

export interface NavLink {
  name: string;
  href: string;
}