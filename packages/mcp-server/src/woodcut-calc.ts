export type WoodType = "cherry" | "pear" | "boxwood" | "maple" | "linden";

export function hardnessRating(wood: WoodType): number {
  const ratings: Record<WoodType, number> = {
    cherry: 3, pear: 4, boxwood: 5, maple: 4, linden: 2,
  };
  return ratings[wood];
}

export function detailResolutionLpi(wood: WoodType): number {
  const lpi: Record<WoodType, number> = {
    cherry: 80, pear: 100, boxwood: 200, maple: 90, linden: 60,
  };
  return lpi[wood];
}

export function blockThicknessMm(wood: WoodType): number {
  const thickness: Record<WoodType, number> = {
    cherry: 23, pear: 20, boxwood: 15, maple: 25, linden: 30,
  };
  return thickness[wood];
}

export function gougeSizesNeeded(detailLevel: number): number {
  return Math.max(3, Math.min(12, Math.round(detailLevel * 1.5)));
}

export function carvingTimeHoursPerDm2(wood: WoodType): number {
  const hours: Record<WoodType, number> = {
    cherry: 2, pear: 2.5, boxwood: 4, maple: 2, linden: 1.5,
  };
  return hours[wood];
}

export function editionsPerBlock(wood: WoodType): number {
  const editions: Record<WoodType, number> = {
    cherry: 200, pear: 500, boxwood: 2000, maple: 300, linden: 100,
  };
  return editions[wood];
}

export function inkCoverageGPerM2(): number {
  return 15;
}

export function pressurePsi(): number {
  return 100;
}

export function costPerBlock(wood: WoodType): number {
  const costs: Record<WoodType, number> = {
    cherry: 15, pear: 25, boxwood: 80, maple: 12, linden: 8,
  };
  return costs[wood];
}

export function woodTypes(): WoodType[] {
  return ["cherry", "pear", "boxwood", "maple", "linden"];
}
