export type KeelDesign = "fin" | "full" | "bulb" | "wing" | "centerboard";

export function pointingAbility(k: KeelDesign): number {
  const m: Record<KeelDesign, number> = {
    fin: 9, full: 4, bulb: 8, wing: 10, centerboard: 6,
  };
  return m[k];
}

export function stabilityRange(k: KeelDesign): number {
  const m: Record<KeelDesign, number> = {
    fin: 6, full: 10, bulb: 8, wing: 7, centerboard: 4,
  };
  return m[k];
}

export function shallowWaterCapability(k: KeelDesign): number {
  const m: Record<KeelDesign, number> = {
    fin: 3, full: 2, bulb: 4, wing: 3, centerboard: 10,
  };
  return m[k];
}

export function speedPotential(k: KeelDesign): number {
  const m: Record<KeelDesign, number> = {
    fin: 9, full: 4, bulb: 8, wing: 10, centerboard: 7,
  };
  return m[k];
}

export function maintenanceEase(k: KeelDesign): number {
  const m: Record<KeelDesign, number> = {
    fin: 7, full: 5, bulb: 4, wing: 3, centerboard: 8,
  };
  return m[k];
}

export function groundingResistant(k: KeelDesign): boolean {
  const m: Record<KeelDesign, boolean> = {
    fin: false, full: true, bulb: false, wing: false, centerboard: true,
  };
  return m[k];
}

export function racingOriented(k: KeelDesign): boolean {
  const m: Record<KeelDesign, boolean> = {
    fin: true, full: false, bulb: true, wing: true, centerboard: false,
  };
  return m[k];
}

export function typicalBoatType(k: KeelDesign): string {
  const m: Record<KeelDesign, string> = {
    fin: "modern_cruiser_racer", full: "bluewater_cruiser",
    bulb: "performance_cruiser", wing: "racing_yacht",
    centerboard: "dinghy_trailerable",
  };
  return m[k];
}

export function hydrodynamicProfile(k: KeelDesign): string {
  const m: Record<KeelDesign, string> = {
    fin: "high_aspect_foil", full: "long_chord_integrated",
    bulb: "weighted_tip_foil", wing: "biplane_endplate",
    centerboard: "retractable_daggerboard",
  };
  return m[k];
}

export function keelDesigns(): KeelDesign[] {
  return ["fin", "full", "bulb", "wing", "centerboard"];
}
