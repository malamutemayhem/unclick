export type StadiaMethod = "fixed_hair" | "self_reducing" | "subtense_bar" | "tacheometric" | "electronic";

export function accuracyRatio(method: StadiaMethod): number {
  const acc: Record<StadiaMethod, number> = {
    fixed_hair: 300, self_reducing: 500, subtense_bar: 1000,
    tacheometric: 400, electronic: 5000,
  };
  return acc[method];
}

export function maxDistanceM(method: StadiaMethod): number {
  const dist: Record<StadiaMethod, number> = {
    fixed_hair: 150, self_reducing: 200, subtense_bar: 300,
    tacheometric: 250, electronic: 3000,
  };
  return dist[method];
}

export function reductionRequired(method: StadiaMethod): boolean {
  return method === "fixed_hair" || method === "tacheometric";
}

export function rodRequired(method: StadiaMethod): boolean {
  return method !== "electronic";
}

export function readingsPerSetup(method: StadiaMethod): number {
  const r: Record<StadiaMethod, number> = {
    fixed_hair: 3, self_reducing: 2, subtense_bar: 1,
    tacheometric: 3, electronic: 1,
  };
  return r[method];
}

export function computationComplexity(method: StadiaMethod): number {
  const c: Record<StadiaMethod, number> = {
    fixed_hair: 7, self_reducing: 3, subtense_bar: 5,
    tacheometric: 8, electronic: 1,
  };
  return c[method];
}

export function speedPointsPerHour(method: StadiaMethod): number {
  const s: Record<StadiaMethod, number> = {
    fixed_hair: 15, self_reducing: 20, subtense_bar: 10,
    tacheometric: 12, electronic: 60,
  };
  return s[method];
}

export function elevationDifference(method: StadiaMethod): boolean {
  return method !== "subtense_bar";
}

export function costEstimate(method: StadiaMethod): number {
  const c: Record<StadiaMethod, number> = {
    fixed_hair: 100, self_reducing: 400, subtense_bar: 300,
    tacheometric: 200, electronic: 3000,
  };
  return c[method];
}

export function stadiaMethods(): StadiaMethod[] {
  return ["fixed_hair", "self_reducing", "subtense_bar", "tacheometric", "electronic"];
}
