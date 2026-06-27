export type PropagationMethod = "stem_cutting" | "leaf_cutting" | "division" | "layering" | "air_layering";

export function rootingWeeks(method: PropagationMethod): number {
  const w: Record<PropagationMethod, number> = {
    stem_cutting: 4, leaf_cutting: 8, division: 0, layering: 12, air_layering: 8,
  };
  return w[method];
}

export function successRatePercent(method: PropagationMethod): number {
  const r: Record<PropagationMethod, number> = {
    stem_cutting: 75, leaf_cutting: 60, division: 95, layering: 85, air_layering: 80,
  };
  return r[method];
}

export function parentPlantStress(method: PropagationMethod): number {
  const s: Record<PropagationMethod, number> = {
    stem_cutting: 3, leaf_cutting: 2, division: 7, layering: 1, air_layering: 4,
  };
  return s[method];
}

export function hormoneRequired(method: PropagationMethod): boolean {
  return method === "stem_cutting" || method === "air_layering";
}

export function newPlantsPerAttempt(method: PropagationMethod): number {
  const n: Record<PropagationMethod, number> = {
    stem_cutting: 1, leaf_cutting: 1, division: 4, layering: 1, air_layering: 1,
  };
  return n[method];
}

export function equipmentNeeded(method: PropagationMethod): number {
  const e: Record<PropagationMethod, number> = {
    stem_cutting: 3, leaf_cutting: 2, division: 4, layering: 2, air_layering: 5,
  };
  return e[method];
}

export function seasonDependent(method: PropagationMethod): number {
  const s: Record<PropagationMethod, number> = {
    stem_cutting: 7, leaf_cutting: 5, division: 8, layering: 6, air_layering: 4,
  };
  return s[method];
}

export function skillLevel(method: PropagationMethod): number {
  const s: Record<PropagationMethod, number> = {
    stem_cutting: 3, leaf_cutting: 2, division: 4, layering: 5, air_layering: 7,
  };
  return s[method];
}

export function costPerAttempt(method: PropagationMethod): number {
  const c: Record<PropagationMethod, number> = {
    stem_cutting: 2, leaf_cutting: 1, division: 3, layering: 2, air_layering: 5,
  };
  return c[method];
}

export function propagationMethods(): PropagationMethod[] {
  return ["stem_cutting", "leaf_cutting", "division", "layering", "air_layering"];
}
