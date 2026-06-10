export type HammerType = "cross_peen" | "ball_peen" | "rounding" | "sledge" | "planishing";

export function weightKg(hammer: HammerType): number {
  const w: Record<HammerType, number> = {
    cross_peen: 1.5, ball_peen: 1, rounding: 2, sledge: 5, planishing: 0.5,
  };
  return w[hammer];
}

export function strikePrecision(hammer: HammerType): number {
  const s: Record<HammerType, number> = {
    cross_peen: 7, ball_peen: 6, rounding: 5, sledge: 2, planishing: 10,
  };
  return s[hammer];
}

export function drawingAbility(hammer: HammerType): number {
  const d: Record<HammerType, number> = {
    cross_peen: 9, ball_peen: 5, rounding: 4, sledge: 3, planishing: 2,
  };
  return d[hammer];
}

export function spreadingAbility(hammer: HammerType): number {
  const s: Record<HammerType, number> = {
    cross_peen: 6, ball_peen: 8, rounding: 7, sledge: 5, planishing: 3,
  };
  return s[hammer];
}

export function surfaceFinish(hammer: HammerType): number {
  const f: Record<HammerType, number> = {
    cross_peen: 4, ball_peen: 5, rounding: 6, sledge: 1, planishing: 10,
  };
  return f[hammer];
}

export function twoHanded(hammer: HammerType): boolean {
  const t: Record<HammerType, boolean> = {
    cross_peen: false, ball_peen: false, rounding: false, sledge: true, planishing: false,
  };
  return t[hammer];
}

export function bestTask(hammer: HammerType): string {
  const b: Record<HammerType, string> = {
    cross_peen: "drawing_out", ball_peen: "riveting", rounding: "general_forging",
    sledge: "heavy_striking", planishing: "finishing",
  };
  return b[hammer];
}

export function fatigueRating(hammer: HammerType): number {
  const f: Record<HammerType, number> = {
    cross_peen: 5, ball_peen: 4, rounding: 6, sledge: 10, planishing: 2,
  };
  return f[hammer];
}

export function costEstimate(hammer: HammerType): number {
  const c: Record<HammerType, number> = {
    cross_peen: 60, ball_peen: 40, rounding: 80, sledge: 50, planishing: 70,
  };
  return c[hammer];
}

export function hammerTypes(): HammerType[] {
  return ["cross_peen", "ball_peen", "rounding", "sledge", "planishing"];
}
