export type BallistaSize = "scorpio" | "carroballista" | "polybolos" | "oxybeles" | "cheiroballistra";

export function rangeM(armLengthCm: number, cordTensionKn: number): number {
  return parseFloat((armLengthCm * cordTensionKn * 0.8).toFixed(1));
}

export function boltWeightKg(boltLengthCm: number, boltDiameterCm: number): number {
  const volumeCm3 = Math.PI * (boltDiameterCm / 2) ** 2 * boltLengthCm;
  return parseFloat((volumeCm3 * 0.008).toFixed(2));
}

export function rateOfFirePerMin(size: BallistaSize): number {
  const rates: Record<BallistaSize, number> = {
    scorpio: 4, carroballista: 3, polybolos: 8, oxybeles: 2, cheiroballistra: 5,
  };
  return rates[size];
}

export function crewCount(size: BallistaSize): number {
  const crew: Record<BallistaSize, number> = {
    scorpio: 2, carroballista: 3, polybolos: 4, oxybeles: 4, cheiroballistra: 1,
  };
  return crew[size];
}

export function frameWeightKg(armLengthCm: number): number {
  return parseFloat((armLengthCm * armLengthCm * 0.01).toFixed(1));
}

export function torsionBundleDiameterCm(cordTensionKn: number): number {
  return parseFloat((Math.sqrt(cordTensionKn) * 3).toFixed(1));
}

export function accuracyAtRangePercent(rangeM: number, maxRangeM: number): number {
  if (maxRangeM <= 0) return 0;
  const ratio = rangeM / maxRangeM;
  return parseFloat((Math.max(0, 100 - ratio * 80)).toFixed(1));
}

export function setupTimeMinutes(size: BallistaSize): number {
  const minutes: Record<BallistaSize, number> = {
    scorpio: 5, carroballista: 10, polybolos: 15, oxybeles: 20, cheiroballistra: 2,
  };
  return minutes[size];
}

export function cordLifeShots(cordTensionKn: number): number {
  return Math.max(50, Math.floor(500 / cordTensionKn));
}

export function costEstimate(size: BallistaSize, baseCost: number): number {
  const multipliers: Record<BallistaSize, number> = {
    scorpio: 1.0, carroballista: 1.5, polybolos: 3.0, oxybeles: 2.0, cheiroballistra: 0.8,
  };
  return parseFloat((baseCost * multipliers[size]).toFixed(2));
}

export function ballistaSizes(): BallistaSize[] {
  return ["scorpio", "carroballista", "polybolos", "oxybeles", "cheiroballistra"];
}
