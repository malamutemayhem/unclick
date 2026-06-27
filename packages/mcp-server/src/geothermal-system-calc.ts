export type GeothermalSystem = "dry_steam" | "flash_steam" | "binary_cycle" | "enhanced" | "direct_use";

export function powerOutput(g: GeothermalSystem): number {
  const m: Record<GeothermalSystem, number> = {
    dry_steam: 9, flash_steam: 10, binary_cycle: 6, enhanced: 7, direct_use: 2,
  };
  return m[g];
}

export function temperatureRequired(g: GeothermalSystem): number {
  const m: Record<GeothermalSystem, number> = {
    dry_steam: 10, flash_steam: 8, binary_cycle: 4, enhanced: 7, direct_use: 2,
  };
  return m[g];
}

export function capitalCost(g: GeothermalSystem): number {
  const m: Record<GeothermalSystem, number> = {
    dry_steam: 6, flash_steam: 7, binary_cycle: 8, enhanced: 10, direct_use: 3,
  };
  return m[g];
}

export function environmentalImpact(g: GeothermalSystem): number {
  const m: Record<GeothermalSystem, number> = {
    dry_steam: 4, flash_steam: 5, binary_cycle: 2, enhanced: 7, direct_use: 1,
  };
  return m[g];
}

export function siteAvailability(g: GeothermalSystem): number {
  const m: Record<GeothermalSystem, number> = {
    dry_steam: 2, flash_steam: 4, binary_cycle: 7, enhanced: 9, direct_use: 8,
  };
  return m[g];
}

export function closedLoop(g: GeothermalSystem): boolean {
  const m: Record<GeothermalSystem, boolean> = {
    dry_steam: false, flash_steam: false, binary_cycle: true, enhanced: false, direct_use: false,
  };
  return m[g];
}

export function electricityGeneration(g: GeothermalSystem): boolean {
  const m: Record<GeothermalSystem, boolean> = {
    dry_steam: true, flash_steam: true, binary_cycle: true, enhanced: true, direct_use: false,
  };
  return m[g];
}

export function workingFluid(g: GeothermalSystem): string {
  const m: Record<GeothermalSystem, string> = {
    dry_steam: "natural_steam_direct", flash_steam: "high_pressure_water",
    binary_cycle: "isobutane_isopentane", enhanced: "injected_water",
    direct_use: "natural_hot_water",
  };
  return m[g];
}

export function famousInstallation(g: GeothermalSystem): string {
  const m: Record<GeothermalSystem, string> = {
    dry_steam: "the_geysers_california", flash_steam: "cerro_prieto_mexico",
    binary_cycle: "soda_lake_nevada", enhanced: "soultz_sous_forets_france",
    direct_use: "reykjavik_district_heating",
  };
  return m[g];
}

export function geothermalSystems(): GeothermalSystem[] {
  return ["dry_steam", "flash_steam", "binary_cycle", "enhanced", "direct_use"];
}
