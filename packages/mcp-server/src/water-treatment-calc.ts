export type WaterTreatment = "chlorination" | "reverse_osmosis" | "uv_disinfection" | "activated_carbon" | "ozonation";

export function pathogenRemovalPercent(w: WaterTreatment): number {
  const m: Record<WaterTreatment, number> = {
    chlorination: 95, reverse_osmosis: 99, uv_disinfection: 99, activated_carbon: 60, ozonation: 98,
  };
  return m[w];
}

export function operatingCostPerML(w: WaterTreatment): number {
  const m: Record<WaterTreatment, number> = {
    chlorination: 2, reverse_osmosis: 9, uv_disinfection: 4, activated_carbon: 5, ozonation: 7,
  };
  return m[w];
}

export function energyConsumption(w: WaterTreatment): number {
  const m: Record<WaterTreatment, number> = {
    chlorination: 1, reverse_osmosis: 9, uv_disinfection: 3, activated_carbon: 2, ozonation: 6,
  };
  return m[w];
}

export function maintenanceComplexity(w: WaterTreatment): number {
  const m: Record<WaterTreatment, number> = {
    chlorination: 3, reverse_osmosis: 8, uv_disinfection: 4, activated_carbon: 5, ozonation: 7,
  };
  return m[w];
}

export function tasteImprovement(w: WaterTreatment): number {
  const m: Record<WaterTreatment, number> = {
    chlorination: 2, reverse_osmosis: 8, uv_disinfection: 3, activated_carbon: 10, ozonation: 7,
  };
  return m[w];
}

export function chemicalFree(w: WaterTreatment): boolean {
  const m: Record<WaterTreatment, boolean> = {
    chlorination: false, reverse_osmosis: true, uv_disinfection: true, activated_carbon: true, ozonation: false,
  };
  return m[w];
}

export function removesDissolvedSolids(w: WaterTreatment): boolean {
  const m: Record<WaterTreatment, boolean> = {
    chlorination: false, reverse_osmosis: true, uv_disinfection: false, activated_carbon: false, ozonation: false,
  };
  return m[w];
}

export function primaryTarget(w: WaterTreatment): string {
  const m: Record<WaterTreatment, string> = {
    chlorination: "bacteria", reverse_osmosis: "dissolved_solids",
    uv_disinfection: "viruses", activated_carbon: "organic_compounds",
    ozonation: "microorganisms",
  };
  return m[w];
}

export function scaleSuitability(w: WaterTreatment): string {
  const m: Record<WaterTreatment, string> = {
    chlorination: "municipal", reverse_osmosis: "household_to_industrial",
    uv_disinfection: "point_of_use", activated_carbon: "household",
    ozonation: "municipal",
  };
  return m[w];
}

export function waterTreatments(): WaterTreatment[] {
  return ["chlorination", "reverse_osmosis", "uv_disinfection", "activated_carbon", "ozonation"];
}
