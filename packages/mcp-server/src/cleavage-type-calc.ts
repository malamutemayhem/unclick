export type CleavageType = "perfect" | "good" | "poor" | "conchoidal" | "none";

export function breakPredictability(c: CleavageType): number {
  const m: Record<CleavageType, number> = {
    perfect: 10, good: 7, poor: 4, conchoidal: 6, none: 2,
  };
  return m[c];
}

export function cuttingDifficulty(c: CleavageType): number {
  const m: Record<CleavageType, number> = {
    perfect: 8, good: 6, poor: 4, conchoidal: 7, none: 3,
  };
  return m[c];
}

export function durabilityInJewelry(c: CleavageType): number {
  const m: Record<CleavageType, number> = {
    perfect: 3, good: 5, poor: 7, conchoidal: 8, none: 9,
  };
  return m[c];
}

export function surfaceSmoothness(c: CleavageType): number {
  const m: Record<CleavageType, number> = {
    perfect: 10, good: 7, poor: 4, conchoidal: 8, none: 2,
  };
  return m[c];
}

export function identificationValue(c: CleavageType): number {
  const m: Record<CleavageType, number> = {
    perfect: 9, good: 7, poor: 4, conchoidal: 8, none: 3,
  };
  return m[c];
}

export function planeFlat(c: CleavageType): boolean {
  const m: Record<CleavageType, boolean> = {
    perfect: true, good: true, poor: true, conchoidal: false, none: false,
  };
  return m[c];
}

export function requiresCare(c: CleavageType): boolean {
  const m: Record<CleavageType, boolean> = {
    perfect: true, good: true, poor: false, conchoidal: false, none: false,
  };
  return m[c];
}

export function exampleMineral(c: CleavageType): string {
  const m: Record<CleavageType, string> = {
    perfect: "mica_calcite", good: "feldspar_pyroxene",
    poor: "beryl_apatite", conchoidal: "quartz_obsidian",
    none: "gold_magnetite",
  };
  return m[c];
}

export function fracturePattern(c: CleavageType): string {
  const m: Record<CleavageType, string> = {
    perfect: "flat_sheets", good: "stepped_surfaces",
    poor: "uneven_rough", conchoidal: "curved_shell_like",
    none: "irregular_hackly",
  };
  return m[c];
}

export function cleavageTypes(): CleavageType[] {
  return ["perfect", "good", "poor", "conchoidal", "none"];
}
