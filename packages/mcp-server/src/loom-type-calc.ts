export type LoomType = "backstrap" | "rigid_heddle" | "floor" | "tapestry" | "inkle";

export function maxWidthCm(loom: LoomType): number {
  const w: Record<LoomType, number> = {
    backstrap: 50, rigid_heddle: 80, floor: 150, tapestry: 200, inkle: 10,
  };
  return w[loom];
}

export function shaftCount(loom: LoomType): number {
  const s: Record<LoomType, number> = {
    backstrap: 2, rigid_heddle: 2, floor: 8, tapestry: 0, inkle: 0,
  };
  return s[loom];
}

export function portability(loom: LoomType): number {
  const p: Record<LoomType, number> = {
    backstrap: 10, rigid_heddle: 7, floor: 1, tapestry: 2, inkle: 9,
  };
  return p[loom];
}

export function setupTimeMinutes(loom: LoomType): number {
  const s: Record<LoomType, number> = {
    backstrap: 30, rigid_heddle: 45, floor: 180, tapestry: 120, inkle: 20,
  };
  return s[loom];
}

export function patternComplexity(loom: LoomType): number {
  const p: Record<LoomType, number> = {
    backstrap: 6, rigid_heddle: 4, floor: 9, tapestry: 10, inkle: 3,
  };
  return p[loom];
}

export function speedMetersPerHour(loom: LoomType): number {
  const s: Record<LoomType, number> = {
    backstrap: 0.3, rigid_heddle: 0.5, floor: 1.2, tapestry: 0.1, inkle: 0.8,
  };
  return s[loom];
}

export function skillLevel(loom: LoomType): number {
  const s: Record<LoomType, number> = {
    backstrap: 7, rigid_heddle: 3, floor: 6, tapestry: 8, inkle: 2,
  };
  return s[loom];
}

export function bestFor(loom: LoomType): string {
  const b: Record<LoomType, string> = {
    backstrap: "belts_and_bands", rigid_heddle: "scarves", floor: "yardage",
    tapestry: "wall_art", inkle: "straps",
  };
  return b[loom];
}

export function costEstimate(loom: LoomType): number {
  const c: Record<LoomType, number> = {
    backstrap: 30, rigid_heddle: 150, floor: 2000, tapestry: 500, inkle: 60,
  };
  return c[loom];
}

export function loomTypes(): LoomType[] {
  return ["backstrap", "rigid_heddle", "floor", "tapestry", "inkle"];
}
