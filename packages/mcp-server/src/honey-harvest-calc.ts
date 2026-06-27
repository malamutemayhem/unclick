export type HoneyType = "wildflower" | "clover" | "manuka" | "acacia" | "buckwheat";

export function moistureTargetPercent(): number {
  return 18;
}

export function extractionMethod(honeyType: HoneyType): string {
  const methods: Record<HoneyType, string> = {
    wildflower: "centrifuge", clover: "centrifuge", manuka: "crush_strain",
    acacia: "centrifuge", buckwheat: "centrifuge",
  };
  return methods[honeyType];
}

export function crystallizationDays(honeyType: HoneyType): number {
  const days: Record<HoneyType, number> = {
    wildflower: 60, clover: 30, manuka: 90, acacia: 365, buckwheat: 45,
  };
  return days[honeyType];
}

export function colorGradeRating(honeyType: HoneyType): number {
  const grades: Record<HoneyType, number> = {
    wildflower: 3, clover: 1, manuka: 4, acacia: 1, buckwheat: 5,
  };
  return grades[honeyType];
}

export function antioxidantLevel(honeyType: HoneyType): number {
  const levels: Record<HoneyType, number> = {
    wildflower: 3, clover: 2, manuka: 5, acacia: 2, buckwheat: 5,
  };
  return levels[honeyType];
}

export function yieldKgPerHive(honeyType: HoneyType): number {
  const yields: Record<HoneyType, number> = {
    wildflower: 20, clover: 30, manuka: 15, acacia: 25, buckwheat: 18,
  };
  return yields[honeyType];
}

export function storageYears(): number {
  return 999;
}

export function uncappingTempCelsius(): number {
  return 32;
}

export function costPerKg(honeyType: HoneyType): number {
  const costs: Record<HoneyType, number> = {
    wildflower: 10, clover: 8, manuka: 80, acacia: 15, buckwheat: 12,
  };
  return costs[honeyType];
}

export function honeyTypes(): HoneyType[] {
  return ["wildflower", "clover", "manuka", "acacia", "buckwheat"];
}
