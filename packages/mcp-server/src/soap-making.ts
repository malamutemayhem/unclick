export type SoapMethod = "cold_process" | "hot_process" | "melt_and_pour" | "rebatch";
export type OilType = "olive" | "coconut" | "palm" | "castor" | "shea" | "avocado";

export function sapValue(oil: OilType): number {
  const sap: Record<OilType, number> = {
    olive: 0.134, coconut: 0.178, palm: 0.141, castor: 0.128, shea: 0.128, avocado: 0.133,
  };
  return sap[oil];
}

export function lyeAmount(oilWeightG: number, sapValue: number, superfatPct: number = 5): number {
  const lye = oilWeightG * sapValue * (1 - superfatPct / 100);
  return parseFloat(lye.toFixed(1));
}

export function waterAmount(lyeG: number, lyeConcentrationPct: number = 33): number {
  return parseFloat((lyeG * (100 - lyeConcentrationPct) / lyeConcentrationPct).toFixed(1));
}

export function batchWeight(oilG: number, lyeG: number, waterG: number): number {
  return parseFloat((oilG + lyeG + waterG).toFixed(0));
}

export function barCount(batchWeightG: number, barWeightG: number = 113): number {
  return Math.floor(batchWeightG / barWeightG);
}

export function cureWeeks(method: SoapMethod): number {
  const weeks: Record<SoapMethod, number> = {
    cold_process: 6, hot_process: 2, melt_and_pour: 0, rebatch: 1,
  };
  return weeks[method];
}

export function traceTime(method: SoapMethod): number {
  const minutes: Record<SoapMethod, number> = {
    cold_process: 15, hot_process: 30, melt_and_pour: 0, rebatch: 10,
  };
  return minutes[method];
}

export function fragranceOz(batchOilOz: number, usageRatePct: number = 6): number {
  return parseFloat((batchOilOz * usageRatePct / 100).toFixed(2));
}

export function colorant(batchOilOz: number, tspPerLb: number = 1): number {
  const lbs = batchOilOz / 16;
  return parseFloat((lbs * tspPerLb).toFixed(2));
}

export function moldVolume(lengthCm: number, widthCm: number, heightCm: number): number {
  return parseFloat((lengthCm * widthCm * heightCm).toFixed(0));
}

export function hardness(coconutPct: number, palmPct: number): string {
  const total = coconutPct + palmPct;
  if (total >= 60) return "very hard";
  if (total >= 40) return "hard";
  if (total >= 20) return "medium";
  return "soft";
}

export function bubblyness(coconutPct: number, castorPct: number): string {
  const total = coconutPct + castorPct;
  if (total >= 40) return "high lather";
  if (total >= 20) return "moderate lather";
  return "low lather";
}

export function shelfLifeMonths(method: SoapMethod): number {
  const months: Record<SoapMethod, number> = {
    cold_process: 24, hot_process: 24, melt_and_pour: 12, rebatch: 18,
  };
  return months[method];
}

export function soapMethods(): SoapMethod[] {
  return ["cold_process", "hot_process", "melt_and_pour", "rebatch"];
}
