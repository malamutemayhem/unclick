export type FretMaterial = "nickel_silver" | "stainless_steel" | "brass" | "evo_gold" | "copper";

export function fretPositionMm(scaleLength: number, fretNumber: number): number {
  return parseFloat((scaleLength - scaleLength / Math.pow(2, fretNumber / 12)).toFixed(2));
}

export function fretWidthMm(material: FretMaterial): number {
  const widths: Record<FretMaterial, number> = {
    nickel_silver: 2.4, stainless_steel: 2.7, brass: 2.3, evo_gold: 2.5, copper: 2.2,
  };
  return widths[material];
}

export function fretHeightMm(material: FretMaterial): number {
  const heights: Record<FretMaterial, number> = {
    nickel_silver: 1.2, stainless_steel: 1.3, brass: 1.1, evo_gold: 1.2, copper: 1.0,
  };
  return heights[material];
}

export function wearResistance(material: FretMaterial): number {
  const ratings: Record<FretMaterial, number> = {
    nickel_silver: 3, stainless_steel: 5, brass: 2, evo_gold: 4, copper: 1,
  };
  return ratings[material];
}

export function toneCharacter(material: FretMaterial): string {
  const tones: Record<FretMaterial, string> = {
    nickel_silver: "bright", stainless_steel: "crisp", brass: "warm",
    evo_gold: "balanced", copper: "mellow",
  };
  return tones[material];
}

export function installationTimeMinsPerFret(material: FretMaterial): number {
  const times: Record<FretMaterial, number> = {
    nickel_silver: 5, stainless_steel: 8, brass: 4, evo_gold: 6, copper: 4,
  };
  return times[material];
}

export function refretIntervalYears(material: FretMaterial): number {
  const years: Record<FretMaterial, number> = {
    nickel_silver: 5, stainless_steel: 15, brass: 3, evo_gold: 8, copper: 2,
  };
  return years[material];
}

export function totalFrets(): number {
  return 22;
}

export function costPerSet(material: FretMaterial): number {
  const costs: Record<FretMaterial, number> = {
    nickel_silver: 10, stainless_steel: 25, brass: 8, evo_gold: 20, copper: 6,
  };
  return costs[material];
}

export function fretMaterials(): FretMaterial[] {
  return ["nickel_silver", "stainless_steel", "brass", "evo_gold", "copper"];
}
