export type HiveType = "langstroth" | "top_bar" | "warre" | "flow" | "skep";

export function frameCount(hive: HiveType): number {
  const frames: Record<HiveType, number> = {
    langstroth: 10, top_bar: 28, warre: 8, flow: 7, skep: 0,
  };
  return frames[hive];
}

export function internalVolumeLiters(hive: HiveType): number {
  const volumes: Record<HiveType, number> = {
    langstroth: 42, top_bar: 80, warre: 36, flow: 38, skep: 30,
  };
  return volumes[hive];
}

export function broodBoxCount(hive: HiveType): number {
  const boxes: Record<HiveType, number> = {
    langstroth: 2, top_bar: 1, warre: 2, flow: 1, skep: 1,
  };
  return boxes[hive];
}

export function inspectionFrequencyDays(hive: HiveType): number {
  const days: Record<HiveType, number> = {
    langstroth: 10, top_bar: 14, warre: 21, flow: 14, skep: 30,
  };
  return days[hive];
}

export function winterSurvivalPercent(hive: HiveType): number {
  const survival: Record<HiveType, number> = {
    langstroth: 75, top_bar: 65, warre: 80, flow: 70, skep: 50,
  };
  return survival[hive];
}

export function honeyYieldKg(hive: HiveType): number {
  const yields: Record<HiveType, number> = {
    langstroth: 25, top_bar: 15, warre: 12, flow: 20, skep: 8,
  };
  return yields[hive];
}

export function beginnerFriendly(hive: HiveType): number {
  const ratings: Record<HiveType, number> = {
    langstroth: 4, top_bar: 3, warre: 3, flow: 5, skep: 1,
  };
  return ratings[hive];
}

export function weightEmptyKg(hive: HiveType): number {
  const weights: Record<HiveType, number> = {
    langstroth: 15, top_bar: 12, warre: 10, flow: 18, skep: 3,
  };
  return weights[hive];
}

export function costEstimate(hive: HiveType): number {
  const costs: Record<HiveType, number> = {
    langstroth: 200, top_bar: 150, warre: 120, flow: 600, skep: 50,
  };
  return costs[hive];
}

export function hiveTypes(): HiveType[] {
  return ["langstroth", "top_bar", "warre", "flow", "skep"];
}
