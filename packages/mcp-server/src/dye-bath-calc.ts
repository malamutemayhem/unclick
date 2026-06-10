export type DyeType = "acid" | "reactive" | "natural" | "vat" | "disperse";

export function bathVolumeLiters(fabricWeightKg: number, liquorRatio: number): number {
  return parseFloat((fabricWeightKg * liquorRatio).toFixed(1));
}

export function dyeWeightG(fabricWeightKg: number, depthPercent: number): number {
  return parseFloat((fabricWeightKg * 1000 * depthPercent / 100).toFixed(1));
}

export function temperatureCelsius(type: DyeType): number {
  const temps: Record<DyeType, number> = {
    acid: 85, reactive: 60, natural: 80, vat: 50, disperse: 130,
  };
  return temps[type];
}

export function dyeTimeMinutes(type: DyeType): number {
  const times: Record<DyeType, number> = {
    acid: 45, reactive: 60, natural: 90, vat: 30, disperse: 40,
  };
  return times[type];
}

export function saltG(fabricWeightKg: number, type: DyeType): number {
  const ratio: Record<DyeType, number> = {
    acid: 0, reactive: 80, natural: 0, vat: 0, disperse: 0,
  };
  return Math.round(fabricWeightKg * ratio[type]);
}

export function washFastnessRating(type: DyeType): number {
  const ratings: Record<DyeType, number> = {
    acid: 3, reactive: 5, natural: 2, vat: 5, disperse: 4,
  };
  return ratings[type];
}

export function lightFastnessRating(type: DyeType): number {
  const ratings: Record<DyeType, number> = {
    acid: 4, reactive: 5, natural: 2, vat: 5, disperse: 4,
  };
  return ratings[type];
}

export function rinseWaterLiters(bathVolumeLiters: number): number {
  return Math.round(bathVolumeLiters * 3);
}

export function costPerKg(type: DyeType): number {
  const costs: Record<DyeType, number> = {
    acid: 25, reactive: 30, natural: 45, vat: 50, disperse: 35,
  };
  return costs[type];
}

export function dyeTypes(): DyeType[] {
  return ["acid", "reactive", "natural", "vat", "disperse"];
}
