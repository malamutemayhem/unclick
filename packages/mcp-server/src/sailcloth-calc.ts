export type SailclothType = "flax" | "cotton" | "dacron" | "nylon" | "kevlar";

export function weightOzPerYd2(type: SailclothType): number {
  const weights: Record<SailclothType, number> = {
    flax: 12, cotton: 8, dacron: 4, nylon: 3, kevlar: 5,
  };
  return weights[type];
}

export function breakingStrengthKn(type: SailclothType): number {
  const strength: Record<SailclothType, number> = {
    flax: 15, cotton: 10, dacron: 25, nylon: 20, kevlar: 45,
  };
  return strength[type];
}

export function uvResistanceYears(type: SailclothType): number {
  const years: Record<SailclothType, number> = {
    flax: 3, cotton: 2, dacron: 8, nylon: 5, kevlar: 4,
  };
  return years[type];
}

export function stretchPercent(type: SailclothType): number {
  const stretch: Record<SailclothType, number> = {
    flax: 2, cotton: 3, dacron: 1.5, nylon: 8, kevlar: 0.5,
  };
  return stretch[type];
}

export function sailAreaM2(luffM: number, footM: number): number {
  return parseFloat((0.5 * luffM * footM).toFixed(1));
}

export function clothNeededM2(sailAreaM2: number, wastePercent: number): number {
  return parseFloat((sailAreaM2 * (1 + wastePercent / 100)).toFixed(1));
}

export function seamAllowanceCm(type: SailclothType): number {
  const allowances: Record<SailclothType, number> = {
    flax: 5, cotton: 4, dacron: 2, nylon: 2, kevlar: 3,
  };
  return allowances[type];
}

export function stitchesPerCm(type: SailclothType): number {
  const stitches: Record<SailclothType, number> = {
    flax: 3, cotton: 4, dacron: 5, nylon: 5, kevlar: 4,
  };
  return stitches[type];
}

export function costPerM2(type: SailclothType): number {
  const costs: Record<SailclothType, number> = {
    flax: 25, cotton: 15, dacron: 35, nylon: 20, kevlar: 80,
  };
  return costs[type];
}

export function sailclothTypes(): SailclothType[] {
  return ["flax", "cotton", "dacron", "nylon", "kevlar"];
}
