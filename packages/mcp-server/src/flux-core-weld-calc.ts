export type FluxCoreWeldType =
  | "gas_shielded_e71t"
  | "self_shielded_e71t"
  | "dual_shield"
  | "metal_core"
  | "stainless_flux_core";

interface FluxCoreWeldData {
  deposition: number;
  speed: number;
  penetration: number;
  allPosition: number;
  fcCost: number;
  gasRequired: boolean;
  forOutdoor: boolean;
  wire: string;
  bestUse: string;
}

const DATA: Record<FluxCoreWeldType, FluxCoreWeldData> = {
  gas_shielded_e71t: {
    deposition: 8, speed: 8, penetration: 8, allPosition: 9, fcCost: 6,
    gasRequired: true, forOutdoor: false,
    wire: "e71t_1_co2_shielded_rutile_flux_core_all_position_wire",
    bestUse: "structural_steel_fabrication_shop_general_purpose_fillet",
  },
  self_shielded_e71t: {
    deposition: 7, speed: 7, penetration: 7, allPosition: 10, fcCost: 5,
    gasRequired: false, forOutdoor: true,
    wire: "e71t_8_self_shielded_no_gas_field_erection_outdoor_wire",
    bestUse: "field_erection_bridge_deck_outdoor_windy_site_structural",
  },
  dual_shield: {
    deposition: 10, speed: 9, penetration: 9, allPosition: 7, fcCost: 7,
    gasRequired: true, forOutdoor: false,
    wire: "e71t_12_dual_shield_argon_co2_mix_high_deposition_heavy",
    bestUse: "heavy_plate_pressure_vessel_shipyard_high_deposition_weld",
  },
  metal_core: {
    deposition: 9, speed: 10, penetration: 8, allPosition: 6, fcCost: 8,
    gasRequired: true, forOutdoor: false,
    wire: "e70c_6m_metal_core_spray_transfer_low_spatter_high_speed",
    bestUse: "robotic_automotive_frame_high_speed_low_spatter_fillet",
  },
  stainless_flux_core: {
    deposition: 7, speed: 7, penetration: 7, allPosition: 8, fcCost: 9,
    gasRequired: true, forOutdoor: false,
    wire: "e316lt_1_stainless_flux_core_corrosion_resistant_alloy",
    bestUse: "stainless_steel_pipe_chemical_plant_food_process_vessel",
  },
};

function get(t: FluxCoreWeldType): FluxCoreWeldData {
  return DATA[t];
}

export const deposition = (t: FluxCoreWeldType) => get(t).deposition;
export const speed = (t: FluxCoreWeldType) => get(t).speed;
export const penetration = (t: FluxCoreWeldType) => get(t).penetration;
export const allPosition = (t: FluxCoreWeldType) => get(t).allPosition;
export const fcCost = (t: FluxCoreWeldType) => get(t).fcCost;
export const gasRequired = (t: FluxCoreWeldType) => get(t).gasRequired;
export const forOutdoor = (t: FluxCoreWeldType) => get(t).forOutdoor;
export const wire = (t: FluxCoreWeldType) => get(t).wire;
export const bestUse = (t: FluxCoreWeldType) => get(t).bestUse;
export const fluxCoreWeldTypes = (): FluxCoreWeldType[] =>
  Object.keys(DATA) as FluxCoreWeldType[];
