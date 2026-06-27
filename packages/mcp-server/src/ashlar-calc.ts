export type StoneType = "granite" | "limestone" | "sandstone" | "marble" | "slate";

export function compressiveStrengthMpa(stone: StoneType): number {
  const strengths: Record<StoneType, number> = {
    granite: 200, limestone: 60, sandstone: 40, marble: 100, slate: 80,
  };
  return strengths[stone];
}

export function densityKgPerM3(stone: StoneType): number {
  const densities: Record<StoneType, number> = {
    granite: 2700, limestone: 2300, sandstone: 2200, marble: 2700, slate: 2800,
  };
  return densities[stone];
}

export function waterAbsorptionPercent(stone: StoneType): number {
  const absorption: Record<StoneType, number> = {
    granite: 0.4, limestone: 5, sandstone: 8, marble: 0.5, slate: 0.2,
  };
  return absorption[stone];
}

export function bedJointMm(): number {
  return 10;
}

export function coursHeightCm(blockHeightCm: number, jointMm: number): number {
  return parseFloat((blockHeightCm + jointMm / 10).toFixed(1));
}

export function blocksPerM2(blockWidthCm: number, blockHeightCm: number): number {
  if (blockWidthCm <= 0 || blockHeightCm <= 0) return 0;
  return Math.round(10000 / (blockWidthCm * blockHeightCm));
}

export function cuttingTimeMinPerBlock(stone: StoneType): number {
  const times: Record<StoneType, number> = {
    granite: 45, limestone: 15, sandstone: 12, marble: 30, slate: 20,
  };
  return times[stone];
}

export function weatheringResistance(stone: StoneType): number {
  const ratings: Record<StoneType, number> = {
    granite: 5, limestone: 2, sandstone: 2, marble: 3, slate: 5,
  };
  return ratings[stone];
}

export function costPerM3(stone: StoneType): number {
  const costs: Record<StoneType, number> = {
    granite: 800, limestone: 300, sandstone: 250, marble: 1200, slate: 600,
  };
  return costs[stone];
}

export function stoneTypes(): StoneType[] {
  return ["granite", "limestone", "sandstone", "marble", "slate"];
}
