export type AnnealMethod = "kiln_soak" | "vermiculite" | "fiber_blanket" | "programmable" | "lehr";

export function soakTempCelsius(method: AnnealMethod): number {
  const t: Record<AnnealMethod, number> = {
    kiln_soak: 510, vermiculite: 0, fiber_blanket: 0,
    programmable: 510, lehr: 510,
  };
  return t[method];
}

export function coolingRateCelsiusPerHour(method: AnnealMethod): number {
  const r: Record<AnnealMethod, number> = {
    kiln_soak: 25, vermiculite: 50, fiber_blanket: 40,
    programmable: 15, lehr: 20,
  };
  return r[method];
}

export function stressReliefRating(method: AnnealMethod): number {
  const s: Record<AnnealMethod, number> = {
    kiln_soak: 8, vermiculite: 4, fiber_blanket: 5,
    programmable: 10, lehr: 9,
  };
  return s[method];
}

export function maxPieceWeightKg(method: AnnealMethod): number {
  const w: Record<AnnealMethod, number> = {
    kiln_soak: 20, vermiculite: 2, fiber_blanket: 3,
    programmable: 50, lehr: 100,
  };
  return w[method];
}

export function controllerRequired(method: AnnealMethod): boolean {
  return method === "programmable" || method === "lehr";
}

export function totalTimeHours(method: AnnealMethod, thicknessCm: number): number {
  const baseHoursPerCm: Record<AnnealMethod, number> = {
    kiln_soak: 3, vermiculite: 1, fiber_blanket: 1.5,
    programmable: 4, lehr: 3.5,
  };
  return baseHoursPerCm[method] * thicknessCm;
}

export function repeatability(method: AnnealMethod): number {
  const r: Record<AnnealMethod, number> = {
    kiln_soak: 7, vermiculite: 3, fiber_blanket: 4,
    programmable: 10, lehr: 9,
  };
  return r[method];
}

export function energyCost(method: AnnealMethod): number {
  const e: Record<AnnealMethod, number> = {
    kiln_soak: 6, vermiculite: 0, fiber_blanket: 0,
    programmable: 8, lehr: 9,
  };
  return e[method];
}

export function costEstimate(method: AnnealMethod): number {
  const c: Record<AnnealMethod, number> = {
    kiln_soak: 500, vermiculite: 20, fiber_blanket: 50,
    programmable: 2000, lehr: 5000,
  };
  return c[method];
}

export function annealMethods(): AnnealMethod[] {
  return ["kiln_soak", "vermiculite", "fiber_blanket", "programmable", "lehr"];
}
