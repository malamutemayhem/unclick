export type SpindleFiber = "wool" | "flax" | "cotton" | "silk" | "hemp";

export function whorlWeightG(fiber: SpindleFiber): number {
  const weights: Record<SpindleFiber, number> = {
    wool: 30, flax: 40, cotton: 20, silk: 15, hemp: 50,
  };
  return weights[fiber];
}

export function shaftLengthCm(fiber: SpindleFiber): number {
  const lengths: Record<SpindleFiber, number> = {
    wool: 25, flax: 30, cotton: 22, silk: 20, hemp: 35,
  };
  return lengths[fiber];
}

export function yarnOutputGPerHour(fiber: SpindleFiber): number {
  const rates: Record<SpindleFiber, number> = {
    wool: 15, flax: 10, cotton: 12, silk: 5, hemp: 8,
  };
  return rates[fiber];
}

export function twistPerCm(fiber: SpindleFiber): number {
  const twists: Record<SpindleFiber, number> = {
    wool: 3, flax: 5, cotton: 4, silk: 8, hemp: 2,
  };
  return twists[fiber];
}

export function spinDirectionS(fiber: SpindleFiber): boolean {
  return fiber === "cotton" || fiber === "silk";
}

export function drafTingZoneCm(stapleLengthCm: number): number {
  return parseFloat((stapleLengthCm * 1.5).toFixed(1));
}

export function yarnCountNe(fiberDiameterMicrons: number): number {
  if (fiberDiameterMicrons <= 0) return 0;
  return parseFloat((840 / fiberDiameterMicrons).toFixed(1));
}

export function plyStrengthMultiplier(plyCount: number): number {
  return parseFloat((Math.sqrt(plyCount)).toFixed(2));
}

export function dailyOutputG(hoursWorked: number, fiber: SpindleFiber): number {
  return parseFloat((hoursWorked * yarnOutputGPerHour(fiber)).toFixed(1));
}

export function spindleCost(whorlMaterial: "stone" | "clay" | "bone" | "metal"): number {
  const costs: Record<string, number> = {
    stone: 2, clay: 1, bone: 3, metal: 8,
  };
  return costs[whorlMaterial];
}

export function spindleFibers(): SpindleFiber[] {
  return ["wool", "flax", "cotton", "silk", "hemp"];
}
