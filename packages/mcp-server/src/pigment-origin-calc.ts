export type PigmentOrigin = "earth" | "mineral" | "organic" | "synthetic" | "lake";

export function lightfastness(origin: PigmentOrigin): number {
  const l: Record<PigmentOrigin, number> = {
    earth: 9, mineral: 8, organic: 3, synthetic: 7, lake: 4,
  };
  return l[origin];
}

export function tintingStrength(origin: PigmentOrigin): number {
  const t: Record<PigmentOrigin, number> = {
    earth: 5, mineral: 7, organic: 8, synthetic: 10, lake: 6,
  };
  return t[origin];
}

export function opacity(origin: PigmentOrigin): number {
  const o: Record<PigmentOrigin, number> = {
    earth: 8, mineral: 9, organic: 3, synthetic: 7, lake: 2,
  };
  return o[origin];
}

export function toxicity(origin: PigmentOrigin): number {
  const t: Record<PigmentOrigin, number> = {
    earth: 2, mineral: 7, organic: 1, synthetic: 4, lake: 2,
  };
  return t[origin];
}

export function grindDifficulty(origin: PigmentOrigin): number {
  const g: Record<PigmentOrigin, number> = {
    earth: 3, mineral: 8, organic: 4, synthetic: 2, lake: 5,
  };
  return g[origin];
}

export function historicalAvailability(origin: PigmentOrigin): boolean {
  const h: Record<PigmentOrigin, boolean> = {
    earth: true, mineral: true, organic: true, synthetic: false, lake: true,
  };
  return h[origin];
}

export function colorRange(origin: PigmentOrigin): number {
  const c: Record<PigmentOrigin, number> = {
    earth: 4, mineral: 6, organic: 7, synthetic: 10, lake: 8,
  };
  return c[origin];
}

export function bestMedium(origin: PigmentOrigin): string {
  const b: Record<PigmentOrigin, string> = {
    earth: "fresco", mineral: "tempera", organic: "watercolor",
    synthetic: "acrylic", lake: "oil",
  };
  return b[origin];
}

export function costPerGram(origin: PigmentOrigin): number {
  const c: Record<PigmentOrigin, number> = {
    earth: 0.5, mineral: 5, organic: 3, synthetic: 1, lake: 4,
  };
  return c[origin];
}

export function pigmentOrigins(): PigmentOrigin[] {
  return ["earth", "mineral", "organic", "synthetic", "lake"];
}
