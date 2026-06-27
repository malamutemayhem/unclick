export type CampStove = "canister_top" | "liquid_fuel" | "wood_burning" | "alcohol_burner" | "solid_fuel_tab";

export function boilTime(c: CampStove): number {
  const m: Record<CampStove, number> = {
    canister_top: 9, liquid_fuel: 8, wood_burning: 4, alcohol_burner: 5, solid_fuel_tab: 3,
  };
  return m[c];
}

export function fuelEfficiency(c: CampStove): number {
  const m: Record<CampStove, number> = {
    canister_top: 8, liquid_fuel: 7, wood_burning: 10, alcohol_burner: 5, solid_fuel_tab: 4,
  };
  return m[c];
}

export function windResistance(c: CampStove): number {
  const m: Record<CampStove, number> = {
    canister_top: 5, liquid_fuel: 8, wood_burning: 6, alcohol_burner: 3, solid_fuel_tab: 4,
  };
  return m[c];
}

export function simmerControl(c: CampStove): number {
  const m: Record<CampStove, number> = {
    canister_top: 9, liquid_fuel: 7, wood_burning: 3, alcohol_burner: 2, solid_fuel_tab: 1,
  };
  return m[c];
}

export function stoveCost(c: CampStove): number {
  const m: Record<CampStove, number> = {
    canister_top: 5, liquid_fuel: 7, wood_burning: 4, alcohol_burner: 2, solid_fuel_tab: 1,
  };
  return m[c];
}

export function requiresCanister(c: CampStove): boolean {
  const m: Record<CampStove, boolean> = {
    canister_top: true, liquid_fuel: false, wood_burning: false, alcohol_burner: false, solid_fuel_tab: false,
  };
  return m[c];
}

export function airlineCarryOn(c: CampStove): boolean {
  const m: Record<CampStove, boolean> = {
    canister_top: false, liquid_fuel: false, wood_burning: true, alcohol_burner: true, solid_fuel_tab: true,
  };
  return m[c];
}

export function fuelSource(c: CampStove): string {
  const m: Record<CampStove, string> = {
    canister_top: "isobutane_propane_mix_can", liquid_fuel: "white_gas_kerosene_multi",
    wood_burning: "twigs_leaves_biomass_free", alcohol_burner: "denatured_alcohol_meths",
    solid_fuel_tab: "hexamine_esbit_tablet",
  };
  return m[c];
}

export function bestTrip(c: CampStove): string {
  const m: Record<CampStove, string> = {
    canister_top: "weekend_backpacking_fast", liquid_fuel: "expedition_cold_altitude",
    wood_burning: "ultralight_no_fuel_carry", alcohol_burner: "thru_hike_lightweight",
    solid_fuel_tab: "emergency_backup_minimal",
  };
  return m[c];
}

export function campStoves(): CampStove[] {
  return ["canister_top", "liquid_fuel", "wood_burning", "alcohol_burner", "solid_fuel_tab"];
}
