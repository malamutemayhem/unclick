export type DetectorType = "vlf" | "pi" | "multi_freq" | "bfo";
export type TargetMetal = "gold" | "silver" | "copper" | "iron" | "aluminum" | "lead";

const CONDUCTIVITY: Record<TargetMetal, number> = {
  gold: 45.2, silver: 63.0, copper: 59.6, iron: 10.3, aluminum: 37.7, lead: 4.8,
};

export function conductivity(metal: TargetMetal): number {
  return CONDUCTIVITY[metal];
}

export function detectionDepth(coilDiameterInch: number, targetSizeInch: number): number {
  return parseFloat((coilDiameterInch * 1.5 * Math.sqrt(targetSizeInch)).toFixed(1));
}

export function sweepWidth(coilDiameterInch: number, overlap: number = 0.3): number {
  return parseFloat((coilDiameterInch * (1 - overlap)).toFixed(1));
}

export function coverageRate(sweepWidthInch: number, walkSpeedMph: number): number {
  const widthFt = sweepWidthInch / 12;
  const ftPerHour = walkSpeedMph * 5280;
  return parseFloat((widthFt * ftPerHour / 43560).toFixed(2));
}

export function targetId(conductivityVal: number): string {
  if (conductivityVal > 55) return "high conductor (silver/copper)";
  if (conductivityVal > 35) return "medium conductor (gold/aluminum)";
  if (conductivityVal > 8) return "low conductor (iron)";
  return "very low conductor (lead/ferrite)";
}

export function batteryLife(mah: number, currentDraw: number): number {
  return parseFloat((mah / currentDraw).toFixed(1));
}

export function frequencyForTarget(target: TargetMetal): number {
  const freqs: Record<TargetMetal, number> = {
    gold: 18, silver: 6, copper: 8, iron: 10, aluminum: 14, lead: 4,
  };
  return freqs[target];
}

export function groundBalance(mineralization: "low" | "medium" | "high"): number {
  const values: Record<string, number> = { low: 20, medium: 50, high: 80 };
  return values[mineralization];
}

export function discrimination(threshold: number, targetConductivity: number): boolean {
  return targetConductivity > threshold;
}

export function pinpointRadius(coilDiameterInch: number): number {
  return parseFloat((coilDiameterInch * 0.15).toFixed(1));
}

export function digDepth(signalStrength: number, coilDiameterInch: number): number {
  return parseFloat((signalStrength / 100 * coilDiameterInch * 2).toFixed(1));
}

export function findRate(hoursSearched: number, itemsFound: number): number {
  if (hoursSearched === 0) return 0;
  return parseFloat((itemsFound / hoursSearched).toFixed(1));
}

export function recoverySpeed(detectorType: DetectorType): string {
  const speeds: Record<DetectorType, string> = {
    vlf: "fast", pi: "slow", multi_freq: "fast", bfo: "medium",
  };
  return speeds[detectorType];
}

export function detectorTypes(): DetectorType[] {
  return ["vlf", "pi", "multi_freq", "bfo"];
}

export function targetMetals(): TargetMetal[] {
  return ["gold", "silver", "copper", "iron", "aluminum", "lead"];
}
