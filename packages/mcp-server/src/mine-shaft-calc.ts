export type ShaftType = "vertical" | "inclined" | "adit" | "decline" | "winze";

export function crossSectionAreaM2(widthM: number, heightM: number): number {
  return parseFloat((widthM * heightM).toFixed(2));
}

export function timberSetSpacingM(rockQuality: "good" | "fair" | "poor"): number {
  const spacing: Record<string, number> = { good: 2.0, fair: 1.2, poor: 0.6 };
  return spacing[rockQuality];
}

export function timberSetsNeeded(lengthM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.ceil(lengthM / spacingM);
}

export function ventilationCfm(crewCount: number, depthM: number): number {
  return Math.round(crewCount * 100 + depthM * 5);
}

export function hoistCapacityKg(depthM: number): number {
  return parseFloat((depthM * 15 + 500).toFixed(0));
}

export function pumpRateLpm(depthM: number, inflowLph: number): number {
  return parseFloat((inflowLph / 60 * (1 + depthM / 500)).toFixed(1));
}

export function blastHolesPerRound(faceAreaM2: number): number {
  return Math.ceil(faceAreaM2 * 3);
}

export function advancePerRoundM(type: ShaftType): number {
  const advance: Record<ShaftType, number> = {
    vertical: 1.5, inclined: 2.0, adit: 2.5, decline: 2.0, winze: 1.2,
  };
  return advance[type];
}

export function excavationDaysPerM(type: ShaftType): number {
  const days: Record<ShaftType, number> = {
    vertical: 3, inclined: 2, adit: 1.5, decline: 2, winze: 4,
  };
  return days[type];
}

export function costPerMeter(type: ShaftType, baseCost: number): number {
  const mult: Record<ShaftType, number> = {
    vertical: 3.0, inclined: 2.0, adit: 1.0, decline: 2.5, winze: 3.5,
  };
  return parseFloat((baseCost * mult[type]).toFixed(2));
}

export function shaftTypes(): ShaftType[] {
  return ["vertical", "inclined", "adit", "decline", "winze"];
}
