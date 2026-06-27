export type WinchDrive = "manual" | "electric" | "hydraulic" | "pneumatic" | "capstan";

export function drumCapacityM(drumDiameterCm: number, drumWidthCm: number, ropeDiameterMm: number): number {
  if (ropeDiameterMm <= 0) return 0;
  const layers = Math.floor((drumWidthCm * 10) / ropeDiameterMm);
  const circumference = Math.PI * drumDiameterCm / 100;
  return parseFloat((layers * circumference).toFixed(1));
}

export function pullForceKn(motorKw: number, drumRadiusCm: number, rpm: number): number {
  if (rpm <= 0 || drumRadiusCm <= 0) return 0;
  const torqueNm = (motorKw * 1000 * 60) / (2 * Math.PI * rpm);
  return parseFloat((torqueNm / (drumRadiusCm / 100) / 1000).toFixed(1));
}

export function lineSpeedMps(drumDiameterCm: number, rpm: number): number {
  return parseFloat((Math.PI * drumDiameterCm / 100 * rpm / 60).toFixed(2));
}

export function brakeTorqueNm(loadKg: number, drumRadiusCm: number, safetyFactor: number): number {
  return parseFloat((loadKg * 9.81 * drumRadiusCm / 100 * safetyFactor).toFixed(1));
}

export function gearRatio(inputRpm: number, outputRpm: number): number {
  if (outputRpm <= 0) return 0;
  return parseFloat((inputRpm / outputRpm).toFixed(2));
}

export function ropeLayerCount(drumWidthCm: number, ropeDiameterMm: number): number {
  if (ropeDiameterMm <= 0) return 0;
  return Math.floor((drumWidthCm * 10) / ropeDiameterMm);
}

export function fairleadAngle(offsetM: number, distanceM: number): number {
  if (distanceM <= 0) return 0;
  return parseFloat((Math.atan(offsetM / distanceM) * 180 / Math.PI).toFixed(1));
}

export function dutyCyclePercent(onTimeMin: number, cycleTimeMin: number): number {
  if (cycleTimeMin <= 0) return 0;
  return parseFloat((onTimeMin / cycleTimeMin * 100).toFixed(1));
}

export function motorSizeKw(loadKg: number, speedMps: number, efficiency: number): number {
  if (efficiency <= 0) return 0;
  return parseFloat((loadKg * 9.81 * speedMps / 1000 / efficiency).toFixed(2));
}

export function maintenanceIntervalHours(driveType: WinchDrive): number {
  const intervals: Record<WinchDrive, number> = {
    manual: 500, electric: 250, hydraulic: 200, pneumatic: 300, capstan: 400,
  };
  return intervals[driveType];
}

export function winchDrives(): WinchDrive[] {
  return ["manual", "electric", "hydraulic", "pneumatic", "capstan"];
}
