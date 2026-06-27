export type DyeSource = "woad" | "madder" | "weld" | "indigo" | "cochineal";

export function vatVolumeLiters(fabricWeightKg: number): number {
  return parseFloat((fabricWeightKg * 20).toFixed(1));
}

export function dyeWeightG(fabricWeightKg: number, source: DyeSource): number {
  const ratios: Record<DyeSource, number> = {
    woad: 500, madder: 300, weld: 400, indigo: 100, cochineal: 50,
  };
  return parseFloat((fabricWeightKg * ratios[source]).toFixed(1));
}

export function mordantWeightG(fabricWeightKg: number): number {
  return parseFloat((fabricWeightKg * 150).toFixed(1));
}

export function steepingHours(source: DyeSource): number {
  const hours: Record<DyeSource, number> = {
    woad: 48, madder: 24, weld: 12, indigo: 72, cochineal: 8,
  };
  return hours[source];
}

export function temperatureCelsius(source: DyeSource): number {
  const temps: Record<DyeSource, number> = {
    woad: 50, madder: 70, weld: 80, indigo: 30, cochineal: 90,
  };
  return temps[source];
}

export function colorFastnessRating(source: DyeSource): number {
  const ratings: Record<DyeSource, number> = {
    woad: 7, madder: 8, weld: 5, indigo: 9, cochineal: 6,
  };
  return ratings[source];
}

export function waterChanges(steepingHours: number): number {
  return Math.max(1, Math.ceil(steepingHours / 12));
}

export function fuelWoodKg(vatVolumeLiters: number, temperatureCelsius: number): number {
  return parseFloat((vatVolumeLiters * temperatureCelsius * 0.002).toFixed(1));
}

export function dryingDays(fabricWeightKg: number): number {
  return Math.max(1, Math.ceil(fabricWeightKg * 0.5));
}

export function costPerKgFabric(source: DyeSource, baseCost: number): number {
  const multipliers: Record<DyeSource, number> = {
    woad: 1.0, madder: 1.5, weld: 0.8, indigo: 4.0, cochineal: 8.0,
  };
  return parseFloat((baseCost * multipliers[source]).toFixed(2));
}

export function dyeSources(): DyeSource[] {
  return ["woad", "madder", "weld", "indigo", "cochineal"];
}
