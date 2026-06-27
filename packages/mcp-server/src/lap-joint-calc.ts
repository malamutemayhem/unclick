export type LapType = "half_lap" | "cross_lap" | "dovetail_lap" | "mitered_half" | "oblique_lap";

export function depthRatio(type: LapType): number {
  const d: Record<LapType, number> = {
    half_lap: 0.5, cross_lap: 0.5, dovetail_lap: 0.5,
    mitered_half: 0.5, oblique_lap: 0.5,
  };
  return d[type];
}

export function pullOutResistance(type: LapType): number {
  const r: Record<LapType, number> = {
    half_lap: 4, cross_lap: 5, dovetail_lap: 9,
    mitered_half: 3, oblique_lap: 6,
  };
  return r[type];
}

export function glueAreaRating(type: LapType): number {
  const g: Record<LapType, number> = {
    half_lap: 7, cross_lap: 8, dovetail_lap: 7,
    mitered_half: 5, oblique_lap: 6,
  };
  return g[type];
}

export function flushSurface(type: LapType): boolean {
  return true;
}

export function cuttingComplexity(type: LapType): number {
  const c: Record<LapType, number> = {
    half_lap: 2, cross_lap: 3, dovetail_lap: 7,
    mitered_half: 6, oblique_lap: 5,
  };
  return c[type];
}

export function toolsRequired(type: LapType): string {
  const t: Record<LapType, string> = {
    half_lap: "saw_and_chisel", cross_lap: "dado_blade",
    dovetail_lap: "router", mitered_half: "miter_saw",
    oblique_lap: "sliding_bevel",
  };
  return t[type];
}

export function clampsNeeded(type: LapType): number {
  const c: Record<LapType, number> = {
    half_lap: 2, cross_lap: 2, dovetail_lap: 1,
    mitered_half: 3, oblique_lap: 2,
  };
  return c[type];
}

export function bestForThicknessMm(type: LapType): number {
  const t: Record<LapType, number> = {
    half_lap: 20, cross_lap: 25, dovetail_lap: 18,
    mitered_half: 15, oblique_lap: 25,
  };
  return t[type];
}

export function aestheticRating(type: LapType): number {
  const a: Record<LapType, number> = {
    half_lap: 5, cross_lap: 6, dovetail_lap: 8,
    mitered_half: 7, oblique_lap: 6,
  };
  return a[type];
}

export function lapTypes(): LapType[] {
  return ["half_lap", "cross_lap", "dovetail_lap", "mitered_half", "oblique_lap"];
}
