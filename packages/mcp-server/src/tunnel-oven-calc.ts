export type TunnelOvenType =
  | "direct_gas"
  | "indirect_radiant"
  | "convection_impinge"
  | "hybrid_combo"
  | "electric_element";

interface TunnelOvenData {
  tempUniformity: number;
  throughput: number;
  energyEfficiency: number;
  zoneControl: number;
  toCost: number;
  directFire: boolean;
  forBaking: boolean;
  ovenConfig: string;
  bestUse: string;
}

const DATA: Record<TunnelOvenType, TunnelOvenData> = {
  direct_gas: {
    tempUniformity: 7, throughput: 9, energyEfficiency: 8, zoneControl: 7, toCost: 7,
    directFire: true, forBaking: true,
    ovenConfig: "direct_gas_tunnel_oven_burner_flame_conveyor_belt_zone_bake",
    bestUse: "bread_bake_direct_gas_tunnel_oven_flame_crust_high_volume_line",
  },
  indirect_radiant: {
    tempUniformity: 9, throughput: 8, energyEfficiency: 7, zoneControl: 9, toCost: 8,
    directFire: false, forBaking: true,
    ovenConfig: "indirect_radiant_tunnel_oven_tube_burner_radiant_panel_gentle",
    bestUse: "pastry_bake_indirect_radiant_tunnel_oven_gentle_even_heat_delicate",
  },
  convection_impinge: {
    tempUniformity: 8, throughput: 10, energyEfficiency: 9, zoneControl: 8, toCost: 8,
    directFire: false, forBaking: true,
    ovenConfig: "convection_impinge_tunnel_oven_high_velocity_air_jet_rapid_heat",
    bestUse: "pizza_bake_convection_impinge_tunnel_oven_rapid_crisp_high_speed",
  },
  hybrid_combo: {
    tempUniformity: 8, throughput: 8, energyEfficiency: 7, zoneControl: 9, toCost: 9,
    directFire: true, forBaking: true,
    ovenConfig: "hybrid_combo_tunnel_oven_mix_direct_indirect_convect_flexible",
    bestUse: "multi_product_hybrid_combo_tunnel_oven_flexible_zone_switch_bake",
  },
  electric_element: {
    tempUniformity: 9, throughput: 6, energyEfficiency: 6, zoneControl: 10, toCost: 6,
    directFire: false, forBaking: false,
    ovenConfig: "electric_element_tunnel_oven_resistance_heater_precise_clean_heat",
    bestUse: "electronics_cure_electric_element_tunnel_oven_precise_clean_heat",
  },
};

function get(t: TunnelOvenType): TunnelOvenData {
  return DATA[t];
}

export const tempUniformity = (t: TunnelOvenType) => get(t).tempUniformity;
export const throughput = (t: TunnelOvenType) => get(t).throughput;
export const energyEfficiency = (t: TunnelOvenType) => get(t).energyEfficiency;
export const zoneControl = (t: TunnelOvenType) => get(t).zoneControl;
export const toCost = (t: TunnelOvenType) => get(t).toCost;
export const directFire = (t: TunnelOvenType) => get(t).directFire;
export const forBaking = (t: TunnelOvenType) => get(t).forBaking;
export const ovenConfig = (t: TunnelOvenType) => get(t).ovenConfig;
export const bestUse = (t: TunnelOvenType) => get(t).bestUse;
export const tunnelOvenTypes = (): TunnelOvenType[] =>
  Object.keys(DATA) as TunnelOvenType[];
