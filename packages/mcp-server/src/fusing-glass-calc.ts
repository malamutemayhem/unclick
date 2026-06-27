export type FuseType = "tack_fuse" | "contour_fuse" | "full_fuse" | "slump" | "drape";

export function peakTempCelsius(type: FuseType): number {
  const t: Record<FuseType, number> = {
    tack_fuse: 730, contour_fuse: 760, full_fuse: 800,
    slump: 680, drape: 700,
  };
  return t[type];
}

export function holdTimeMinutes(type: FuseType): number {
  const h: Record<FuseType, number> = {
    tack_fuse: 10, contour_fuse: 15, full_fuse: 20,
    slump: 15, drape: 20,
  };
  return h[type];
}

export function layersMax(type: FuseType): number {
  const l: Record<FuseType, number> = {
    tack_fuse: 4, contour_fuse: 3, full_fuse: 6,
    slump: 2, drape: 2,
  };
  return l[type];
}

export function textureRetention(type: FuseType): number {
  const r: Record<FuseType, number> = {
    tack_fuse: 9, contour_fuse: 6, full_fuse: 1,
    slump: 8, drape: 7,
  };
  return r[type];
}

export function moldRequired(type: FuseType): boolean {
  return type === "slump" || type === "drape";
}

export function annealingHours(type: FuseType): number {
  const a: Record<FuseType, number> = {
    tack_fuse: 4, contour_fuse: 5, full_fuse: 8,
    slump: 4, drape: 5,
  };
  return a[type];
}

export function compatibilityStrictness(type: FuseType): number {
  const c: Record<FuseType, number> = {
    tack_fuse: 7, contour_fuse: 8, full_fuse: 10,
    slump: 5, drape: 5,
  };
  return c[type];
}

export function skillLevel(type: FuseType): number {
  const s: Record<FuseType, number> = {
    tack_fuse: 3, contour_fuse: 5, full_fuse: 4,
    slump: 6, drape: 7,
  };
  return s[type];
}

export function costPerFiring(type: FuseType): number {
  const c: Record<FuseType, number> = {
    tack_fuse: 15, contour_fuse: 20, full_fuse: 25,
    slump: 18, drape: 22,
  };
  return c[type];
}

export function fuseTypes(): FuseType[] {
  return ["tack_fuse", "contour_fuse", "full_fuse", "slump", "drape"];
}
