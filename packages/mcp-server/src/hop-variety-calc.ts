export type HopVariety = "cascade" | "saaz" | "citra" | "fuggle" | "hallertau";

export function alphaAcidPercent(hop: HopVariety): number {
  const a: Record<HopVariety, number> = {
    cascade: 6, saaz: 3.5, citra: 12, fuggle: 4.5, hallertau: 4,
  };
  return a[hop];
}

export function aromaIntensity(hop: HopVariety): number {
  const r: Record<HopVariety, number> = {
    cascade: 8, saaz: 7, citra: 10, fuggle: 6, hallertau: 7,
  };
  return r[hop];
}

export function bitteringPower(hop: HopVariety): number {
  const b: Record<HopVariety, number> = {
    cascade: 6, saaz: 3, citra: 9, fuggle: 4, hallertau: 3,
  };
  return b[hop];
}

export function oilContentMlPer100g(hop: HopVariety): number {
  const o: Record<HopVariety, number> = {
    cascade: 1.5, saaz: 0.7, citra: 2.5, fuggle: 0.8, hallertau: 0.9,
  };
  return o[hop];
}

export function storageStabilityPercent(hop: HopVariety): number {
  const s: Record<HopVariety, number> = {
    cascade: 50, saaz: 45, citra: 75, fuggle: 60, hallertau: 55,
  };
  return s[hop];
}

export function dualPurpose(hop: HopVariety): boolean {
  const d: Record<HopVariety, boolean> = {
    cascade: true, saaz: false, citra: true, fuggle: false, hallertau: false,
  };
  return d[hop];
}

export function primaryFlavor(hop: HopVariety): string {
  const p: Record<HopVariety, string> = {
    cascade: "grapefruit", saaz: "spicy", citra: "tropical_fruit",
    fuggle: "earthy", hallertau: "floral",
  };
  return p[hop];
}

export function bestBeerStyle(hop: HopVariety): string {
  const b: Record<HopVariety, string> = {
    cascade: "american_pale_ale", saaz: "pilsner", citra: "ipa",
    fuggle: "english_bitter", hallertau: "lager",
  };
  return b[hop];
}

export function costPerKg(hop: HopVariety): number {
  const c: Record<HopVariety, number> = {
    cascade: 25, saaz: 30, citra: 45, fuggle: 20, hallertau: 28,
  };
  return c[hop];
}

export function hopVarieties(): HopVariety[] {
  return ["cascade", "saaz", "citra", "fuggle", "hallertau"];
}
