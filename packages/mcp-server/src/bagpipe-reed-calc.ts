export type BagpipeReed = "chanter" | "tenor_drone" | "bass_drone" | "practice_chanter" | "synthetic";

export function caneLengthMm(reed: BagpipeReed): number {
  const l: Record<BagpipeReed, number> = {
    chanter: 47, tenor_drone: 30, bass_drone: 40, practice_chanter: 45, synthetic: 50,
  };
  return l[reed];
}

export function openingMm(reed: BagpipeReed): number {
  const o: Record<BagpipeReed, number> = {
    chanter: 1.2, tenor_drone: 0.8, bass_drone: 1.0, practice_chanter: 1.5, synthetic: 1.3,
  };
  return o[reed];
}

export function breakInDays(reed: BagpipeReed): number {
  const d: Record<BagpipeReed, number> = {
    chanter: 14, tenor_drone: 7, bass_drone: 10, practice_chanter: 7, synthetic: 0,
  };
  return d[reed];
}

export function lifespanWeeks(reed: BagpipeReed): number {
  const w: Record<BagpipeReed, number> = {
    chanter: 8, tenor_drone: 16, bass_drone: 12, practice_chanter: 12, synthetic: 52,
  };
  return w[reed];
}

export function pressureRequired(reed: BagpipeReed): number {
  const p: Record<BagpipeReed, number> = {
    chanter: 8, tenor_drone: 4, bass_drone: 5, practice_chanter: 6, synthetic: 7,
  };
  return p[reed];
}

export function humiditySensitive(reed: BagpipeReed): boolean {
  return reed !== "synthetic";
}

export function toneStability(reed: BagpipeReed): number {
  const t: Record<BagpipeReed, number> = {
    chanter: 6, tenor_drone: 8, bass_drone: 7, practice_chanter: 5, synthetic: 9,
  };
  return t[reed];
}

export function adjustability(reed: BagpipeReed): number {
  const a: Record<BagpipeReed, number> = {
    chanter: 9, tenor_drone: 6, bass_drone: 7, practice_chanter: 5, synthetic: 4,
  };
  return a[reed];
}

export function costPerReed(reed: BagpipeReed): number {
  const c: Record<BagpipeReed, number> = {
    chanter: 12, tenor_drone: 6, bass_drone: 8, practice_chanter: 8, synthetic: 20,
  };
  return c[reed];
}

export function bagpipeReeds(): BagpipeReed[] {
  return ["chanter", "tenor_drone", "bass_drone", "practice_chanter", "synthetic"];
}
