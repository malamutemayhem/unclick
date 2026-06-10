export type RopeFiber = "manila" | "sisal" | "hemp" | "cotton" | "jute";

export function strandCount(layType: "hawser" | "cable" | "shroud"): number {
  const counts: Record<string, number> = { hawser: 3, cable: 9, shroud: 4 };
  return counts[layType];
}

export function breakingStrengthKn(diameterMm: number, fiber: RopeFiber): number {
  const factor: Record<RopeFiber, number> = {
    manila: 0.08, sisal: 0.06, hemp: 0.09, cotton: 0.04, jute: 0.05,
  };
  return parseFloat((diameterMm * diameterMm * factor[fiber]).toFixed(1));
}

export function twistAngleDeg(fiber: RopeFiber): number {
  const angles: Record<RopeFiber, number> = {
    manila: 25, sisal: 22, hemp: 28, cotton: 20, jute: 23,
  };
  return angles[fiber];
}

export function weightKgPerM(diameterMm: number): number {
  return parseFloat((diameterMm * diameterMm * 0.0008).toFixed(3));
}

export function shrinkagePercent(fiber: RopeFiber): number {
  const shrink: Record<RopeFiber, number> = {
    manila: 5, sisal: 3, hemp: 4, cotton: 8, jute: 3,
  };
  return shrink[fiber];
}

export function uvResistanceYears(fiber: RopeFiber): number {
  const years: Record<RopeFiber, number> = {
    manila: 3, sisal: 2, hemp: 4, cotton: 1, jute: 2,
  };
  return years[fiber];
}

export function waterAbsorptionPercent(fiber: RopeFiber): number {
  const absorption: Record<RopeFiber, number> = {
    manila: 15, sisal: 20, hemp: 12, cotton: 25, jute: 22,
  };
  return absorption[fiber];
}

export function layingSpeedMPerHour(diameterMm: number): number {
  return Math.round(200 / diameterMm * 10);
}

export function costPerM(diameterMm: number, fiber: RopeFiber): number {
  const baseCost: Record<RopeFiber, number> = {
    manila: 0.5, sisal: 0.3, hemp: 0.6, cotton: 0.4, jute: 0.25,
  };
  return parseFloat((diameterMm * baseCost[fiber] / 10).toFixed(2));
}

export function ropeFibers(): RopeFiber[] {
  return ["manila", "sisal", "hemp", "cotton", "jute"];
}
