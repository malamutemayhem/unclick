export type RettingMethod = "dew" | "water" | "chemical" | "enzymatic" | "steam";

export function processingDays(method: RettingMethod): number {
  const p: Record<RettingMethod, number> = {
    dew: 21, water: 7, chemical: 1, enzymatic: 2, steam: 1,
  };
  return p[method];
}

export function fiberQuality(method: RettingMethod): number {
  const f: Record<RettingMethod, number> = {
    dew: 8, water: 9, chemical: 5, enzymatic: 8, steam: 6,
  };
  return f[method];
}

export function colorConsistency(method: RettingMethod): number {
  const c: Record<RettingMethod, number> = {
    dew: 5, water: 8, chemical: 9, enzymatic: 8, steam: 7,
  };
  return c[method];
}

export function waterUsageLiters(method: RettingMethod): number {
  const w: Record<RettingMethod, number> = {
    dew: 0, water: 500, chemical: 200, enzymatic: 100, steam: 50,
  };
  return w[method];
}

export function environmentalImpact(method: RettingMethod): number {
  const e: Record<RettingMethod, number> = {
    dew: 1, water: 6, chemical: 9, enzymatic: 3, steam: 4,
  };
  return e[method];
}

export function laborIntensity(method: RettingMethod): number {
  const l: Record<RettingMethod, number> = {
    dew: 8, water: 6, chemical: 3, enzymatic: 4, steam: 2,
  };
  return l[method];
}

export function scalable(method: RettingMethod): boolean {
  const s: Record<RettingMethod, boolean> = {
    dew: false, water: true, chemical: true, enzymatic: true, steam: true,
  };
  return s[method];
}

export function bestLinenGrade(method: RettingMethod): string {
  const b: Record<RettingMethod, string> = {
    dew: "fine_linen", water: "premium_linen", chemical: "industrial",
    enzymatic: "high_quality", steam: "standard",
  };
  return b[method];
}

export function costPerTon(method: RettingMethod): number {
  const c: Record<RettingMethod, number> = {
    dew: 200, water: 400, chemical: 600, enzymatic: 800, steam: 500,
  };
  return c[method];
}

export function rettingMethods(): RettingMethod[] {
  return ["dew", "water", "chemical", "enzymatic", "steam"];
}
