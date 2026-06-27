export type BridleType = "corner" | "tee" | "mitered" | "oblique" | "haunched";

export function cheekLengthRatio(type: BridleType): number {
  const r: Record<BridleType, number> = {
    corner: 1, tee: 1, mitered: 1.4, oblique: 1.2, haunched: 0.8,
  };
  return r[type];
}

export function glueAreaMultiplier(type: BridleType): number {
  const g: Record<BridleType, number> = {
    corner: 2, tee: 2, mitered: 2.5, oblique: 2.2, haunched: 2.8,
  };
  return g[type];
}

export function strengthRating(type: BridleType): number {
  const s: Record<BridleType, number> = {
    corner: 6, tee: 7, mitered: 5, oblique: 6, haunched: 8,
  };
  return s[type];
}

export function rackResistance(type: BridleType): number {
  const r: Record<BridleType, number> = {
    corner: 5, tee: 7, mitered: 4, oblique: 6, haunched: 8,
  };
  return r[type];
}

export function sawCutsRequired(type: BridleType): number {
  const c: Record<BridleType, number> = {
    corner: 4, tee: 4, mitered: 6, oblique: 5, haunched: 6,
  };
  return c[type];
}

export function cuttingTimeMinutes(type: BridleType): number {
  const t: Record<BridleType, number> = {
    corner: 15, tee: 15, mitered: 25, oblique: 20, haunched: 30,
  };
  return t[type];
}

export function pinRequired(type: BridleType): boolean {
  return type === "haunched" || type === "oblique";
}

export function bestApplication(type: BridleType): string {
  const a: Record<BridleType, string> = {
    corner: "frame", tee: "partition", mitered: "picture_frame",
    oblique: "roof_truss", haunched: "door_frame",
  };
  return a[type];
}

export function difficultyRating(type: BridleType): number {
  const d: Record<BridleType, number> = {
    corner: 4, tee: 4, mitered: 7, oblique: 8, haunched: 6,
  };
  return d[type];
}

export function bridleTypes(): BridleType[] {
  return ["corner", "tee", "mitered", "oblique", "haunched"];
}
