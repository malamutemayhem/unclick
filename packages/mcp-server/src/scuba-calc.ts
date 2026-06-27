export type CertLevel = "open_water" | "advanced" | "rescue" | "divemaster" | "instructor";
export type GasMix = "air" | "ean32" | "ean36" | "trimix";

export function maxDepthM(certLevel: CertLevel): number {
  const depths: Record<CertLevel, number> = {
    open_water: 18, advanced: 30, rescue: 30, divemaster: 40, instructor: 40,
  };
  return depths[certLevel];
}

export function ata(depthM: number): number {
  return parseFloat((depthM / 10 + 1).toFixed(2));
}

export function airConsumption(sacLPerMin: number, depthM: number): number {
  return parseFloat((sacLPerMin * ata(depthM)).toFixed(1));
}

export function diveTime(tankVolL: number, sacLPerMin: number, depthM: number, reserveBar: number = 50): number {
  const usableL = (tankVolL - reserveBar) > 0 ? tankVolL - reserveBar : 0;
  const consumptionPerMin = sacLPerMin * ata(depthM);
  if (consumptionPerMin === 0) return 0;
  return parseFloat((usableL / consumptionPerMin).toFixed(0));
}

export function mod(o2Percent: number, ppO2Max: number = 1.4): number {
  return parseFloat(((ppO2Max / (o2Percent / 100) - 1) * 10).toFixed(1));
}

export function ead(depthM: number, o2Percent: number): number {
  const fn2 = (100 - o2Percent) / 100;
  return parseFloat(((depthM + 10) * fn2 / 0.79 - 10).toFixed(1));
}

export function bestMix(depthM: number, ppO2Max: number = 1.4): number {
  return parseFloat((ppO2Max / ata(depthM) * 100).toFixed(0));
}

export function safetyStop(): { depthM: number; minutes: number } {
  return { depthM: 5, minutes: 3 };
}

export function ascentRate(depthM: number): number {
  return Math.min(depthM, 9);
}

export function ascentTime(depthM: number): number {
  const rate = ascentRate(depthM);
  if (rate === 0) return 0;
  return parseFloat(((depthM / rate) + 3).toFixed(1));
}

export function weightKg(bodyWeightKg: number, suitThicknessMm: number, waterType: "salt" | "fresh"): number {
  const suitWeight = suitThicknessMm * 1;
  const baseWeight = bodyWeightKg * 0.05;
  const saltAdjust = waterType === "salt" ? 2 : 0;
  return parseFloat((baseWeight + suitWeight + saltAdjust).toFixed(1));
}

export function nitrogenLoad(depthM: number, timeMin: number): number {
  return parseFloat((ata(depthM) * 0.79 * timeMin / 60).toFixed(2));
}

export function surfaceInterval(nitrogenLoadVal: number): number {
  return Math.round(nitrogenLoadVal * 60);
}

export function gasMixes(): GasMix[] {
  return ["air", "ean32", "ean36", "trimix"];
}
