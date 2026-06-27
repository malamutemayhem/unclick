export type SpandrelDecor = "plain" | "tracery" | "sculpted" | "mosaic" | "painted";

export function areaCm2(archSpanCm: number, archRiseCm: number): number {
  const rectArea = archSpanCm * archRiseCm / 2;
  const archArea = Math.PI * (archSpanCm / 2) * archRiseCm / 4;
  return parseFloat((rectArea - archArea + rectArea * 0.3).toFixed(0));
}

export function panelThicknessCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.5).toFixed(1));
}

export function weightKg(areaCm2: number, thicknessCm: number, densityGPerCm3: number): number {
  return parseFloat((areaCm2 * thicknessCm * densityGPerCm3 / 1000).toFixed(1));
}

export function decorationArea(areaCm2: number, coveragePercent: number): number {
  return parseFloat((areaCm2 * coveragePercent / 100).toFixed(0));
}

export function carvingHours(areaCm2: number, decor: SpandrelDecor): number {
  const hoursPerCm2: Record<SpandrelDecor, number> = {
    plain: 0, tracery: 0.005, sculpted: 0.01, mosaic: 0.008, painted: 0.002,
  };
  return parseFloat((areaCm2 * hoursPerCm2[decor]).toFixed(1));
}

export function loadTransferKn(archThrustKn: number, angle: number): number {
  const rad = angle * Math.PI / 180;
  return parseFloat((archThrustKn * Math.cos(rad)).toFixed(1));
}

export function crackRisk(settlementMm: number, spanCm: number): number {
  if (spanCm <= 0) return 0;
  return parseFloat((settlementMm / spanCm * 1000).toFixed(2));
}

export function ventHoleCount(areaCm2: number): number {
  return Math.max(0, Math.floor(areaCm2 / 5000));
}

export function paintCoats(decor: SpandrelDecor, exterior: boolean): number {
  if (decor !== "painted") return 0;
  return exterior ? 4 : 2;
}

export function restorationCostPerM2(decor: SpandrelDecor): number {
  const costs: Record<SpandrelDecor, number> = {
    plain: 50, tracery: 300, sculpted: 500, mosaic: 400, painted: 200,
  };
  return costs[decor];
}

export function spandrelDecors(): SpandrelDecor[] {
  return ["plain", "tracery", "sculpted", "mosaic", "painted"];
}
