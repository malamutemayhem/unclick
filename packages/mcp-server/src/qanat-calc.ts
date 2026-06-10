export type QanatRegion = "iran" | "oman" | "morocco" | "afghanistan" | "china";

export function tunnelLengthKm(region: QanatRegion): number {
  const d: Record<QanatRegion, number> = {
    iran: 40, oman: 15, morocco: 10, afghanistan: 20, china: 30,
  };
  return d[region];
}

export function shaftDepthMeters(region: QanatRegion): number {
  const d: Record<QanatRegion, number> = {
    iran: 80, oman: 30, morocco: 25, afghanistan: 50, china: 60,
  };
  return d[region];
}

export function flowRateLitersPerSec(region: QanatRegion): number {
  const f: Record<QanatRegion, number> = {
    iran: 50, oman: 20, morocco: 15, afghanistan: 30, china: 40,
  };
  return f[region];
}

export function constructionYears(region: QanatRegion): number {
  const y: Record<QanatRegion, number> = {
    iran: 10, oman: 4, morocco: 3, afghanistan: 6, china: 8,
  };
  return y[region];
}

export function maintenanceCycleMonths(region: QanatRegion): number {
  const m: Record<QanatRegion, number> = {
    iran: 6, oman: 4, morocco: 3, afghanistan: 6, china: 5,
  };
  return m[region];
}

export function siltRisk(region: QanatRegion): number {
  const s: Record<QanatRegion, number> = {
    iran: 5, oman: 7, morocco: 6, afghanistan: 8, china: 4,
  };
  return s[region];
}

export function gravityFed(region: QanatRegion): boolean {
  return true;
}

export function hectaresIrrigated(region: QanatRegion): number {
  const h: Record<QanatRegion, number> = {
    iran: 200, oman: 50, morocco: 40, afghanistan: 100, china: 150,
  };
  return h[region];
}

export function lifespanCenturies(region: QanatRegion): number {
  const l: Record<QanatRegion, number> = {
    iran: 20, oman: 8, morocco: 6, afghanistan: 10, china: 15,
  };
  return l[region];
}

export function qanatRegions(): QanatRegion[] {
  return ["iran", "oman", "morocco", "afghanistan", "china"];
}
