export type WasteManagement = "landfill" | "incineration" | "recycling" | "composting" | "anaerobic_digestion";

export function diversionRate(w: WasteManagement): number {
  const m: Record<WasteManagement, number> = {
    landfill: 0, incineration: 3, recycling: 10, composting: 8, anaerobic_digestion: 9,
  };
  return m[w];
}

export function ghgEmissions(w: WasteManagement): number {
  const m: Record<WasteManagement, number> = {
    landfill: 10, incineration: 7, recycling: 2, composting: 3, anaerobic_digestion: 1,
  };
  return m[w];
}

export function operatingCost(w: WasteManagement): number {
  const m: Record<WasteManagement, number> = {
    landfill: 3, incineration: 8, recycling: 6, composting: 4, anaerobic_digestion: 7,
  };
  return m[w];
}

export function landRequired(w: WasteManagement): number {
  const m: Record<WasteManagement, number> = {
    landfill: 10, incineration: 3, recycling: 5, composting: 6, anaerobic_digestion: 4,
  };
  return m[w];
}

export function resourceRecovery(w: WasteManagement): number {
  const m: Record<WasteManagement, number> = {
    landfill: 1, incineration: 4, recycling: 9, composting: 7, anaerobic_digestion: 8,
  };
  return m[w];
}

export function producesEnergy(w: WasteManagement): boolean {
  const m: Record<WasteManagement, boolean> = {
    landfill: false, incineration: true, recycling: false, composting: false, anaerobic_digestion: true,
  };
  return m[w];
}

export function acceptsOrganicWaste(w: WasteManagement): boolean {
  const m: Record<WasteManagement, boolean> = {
    landfill: true, incineration: true, recycling: false, composting: true, anaerobic_digestion: true,
  };
  return m[w];
}

export function byproduct(w: WasteManagement): string {
  const m: Record<WasteManagement, string> = {
    landfill: "leachate", incineration: "fly_ash", recycling: "raw_materials",
    composting: "humus", anaerobic_digestion: "biogas",
  };
  return m[w];
}

export function bestForWasteType(w: WasteManagement): string {
  const m: Record<WasteManagement, string> = {
    landfill: "mixed_residual", incineration: "non_recyclable", recycling: "plastics_metals",
    composting: "food_garden", anaerobic_digestion: "wet_organic",
  };
  return m[w];
}

export function wasteManagementMethods(): WasteManagement[] {
  return ["landfill", "incineration", "recycling", "composting", "anaerobic_digestion"];
}
