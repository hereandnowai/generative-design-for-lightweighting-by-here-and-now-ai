
import { Material, BrandingConfig, ComponentType } from './types';

export const BRANDING_CONFIG: BrandingConfig = {
  brand: {
    shortName: "HERE AND NOW AI",
    longName: "HERE AND NOW AI - Artificial Intelligence Research Institute",
    website: "https://hereandnowai.com",
    email: "info@hereandnowai.com",
    mobile: "+91 996 296 1000",
    slogan: "designed with passion for innovation",
    colors: {
      primary: "#FFDF00",
      secondary: "#004040"
    },
    logo: {
      title: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png",
      favicon: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/favicon-logo-with-name.png"
    },
    chatbot: {
      avatar: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel.jpeg",
      face: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel-face.jpeg"
    },
    socialMedia: {
      blog: "https://hereandnowai.com/blog",
      linkedin: "https://www.linkedin.com/company/hereandnowai/",
      instagram: "https://instagram.com/hereandnow_ai", // Completed URL
      github: "https://github.com/hereandnowai",
      x: "https://x.com/hereandnow_ai",
      youtube: "https://youtube.com/@hereandnow_ai"
    }
  }
};

export const MATERIALS: Material[] = [
  { id: 'aluminum-6061', name: 'Aluminum Alloy (6061)', density: 2700, yieldStrength: 276, elasticModulus: 69 },
  { id: 'aluminum-7075', name: 'Aluminum Alloy (7075)', density: 2810, yieldStrength: 503, elasticModulus: 71.7 },
  { id: 'titanium-ti6al4v', name: 'Titanium Alloy (Ti-6Al-4V)', density: 4430, yieldStrength: 830, elasticModulus: 113.8 },
  { id: 'carbon-fiber-composite', name: 'Carbon Fiber Composite (Generic)', density: 1600, yieldStrength: 600, elasticModulus: 70 }, // Properties can vary widely
  { id: 'magnesium-az91d', name: 'Magnesium Alloy (AZ91D)', density: 1810, yieldStrength: 160, elasticModulus: 45 },
  { id: 'steel-aisi-1020', name: 'Steel (AISI 1020)', density: 7870, yieldStrength: 350, elasticModulus: 200 },
  { id: 'steel-stainless-304', name: 'Stainless Steel (304)', density: 8000, yieldStrength: 215, elasticModulus: 193 },
];

export const COMPONENT_TYPES: ComponentType[] = [
  { id: 'bracket', name: 'Bracket', description: 'A structural support element.' },
  { id: 'beam', name: 'Beam', description: 'A structural element that primarily resists loads applied laterally to its axis.' },
  { id: 'housing', name: 'Housing', description: 'An enclosure for mechanical or electrical components.' },
  { id: 'lever', name: 'Lever', description: 'A rigid bar resting on a pivot, used to move a heavy load with one end when pressure is applied to the other.' },
  { id: 'custom', name: 'Custom Part', description: 'User-defined component type.' },
];

export const DEFAULT_SAFETY_FACTOR = 1.5;
