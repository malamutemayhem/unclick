export type ReliefDepth = "low" | "medium" | "high" | "freestanding";

export function archArea(spanM: number, riseM: number): number {
  return parseFloat((Math.PI * spanM * riseM / 4).toFixed(2));
}

export function figureCount(areaCm2: number, figureScale: string): number {
  const areaPerFigure: Record<string, number> = { small: 500, medium: 1500, large: 4000 };
  const a = areaPerFigure[figureScale] || 1500;
  return Math.floor(areaCm2 / a);
}

export function reliefDepthMm(depth: ReliefDepth): number {
  const mm: Record<ReliefDepth, number> = { low: 15, medium: 40, high: 80, freestanding: 150 };
  return mm[depth];
}

export function stoneWeightKg(areaCm2: number, depthMm: number, density: number): number {
  return parseFloat((areaCm2 * depthMm / 10 / 1000 * density).toFixed(1));
}

export function carvingHours(figureCount: number, depth: ReliefDepth): number {
  const factor: Record<ReliefDepth, number> = { low: 10, medium: 25, high: 50, freestanding: 80 };
  return figureCount * factor[depth];
}

export function paintCoats(exterior: boolean): number {
  return exterior ? 5 : 3;
}

export function goldLeafSheets(gildedAreaCm2: number): number {
  return Math.ceil(gildedAreaCm2 / 64);
}

export function lintelStress(spanM: number, weightKg: number): number {
  if (spanM <= 0) return 0;
  return parseFloat((weightKg * 9.81 / spanM).toFixed(1));
}

export function restorationHours(areaCm2: number, damagePercent: number): number {
  return parseFloat((areaCm2 * damagePercent * 0.002).toFixed(0));
}

export function reliefDepths(): ReliefDepth[] {
  return ["low", "medium", "high", "freestanding"];
}
