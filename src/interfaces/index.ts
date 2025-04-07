//this file contains the app interfaces 

export interface DiameterRange {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  }
  
  export interface NearEarthObject {
    name: string;
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
    };
    close_approach_data: {
      orbiting_body: string;
    }[];
  }
  
  export interface ChartData {
    name: string;
    min: number;
    max: number;
  }