export type IndustrialFanType =
  | "centrifugal_backward"
  | "centrifugal_forward"
  | "axial_vane_tube"
  | "mixed_flow_inline"
  | "regenerative_blower";

interface IndustrialFanData {
  pressure: number;
  efficiency: number;
  noiseLevel: number;
  flowRange: number;
  ifCost: number;
  highPressure: boolean;
  forDustyAir: boolean;
  wheel: string;
  bestUse: string;
}

const DATA: Record<IndustrialFanType, IndustrialFanData> = {
  centrifugal_backward: {
    pressure: 8, efficiency: 9, noiseLevel: 7, flowRange: 7, ifCost: 6,
    highPressure: true, forDustyAir: false,
    wheel: "backward_curved_aerofoil_non_overloading",
    bestUse: "clean_air_hvac_supply_process_ventilation",
  },
  centrifugal_forward: {
    pressure: 6, efficiency: 6, noiseLevel: 5, flowRange: 8, ifCost: 4,
    highPressure: false, forDustyAir: false,
    wheel: "forward_curved_multi_vane_squirrel_cage",
    bestUse: "low_pressure_high_volume_residential_ahu",
  },
  axial_vane_tube: {
    pressure: 4, efficiency: 7, noiseLevel: 4, flowRange: 10, ifCost: 5,
    highPressure: false, forDustyAir: false,
    wheel: "aerofoil_blade_hub_mounted_axial_propeller",
    bestUse: "tunnel_ventilation_cooling_tower_large_volume",
  },
  mixed_flow_inline: {
    pressure: 7, efficiency: 8, noiseLevel: 7, flowRange: 8, ifCost: 6,
    highPressure: false, forDustyAir: false,
    wheel: "diagonal_blade_mixed_flow_compact_inline",
    bestUse: "duct_booster_inline_exhaust_compact_install",
  },
  regenerative_blower: {
    pressure: 9, efficiency: 5, noiseLevel: 3, flowRange: 4, ifCost: 5,
    highPressure: true, forDustyAir: false,
    wheel: "peripheral_channel_impeller_regenerative_stage",
    bestUse: "pneumatic_conveying_aeration_vacuum_pickup",
  },
};

function get(t: IndustrialFanType): IndustrialFanData {
  return DATA[t];
}

export const pressure = (t: IndustrialFanType) => get(t).pressure;
export const efficiency = (t: IndustrialFanType) => get(t).efficiency;
export const noiseLevel = (t: IndustrialFanType) => get(t).noiseLevel;
export const flowRange = (t: IndustrialFanType) => get(t).flowRange;
export const ifCost = (t: IndustrialFanType) => get(t).ifCost;
export const highPressure = (t: IndustrialFanType) => get(t).highPressure;
export const forDustyAir = (t: IndustrialFanType) => get(t).forDustyAir;
export const wheel = (t: IndustrialFanType) => get(t).wheel;
export const bestUse = (t: IndustrialFanType) => get(t).bestUse;
export const industrialFanTypes = (): IndustrialFanType[] =>
  Object.keys(DATA) as IndustrialFanType[];
