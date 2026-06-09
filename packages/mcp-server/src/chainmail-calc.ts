export type WeavePattern = "european_4in1" | "persian" | "byzantine" | "dragonscale" | "japanese_6in1" | "box_chain";
export type WireGauge = 14 | 16 | 18 | 20 | 22;

export function aspectRatio(innerDiameter: number, wireThickness: number): number {
  if (wireThickness <= 0) return 0;
  return parseFloat((innerDiameter / wireThickness).toFixed(2));
}

export function ringsPerSqInch(pattern: WeavePattern): number {
  const density: Record<WeavePattern, number> = {
    european_4in1: 80, persian: 100, byzantine: 120,
    dragonscale: 150, japanese_6in1: 60, box_chain: 40,
  };
  return density[pattern];
}

export function ringsNeeded(sqInches: number, pattern: WeavePattern): number {
  return Math.ceil(sqInches * ringsPerSqInch(pattern) * 1.05);
}

export function wireLength(ringCount: number, innerDiameterMm: number, wireThicknessMm: number): number {
  const circumference = Math.PI * (innerDiameterMm + wireThicknessMm);
  return parseFloat((ringCount * circumference / 1000).toFixed(1));
}

export function wireDiameter(gauge: WireGauge): number {
  const mm: Record<WireGauge, number> = {
    14: 1.63, 16: 1.29, 18: 1.02, 20: 0.81, 22: 0.64,
  };
  return mm[gauge];
}

export function mandrelSize(innerDiameter: number): number {
  return parseFloat(innerDiameter.toFixed(2));
}

export function weightPerSqInch(pattern: WeavePattern, gauge: WireGauge): number {
  const ringWeight = Math.PI * wireDiameter(gauge) * 5 * wireDiameter(gauge) * wireDiameter(gauge) * 7.87 / 1000;
  return parseFloat((ringsPerSqInch(pattern) * ringWeight).toFixed(1));
}

export function closureMethod(gauge: WireGauge): string {
  if (gauge <= 16) return "saw cut + solder";
  if (gauge <= 20) return "butted";
  return "butted or micro-riveted";
}

export function difficulty(pattern: WeavePattern): number {
  const d: Record<WeavePattern, number> = {
    european_4in1: 2, persian: 4, byzantine: 5,
    dragonscale: 8, japanese_6in1: 3, box_chain: 6,
  };
  return d[pattern];
}

export function timePerSqInch(pattern: WeavePattern): number {
  return parseFloat((difficulty(pattern) * 5).toFixed(0));
}

export function projectTime(sqInches: number, pattern: WeavePattern): number {
  return parseFloat((sqInches * timePerSqInch(pattern) / 60).toFixed(1));
}

export function weavePatterns(): WeavePattern[] {
  return ["european_4in1", "persian", "byzantine", "dragonscale", "japanese_6in1", "box_chain"];
}
