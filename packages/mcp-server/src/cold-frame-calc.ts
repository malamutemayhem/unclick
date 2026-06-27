export type GlazingType = "single_glass" | "double_glass" | "polycarbonate" | "polyethylene" | "acrylic";

export function interiorTempBoostCelsius(glazing: GlazingType): number {
  const boost: Record<GlazingType, number> = {
    single_glass: 8, double_glass: 14, polycarbonate: 12, polyethylene: 6, acrylic: 10,
  };
  return boost[glazing];
}

export function lightTransmissionPercent(glazing: GlazingType): number {
  const trans: Record<GlazingType, number> = {
    single_glass: 90, double_glass: 80, polycarbonate: 85, polyethylene: 88, acrylic: 92,
  };
  return trans[glazing];
}

export function lifespanYears(glazing: GlazingType): number {
  const years: Record<GlazingType, number> = {
    single_glass: 20, double_glass: 25, polycarbonate: 15, polyethylene: 2, acrylic: 10,
  };
  return years[glazing];
}

export function ventingAngleDeg(tempCelsius: number): number {
  if (tempCelsius < 15) return 0;
  if (tempCelsius < 20) return 15;
  if (tempCelsius < 25) return 30;
  return 45;
}

export function idealDepthCm(): number {
  return 30;
}

export function seasonExtensionWeeks(glazing: GlazingType): number {
  const weeks: Record<GlazingType, number> = {
    single_glass: 4, double_glass: 8, polycarbonate: 6, polyethylene: 3, acrylic: 5,
  };
  return weeks[glazing];
}

export function hailResistance(glazing: GlazingType): number {
  const res: Record<GlazingType, number> = {
    single_glass: 1, double_glass: 2, polycarbonate: 5, polyethylene: 3, acrylic: 3,
  };
  return res[glazing];
}

export function weightKgPerM2(glazing: GlazingType): number {
  const weight: Record<GlazingType, number> = {
    single_glass: 10, double_glass: 18, polycarbonate: 3, polyethylene: 0.5, acrylic: 5,
  };
  return weight[glazing];
}

export function costPerM2(glazing: GlazingType): number {
  const costs: Record<GlazingType, number> = {
    single_glass: 30, double_glass: 60, polycarbonate: 25, polyethylene: 5, acrylic: 40,
  };
  return costs[glazing];
}

export function glazingTypes(): GlazingType[] {
  return ["single_glass", "double_glass", "polycarbonate", "polyethylene", "acrylic"];
}
