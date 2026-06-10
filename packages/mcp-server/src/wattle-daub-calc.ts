export type DaubMix = "clay_straw" | "lime_sand" | "earth_dung" | "clay_hair" | "cob";

export function wattleSpacingCm(panelWidthCm: number): number {
  return Math.round(panelWidthCm / 10);
}

export function stakeDiameterMm(panelHeightCm: number): number {
  return Math.round(20 + panelHeightCm * 0.1);
}

export function weaverDiameterMm(): number {
  return 15;
}

export function daubThicknessCm(insulation: "minimal" | "standard" | "heavy"): number {
  const thickness: Record<string, number> = {
    minimal: 3, standard: 5, heavy: 8,
  };
  return thickness[insulation];
}

export function daubVolumeLitersPerM2(thicknessCm: number): number {
  return Math.round(thicknessCm * 10);
}

export function strawKgPerM2(mix: DaubMix): number {
  const straw: Record<DaubMix, number> = {
    clay_straw: 3, lime_sand: 0, earth_dung: 1, clay_hair: 0.5, cob: 4,
  };
  return straw[mix];
}

export function dryingTimeDays(thicknessCm: number): number {
  return Math.round(thicknessCm * 7);
}

export function thermalResistance(thicknessCm: number): number {
  return parseFloat((thicknessCm * 0.12).toFixed(2));
}

export function costPerM2(mix: DaubMix): number {
  const costs: Record<DaubMix, number> = {
    clay_straw: 15, lime_sand: 25, earth_dung: 10, clay_hair: 20, cob: 12,
  };
  return costs[mix];
}

export function daubMixes(): DaubMix[] {
  return ["clay_straw", "lime_sand", "earth_dung", "clay_hair", "cob"];
}
