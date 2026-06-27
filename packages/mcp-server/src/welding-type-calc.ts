export type WeldingType = "mig" | "tig" | "stick" | "flux_cored" | "laser";

export function depositRate(w: WeldingType): number {
  const m: Record<WeldingType, number> = {
    mig: 8, tig: 3, stick: 5, flux_cored: 9, laser: 4,
  };
  return m[w];
}

export function weldQuality(w: WeldingType): number {
  const m: Record<WeldingType, number> = {
    mig: 7, tig: 10, stick: 6, flux_cored: 6, laser: 9,
  };
  return m[w];
}

export function skillRequired(w: WeldingType): number {
  const m: Record<WeldingType, number> = {
    mig: 3, tig: 9, stick: 6, flux_cored: 3, laser: 7,
  };
  return m[w];
}

export function equipmentCost(w: WeldingType): number {
  const m: Record<WeldingType, number> = {
    mig: 5, tig: 6, stick: 2, flux_cored: 5, laser: 10,
  };
  return m[w];
}

export function versatility(w: WeldingType): number {
  const m: Record<WeldingType, number> = {
    mig: 7, tig: 9, stick: 8, flux_cored: 6, laser: 5,
  };
  return m[w];
}

export function requiresShieldingGas(w: WeldingType): boolean {
  const m: Record<WeldingType, boolean> = {
    mig: true, tig: true, stick: false, flux_cored: false, laser: true,
  };
  return m[w];
}

export function outdoorCapable(w: WeldingType): boolean {
  const m: Record<WeldingType, boolean> = {
    mig: false, tig: false, stick: true, flux_cored: true, laser: false,
  };
  return m[w];
}

export function bestForMaterial(w: WeldingType): string {
  const m: Record<WeldingType, string> = {
    mig: "mild_steel", tig: "stainless_aluminum",
    stick: "structural_steel", flux_cored: "heavy_plate",
    laser: "thin_precision_parts",
  };
  return m[w];
}

export function heatInputLevel(w: WeldingType): string {
  const m: Record<WeldingType, string> = {
    mig: "medium", tig: "low_controlled",
    stick: "high", flux_cored: "high",
    laser: "very_low_focused",
  };
  return m[w];
}

export function weldingTypes(): WeldingType[] {
  return ["mig", "tig", "stick", "flux_cored", "laser"];
}
