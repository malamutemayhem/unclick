export type EarthOvenMethod = "imu" | "hangi" | "pachamanca" | "barbacoa" | "clambake";

export function pitDepthCm(method: EarthOvenMethod): number {
  const d: Record<EarthOvenMethod, number> = {
    imu: 90, hangi: 60, pachamanca: 50, barbacoa: 70, clambake: 40,
  };
  return d[method];
}

export function cookingHours(method: EarthOvenMethod): number {
  const h: Record<EarthOvenMethod, number> = {
    imu: 12, hangi: 4, pachamanca: 3, barbacoa: 10, clambake: 2,
  };
  return h[method];
}

export function heatingMedium(method: EarthOvenMethod): string {
  const m: Record<EarthOvenMethod, string> = {
    imu: "lava_rocks", hangi: "river_stones", pachamanca: "volcanic_stones",
    barbacoa: "maguey_leaves", clambake: "seaweed_rocks",
  };
  return m[method];
}

export function servingsTypical(method: EarthOvenMethod): number {
  const s: Record<EarthOvenMethod, number> = {
    imu: 50, hangi: 30, pachamanca: 20, barbacoa: 40, clambake: 25,
  };
  return s[method];
}

export function prepTimeHours(method: EarthOvenMethod): number {
  const p: Record<EarthOvenMethod, number> = {
    imu: 6, hangi: 3, pachamanca: 2, barbacoa: 4, clambake: 3,
  };
  return p[method];
}

export function steamBased(method: EarthOvenMethod): boolean {
  return method === "hangi" || method === "clambake" || method === "pachamanca";
}

export function smokeContribution(method: EarthOvenMethod): number {
  const s: Record<EarthOvenMethod, number> = {
    imu: 7, hangi: 4, pachamanca: 3, barbacoa: 8, clambake: 5,
  };
  return s[method];
}

export function culturalOrigin(method: EarthOvenMethod): string {
  const c: Record<EarthOvenMethod, string> = {
    imu: "hawaiian", hangi: "maori", pachamanca: "peruvian",
    barbacoa: "mexican", clambake: "new_england",
  };
  return c[method];
}

export function difficultyRating(method: EarthOvenMethod): number {
  const d: Record<EarthOvenMethod, number> = {
    imu: 8, hangi: 6, pachamanca: 5, barbacoa: 7, clambake: 4,
  };
  return d[method];
}

export function earthOvenMethods(): EarthOvenMethod[] {
  return ["imu", "hangi", "pachamanca", "barbacoa", "clambake"];
}
