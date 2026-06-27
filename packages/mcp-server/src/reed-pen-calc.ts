export type ReedPenType = "qalam" | "calamus" | "egyptian_rush" | "phragmites" | "arundo";

export function nibWidthMm(type: ReedPenType): number {
  const w: Record<ReedPenType, number> = {
    qalam: 2, calamus: 3, egyptian_rush: 1.5, phragmites: 2.5, arundo: 4,
  };
  return w[type];
}

export function strokeVariation(type: ReedPenType): number {
  const s: Record<ReedPenType, number> = {
    qalam: 9, calamus: 7, egyptian_rush: 6, phragmites: 8, arundo: 5,
  };
  return s[type];
}

export function inkCapacity(type: ReedPenType): number {
  const c: Record<ReedPenType, number> = {
    qalam: 7, calamus: 8, egyptian_rush: 4, phragmites: 6, arundo: 9,
  };
  return c[type];
}

export function resharpeningFrequency(type: ReedPenType): number {
  const r: Record<ReedPenType, number> = {
    qalam: 5, calamus: 3, egyptian_rush: 8, phragmites: 4, arundo: 2,
  };
  return r[type];
}

export function bestForScript(type: ReedPenType): string {
  const s: Record<ReedPenType, string> = {
    qalam: "arabic", calamus: "latin", egyptian_rush: "hieratic",
    phragmites: "devanagari", arundo: "uncial",
  };
  return s[type];
}

export function splitNib(type: ReedPenType): boolean {
  return type === "qalam" || type === "calamus" || type === "phragmites";
}

export function lifespanHours(type: ReedPenType): number {
  const l: Record<ReedPenType, number> = {
    qalam: 8, calamus: 6, egyptian_rush: 3, phragmites: 5, arundo: 10,
  };
  return l[type];
}

export function flexibility(type: ReedPenType): number {
  const f: Record<ReedPenType, number> = {
    qalam: 7, calamus: 5, egyptian_rush: 8, phragmites: 6, arundo: 3,
  };
  return f[type];
}

export function costEstimate(type: ReedPenType): number {
  const c: Record<ReedPenType, number> = {
    qalam: 5, calamus: 3, egyptian_rush: 2, phragmites: 3, arundo: 4,
  };
  return c[type];
}

export function reedPenTypes(): ReedPenType[] {
  return ["qalam", "calamus", "egyptian_rush", "phragmites", "arundo"];
}
