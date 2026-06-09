export type DroneType = "micro" | "mini" | "racing" | "cinematic" | "photography" | "industrial";
export type PropSize = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export function thrustToWeight(totalThrustG: number, takeoffWeightG: number): number {
  return parseFloat((totalThrustG / takeoffWeightG).toFixed(2));
}

export function allUpWeight(frameG: number, motorsG: number, batteryG: number, cameraG: number, miscG: number): number {
  return frameG + motorsG + batteryG + cameraG + miscG;
}

export function flightTime(batteryMah: number, avgCurrentA: number): number {
  return parseFloat((batteryMah / (avgCurrentA * 1000) * 60).toFixed(1));
}

export function batteryEnergy(cellCount: number, cellVoltage: number, capacityMah: number): number {
  return parseFloat((cellCount * cellVoltage * capacityMah / 1000).toFixed(1));
}

export function propPitch(pitchInch: number, rpm: number): number {
  const speedInchPerMin = pitchInch * rpm;
  return parseFloat((speedInchPerMin * 60 / 63360 * 1.60934).toFixed(1));
}

export function maxSpeed(propPitchInch: number, maxRpm: number, efficiency: number = 0.7): number {
  const theoretical = propPitchInch * maxRpm * 60 / 63360 * 1.60934;
  return parseFloat((theoretical * efficiency).toFixed(1));
}

export function motorKv(voltage: number, noLoadRpm: number): number {
  return Math.round(noLoadRpm / voltage);
}

export function escRating(maxCurrentA: number, safetyMargin: number = 1.2): number {
  return Math.ceil(maxCurrentA * safetyMargin);
}

export function pidLoopTime(rateHz: number): number {
  return parseFloat((1000 / rateHz).toFixed(3));
}

export function videoBitrate(resWidth: number, resHeight: number, fps: number, bpp: number = 0.1): number {
  return parseFloat((resWidth * resHeight * fps * bpp / 1e6).toFixed(1));
}

export function storagePerMinute(bitrateMbps: number): number {
  return parseFloat((bitrateMbps * 60 / 8).toFixed(1));
}

export function recordingTime(storageGb: number, bitrateMbps: number): number {
  return parseFloat((storageGb * 1024 * 8 / bitrateMbps / 60).toFixed(1));
}

export function rangeKm(powerMw: number, frequency: number): number {
  const freqFactor = frequency > 2000 ? 0.8 : 1.2;
  return parseFloat((Math.sqrt(powerMw) * 0.05 * freqFactor).toFixed(2));
}

export function fresnelZone(distanceM: number, frequencyMhz: number): number {
  const wavelength = 300 / frequencyMhz;
  return parseFloat((Math.sqrt(wavelength * distanceM / 4)).toFixed(2));
}

export function windResistance(weightG: number, frontalAreaCm2: number): number {
  return parseFloat((weightG / frontalAreaCm2).toFixed(2));
}

export function costEstimate(type: DroneType): number {
  const costs: Record<DroneType, number> = {
    micro: 50, mini: 150, racing: 300, cinematic: 800, photography: 1200, industrial: 5000,
  };
  return costs[type];
}

export function droneTypes(): DroneType[] {
  return ["micro", "mini", "racing", "cinematic", "photography", "industrial"];
}
