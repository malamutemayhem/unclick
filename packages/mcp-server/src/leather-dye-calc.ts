export type LeatherDye = "aniline" | "spirit" | "water" | "oil" | "antique";

export function penetrationDepth(dye: LeatherDye): number {
  const p: Record<LeatherDye, number> = {
    aniline: 10, spirit: 8, water: 5, oil: 6, antique: 3,
  };
  return p[dye];
}

export function dryTimeMinutes(dye: LeatherDye): number {
  const d: Record<LeatherDye, number> = {
    aniline: 30, spirit: 15, water: 60, oil: 90, antique: 20,
  };
  return d[dye];
}

export function colorFastness(dye: LeatherDye): number {
  const c: Record<LeatherDye, number> = {
    aniline: 9, spirit: 7, water: 5, oil: 8, antique: 6,
  };
  return c[dye];
}

export function uvResistance(dye: LeatherDye): number {
  const u: Record<LeatherDye, number> = {
    aniline: 4, spirit: 5, water: 3, oil: 7, antique: 8,
  };
  return u[dye];
}

export function evenCoverage(dye: LeatherDye): number {
  const e: Record<LeatherDye, number> = {
    aniline: 9, spirit: 7, water: 6, oil: 5, antique: 3,
  };
  return e[dye];
}

export function multicoatNeeded(dye: LeatherDye): boolean {
  const m: Record<LeatherDye, boolean> = {
    aniline: false, spirit: true, water: true, oil: false, antique: true,
  };
  return m[dye];
}

export function bestFinish(dye: LeatherDye): string {
  const b: Record<LeatherDye, string> = {
    aniline: "resolene", spirit: "lacquer", water: "acrylic",
    oil: "natural", antique: "wax",
  };
  return b[dye];
}

export function toxicFumes(dye: LeatherDye): boolean {
  const t: Record<LeatherDye, boolean> = {
    aniline: true, spirit: true, water: false, oil: false, antique: false,
  };
  return t[dye];
}

export function costPerLiter(dye: LeatherDye): number {
  const c: Record<LeatherDye, number> = {
    aniline: 40, spirit: 30, water: 15, oil: 25, antique: 35,
  };
  return c[dye];
}

export function leatherDyes(): LeatherDye[] {
  return ["aniline", "spirit", "water", "oil", "antique"];
}
