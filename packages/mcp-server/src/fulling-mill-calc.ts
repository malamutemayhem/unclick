export type FullingAgent = "urine" | "fullers_earth" | "soap" | "lye" | "potash";

export function stockCapacityM(wheelDiameterM: number): number {
  return parseFloat((wheelDiameterM * 2).toFixed(2));
}

export function hammerWeightKg(stockCapacityM: number): number {
  return parseFloat((stockCapacityM * 15).toFixed(1));
}

export function strokesPerMinute(wheelDiameterM: number, waterFlowLps: number): number {
  return parseFloat((waterFlowLps * 2 / wheelDiameterM).toFixed(1));
}

export function fullingTimeHours(fabricWeightKg: number, agent: FullingAgent): number {
  const rates: Record<FullingAgent, number> = {
    urine: 6, fullers_earth: 4, soap: 3, lye: 5, potash: 4.5,
  };
  return parseFloat((fabricWeightKg * rates[agent] / 10).toFixed(1));
}

export function shrinkagePercent(agent: FullingAgent): number {
  const shrinkage: Record<FullingAgent, number> = {
    urine: 25, fullers_earth: 20, soap: 15, lye: 30, potash: 22,
  };
  return shrinkage[agent];
}

export function waterConsumptionLiters(fabricWeightKg: number): number {
  return parseFloat((fabricWeightKg * 50).toFixed(1));
}

export function tenterhookCount(fabricLengthM: number): number {
  return Math.ceil(fabricLengthM * 4);
}

export function dryingFrameLengthM(fabricLengthM: number, shrinkagePercent: number): number {
  return parseFloat((fabricLengthM * (1 - shrinkagePercent / 100)).toFixed(2));
}

export function dailyOutputKg(strokesPerMinute: number, hoursPerDay: number): number {
  return parseFloat((strokesPerMinute * hoursPerDay * 0.01).toFixed(1));
}

export function operatingCostPerKg(agent: FullingAgent, baseCost: number): number {
  const multipliers: Record<FullingAgent, number> = {
    urine: 0.3, fullers_earth: 1.0, soap: 1.5, lye: 0.8, potash: 1.2,
  };
  return parseFloat((baseCost * multipliers[agent]).toFixed(2));
}

export function fullingAgents(): FullingAgent[] {
  return ["urine", "fullers_earth", "soap", "lye", "potash"];
}
