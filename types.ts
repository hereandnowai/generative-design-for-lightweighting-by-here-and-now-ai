
export interface BrandingConfig {
  brand: {
    shortName: string;
    longName: string;
    website: string;
    email: string;
    mobile: string;
    slogan: string;
    colors: {
      primary: string;
      secondary: string;
    };
    logo: {
      title: string;
      favicon: string;
    };
    chatbot: {
      avatar: string;
      face: string;
    };
    socialMedia: {
      blog: string;
      linkedin: string;
      instagram: string;
      github: string;
      x: string;
      youtube: string;
    };
  };
}

export interface Material {
  id: string;
  name: string;
  density: number; // kg/m^3
  yieldStrength: number; // MPa
  elasticModulus: number; // GPa
  properties?: Record<string, string | number>; 
}

export interface ComponentType {
  id: string;
  name: string;
  description?: string;
}

export interface DesignParameters {
  componentType: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  nonDesignSpaces?: Array<{x:number, y:number, z:number, w:number, h:number, d:number}>; // Example structure
  material: string;
  load: number; // Added to match current App.tsx state and form
  loads?: Array<{ point: {x:number, y:number, z:number}, magnitude: number, direction: {x:number, y:number, z:number} }>; // Kept as optional advanced feature
  constraints?: Array<{ type: string, region: any }>; // Kept as optional advanced feature
  safetyFactor: number;
}

export interface DesignResults {
  originalWeight: string; // Values are strings due to .toFixed() in App.tsx
  newWeight: string;
  weightReductionPercentage: string;
  materialSaved: string;
  stressDistributionData?: any; // Data for visualization
  stressDistribution: string; // Added based on App.tsx usage
  safetyFactorAchieved: string; // Renamed from safetyFactorMet, type string based on App.tsx
  manufacturingFeasibility: string;
  environmentalImpact: {
    fuelSavings?: string; 
    carbonReduction?: string; 
  };
  designFileUrl?: string; // Link to STL/STEP file
  designFile?: string; // Added based on App.tsx usage
  iterations?: any[];
  costAnalysis?: {
    materialCost: number;
    manufacturingCost: number;
    totalCost: number;
  };
  manufacturingRecommendations?: string[];
  optimizationSuggestions?: string[];
}

export interface HistoricDesign {
  id: string; // Unique identifier (e.g., timestamp or UUID)
  timestamp: string; // ISO string date of generation
  params: DesignParameters;
  results: DesignResults;
}
