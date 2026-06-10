export type LatheType = "mini" | "midi" | "full_size" | "bowl" | "pen";

export function swingDiameterCm(lathe: LatheType): number {
  const s: Record<LatheType, number> = {
    mini: 15, midi: 30, full_size: 45, bowl: 60, pen: 10,
  };
  return s[lathe];
}

export function bedLengthCm(lathe: LatheType): number {
  const b: Record<LatheType, number> = {
    mini: 30, midi: 60, full_size: 100, bowl: 50, pen: 20,
  };
  return b[lathe];
}

export function maxRpm(lathe: LatheType): number {
  const r: Record<LatheType, number> = {
    mini: 3500, midi: 3000, full_size: 2400, bowl: 1200, pen: 5000,
  };
  return r[lathe];
}

export function motorWatts(lathe: LatheType): number {
  const m: Record<LatheType, number> = {
    mini: 250, midi: 550, full_size: 1100, bowl: 1500, pen: 150,
  };
  return m[lathe];
}

export function weightKg(lathe: LatheType): number {
  const w: Record<LatheType, number> = {
    mini: 12, midi: 40, full_size: 120, bowl: 150, pen: 5,
  };
  return w[lathe];
}

export function variableSpeed(lathe: LatheType): boolean {
  const v: Record<LatheType, boolean> = {
    mini: true, midi: true, full_size: true, bowl: true, pen: false,
  };
  return v[lathe];
}

export function bestProject(lathe: LatheType): string {
  const b: Record<LatheType, string> = {
    mini: "small_bowls", midi: "spindles", full_size: "table_legs",
    bowl: "large_bowls", pen: "pens",
  };
  return b[lathe];
}

export function beginnerFriendly(lathe: LatheType): boolean {
  const f: Record<LatheType, boolean> = {
    mini: true, midi: true, full_size: false, bowl: false, pen: true,
  };
  return f[lathe];
}

export function costEstimate(lathe: LatheType): number {
  const c: Record<LatheType, number> = {
    mini: 200, midi: 500, full_size: 1200, bowl: 1800, pen: 100,
  };
  return c[lathe];
}

export function latheTypes(): LatheType[] {
  return ["mini", "midi", "full_size", "bowl", "pen"];
}
