export type WoodSpecies = "walnut" | "maple" | "cherry" | "oak" | "boxwood";

export function spindleSpeedRpm(diameterMm: number): number {
  if (diameterMm <= 0) return 0;
  return Math.round(6000 / (diameterMm / 25.4));
}

export function gougeWidthMm(diameterMm: number): number {
  return Math.max(6, Math.min(25, Math.round(diameterMm * 0.15)));
}

export function sandingGrits(): number[] {
  return [80, 120, 180, 240, 320];
}

export function finishCoats(species: WoodSpecies): number {
  const coats: Record<WoodSpecies, number> = {
    walnut: 3, maple: 2, cherry: 3, oak: 4, boxwood: 2,
  };
  return coats[species];
}

export function hardnessJanka(species: WoodSpecies): number {
  const hardness: Record<WoodSpecies, number> = {
    walnut: 1010, maple: 1450, cherry: 950, oak: 1290, boxwood: 2840,
  };
  return hardness[species];
}

export function tearoutRisk(species: WoodSpecies): number {
  const risk: Record<WoodSpecies, number> = {
    walnut: 2, maple: 3, cherry: 2, oak: 4, boxwood: 1,
  };
  return risk[species];
}

export function toolSharpeningIntervalMin(species: WoodSpecies): number {
  const intervals: Record<WoodSpecies, number> = {
    walnut: 30, maple: 20, cherry: 35, oak: 15, boxwood: 10,
  };
  return intervals[species];
}

export function blankWeightKg(diameterMm: number, lengthMm: number, species: WoodSpecies): number {
  const density: Record<WoodSpecies, number> = {
    walnut: 640, maple: 705, cherry: 580, oak: 770, boxwood: 960,
  };
  const volumeM3 = Math.PI * Math.pow(diameterMm / 2000, 2) * (lengthMm / 1000);
  return parseFloat((volumeM3 * density[species]).toFixed(2));
}

export function costPerBoardFoot(species: WoodSpecies): number {
  const costs: Record<WoodSpecies, number> = {
    walnut: 12, maple: 6, cherry: 8, oak: 5, boxwood: 30,
  };
  return costs[species];
}

export function woodSpecies(): WoodSpecies[] {
  return ["walnut", "maple", "cherry", "oak", "boxwood"];
}
