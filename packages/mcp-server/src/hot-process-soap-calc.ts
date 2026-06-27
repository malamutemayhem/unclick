export type HeatSource = "crockpot" | "double_boiler" | "oven" | "direct_heat" | "microwave";

export function cookTempCelsius(source: HeatSource): number {
  const temps: Record<HeatSource, number> = {
    crockpot: 85, double_boiler: 80, oven: 95, direct_heat: 100, microwave: 90,
  };
  return temps[source];
}

export function cookTimeMinutes(source: HeatSource): number {
  const mins: Record<HeatSource, number> = {
    crockpot: 60, double_boiler: 45, oven: 90, direct_heat: 30, microwave: 20,
  };
  return mins[source];
}

export function stirringFrequencyMinutes(source: HeatSource): number {
  const freq: Record<HeatSource, number> = {
    crockpot: 15, double_boiler: 10, oven: 20, direct_heat: 5, microwave: 3,
  };
  return freq[source];
}

export function gelPhase(source: HeatSource): boolean {
  return source !== "microwave";
}

export function usableImmediately(): boolean {
  return true;
}

export function textureControl(source: HeatSource): number {
  const control: Record<HeatSource, number> = {
    crockpot: 3, double_boiler: 4, oven: 2, direct_heat: 2, microwave: 1,
  };
  return control[source];
}

export function burnRisk(source: HeatSource): number {
  const risk: Record<HeatSource, number> = {
    crockpot: 1, double_boiler: 2, oven: 2, direct_heat: 5, microwave: 3,
  };
  return risk[source];
}

export function batchSizeMaxKg(source: HeatSource): number {
  const max: Record<HeatSource, number> = {
    crockpot: 2, double_boiler: 3, oven: 5, direct_heat: 10, microwave: 0.5,
  };
  return max[source];
}

export function costPerBatch(source: HeatSource): number {
  const costs: Record<HeatSource, number> = {
    crockpot: 5, double_boiler: 6, oven: 4, direct_heat: 3, microwave: 2,
  };
  return costs[source];
}

export function heatSources(): HeatSource[] {
  return ["crockpot", "double_boiler", "oven", "direct_heat", "microwave"];
}
