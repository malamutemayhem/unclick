export type DyeType = "acid" | "fiber_reactive" | "natural" | "direct" | "disperse";
export type FiberType = "wool" | "cotton" | "silk" | "nylon" | "polyester" | "linen";

export function dyeCompatibility(fiber: FiberType): DyeType[] {
  const compat: Record<FiberType, DyeType[]> = {
    wool: ["acid", "natural"],
    cotton: ["fiber_reactive", "natural", "direct"],
    silk: ["acid", "fiber_reactive", "natural"],
    nylon: ["acid", "disperse"],
    polyester: ["disperse"],
    linen: ["fiber_reactive", "natural", "direct"],
  };
  return compat[fiber];
}

export function dyeAmount(yarnWeightG: number, dosPercent: number = 2): number {
  return parseFloat((yarnWeightG * dosPercent / 100).toFixed(2));
}

export function waterAmount(yarnWeightG: number, waterRatio: number = 30): number {
  return parseFloat((yarnWeightG * waterRatio).toFixed(0));
}

export function auxiliaryAmount(dyeType: DyeType, yarnWeightG: number): { name: string; amount: number; unit: string } {
  switch (dyeType) {
    case "acid":
      return { name: "citric acid", amount: parseFloat((yarnWeightG * 0.04).toFixed(1)), unit: "g" };
    case "fiber_reactive":
      return { name: "soda ash", amount: parseFloat((yarnWeightG * 0.1).toFixed(1)), unit: "g" };
    case "natural":
      return { name: "alum mordant", amount: parseFloat((yarnWeightG * 0.15).toFixed(1)), unit: "g" };
    case "direct":
      return { name: "salt", amount: parseFloat((yarnWeightG * 0.2).toFixed(1)), unit: "g" };
    case "disperse":
      return { name: "carrier", amount: parseFloat((yarnWeightG * 0.02).toFixed(1)), unit: "ml" };
  }
}

export function dyeTemp(dyeType: DyeType): number {
  const temps: Record<DyeType, number> = {
    acid: 90,
    fiber_reactive: 40,
    natural: 80,
    direct: 90,
    disperse: 130,
  };
  return temps[dyeType];
}

export function dyeTime(dyeType: DyeType): number {
  const minutes: Record<DyeType, number> = {
    acid: 45,
    fiber_reactive: 60,
    natural: 60,
    direct: 30,
    disperse: 45,
  };
  return minutes[dyeType];
}

export function colorDepth(dosPercent: number): string {
  if (dosPercent < 0.5) return "pale";
  if (dosPercent < 1) return "light";
  if (dosPercent < 2) return "medium";
  if (dosPercent < 4) return "dark";
  return "very dark";
}

export function washFastness(dyeType: DyeType): string {
  const ratings: Record<DyeType, string> = {
    acid: "good",
    fiber_reactive: "excellent",
    natural: "fair",
    direct: "poor",
    disperse: "excellent",
  };
  return ratings[dyeType];
}

export function lightFastness(dyeType: DyeType): string {
  const ratings: Record<DyeType, string> = {
    acid: "good",
    fiber_reactive: "good",
    natural: "poor",
    direct: "fair",
    disperse: "excellent",
  };
  return ratings[dyeType];
}

export function overdyeResult(base: string, overdye: string): string {
  const mix: Record<string, Record<string, string>> = {
    yellow: { blue: "green", red: "orange" },
    blue: { yellow: "green", red: "purple" },
    red: { yellow: "orange", blue: "purple" },
  };
  return mix[base]?.[overdye] ?? "custom";
}

export function skeinPrep(yarnWeightG: number): { soakMinutes: number; waterMl: number } {
  return {
    soakMinutes: 30,
    waterMl: parseFloat((yarnWeightG * 20).toFixed(0)),
  };
}

export function costPerSkein(dyeGrams: number, dyePricePerG: number, auxiliaryGrams: number, auxiliaryPricePerG: number): number {
  return parseFloat((dyeGrams * dyePricePerG + auxiliaryGrams * auxiliaryPricePerG).toFixed(2));
}

export function dyeTypes(): DyeType[] {
  return ["acid", "fiber_reactive", "natural", "direct", "disperse"];
}
