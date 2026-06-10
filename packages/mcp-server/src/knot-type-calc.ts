export type KnotType = "bowline" | "clove_hitch" | "figure_eight" | "sheet_bend" | "trucker_hitch";

export function strengthPercent(knot: KnotType): number {
  const s: Record<KnotType, number> = {
    bowline: 60, clove_hitch: 65, figure_eight: 75, sheet_bend: 55, trucker_hitch: 70,
  };
  return s[knot];
}

export function tyingSpeed(knot: KnotType): number {
  const t: Record<KnotType, number> = {
    bowline: 7, clove_hitch: 9, figure_eight: 8, sheet_bend: 6, trucker_hitch: 4,
  };
  return t[knot];
}

export function untieEase(knot: KnotType): number {
  const u: Record<KnotType, number> = {
    bowline: 9, clove_hitch: 8, figure_eight: 7, sheet_bend: 8, trucker_hitch: 6,
  };
  return u[knot];
}

export function slipResistance(knot: KnotType): number {
  const s: Record<KnotType, number> = {
    bowline: 8, clove_hitch: 5, figure_eight: 9, sheet_bend: 6, trucker_hitch: 8,
  };
  return s[knot];
}

export function mechanicalAdvantage(knot: KnotType): boolean {
  const m: Record<KnotType, boolean> = {
    bowline: false, clove_hitch: false, figure_eight: false, sheet_bend: false, trucker_hitch: true,
  };
  return m[knot];
}

export function joinsTwoRopes(knot: KnotType): boolean {
  const j: Record<KnotType, boolean> = {
    bowline: false, clove_hitch: false, figure_eight: false, sheet_bend: true, trucker_hitch: false,
  };
  return j[knot];
}

export function bestUse(knot: KnotType): string {
  const b: Record<KnotType, string> = {
    bowline: "rescue_loop", clove_hitch: "quick_attach", figure_eight: "climbing",
    sheet_bend: "joining_lines", trucker_hitch: "load_securing",
  };
  return b[knot];
}

export function learningDifficulty(knot: KnotType): number {
  const l: Record<KnotType, number> = {
    bowline: 5, clove_hitch: 3, figure_eight: 4, sheet_bend: 6, trucker_hitch: 8,
  };
  return l[knot];
}

export function historicalAge(knot: KnotType): number {
  const h: Record<KnotType, number> = {
    bowline: 9, clove_hitch: 8, figure_eight: 10, sheet_bend: 10, trucker_hitch: 6,
  };
  return h[knot];
}

export function knotTypes(): KnotType[] {
  return ["bowline", "clove_hitch", "figure_eight", "sheet_bend", "trucker_hitch"];
}
