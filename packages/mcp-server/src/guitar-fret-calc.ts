export type ScaleLength = "short" | "medium" | "long" | "baritone" | "bass";

export function scaleLengthMm(type: ScaleLength): number {
  const lengths: Record<ScaleLength, number> = {
    short: 610, medium: 648, long: 660, baritone: 686, bass: 864,
  };
  return lengths[type];
}

export function fretPositionMm(scaleLengthMm: number, fretNumber: number): number {
  return parseFloat((scaleLengthMm - scaleLengthMm / Math.pow(2, fretNumber / 12)).toFixed(2));
}

export function fretSpacingMm(scaleLengthMm: number, fretNumber: number): number {
  const pos = fretPositionMm(scaleLengthMm, fretNumber);
  const prevPos = fretNumber > 0 ? fretPositionMm(scaleLengthMm, fretNumber - 1) : 0;
  return parseFloat((pos - prevPos).toFixed(2));
}

export function fretWireWidthMm(style: "vintage" | "medium" | "jumbo"): number {
  const widths: Record<string, number> = { vintage: 1.8, medium: 2.3, jumbo: 2.8 };
  return widths[style];
}

export function fretWireHeightMm(style: "vintage" | "medium" | "jumbo"): number {
  const heights: Record<string, number> = { vintage: 1.0, medium: 1.2, jumbo: 1.4 };
  return heights[style];
}

export function nutWidthMm(stringCount: number): number {
  return parseFloat((stringCount * 7 + 5).toFixed(0));
}

export function stringSpacingMm(nutWidthMm: number, stringCount: number): number {
  if (stringCount <= 1) return 0;
  return parseFloat(((nutWidthMm - 6) / (stringCount - 1)).toFixed(1));
}

export function actionMm(style: "low" | "medium" | "high"): number {
  const actions: Record<string, number> = { low: 1.5, medium: 2.0, high: 2.5 };
  return actions[style];
}

export function compensationMm(stringGauge: number): number {
  return parseFloat((stringGauge * 0.05).toFixed(2));
}

export function totalFrets(type: ScaleLength): number {
  const frets: Record<ScaleLength, number> = {
    short: 22, medium: 22, long: 24, baritone: 24, bass: 24,
  };
  return frets[type];
}

export function scaleLengths(): ScaleLength[] {
  return ["short", "medium", "long", "baritone", "bass"];
}
