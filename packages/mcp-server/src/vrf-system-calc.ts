export type VrfSystemType =
  | "heat_pump_2_pipe"
  | "heat_recovery_3_pipe"
  | "water_cooled_vrf"
  | "mini_vrf_light_commercial"
  | "hybrid_vrf_doas";

interface VrfSystemData {
  efficiency: number;
  zoning: number;
  comfort: number;
  installEase: number;
  vrfCost: number;
  simultaneous: boolean;
  forHighRise: boolean;
  refrigerant: string;
  bestUse: string;
}

const DATA: Record<VrfSystemType, VrfSystemData> = {
  heat_pump_2_pipe: {
    efficiency: 8, zoning: 8, comfort: 7, installEase: 7, vrfCost: 6,
    simultaneous: false, forHighRise: true,
    refrigerant: "r410a_2_pipe_heat_pump_cycle",
    bestUse: "office_building_uniform_load",
  },
  heat_recovery_3_pipe: {
    efficiency: 10, zoning: 10, comfort: 10, installEase: 6, vrfCost: 8,
    simultaneous: true, forHighRise: true,
    refrigerant: "r410a_3_pipe_bc_controller",
    bestUse: "mixed_use_tower_perimeter_core",
  },
  water_cooled_vrf: {
    efficiency: 9, zoning: 9, comfort: 9, installEase: 5, vrfCost: 9,
    simultaneous: true, forHighRise: true,
    refrigerant: "water_cooled_condenser_central",
    bestUse: "high_rise_limited_outdoor_space",
  },
  mini_vrf_light_commercial: {
    efficiency: 7, zoning: 6, comfort: 7, installEase: 9, vrfCost: 4,
    simultaneous: false, forHighRise: false,
    refrigerant: "r32_compact_outdoor_multi_split",
    bestUse: "small_retail_restaurant_clinic",
  },
  hybrid_vrf_doas: {
    efficiency: 9, zoning: 9, comfort: 10, installEase: 5, vrfCost: 9,
    simultaneous: true, forHighRise: false,
    refrigerant: "vrf_plus_erv_fresh_air_unit",
    bestUse: "school_lab_high_ventilation",
  },
};

function get(t: VrfSystemType): VrfSystemData {
  return DATA[t];
}

export const efficiency = (t: VrfSystemType) => get(t).efficiency;
export const zoning = (t: VrfSystemType) => get(t).zoning;
export const comfort = (t: VrfSystemType) => get(t).comfort;
export const installEase = (t: VrfSystemType) => get(t).installEase;
export const vrfCost = (t: VrfSystemType) => get(t).vrfCost;
export const simultaneous = (t: VrfSystemType) => get(t).simultaneous;
export const forHighRise = (t: VrfSystemType) => get(t).forHighRise;
export const refrigerant = (t: VrfSystemType) => get(t).refrigerant;
export const bestUse = (t: VrfSystemType) => get(t).bestUse;
export const vrfSystemTypes = (): VrfSystemType[] =>
  Object.keys(DATA) as VrfSystemType[];
