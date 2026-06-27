export type TransitMode = "bus" | "light_rail" | "metro" | "commuter_rail" | "brt";

export function capacityPerHour(t: TransitMode): number {
  const m: Record<TransitMode, number> = {
    bus: 5000, light_rail: 12000, metro: 40000, commuter_rail: 25000, brt: 10000,
  };
  return m[t];
}

export function avgSpeedKmh(t: TransitMode): number {
  const m: Record<TransitMode, number> = {
    bus: 18, light_rail: 25, metro: 35, commuter_rail: 50, brt: 25,
  };
  return m[t];
}

export function capitalCostPerKmM(t: TransitMode): number {
  const m: Record<TransitMode, number> = {
    bus: 1, light_rail: 30, metro: 200, commuter_rail: 50, brt: 8,
  };
  return m[t];
}

export function constructionYears(t: TransitMode): number {
  const m: Record<TransitMode, number> = {
    bus: 1, light_rail: 4, metro: 10, commuter_rail: 6, brt: 2,
  };
  return m[t];
}

export function reliabilityScore(t: TransitMode): number {
  const m: Record<TransitMode, number> = {
    bus: 4, light_rail: 7, metro: 9, commuter_rail: 6, brt: 7,
  };
  return m[t];
}

export function gradeseparated(t: TransitMode): boolean {
  const m: Record<TransitMode, boolean> = {
    bus: false, light_rail: false, metro: true, commuter_rail: true, brt: false,
  };
  return m[t];
}

export function electricPowered(t: TransitMode): boolean {
  const m: Record<TransitMode, boolean> = {
    bus: false, light_rail: true, metro: true, commuter_rail: true, brt: false,
  };
  return m[t];
}

export function guidanceTech(t: TransitMode): string {
  const m: Record<TransitMode, string> = {
    bus: "driver_steered", light_rail: "steel_rail", metro: "steel_rail",
    commuter_rail: "steel_rail", brt: "lane_guidance",
  };
  return m[t];
}

export function bestUseCase(t: TransitMode): string {
  const m: Record<TransitMode, string> = {
    bus: "local_coverage", light_rail: "urban_corridor", metro: "high_demand_trunk",
    commuter_rail: "suburban_connection", brt: "medium_demand_corridor",
  };
  return m[t];
}

export function transitModes(): TransitMode[] {
  return ["bus", "light_rail", "metro", "commuter_rail", "brt"];
}
