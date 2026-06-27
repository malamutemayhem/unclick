export type SpliceType = "eye" | "short" | "long" | "back" | "chain";

export function tuckCount(type: SpliceType): number {
  const tucks: Record<SpliceType, number> = {
    eye: 5, short: 5, long: 12, back: 4, chain: 6,
  };
  return tucks[type];
}

export function strengthRetentionPercent(type: SpliceType): number {
  const retention: Record<SpliceType, number> = {
    eye: 95, short: 85, long: 95, back: 80, chain: 70,
  };
  return retention[type];
}

export function extraRopeLengthFactor(type: SpliceType): number {
  const factor: Record<SpliceType, number> = {
    eye: 6, short: 12, long: 20, back: 4, chain: 8,
  };
  return factor[type];
}

export function difficultyRating(type: SpliceType): number {
  const diff: Record<SpliceType, number> = {
    eye: 2, short: 3, long: 4, back: 2, chain: 3,
  };
  return diff[type];
}

export function marlineSpikeRequired(type: SpliceType): boolean {
  return type !== "chain";
}

export function timeMinutes(type: SpliceType, diameterMm: number): number {
  const baseMinutes: Record<SpliceType, number> = {
    eye: 15, short: 25, long: 40, back: 10, chain: 20,
  };
  return Math.round(baseMinutes[type] * (diameterMm / 10));
}

export function weatherResistance(type: SpliceType): number {
  const resist: Record<SpliceType, number> = {
    eye: 5, short: 5, long: 5, back: 4, chain: 3,
  };
  return resist[type];
}

export function decorativeValue(type: SpliceType): number {
  const dec: Record<SpliceType, number> = {
    eye: 3, short: 2, long: 2, back: 4, chain: 5,
  };
  return dec[type];
}

export function costFactor(type: SpliceType): number {
  const cost: Record<SpliceType, number> = {
    eye: 1, short: 1.5, long: 2, back: 0.8, chain: 1.2,
  };
  return cost[type];
}

export function spliceTypes(): SpliceType[] {
  return ["eye", "short", "long", "back", "chain"];
}
