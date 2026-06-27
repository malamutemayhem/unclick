export type MetalType = "gold" | "silver" | "copper" | "platinum";

export function wireGauge(detail: string): number {
  const gauges: Record<string, number> = {
    coarse: 18, medium: 22, fine: 26, ultra_fine: 30,
  };
  return gauges[detail] || 22;
}

export function wireLengthM(areaM2: number, density: number): number {
  return parseFloat((areaM2 * density * 1000).toFixed(0));
}

export function wireWeightG(lengthM: number, gauge: number, metal: MetalType): number {
  const densities: Record<MetalType, number> = {
    gold: 19.3, silver: 10.5, copper: 8.9, platinum: 21.5,
  };
  const diameterMm = 0.127 * Math.pow(92, (36 - gauge) / 39);
  const areaCm2 = Math.PI * Math.pow(diameterMm / 20, 2);
  return parseFloat((lengthM * 100 * areaCm2 * densities[metal]).toFixed(2));
}

export function solderJoints(wireSegments: number): number {
  return Math.max(0, wireSegments - 1);
}

export function annealingTemp(metal: MetalType): number {
  const temps: Record<MetalType, number> = {
    gold: 700, silver: 650, copper: 600, platinum: 900,
  };
  return temps[metal];
}

export function toolCount(complexity: string): number {
  const counts: Record<string, number> = {
    basic: 5, intermediate: 10, advanced: 18,
  };
  return counts[complexity] || 10;
}

export function workTimeHours(joints: number, detail: string): number {
  const factor = detail === "ultra_fine" ? 3 : detail === "fine" ? 2 : 1;
  return parseFloat((joints * 0.1 * factor).toFixed(1));
}

export function granulesCount(areaCm2: number, granuleSizeMm: number): number {
  if (granuleSizeMm <= 0) return 0;
  return Math.ceil(areaCm2 * 100 / (granuleSizeMm * granuleSizeMm));
}

export function polishGrit(stage: number): number {
  return 400 * Math.pow(2, stage);
}

export function metalTypes(): MetalType[] {
  return ["gold", "silver", "copper", "platinum"];
}
