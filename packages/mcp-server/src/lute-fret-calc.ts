export type LuteType = "renaissance" | "baroque" | "oud" | "theorbo" | "archlute";

export function courseCount(lute: LuteType): number {
  const c: Record<LuteType, number> = {
    renaissance: 8, baroque: 13, oud: 11, theorbo: 14, archlute: 14,
  };
  return c[lute];
}

export function fretCount(lute: LuteType): number {
  const f: Record<LuteType, number> = {
    renaissance: 8, baroque: 10, oud: 0, theorbo: 8, archlute: 10,
  };
  return f[lute];
}

export function stringLengthCm(lute: LuteType): number {
  const s: Record<LuteType, number> = {
    renaissance: 60, baroque: 68, oud: 62, theorbo: 90, archlute: 85,
  };
  return s[lute];
}

export function toneWarmth(lute: LuteType): number {
  const t: Record<LuteType, number> = {
    renaissance: 8, baroque: 7, oud: 9, theorbo: 6, archlute: 7,
  };
  return t[lute];
}

export function bassRange(lute: LuteType): number {
  const b: Record<LuteType, number> = {
    renaissance: 4, baroque: 7, oud: 5, theorbo: 10, archlute: 9,
  };
  return b[lute];
}

export function fretted(lute: LuteType): boolean {
  const f: Record<LuteType, boolean> = {
    renaissance: true, baroque: true, oud: false, theorbo: true, archlute: true,
  };
  return f[lute];
}

export function tuningComplexity(lute: LuteType): number {
  const t: Record<LuteType, number> = {
    renaissance: 5, baroque: 8, oud: 4, theorbo: 9, archlute: 9,
  };
  return t[lute];
}

export function historicalPeriod(lute: LuteType): string {
  const h: Record<LuteType, string> = {
    renaissance: "1400s", baroque: "1600s", oud: "ancient",
    theorbo: "1600s", archlute: "1600s",
  };
  return h[lute];
}

export function costEstimate(lute: LuteType): number {
  const c: Record<LuteType, number> = {
    renaissance: 2000, baroque: 3500, oud: 500, theorbo: 5000, archlute: 4500,
  };
  return c[lute];
}

export function luteTypes(): LuteType[] {
  return ["renaissance", "baroque", "oud", "theorbo", "archlute"];
}
