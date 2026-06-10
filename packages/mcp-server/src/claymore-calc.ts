export type BladeSteel = "carbon" | "spring" | "damascus" | "stainless" | "tool";

export function bladeLength(totalLengthCm: number, hiltLengthCm: number): number {
  return parseFloat((totalLengthCm - hiltLengthCm).toFixed(0));
}

export function bladeWeight(lengthCm: number, widthCm: number, thicknessMm: number, steel: BladeSteel): number {
  const density: Record<BladeSteel, number> = { carbon: 7.85, spring: 7.8, damascus: 7.9, stainless: 7.75, tool: 7.7 };
  return parseFloat((lengthCm * widthCm * (thicknessMm / 10) * density[steel] / 1000).toFixed(2));
}

export function balancePointCm(bladeLength: number, hiltWeight: number, bladeWeight: number): number {
  if (hiltWeight + bladeWeight <= 0) return 0;
  return parseFloat((bladeLength * bladeWeight / (hiltWeight + bladeWeight)).toFixed(1));
}

export function edgeAngle(purpose: string): number {
  const angles: Record<string, number> = { cutting: 20, thrusting: 15, utility: 25, display: 30 };
  return angles[purpose] || 20;
}

export function fullerDepthMm(bladeThicknessMm: number): number {
  return parseFloat((bladeThicknessMm * 0.25).toFixed(1));
}

export function tangLength(hiltLengthCm: number): number {
  return parseFloat((hiltLengthCm * 0.9).toFixed(1));
}

export function hardnessHrc(steel: BladeSteel): number {
  const hrc: Record<BladeSteel, number> = { carbon: 58, spring: 52, damascus: 60, stainless: 56, tool: 62 };
  return hrc[steel];
}

export function temperingTemp(targetHrc: number): number {
  return parseFloat((600 - targetHrc * 5).toFixed(0));
}

export function quenchTime(thicknessMm: number): number {
  return parseFloat((thicknessMm * 2 + 5).toFixed(0));
}

export function grindingPasses(edgeAngle: number, grindAngle: number): number {
  return Math.ceil(Math.abs(grindAngle - edgeAngle) / 2) + 1;
}

export function bladesteelTypes(): BladeSteel[] {
  return ["carbon", "spring", "damascus", "stainless", "tool"];
}
