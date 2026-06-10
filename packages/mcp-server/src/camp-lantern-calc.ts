export type CampLanternType = "led_battery_classic" | "rechargeable_solar_combo" | "fuel_canister_gas" | "collapsible_pop_up" | "string_light_ambient";

export function brightness(t: CampLanternType): number {
  const m: Record<CampLanternType, number> = {
    led_battery_classic: 8, rechargeable_solar_combo: 7, fuel_canister_gas: 9, collapsible_pop_up: 5, string_light_ambient: 4,
  };
  return m[t];
}

export function runtime(t: CampLanternType): number {
  const m: Record<CampLanternType, number> = {
    led_battery_classic: 8, rechargeable_solar_combo: 7, fuel_canister_gas: 6, collapsible_pop_up: 7, string_light_ambient: 9,
  };
  return m[t];
}

export function packSize(t: CampLanternType): number {
  const m: Record<CampLanternType, number> = {
    led_battery_classic: 5, rechargeable_solar_combo: 6, fuel_canister_gas: 4, collapsible_pop_up: 10, string_light_ambient: 8,
  };
  return m[t];
}

export function ambiance(t: CampLanternType): number {
  const m: Record<CampLanternType, number> = {
    led_battery_classic: 6, rechargeable_solar_combo: 6, fuel_canister_gas: 9, collapsible_pop_up: 5, string_light_ambient: 10,
  };
  return m[t];
}

export function lanternCost(t: CampLanternType): number {
  const m: Record<CampLanternType, number> = {
    led_battery_classic: 1, rechargeable_solar_combo: 2, fuel_canister_gas: 2, collapsible_pop_up: 1, string_light_ambient: 1,
  };
  return m[t];
}

export function solarCharge(t: CampLanternType): boolean {
  const m: Record<CampLanternType, boolean> = {
    led_battery_classic: false, rechargeable_solar_combo: true, fuel_canister_gas: false, collapsible_pop_up: false, string_light_ambient: false,
  };
  return m[t];
}

export function collapsible(t: CampLanternType): boolean {
  const m: Record<CampLanternType, boolean> = {
    led_battery_classic: false, rechargeable_solar_combo: false, fuel_canister_gas: false, collapsible_pop_up: true, string_light_ambient: false,
  };
  return m[t];
}

export function lightSource(t: CampLanternType): string {
  const m: Record<CampLanternType, string> = {
    led_battery_classic: "cob_led_array",
    rechargeable_solar_combo: "solar_panel_led_hybrid",
    fuel_canister_gas: "gas_mantle_glow",
    collapsible_pop_up: "smd_led_strip_ring",
    string_light_ambient: "micro_led_string_chain",
  };
  return m[t];
}

export function bestScene(t: CampLanternType): string {
  const m: Record<CampLanternType, string> = {
    led_battery_classic: "tent_table_general",
    rechargeable_solar_combo: "off_grid_multi_day",
    fuel_canister_gas: "winter_cabin_basecamp",
    collapsible_pop_up: "backpack_ultralight_hike",
    string_light_ambient: "car_camp_patio_party",
  };
  return m[t];
}

export function campLanterns(): CampLanternType[] {
  return ["led_battery_classic", "rechargeable_solar_combo", "fuel_canister_gas", "collapsible_pop_up", "string_light_ambient"];
}
