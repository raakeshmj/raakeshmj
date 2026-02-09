export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  link?: string;
  highlight?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}