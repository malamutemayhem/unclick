export type RivetMetal = "copper" | "brass" | "steel" | "aluminum" | "iron";

export function rivetDiameterMm(sheetThicknessMm: number): number {
  return parseFloat((sheetThicknessMm * 1.5 + 1).toFixed(1));
}

export function rivetLengthMm(totalThicknessMm: number, diameterMm: number): number {
  return parseFloat((totalThicknessMm + diameterMm * 1.5).toFixed(1));
}

export function holeClearanceMm(rivetDiameterMm: number): number {
  return parseFloat((rivetDiameterMm + 0.2).toFixed(1));
}

export function headDiameterMm(rivetDiameterMm: number): number {
  return parseFloat((rivetDiameterMm * 1.6).toFixed(1));
}

export function settingForceNewtons(metal: RivetMetal, diameterMm: number): number {
  const factor: Record<RivetMetal, number> = {
    copper: 200, brass: 250, steel: 400, aluminum: 150, iron: 350,
  };
  return Math.round(factor[metal] * diameterMm);
}

export function shearStrengthNewtons(metal: RivetMetal, diameterMm: number): number {
  const factor: Record<RivetMetal, number> = {
    copper: 150, brass: 200, steel: 350, aluminum: 100, iron: 300,
  };
  return Math.round(factor[metal] * diameterMm * diameterMm);
}

export function annealingRequired(metal: RivetMetal): boolean {
  return metal === "copper" || metal === "brass";
}

export function spacingMm(rivetDiameterMm: number): number {
  return Math.round(rivetDiameterMm * 3);
}

export function costPer100(metal: RivetMetal): number {
  const costs: Record<RivetMetal, number> = {
    copper: 8, brass: 10, steel: 5, aluminum: 4, iron: 6,
  };
  return costs[metal];
}

export function rivetMetals(): RivetMetal[] {
  return ["copper", "brass", "steel", "aluminum", "iron"];
}
