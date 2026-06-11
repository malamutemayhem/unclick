export type FlashWelderType =
  | "ac_flash"
  | "dc_flash"
  | "continuous_flash"
  | "upset_flash"
  | "mobile_flash";

interface FlashWelderData {
  weldStrength: number;
  throughput: number;
  crossSection: number;
  heatAffected: number;
  fwCost: number;
  portable: boolean;
  forRail: boolean;
  welderConfig: string;
  bestUse: string;
}

const DATA: Record<FlashWelderType, FlashWelderData> = {
  ac_flash: {
    weldStrength: 8, throughput: 7, crossSection: 7, heatAffected: 7, fwCost: 5,
    portable: false, forRail: false,
    welderConfig: "ac_flash_welder_transformer_clamp_arc_upset_butt_join_bar_rod",
    bestUse: "steel_rod_ac_flash_welder_transformer_clamp_arc_upset_butt",
  },
  dc_flash: {
    weldStrength: 9, throughput: 7, crossSection: 8, heatAffected: 8, fwCost: 7,
    portable: false, forRail: false,
    welderConfig: "dc_flash_welder_inverter_precise_energy_alloy_steel_chain_link",
    bestUse: "alloy_chain_dc_flash_welder_inverter_precise_energy_butt_join",
  },
  continuous_flash: {
    weldStrength: 9, throughput: 9, crossSection: 9, heatAffected: 8, fwCost: 8,
    portable: false, forRail: true,
    welderConfig: "continuous_flash_welder_rail_plant_high_output_pre_heat_forge",
    bestUse: "rail_plant_continuous_flash_welder_high_output_pre_heat_forge",
  },
  upset_flash: {
    weldStrength: 8, throughput: 6, crossSection: 6, heatAffected: 7, fwCost: 4,
    portable: false, forRail: false,
    welderConfig: "upset_flash_welder_resistance_heat_force_butt_wire_ring_close",
    bestUse: "wire_ring_upset_flash_welder_resistance_heat_force_butt_close",
  },
  mobile_flash: {
    weldStrength: 8, throughput: 5, crossSection: 8, heatAffected: 7, fwCost: 9,
    portable: true, forRail: true,
    welderConfig: "mobile_flash_welder_track_mount_field_rail_join_generator_power",
    bestUse: "field_rail_mobile_flash_welder_track_mount_generator_power",
  },
};

function get(t: FlashWelderType): FlashWelderData {
  return DATA[t];
}

export const weldStrength = (t: FlashWelderType) => get(t).weldStrength;
export const throughput = (t: FlashWelderType) => get(t).throughput;
export const crossSection = (t: FlashWelderType) => get(t).crossSection;
export const heatAffected = (t: FlashWelderType) => get(t).heatAffected;
export const fwCost = (t: FlashWelderType) => get(t).fwCost;
export const portable = (t: FlashWelderType) => get(t).portable;
export const forRail = (t: FlashWelderType) => get(t).forRail;
export const welderConfig = (t: FlashWelderType) => get(t).welderConfig;
export const bestUse = (t: FlashWelderType) => get(t).bestUse;
export const flashWelderTypes = (): FlashWelderType[] =>
  Object.keys(DATA) as FlashWelderType[];
