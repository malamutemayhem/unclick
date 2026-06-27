export type CalliKey = "wood" | "brass" | "steel" | "reed";

export function pipeCount(octaves: number): number {
  return octaves * 12;
}

export function pipeLength(fundamentalHz: number, speedOfSound: number = 343): number {
  if (fundamentalHz <= 0) return 0;
  return parseFloat((speedOfSound / (2 * fundamentalHz) * 100).toFixed(1));
}

export function steamPressureBar(pipeDiameter: number, volumeFlow: number): number {
  return parseFloat((volumeFlow / (Math.PI * Math.pow(pipeDiameter / 2, 2))).toFixed(2));
}

export function whistleFrequency(lengthCm: number, speedOfSound: number = 343): number {
  if (lengthCm <= 0) return 0;
  return parseFloat((speedOfSound / (2 * (lengthCm / 100))).toFixed(1));
}

export function airConsumptionLpm(pipeCount: number, avgDiameterCm: number): number {
  return parseFloat((pipeCount * Math.PI * Math.pow(avgDiameterCm / 2, 2) * 0.5).toFixed(1));
}

export function keySpringForce(keyWidthCm: number, material: CalliKey): number {
  const factors: Record<CalliKey, number> = { wood: 0.8, brass: 1.2, steel: 1.5, reed: 0.6 };
  return parseFloat((keyWidthCm * factors[material] * 2).toFixed(1));
}

export function boilerCapacityLiters(pipesPlaying: number): number {
  return parseFloat((pipesPlaying * 0.3 + 5).toFixed(1));
}

export function soundLevelDb(pressureBar: number, pipeDiameterCm: number): number {
  return parseFloat((70 + pressureBar * 10 + pipeDiameterCm * 2).toFixed(0));
}

export function tuningCents(measuredHz: number, targetHz: number): number {
  if (measuredHz <= 0 || targetHz <= 0) return 0;
  return parseFloat((1200 * Math.log2(measuredHz / targetHz)).toFixed(1));
}

export function maintenanceIntervalHours(usageHoursPerDay: number): number {
  if (usageHoursPerDay <= 0) return 0;
  return parseFloat((500 / usageHoursPerDay).toFixed(0));
}

export function calliKeyTypes(): CalliKey[] {
  return ["wood", "brass", "steel", "reed"];
}
