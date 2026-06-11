export type AirSeparatorType =
  | "tangential_vortex"
  | "coalescing_mesh_pad"
  | "microbubble_vacuum"
  | "float_vent_automatic"
  | "centrifugal_inline";

interface AirSeparatorData {
  efficiency: number;
  capacity: number;
  maintenance: number;
  noise: number;
  asCost: number;
  automatic: boolean;
  forChilled: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<AirSeparatorType, AirSeparatorData> = {
  tangential_vortex: {
    efficiency: 8, capacity: 7, maintenance: 8, noise: 7, asCost: 5,
    automatic: true, forChilled: true,
    method: "tangential_spin_vortex_sep",
    bestUse: "hydronic_loop_main_header",
  },
  coalescing_mesh_pad: {
    efficiency: 9, capacity: 8, maintenance: 7, noise: 9, asCost: 6,
    automatic: true, forChilled: true,
    method: "coalescing_stainless_mesh_pad",
    bestUse: "large_chilled_water_system",
  },
  microbubble_vacuum: {
    efficiency: 10, capacity: 6, maintenance: 6, noise: 8, asCost: 8,
    automatic: true, forChilled: false,
    method: "vacuum_degas_microbubble",
    bestUse: "high_purity_process_water",
  },
  float_vent_automatic: {
    efficiency: 5, capacity: 4, maintenance: 5, noise: 10, asCost: 2,
    automatic: true, forChilled: false,
    method: "float_operated_air_vent",
    bestUse: "radiator_high_point_vent",
  },
  centrifugal_inline: {
    efficiency: 7, capacity: 9, maintenance: 9, noise: 6, asCost: 4,
    automatic: false, forChilled: true,
    method: "centrifugal_inline_cyclone",
    bestUse: "boiler_hot_water_deaeration",
  },
};

function get(t: AirSeparatorType): AirSeparatorData {
  return DATA[t];
}

export const efficiency = (t: AirSeparatorType) => get(t).efficiency;
export const capacity = (t: AirSeparatorType) => get(t).capacity;
export const maintenance = (t: AirSeparatorType) => get(t).maintenance;
export const noise = (t: AirSeparatorType) => get(t).noise;
export const asCost = (t: AirSeparatorType) => get(t).asCost;
export const automatic = (t: AirSeparatorType) => get(t).automatic;
export const forChilled = (t: AirSeparatorType) => get(t).forChilled;
export const method = (t: AirSeparatorType) => get(t).method;
export const bestUse = (t: AirSeparatorType) => get(t).bestUse;
export const airSeparatorTypes = (): AirSeparatorType[] =>
  Object.keys(DATA) as AirSeparatorType[];
