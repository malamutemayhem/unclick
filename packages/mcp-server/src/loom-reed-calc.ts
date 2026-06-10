export type ReedDent = "10" | "12" | "15" | "20" | "25";

export function dentsPerCm(reed: ReedDent): number {
  return parseInt(reed) / 2.54;
}

export function reedWidthCm(warpWidthCm: number): number {
  return Math.round(warpWidthCm + 5);
}

export function endsPerDent(totalEnds: number, reedWidthCm: number, dentsPerCm: number): number {
  const totalDents = Math.round(reedWidthCm * dentsPerCm);
  if (totalDents <= 0) return 0;
  return Math.ceil(totalEnds / totalDents);
}

export function sleySizeForPpi(picksPerInch: number): number {
  return Math.round(picksPerInch / 2);
}

export function reedDepthMm(reedDent: ReedDent): number {
  const depths: Record<ReedDent, number> = {
    "10": 30, "12": 28, "15": 25, "20": 22, "25": 20,
  };
  return depths[reedDent];
}

export function wireGaugeMm(reedDent: ReedDent): number {
  const gauges: Record<ReedDent, number> = {
    "10": 0.6, "12": 0.5, "15": 0.4, "20": 0.35, "25": 0.3,
  };
  return gauges[reedDent];
}

export function reedWeightG(widthCm: number, reedDent: ReedDent): number {
  const factor: Record<ReedDent, number> = {
    "10": 2, "12": 2.5, "15": 3, "20": 3.5, "25": 4,
  };
  return Math.round(widthCm * factor[reedDent]);
}

export function lifespanYears(material: "stainless" | "carbon_steel"): number {
  return material === "stainless" ? 20 : 8;
}

export function costEstimate(reedDent: ReedDent, widthCm: number): number {
  const base: Record<ReedDent, number> = {
    "10": 0.3, "12": 0.35, "15": 0.4, "20": 0.5, "25": 0.6,
  };
  return parseFloat((widthCm * base[reedDent]).toFixed(2));
}

export function reedDents(): ReedDent[] {
  return ["10", "12", "15", "20", "25"];
}
