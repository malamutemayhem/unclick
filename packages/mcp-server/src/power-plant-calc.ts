export type PowerPlant = "coal" | "natural_gas" | "nuclear" | "hydroelectric" | "combined_cycle";

export function capacityMw(p: PowerPlant): number {
  const m: Record<PowerPlant, number> = {
    coal: 600, natural_gas: 400, nuclear: 1000, hydroelectric: 800, combined_cycle: 500,
  };
  return m[p];
}

export function thermalEfficiency(p: PowerPlant): number {
  const m: Record<PowerPlant, number> = {
    coal: 4, natural_gas: 5, nuclear: 3, hydroelectric: 9, combined_cycle: 8,
  };
  return m[p];
}

export function co2EmissionsPerMwh(p: PowerPlant): number {
  const m: Record<PowerPlant, number> = {
    coal: 10, natural_gas: 5, nuclear: 0, hydroelectric: 0, combined_cycle: 4,
  };
  return m[p];
}

export function constructionTimeYears(p: PowerPlant): number {
  const m: Record<PowerPlant, number> = {
    coal: 5, natural_gas: 3, nuclear: 10, hydroelectric: 8, combined_cycle: 3,
  };
  return m[p];
}

export function dispatchability(p: PowerPlant): number {
  const m: Record<PowerPlant, number> = {
    coal: 6, natural_gas: 9, nuclear: 4, hydroelectric: 10, combined_cycle: 9,
  };
  return m[p];
}

export function requiresFuel(p: PowerPlant): boolean {
  const m: Record<PowerPlant, boolean> = {
    coal: true, natural_gas: true, nuclear: true, hydroelectric: false, combined_cycle: true,
  };
  return m[p];
}

export function baseloadCapable(p: PowerPlant): boolean {
  const m: Record<PowerPlant, boolean> = {
    coal: true, natural_gas: false, nuclear: true, hydroelectric: true, combined_cycle: true,
  };
  return m[p];
}

export function coolantType(p: PowerPlant): string {
  const m: Record<PowerPlant, string> = {
    coal: "water_tower", natural_gas: "air_cooled",
    nuclear: "water_cooling_tower", hydroelectric: "river_flow",
    combined_cycle: "water_tower",
  };
  return m[p];
}

export function primeDriver(p: PowerPlant): string {
  const m: Record<PowerPlant, string> = {
    coal: "steam_turbine", natural_gas: "gas_turbine",
    nuclear: "steam_turbine", hydroelectric: "water_turbine",
    combined_cycle: "gas_plus_steam_turbine",
  };
  return m[p];
}

export function powerPlants(): PowerPlant[] {
  return ["coal", "natural_gas", "nuclear", "hydroelectric", "combined_cycle"];
}
