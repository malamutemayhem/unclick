export type PreservationMethod = "traditional" | "freeze_dry" | "skeleton" | "wet_specimen" | "replica";

export function formSizeCm(lengthCm: number, girthCm: number): { height: number; width: number; depth: number } {
  const width = parseFloat((girthCm / Math.PI).toFixed(1));
  const depth = parseFloat((width * 0.8).toFixed(1));
  return { height: lengthCm, width, depth };
}

export function tanningTimeDays(thicknessMm: number): number {
  return Math.ceil(thicknessMm * 3);
}

export function boraxWeightG(surfaceAreaCm2: number): number {
  return parseFloat((surfaceAreaCm2 * 0.05).toFixed(0));
}

export function wireGauge(specimenWeightG: number): number {
  if (specimenWeightG < 50) return 20;
  if (specimenWeightG < 200) return 18;
  if (specimenWeightG < 1000) return 16;
  if (specimenWeightG < 5000) return 14;
  return 12;
}

export function glassEyeSize(headWidthCm: number): number {
  return parseFloat((headWidthCm * 0.15).toFixed(1));
}

export function dryingDays(method: PreservationMethod, weightKg: number): number {
  const rates: Record<PreservationMethod, number> = {
    traditional: 14, freeze_dry: 30, skeleton: 21, wet_specimen: 0, replica: 7,
  };
  return Math.ceil(rates[method] * Math.sqrt(weightKg));
}

export function formaldehydeMl(volumeCc: number): number {
  return parseFloat((volumeCc * 0.1).toFixed(0));
}

export function mountingBoardCm2(baseLengthCm: number, baseWidthCm: number): number {
  return parseFloat((baseLengthCm * baseWidthCm * 1.5).toFixed(0));
}

export function fillMaterialG(volumeCc: number): number {
  return parseFloat((volumeCc * 0.3).toFixed(0));
}

export function projectHours(weightKg: number, method: PreservationMethod): number {
  const base: Record<PreservationMethod, number> = {
    traditional: 20, freeze_dry: 5, skeleton: 30, wet_specimen: 3, replica: 40,
  };
  return parseFloat((base[method] * Math.sqrt(weightKg)).toFixed(0));
}

export function preservationMethods(): PreservationMethod[] {
  return ["traditional", "freeze_dry", "skeleton", "wet_specimen", "replica"];
}
