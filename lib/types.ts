export interface Price {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
}

export interface OpeningHours {
  id: string;
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface SiteConfig {
  businessName: string;
  phone: string;
  email: string;
  address: string;
}

// Birthday event specific types
export interface MenuItem {
  id: string;
  name: string;
  price: number; // price in SEK
  unit?: string; // e.g. "kr/barn"
  note?: string; // optional note like weight
}

export interface ExtraItem {
  id: string;
  name: string;
  price: number; // additional price in SEK
  unit?: string; // e.g. "kr"
  free?: boolean; // chips instead of candy bag +0kr
}
