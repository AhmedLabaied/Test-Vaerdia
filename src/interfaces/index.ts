//this file contains the app interfaces 

export interface DiameterRange {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  }
  
  export interface NearEarthObject {
    id: string;
    name: string;
    estimated_diameter: {
      kilometers: DiameterRange;
    };
  }
  
  export interface ChartData {
    name: string;
    min: number;
    max: number;
  }