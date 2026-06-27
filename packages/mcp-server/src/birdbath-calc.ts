export type BirdbathType = "pedestal_concrete" | "hanging_ceramic" | "ground_boulder" | "heated_electric" | "solar_fountain";

export function birdAttraction(t: BirdbathType): number {
  const m: Record<BirdbathType, number> = {
    pedestal_concrete: 7, hanging_ceramic: 6, ground_boulder: 8, heated_electric: 9, solar_fountain: 10,
  };
  return m[t];
}

export function durability(t: BirdbathType): number {
  const m: Record<BirdbathType, number> = {
    pedestal_concrete: 9, hanging_ceramic: 4, ground_boulder: 10, heated_electric: 6, solar_fountain: 5,
  };
  return m[t];
}

export function winterUse(t: BirdbathType): number {
  const m: Record<BirdbathType, number> = {
    pedestal_concrete: 3, hanging_ceramic: 2, ground_boulder: 4, heated_electric: 10, solar_fountain: 1,
  };
  return m[t];
}

export function installEase(t: BirdbathType): number {
  const m: Record<BirdbathType, number> = {
    pedestal_concrete: 4, hanging_ceramic: 8, ground_boulder: 3, heated_electric: 6, solar_fountain: 9,
  };
  return m[t];
}

export function bathCost(t: BirdbathType): number {
  const m: Record<BirdbathType, number> = {
    pedestal_concrete: 5, hanging_ceramic: 4, ground_boulder: 7, heated_electric: 8, solar_fountain: 6,
  };
  return m[t];
}

export function frostProof(t: BirdbathType): boolean {
  const m: Record<BirdbathType, boolean> = {
    pedestal_concrete: false, hanging_ceramic: false, ground_boulder: true, heated_electric: true, solar_fountain: false,
  };
  return m[t];
}

export function hasMovingWater(t: BirdbathType): boolean {
  const m: Record<BirdbathType, boolean> = {
    pedestal_concrete: false, hanging_ceramic: false, ground_boulder: false, heated_electric: false, solar_fountain: true,
  };
  return m[t];
}

export function basinMaterial(t: BirdbathType): string {
  const m: Record<BirdbathType, string> = {
    pedestal_concrete: "cast_concrete_aggregate",
    hanging_ceramic: "glazed_stoneware_bowl",
    ground_boulder: "natural_river_stone",
    heated_electric: "resin_thermostat_element",
    solar_fountain: "poly_resin_solar_panel",
  };
  return m[t];
}

export function bestGarden(t: BirdbathType): string {
  const m: Record<BirdbathType, string> = {
    pedestal_concrete: "formal_garden_center",
    hanging_ceramic: "small_balcony_porch",
    ground_boulder: "naturalistic_woodland",
    heated_electric: "cold_climate_year_round",
    solar_fountain: "sunny_open_lawn",
  };
  return m[t];
}

export function birdbaths(): BirdbathType[] {
  return ["pedestal_concrete", "hanging_ceramic", "ground_boulder", "heated_electric", "solar_fountain"];
}
