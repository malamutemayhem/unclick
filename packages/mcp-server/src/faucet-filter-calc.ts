export type FaucetFilterType = "carbon_block_mount" | "reverse_osmosis_under" | "ceramic_gravity" | "inline_refrigerator" | "pitcher_pour_through";

export function filtrationLevel(t: FaucetFilterType): number {
  const m: Record<FaucetFilterType, number> = {
    carbon_block_mount: 7, reverse_osmosis_under: 10, ceramic_gravity: 6, inline_refrigerator: 5, pitcher_pour_through: 4,
  };
  return m[t];
}

export function flowSpeed(t: FaucetFilterType): number {
  const m: Record<FaucetFilterType, number> = {
    carbon_block_mount: 8, reverse_osmosis_under: 5, ceramic_gravity: 3, inline_refrigerator: 7, pitcher_pour_through: 2,
  };
  return m[t];
}

export function installEase(t: FaucetFilterType): number {
  const m: Record<FaucetFilterType, number> = {
    carbon_block_mount: 8, reverse_osmosis_under: 3, ceramic_gravity: 10, inline_refrigerator: 4, pitcher_pour_through: 10,
  };
  return m[t];
}

export function filterLife(t: FaucetFilterType): number {
  const m: Record<FaucetFilterType, number> = {
    carbon_block_mount: 6, reverse_osmosis_under: 8, ceramic_gravity: 9, inline_refrigerator: 5, pitcher_pour_through: 3,
  };
  return m[t];
}

export function filterCost(t: FaucetFilterType): number {
  const m: Record<FaucetFilterType, number> = {
    carbon_block_mount: 4, reverse_osmosis_under: 9, ceramic_gravity: 5, inline_refrigerator: 6, pitcher_pour_through: 2,
  };
  return m[t];
}

export function removesLead(t: FaucetFilterType): boolean {
  const m: Record<FaucetFilterType, boolean> = {
    carbon_block_mount: true, reverse_osmosis_under: true, ceramic_gravity: false, inline_refrigerator: false, pitcher_pour_through: false,
  };
  return m[t];
}

export function noPlumbing(t: FaucetFilterType): boolean {
  const m: Record<FaucetFilterType, boolean> = {
    carbon_block_mount: false, reverse_osmosis_under: false, ceramic_gravity: true, inline_refrigerator: false, pitcher_pour_through: true,
  };
  return m[t];
}

export function filterMedia(t: FaucetFilterType): string {
  const m: Record<FaucetFilterType, string> = {
    carbon_block_mount: "compressed_activated_carbon",
    reverse_osmosis_under: "semipermeable_membrane_ro",
    ceramic_gravity: "diatomaceous_earth_ceramic",
    inline_refrigerator: "granulated_carbon_inline",
    pitcher_pour_through: "ion_exchange_resin_carbon",
  };
  return m[t];
}

export function bestSetup(t: FaucetFilterType): string {
  const m: Record<FaucetFilterType, string> = {
    carbon_block_mount: "kitchen_faucet_direct",
    reverse_osmosis_under: "whole_home_undersink",
    ceramic_gravity: "off_grid_countertop",
    inline_refrigerator: "fridge_ice_water_line",
    pitcher_pour_through: "rental_no_install",
  };
  return m[t];
}

export function faucetFilters(): FaucetFilterType[] {
  return ["carbon_block_mount", "reverse_osmosis_under", "ceramic_gravity", "inline_refrigerator", "pitcher_pour_through"];
}
