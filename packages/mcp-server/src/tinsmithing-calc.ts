export type TinGauge = "light_28" | "standard_26" | "medium_24" | "heavy_22" | "plate_20";

export function thicknessMm(gauge: TinGauge): number {
  const thick: Record<TinGauge, number> = {
    light_28: 0.4, standard_26: 0.5, medium_24: 0.6, heavy_22: 0.8, plate_20: 1.0,
  };
  return thick[gauge];
}

export function bendRadiusMm(gauge: TinGauge): number {
  const radius: Record<TinGauge, number> = {
    light_28: 1, standard_26: 1.5, medium_24: 2, heavy_22: 3, plate_20: 4,
  };
  return radius[gauge];
}

export function solderType(gauge: TinGauge): string {
  const solder: Record<TinGauge, string> = {
    light_28: "lead_free_soft", standard_26: "lead_free_soft", medium_24: "silver_soft",
    heavy_22: "silver_hard", plate_20: "silver_hard",
  };
  return solder[gauge];
}

export function seamAllowanceMm(gauge: TinGauge): number {
  const allowance: Record<TinGauge, number> = {
    light_28: 3, standard_26: 4, medium_24: 5, heavy_22: 6, plate_20: 8,
  };
  return allowance[gauge];
}

export function shearsRequired(gauge: TinGauge): string {
  const shears: Record<TinGauge, string> = {
    light_28: "snips", standard_26: "snips", medium_24: "aviation_snips",
    heavy_22: "bench_shears", plate_20: "bench_shears",
  };
  return shears[gauge];
}

export function weightKgPerM2(gauge: TinGauge): number {
  const weight: Record<TinGauge, number> = {
    light_28: 3, standard_26: 3.7, medium_24: 4.5, heavy_22: 6, plate_20: 7.5,
  };
  return weight[gauge];
}

export function corrosionResistance(gauge: TinGauge): number {
  const resist: Record<TinGauge, number> = {
    light_28: 3, standard_26: 3, medium_24: 4, heavy_22: 4, plate_20: 5,
  };
  return resist[gauge];
}

export function foodSafe(): boolean {
  return true;
}

export function costPerM2(gauge: TinGauge): number {
  const costs: Record<TinGauge, number> = {
    light_28: 8, standard_26: 10, medium_24: 14, heavy_22: 20, plate_20: 28,
  };
  return costs[gauge];
}

export function tinGauges(): TinGauge[] {
  return ["light_28", "standard_26", "medium_24", "heavy_22", "plate_20"];
}
