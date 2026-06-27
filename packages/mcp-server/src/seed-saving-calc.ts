export type SeedType = "dry_seed" | "wet_seed" | "pod_seed" | "berry_seed" | "wind_dispersed";

export function harvestWindowDays(seed: SeedType): number {
  const d: Record<SeedType, number> = {
    dry_seed: 14, wet_seed: 7, pod_seed: 10, berry_seed: 5, wind_dispersed: 3,
  };
  return d[seed];
}

export function cleaningMethod(seed: SeedType): string {
  const m: Record<SeedType, string> = {
    dry_seed: "winnowing", wet_seed: "fermentation", pod_seed: "threshing",
    berry_seed: "maceration", wind_dispersed: "screening",
  };
  return m[seed];
}

export function dryingDays(seed: SeedType): number {
  const d: Record<SeedType, number> = {
    dry_seed: 7, wet_seed: 14, pod_seed: 10, berry_seed: 12, wind_dispersed: 5,
  };
  return d[seed];
}

export function viabilityYears(seed: SeedType): number {
  const y: Record<SeedType, number> = {
    dry_seed: 5, wet_seed: 3, pod_seed: 4, berry_seed: 2, wind_dispersed: 1,
  };
  return y[seed];
}

export function storageHumidityPercent(seed: SeedType): number {
  const h: Record<SeedType, number> = {
    dry_seed: 8, wet_seed: 10, pod_seed: 8, berry_seed: 12, wind_dispersed: 6,
  };
  return h[seed];
}

export function coldStratificationRequired(seed: SeedType): boolean {
  return seed === "berry_seed" || seed === "wind_dispersed";
}

export function germinationRatePercent(seed: SeedType): number {
  const g: Record<SeedType, number> = {
    dry_seed: 85, wet_seed: 75, pod_seed: 80, berry_seed: 60, wind_dispersed: 50,
  };
  return g[seed];
}

export function processingDifficulty(seed: SeedType): number {
  const d: Record<SeedType, number> = {
    dry_seed: 2, wet_seed: 6, pod_seed: 3, berry_seed: 7, wind_dispersed: 4,
  };
  return d[seed];
}

export function seedsPerGram(seed: SeedType): number {
  const s: Record<SeedType, number> = {
    dry_seed: 50, wet_seed: 20, pod_seed: 10, berry_seed: 100, wind_dispersed: 500,
  };
  return s[seed];
}

export function seedTypes(): SeedType[] {
  return ["dry_seed", "wet_seed", "pod_seed", "berry_seed", "wind_dispersed"];
}
