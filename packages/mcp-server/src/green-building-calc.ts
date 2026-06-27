export type GreenBuilding = "leed" | "breeam" | "passivhaus" | "well" | "living_building";

export function energyReductionPercent(g: GreenBuilding): number {
  const m: Record<GreenBuilding, number> = {
    leed: 30, breeam: 25, passivhaus: 90, well: 15, living_building: 100,
  };
  return m[g];
}

export function certificationCost(g: GreenBuilding): number {
  const m: Record<GreenBuilding, number> = {
    leed: 6, breeam: 5, passivhaus: 7, well: 8, living_building: 10,
  };
  return m[g];
}

export function marketAdoption(g: GreenBuilding): number {
  const m: Record<GreenBuilding, number> = {
    leed: 10, breeam: 8, passivhaus: 5, well: 6, living_building: 2,
  };
  return m[g];
}

export function occupantHealthFocus(g: GreenBuilding): number {
  const m: Record<GreenBuilding, number> = {
    leed: 5, breeam: 6, passivhaus: 4, well: 10, living_building: 9,
  };
  return m[g];
}

export function waterConservation(g: GreenBuilding): number {
  const m: Record<GreenBuilding, number> = {
    leed: 7, breeam: 6, passivhaus: 3, well: 5, living_building: 10,
  };
  return m[g];
}

export function netZeroRequired(g: GreenBuilding): boolean {
  const m: Record<GreenBuilding, boolean> = {
    leed: false, breeam: false, passivhaus: false, well: false, living_building: true,
  };
  return m[g];
}

export function focusesOnEnvelope(g: GreenBuilding): boolean {
  const m: Record<GreenBuilding, boolean> = {
    leed: false, breeam: false, passivhaus: true, well: false, living_building: false,
  };
  return m[g];
}

export function originCountry(g: GreenBuilding): string {
  const m: Record<GreenBuilding, string> = {
    leed: "united_states", breeam: "united_kingdom", passivhaus: "germany",
    well: "united_states", living_building: "united_states",
  };
  return m[g];
}

export function primaryMetric(g: GreenBuilding): string {
  const m: Record<GreenBuilding, string> = {
    leed: "points_based", breeam: "percentage_score", passivhaus: "energy_demand",
    well: "health_performance", living_building: "net_positive_impact",
  };
  return m[g];
}

export function greenBuildingStandards(): GreenBuilding[] {
  return ["leed", "breeam", "passivhaus", "well", "living_building"];
}
