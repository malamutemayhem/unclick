export type SpargeMethod = "batch" | "fly" | "no_sparge" | "parti_gyle" | "decoction_sparge";

export function waterVolumeFactor(method: SpargeMethod): number {
  const v: Record<SpargeMethod, number> = {
    batch: 1.5, fly: 1.5, no_sparge: 2.5, parti_gyle: 1.0, decoction_sparge: 1.3,
  };
  return v[method];
}

export function timeMinutes(method: SpargeMethod): number {
  const t: Record<SpargeMethod, number> = {
    batch: 20, fly: 60, no_sparge: 0, parti_gyle: 30, decoction_sparge: 45,
  };
  return t[method];
}

export function efficiencyPercent(method: SpargeMethod): number {
  const e: Record<SpargeMethod, number> = {
    batch: 75, fly: 85, no_sparge: 60, parti_gyle: 70, decoction_sparge: 80,
  };
  return e[method];
}

export function equipmentComplexity(method: SpargeMethod): number {
  const c: Record<SpargeMethod, number> = {
    batch: 3, fly: 7, no_sparge: 1, parti_gyle: 4, decoction_sparge: 6,
  };
  return c[method];
}

export function tanninRisk(method: SpargeMethod): number {
  const r: Record<SpargeMethod, number> = {
    batch: 3, fly: 6, no_sparge: 1, parti_gyle: 2, decoction_sparge: 4,
  };
  return r[method];
}

export function phMonitoringRequired(method: SpargeMethod): boolean {
  return method === "fly" || method === "decoction_sparge";
}

export function batchesProduced(method: SpargeMethod): number {
  const b: Record<SpargeMethod, number> = {
    batch: 1, fly: 1, no_sparge: 1, parti_gyle: 2, decoction_sparge: 1,
  };
  return b[method];
}

export function clarityRating(method: SpargeMethod): number {
  const c: Record<SpargeMethod, number> = {
    batch: 6, fly: 8, no_sparge: 4, parti_gyle: 5, decoction_sparge: 7,
  };
  return c[method];
}

export function costEstimate(method: SpargeMethod): number {
  const c: Record<SpargeMethod, number> = {
    batch: 20, fly: 80, no_sparge: 0, parti_gyle: 25, decoction_sparge: 30,
  };
  return c[method];
}

export function spargeMethods(): SpargeMethod[] {
  return ["batch", "fly", "no_sparge", "parti_gyle", "decoction_sparge"];
}
