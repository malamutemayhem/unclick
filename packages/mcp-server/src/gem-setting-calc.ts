export type GemSetting = "prong" | "bezel" | "channel" | "pave" | "tension";

export function stoneSecurityRating(setting: GemSetting): number {
  const s: Record<GemSetting, number> = {
    prong: 6, bezel: 10, channel: 8, pave: 5, tension: 4,
  };
  return s[setting];
}

export function lightExposure(setting: GemSetting): number {
  const l: Record<GemSetting, number> = {
    prong: 10, bezel: 4, channel: 6, pave: 8, tension: 9,
  };
  return l[setting];
}

export function difficultyLevel(setting: GemSetting): number {
  const d: Record<GemSetting, number> = {
    prong: 5, bezel: 6, channel: 7, pave: 9, tension: 10,
  };
  return d[setting];
}

export function metalUsageGrams(setting: GemSetting): number {
  const m: Record<GemSetting, number> = {
    prong: 2, bezel: 4, channel: 5, pave: 3, tension: 6,
  };
  return m[setting];
}

export function resizeability(setting: GemSetting): number {
  const r: Record<GemSetting, number> = {
    prong: 8, bezel: 5, channel: 3, pave: 4, tension: 1,
  };
  return r[setting];
}

export function activeLifestyleSafe(setting: GemSetting): boolean {
  const a: Record<GemSetting, boolean> = {
    prong: false, bezel: true, channel: true, pave: false, tension: false,
  };
  return a[setting];
}

export function bestGemShape(setting: GemSetting): string {
  const b: Record<GemSetting, string> = {
    prong: "round", bezel: "oval", channel: "baguette",
    pave: "melee", tension: "princess",
  };
  return b[setting];
}

export function repairEase(setting: GemSetting): number {
  const r: Record<GemSetting, number> = {
    prong: 9, bezel: 5, channel: 4, pave: 3, tension: 2,
  };
  return r[setting];
}

export function laborCost(setting: GemSetting): number {
  const c: Record<GemSetting, number> = {
    prong: 30, bezel: 60, channel: 80, pave: 120, tension: 150,
  };
  return c[setting];
}

export function gemSettings(): GemSetting[] {
  return ["prong", "bezel", "channel", "pave", "tension"];
}
