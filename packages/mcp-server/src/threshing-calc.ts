export type ThreshingMethod = "flail" | "treading" | "roller" | "machine" | "rubbing";

export function outputKgPerHour(method: ThreshingMethod): number {
  const rates: Record<ThreshingMethod, number> = {
    flail: 15, treading: 25, roller: 30, machine: 200, rubbing: 5,
  };
  return rates[method];
}

export function laborersNeeded(method: ThreshingMethod): number {
  const workers: Record<ThreshingMethod, number> = {
    flail: 2, treading: 1, roller: 2, machine: 3, rubbing: 1,
  };
  return workers[method];
}

export function floorAreaM2(dailyCapacityKg: number): number {
  return parseFloat((dailyCapacityKg * 0.05 + 10).toFixed(1));
}

export function grainLossPercent(method: ThreshingMethod): number {
  const losses: Record<ThreshingMethod, number> = {
    flail: 3, treading: 5, roller: 4, machine: 1, rubbing: 8,
  };
  return losses[method];
}

export function strawConditionRating(method: ThreshingMethod): number {
  const ratings: Record<ThreshingMethod, number> = {
    flail: 8, treading: 5, roller: 4, machine: 6, rubbing: 9,
  };
  return ratings[method];
}

export function winnowingAreaM2(threshingFloorAreaM2: number): number {
  return parseFloat((threshingFloorAreaM2 * 0.6).toFixed(1));
}

export function dryingRequiredDays(moisturePercent: number): number {
  return Math.max(0, Math.ceil((moisturePercent - 14) * 0.5));
}

export function animalCount(method: ThreshingMethod): number {
  return method === "treading" ? 4 : method === "roller" ? 2 : 0;
}

export function dailyCapacityKg(method: ThreshingMethod, hoursWorked: number): number {
  return parseFloat((outputKgPerHour(method) * hoursWorked).toFixed(1));
}

export function operatingCostPerKg(method: ThreshingMethod, laborCostPerHour: number): number {
  const workers = laborersNeeded(method);
  const output = outputKgPerHour(method);
  if (output <= 0) return 0;
  return parseFloat((workers * laborCostPerHour / output).toFixed(2));
}

export function threshingMethods(): ThreshingMethod[] {
  return ["flail", "treading", "roller", "machine", "rubbing"];
}
