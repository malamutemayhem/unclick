export type LivestockSystem = "intensive" | "extensive" | "free_range" | "organic" | "silvopasture";

export function productionPerHectare(l: LivestockSystem): number {
  const m: Record<LivestockSystem, number> = {
    intensive: 10, extensive: 3, free_range: 5, organic: 4, silvopasture: 4,
  };
  return m[l];
}

export function animalWelfare(l: LivestockSystem): number {
  const m: Record<LivestockSystem, number> = {
    intensive: 2, extensive: 7, free_range: 8, organic: 9, silvopasture: 10,
  };
  return m[l];
}

export function environmentalFootprint(l: LivestockSystem): number {
  const m: Record<LivestockSystem, number> = {
    intensive: 9, extensive: 5, free_range: 4, organic: 3, silvopasture: 1,
  };
  return m[l];
}

export function laborIntensity(l: LivestockSystem): number {
  const m: Record<LivestockSystem, number> = {
    intensive: 5, extensive: 3, free_range: 6, organic: 8, silvopasture: 7,
  };
  return m[l];
}

export function landRequirement(l: LivestockSystem): number {
  const m: Record<LivestockSystem, number> = {
    intensive: 1, extensive: 10, free_range: 7, organic: 6, silvopasture: 9,
  };
  return m[l];
}

export function antibioticUse(l: LivestockSystem): boolean {
  const m: Record<LivestockSystem, boolean> = {
    intensive: true, extensive: true, free_range: true, organic: false, silvopasture: false,
  };
  return m[l];
}

export function carbonSequestering(l: LivestockSystem): boolean {
  const m: Record<LivestockSystem, boolean> = {
    intensive: false, extensive: false, free_range: false, organic: false, silvopasture: true,
  };
  return m[l];
}

export function typicalAnimal(l: LivestockSystem): string {
  const m: Record<LivestockSystem, string> = {
    intensive: "poultry_swine", extensive: "beef_cattle",
    free_range: "layer_hens", organic: "dairy_cattle",
    silvopasture: "sheep_goats",
  };
  return m[l];
}

export function marketPremium(l: LivestockSystem): string {
  const m: Record<LivestockSystem, string> = {
    intensive: "commodity_price", extensive: "slight_premium",
    free_range: "moderate_premium", organic: "high_premium",
    silvopasture: "niche_premium",
  };
  return m[l];
}

export function livestockSystems(): LivestockSystem[] {
  return ["intensive", "extensive", "free_range", "organic", "silvopasture"];
}
