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
