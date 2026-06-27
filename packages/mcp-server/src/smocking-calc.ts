export type SmockingStitch = "cable" | "wave" | "honeycomb" | "diamond" | "vandyke";

export function fabricGatherRatio(stitch: SmockingStitch): number {
  const r: Record<SmockingStitch, number> = {
    cable: 2.5, wave: 3.0, honeycomb: 3.5, diamond: 2.8, vandyke: 2.5,
  };
  return r[stitch];
}

export function elasticity(stitch: SmockingStitch): number {
  const e: Record<SmockingStitch, number> = {
    cable: 3, wave: 6, honeycomb: 9, diamond: 5, vandyke: 4,
  };
  return e[stitch];
}

export function rowsPerCm(stitch: SmockingStitch): number {
  const r: Record<SmockingStitch, number> = {
    cable: 3, wave: 2, honeycomb: 2, diamond: 3, vandyke: 3,
  };
  return r[stitch];
}

export function threadLength(stitch: SmockingStitch): number {
  const t: Record<SmockingStitch, number> = {
    cable: 3, wave: 4, honeycomb: 5, diamond: 4, vandyke: 3,
  };
  return t[stitch];
}

export function decorativeRating(stitch: SmockingStitch): number {
  const d: Record<SmockingStitch, number> = {
    cable: 4, wave: 7, honeycomb: 8, diamond: 9, vandyke: 6,
  };
  return d[stitch];
}

export function reversiblePattern(stitch: SmockingStitch): boolean {
  return stitch === "honeycomb";
}

export function difficultyRating(stitch: SmockingStitch): number {
  const d: Record<SmockingStitch, number> = {
    cable: 2, wave: 4, honeycomb: 5, diamond: 7, vandyke: 6,
  };
  return d[stitch];
}

export function bestForGarment(stitch: SmockingStitch): string {
  const g: Record<SmockingStitch, string> = {
    cable: "bodice", wave: "sleeve", honeycomb: "yoke",
    diamond: "panel", vandyke: "cuff",
  };
  return g[stitch];
}

export function timePerRowMinutes(stitch: SmockingStitch): number {
  const t: Record<SmockingStitch, number> = {
    cable: 8, wave: 12, honeycomb: 15, diamond: 20, vandyke: 14,
  };
  return t[stitch];
}

export function smockingStitches(): SmockingStitch[] {
  return ["cable", "wave", "honeycomb", "diamond", "vandyke"];
}
