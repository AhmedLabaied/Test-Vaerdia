//this file contains the function to fetch the chart data
import axios from "axios";
import { NearEarthObject, ChartData } from "../interfaces";

export async function fetchNEOData(): Promise<ChartData[]> {
  try {
    const response = await axios.get(
      "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY"
    );

    const neos: NearEarthObject[] = response.data.near_earth_objects;

    const chartData = neos.map((neo) => {
      const min = neo.estimated_diameter.kilometers.estimated_diameter_min;
      const max = neo.estimated_diameter.kilometers.estimated_diameter_max;
      return {
        name: neo.name,
        min: parseFloat(min.toFixed(3)),
        max: parseFloat(max.toFixed(3)),
        avg: (min + max) / 2,
      };
    });

    chartData.sort((a, b) => b.avg - a.avg); // sorting the data descending by avg

    return chartData.map(({ name, min, max }) => ({ name, min, max }));
  } catch (error) {
    console.error("Error fetching NEO data:", error);
    return [];
  }
}