export type VineyardTraining = "vsp" | "gobelet" | "pergola" | "guyot" | "cordon";

export function sunExposure(v: VineyardTraining): number {
  const m: Record<VineyardTraining, number> = {
    vsp: 8, gobelet: 6, pergola: 5, guyot: 7, cordon: 9,
  };
  return m[v];
}

export function mechanizationEase(v: VineyardTraining): number {
  const m: Record<VineyardTraining, number> = {
    vsp: 9, gobelet: 2, pergola: 4, guyot: 7, cordon: 8,
  };
  return m[v];
}

export function yieldPerHectare(v: VineyardTraining): number {
  const m: Record<VineyardTraining, number> = {
    vsp: 7, gobelet: 4, pergola: 9, guyot: 6, cordon: 8,
  };
  return m[v];
}

export function qualityPotential(v: VineyardTraining): number {
  const m: Record<VineyardTraining, number> = {
    vsp: 8, gobelet: 10, pergola: 5, guyot: 9, cordon: 7,
  };
  return m[v];
}

export function laborIntensity(v: VineyardTraining): number {
  const m: Record<VineyardTraining, number> = {
    vsp: 5, gobelet: 9, pergola: 7, guyot: 6, cordon: 4,
  };
  return m[v];
}

export function freeStanding(v: VineyardTraining): boolean {
  const m: Record<VineyardTraining, boolean> = {
    vsp: false, gobelet: true, pergola: false, guyot: false, cordon: false,
  };
  return m[v];
}

export function suitableForHotClimate(v: VineyardTraining): boolean {
  const m: Record<VineyardTraining, boolean> = {
    vsp: false, gobelet: true, pergola: true, guyot: false, cordon: true,
  };
  return m[v];
}

export function typicalRegion(v: VineyardTraining): string {
  const m: Record<VineyardTraining, string> = {
    vsp: "new_world_germany", gobelet: "mediterranean_old_vine",
    pergola: "italy_portugal", guyot: "burgundy_champagne",
    cordon: "california_australia",
  };
  return m[v];
}

export function canopyShape(v: VineyardTraining): string {
  const m: Record<VineyardTraining, string> = {
    vsp: "vertical_curtain", gobelet: "bush_form",
    pergola: "overhead_trellis", guyot: "arched_cane",
    cordon: "bilateral_arms",
  };
  return m[v];
}

export function vineyardTrainings(): VineyardTraining[] {
  return ["vsp", "gobelet", "pergola", "guyot", "cordon"];
}
