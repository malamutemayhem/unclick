export type QuenchMedium = "water" | "oil" | "brine" | "air" | "polymer";

export function coolingRateCPerSec(medium: QuenchMedium): number {
  const rates: Record<QuenchMedium, number> = {
    water: 200, oil: 80, brine: 300, air: 10, polymer: 120,
  };
  return rates[medium];
}

export function bathVolumeLiters(pieceWeightKg: number): number {
  return parseFloat((pieceWeightKg * 10).toFixed(1));
}

export function bathTemperatureCelsius(medium: QuenchMedium): number {
  const temps: Record<QuenchMedium, number> = {
    water: 20, oil: 60, brine: 15, air: 25, polymer: 30,
  };
  return temps[medium];
}

export function soakTimeSeconds(thicknessMm: number, medium: QuenchMedium): number {
  const factors: Record<QuenchMedium, number> = {
    water: 1.0, oil: 2.0, brine: 0.8, air: 10.0, polymer: 1.5,
  };
  return parseFloat((thicknessMm * factors[medium]).toFixed(1));
}

export function hardnessHrc(carbonPercent: number, medium: QuenchMedium): number {
  const baseHrc = carbonPercent * 60;
  const bonuses: Record<QuenchMedium, number> = {
    water: 5, oil: 0, brine: 8, air: -5, polymer: 2,
  };
  return parseFloat(Math.min(68, baseHrc + bonuses[medium]).toFixed(1));
}

export function distortionRisk(medium: QuenchMedium): number {
  const risks: Record<QuenchMedium, number> = {
    water: 8, oil: 4, brine: 9, air: 1, polymer: 5,
  };
  return risks[medium];
}

export function crackRisk(medium: QuenchMedium, thicknessMm: number): number {
  const baseRisk: Record<QuenchMedium, number> = {
    water: 6, oil: 2, brine: 8, air: 0, polymer: 3,
  };
  const thicknessFactor = Math.min(3, thicknessMm / 20);
  return parseFloat(Math.min(10, baseRisk[medium] + thicknessFactor).toFixed(1));
}

export function agitationRequired(medium: QuenchMedium): boolean {
  return medium === "water" || medium === "brine" || medium === "polymer";
}

export function vaporBarrierBreakCelsius(medium: QuenchMedium): number {
  const temps: Record<QuenchMedium, number> = {
    water: 300, oil: 400, brine: 200, air: 0, polymer: 350,
  };
  return temps[medium];
}

export function costPerLiter(medium: QuenchMedium): number {
  const costs: Record<QuenchMedium, number> = {
    water: 0.01, oil: 2.50, brine: 0.05, air: 0, polymer: 5.00,
  };
  return costs[medium];
}

export function quenchMedia(): QuenchMedium[] {
  return ["water", "oil", "brine", "air", "polymer"];
}
