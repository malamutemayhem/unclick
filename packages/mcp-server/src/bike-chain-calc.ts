export type BikeChainType = "single_speed_bmx" | "multi_speed_8_chain" | "road_11_speed_light" | "ebike_reinforced_heavy" | "half_link_custom";

export function durability(t: BikeChainType): number {
  const m: Record<BikeChainType, number> = {
    single_speed_bmx: 9, multi_speed_8_chain: 7, road_11_speed_light: 5, ebike_reinforced_heavy: 10, half_link_custom: 6,
  };
  return m[t];
}

export function shiftSmoothness(t: BikeChainType): number {
  const m: Record<BikeChainType, number> = {
    single_speed_bmx: 3, multi_speed_8_chain: 7, road_11_speed_light: 10, ebike_reinforced_heavy: 6, half_link_custom: 4,
  };
  return m[t];
}

export function weightSave(t: BikeChainType): number {
  const m: Record<BikeChainType, number> = {
    single_speed_bmx: 6, multi_speed_8_chain: 5, road_11_speed_light: 10, ebike_reinforced_heavy: 2, half_link_custom: 7,
  };
  return m[t];
}

export function stretchResist(t: BikeChainType): number {
  const m: Record<BikeChainType, number> = {
    single_speed_bmx: 8, multi_speed_8_chain: 6, road_11_speed_light: 7, ebike_reinforced_heavy: 10, half_link_custom: 5,
  };
  return m[t];
}

export function chainCost(t: BikeChainType): number {
  const m: Record<BikeChainType, number> = {
    single_speed_bmx: 3, multi_speed_8_chain: 4, road_11_speed_light: 8, ebike_reinforced_heavy: 7, half_link_custom: 5,
  };
  return m[t];
}

export function quickLink(t: BikeChainType): boolean {
  const m: Record<BikeChainType, boolean> = {
    single_speed_bmx: true, multi_speed_8_chain: true, road_11_speed_light: true, ebike_reinforced_heavy: true, half_link_custom: false,
  };
  return m[t];
}

export function directionSpecific(t: BikeChainType): boolean {
  const m: Record<BikeChainType, boolean> = {
    single_speed_bmx: false, multi_speed_8_chain: false, road_11_speed_light: true, ebike_reinforced_heavy: false, half_link_custom: false,
  };
  return m[t];
}

export function pinMaterial(t: BikeChainType): string {
  const m: Record<BikeChainType, string> = {
    single_speed_bmx: "hardened_steel_rivet",
    multi_speed_8_chain: "chrome_plated_pin",
    road_11_speed_light: "hollow_titanium_pin",
    ebike_reinforced_heavy: "reinforced_steel_bushing",
    half_link_custom: "thick_nickel_plated",
  };
  return m[t];
}

export function bestBike(t: BikeChainType): string {
  const m: Record<BikeChainType, string> = {
    single_speed_bmx: "fixie_bmx_track",
    multi_speed_8_chain: "commuter_hybrid_mtb",
    road_11_speed_light: "road_race_performance",
    ebike_reinforced_heavy: "electric_cargo_assist",
    half_link_custom: "custom_tensioning_fit",
  };
  return m[t];
}

export function bikeChains(): BikeChainType[] {
  return ["single_speed_bmx", "multi_speed_8_chain", "road_11_speed_light", "ebike_reinforced_heavy", "half_link_custom"];
}
