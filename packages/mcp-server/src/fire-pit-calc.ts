export type FirePitType = "wood_burning_steel" | "propane_gas_table" | "gel_fuel_tabletop" | "chiminea_clay" | "smokeless_airflow";

export function heatOutput(t: FirePitType): number {
  const m: Record<FirePitType, number> = {
    wood_burning_steel: 9, propane_gas_table: 7, gel_fuel_tabletop: 3, chiminea_clay: 8, smokeless_airflow: 8,
  };
  return m[t];
}

export function ambiance(t: FirePitType): number {
  const m: Record<FirePitType, number> = {
    wood_burning_steel: 10, propane_gas_table: 6, gel_fuel_tabletop: 5, chiminea_clay: 9, smokeless_airflow: 8,
  };
  return m[t];
}

export function smokeLevel(t: FirePitType): number {
  const m: Record<FirePitType, number> = {
    wood_burning_steel: 9, propane_gas_table: 1, gel_fuel_tabletop: 1, chiminea_clay: 7, smokeless_airflow: 2,
  };
  return m[t];
}

export function setupEase(t: FirePitType): number {
  const m: Record<FirePitType, number> = {
    wood_burning_steel: 5, propane_gas_table: 9, gel_fuel_tabletop: 10, chiminea_clay: 4, smokeless_airflow: 6,
  };
  return m[t];
}

export function pitCost(t: FirePitType): number {
  const m: Record<FirePitType, number> = {
    wood_burning_steel: 5, propane_gas_table: 8, gel_fuel_tabletop: 3, chiminea_clay: 6, smokeless_airflow: 9,
  };
  return m[t];
}

export function needsFuel(t: FirePitType): boolean {
  const m: Record<FirePitType, boolean> = {
    wood_burning_steel: true, propane_gas_table: true, gel_fuel_tabletop: true, chiminea_clay: true, smokeless_airflow: true,
  };
  return m[t];
}

export function portableLightweight(t: FirePitType): boolean {
  const m: Record<FirePitType, boolean> = {
    wood_burning_steel: false, propane_gas_table: false, gel_fuel_tabletop: true, chiminea_clay: false, smokeless_airflow: true,
  };
  return m[t];
}

export function fuelSource(t: FirePitType): string {
  const m: Record<FirePitType, string> = {
    wood_burning_steel: "split_firewood_log",
    propane_gas_table: "propane_tank_20lb",
    gel_fuel_tabletop: "isopropyl_gel_canister",
    chiminea_clay: "charcoal_or_wood",
    smokeless_airflow: "hardwood_pellet_log",
  };
  return m[t];
}

export function bestSetting(t: FirePitType): string {
  const m: Record<FirePitType, string> = {
    wood_burning_steel: "backyard_campfire_gather",
    propane_gas_table: "patio_dining_table",
    gel_fuel_tabletop: "apartment_balcony_small",
    chiminea_clay: "rustic_garden_corner",
    smokeless_airflow: "suburban_deck_neighbor",
  };
  return m[t];
}

export function firePits(): FirePitType[] {
  return ["wood_burning_steel", "propane_gas_table", "gel_fuel_tabletop", "chiminea_clay", "smokeless_airflow"];
}
