export type RCScale = "1:5" | "1:8" | "1:10" | "1:12" | "1:16" | "1:18" | "1:24" | "1:28";
export type MotorType = "brushed" | "brushless";
export type DriveType = "2wd" | "4wd" | "rwd" | "fwd";

const SCALE_FACTOR: Record<RCScale, number> = {
  "1:5": 5, "1:8": 8, "1:10": 10, "1:12": 12,
  "1:16": 16, "1:18": 18, "1:24": 24, "1:28": 28,
};

export function scaleFactor(scale: RCScale): number {
  return SCALE_FACTOR[scale];
}

export function scaleSpeed(realKmh: number, scale: RCScale): number {
  return parseFloat((realKmh / SCALE_FACTOR[scale]).toFixed(1));
}

export function realEquivalentSpeed(rcKmh: number, scale: RCScale): number {
  return parseFloat((rcKmh * SCALE_FACTOR[scale]).toFixed(1));
}

export function gearRatio(spur: number, pinion: number): number {
  return parseFloat((spur / pinion).toFixed(2));
}

export function motorKv(voltage: number, noLoadRpm: number): number {
  return Math.round(noLoadRpm / voltage);
}

export function topSpeedKmh(motorKvRating: number, voltage: number, gearRatioVal: number, tireCircumferenceMm: number): number {
  const wheelRpm = motorKvRating * voltage / gearRatioVal;
  const speedMmPerMin = wheelRpm * tireCircumferenceMm;
  return parseFloat((speedMmPerMin * 60 / 1e9).toFixed(1));
}

export function batteryRuntime(capacityMah: number, avgCurrentA: number): number {
  return parseFloat((capacityMah / (avgCurrentA * 1000) * 60).toFixed(1));
}

export function batteryEnergy(voltage: number, capacityMah: number): number {
  return parseFloat((voltage * capacityMah / 1000).toFixed(1));
}

export function cellCount(packVoltage: number, cellType: "lipo" | "nimh" | "liion"): number {
  const cellV: Record<string, number> = { lipo: 3.7, nimh: 1.2, liion: 3.6 };
  return Math.round(packVoltage / cellV[cellType]);
}

export function tireCircumference(diameterMm: number): number {
  return parseFloat((Math.PI * diameterMm).toFixed(1));
}

export function rolloutMm(tireDiameterMm: number, gearRatioVal: number): number {
  return parseFloat((Math.PI * tireDiameterMm / gearRatioVal).toFixed(1));
}

export function weightDistribution(frontWeightG: number, rearWeightG: number): { front: number; rear: number } {
  const total = frontWeightG + rearWeightG;
  return {
    front: parseFloat((frontWeightG / total * 100).toFixed(1)),
    rear: parseFloat((rearWeightG / total * 100).toFixed(1)),
  };
}

export function suspensionTravel(shockLengthMm: number, leverRatio: number): number {
  return parseFloat((shockLengthMm * leverRatio).toFixed(1));
}

export function turnRadiusMm(wheelbaseMm: number, steeringAngleDeg: number): number {
  const rad = steeringAngleDeg * Math.PI / 180;
  return parseFloat((wheelbaseMm / Math.sin(rad)).toFixed(0));
}

export function lapTime(trackLengthM: number, avgSpeedKmh: number): number {
  return parseFloat((trackLengthM / (avgSpeedKmh * 1000 / 3600)).toFixed(2));
}

export function rcScales(): RCScale[] {
  return ["1:5", "1:8", "1:10", "1:12", "1:16", "1:18", "1:24", "1:28"];
}
