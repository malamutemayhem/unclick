export type GlobeValveType =
  | "single_seat_standard"
  | "double_seat_balanced"
  | "cage_guided_trim"
  | "angle_body_erosion"
  | "three_way_divert_mix";

interface GlobeValveData {
  throttling: number;
  shutoff: number;
  rangeability: number;
  cavitationResist: number;
  gvCost: number;
  balanced: boolean;
  forHighDp: boolean;
  trim: string;
  bestUse: string;
}

const DATA: Record<GlobeValveType, GlobeValveData> = {
  single_seat_standard: {
    throttling: 9, shutoff: 10, rangeability: 8, cavitationResist: 6, gvCost: 5,
    balanced: false, forHighDp: false,
    trim: "contoured_plug_seat_ring_teflon_pack",
    bestUse: "general_throttle_liquid_gas_moderate",
  },
  double_seat_balanced: {
    throttling: 8, shutoff: 6, rangeability: 8, cavitationResist: 5, gvCost: 6,
    balanced: true, forHighDp: true,
    trim: "balanced_plug_dual_seat_low_actuator",
    bestUse: "large_flow_high_dp_reduce_actuator_size",
  },
  cage_guided_trim: {
    throttling: 10, shutoff: 9, rangeability: 10, cavitationResist: 9, gvCost: 8,
    balanced: true, forHighDp: true,
    trim: "cage_guided_multi_hole_anti_cavitate",
    bestUse: "severe_service_flash_cavitate_noise",
  },
  angle_body_erosion: {
    throttling: 7, shutoff: 8, rangeability: 7, cavitationResist: 10, gvCost: 7,
    balanced: false, forHighDp: true,
    trim: "angle_body_straight_through_erosion",
    bestUse: "flash_service_slurry_erosive_media_flow",
  },
  three_way_divert_mix: {
    throttling: 7, shutoff: 7, rangeability: 7, cavitationResist: 5, gvCost: 7,
    balanced: false, forHighDp: false,
    trim: "three_port_plug_divert_or_mix_flow",
    bestUse: "heat_exchanger_bypass_temp_control_mix",
  },
};

function get(t: GlobeValveType): GlobeValveData {
  return DATA[t];
}

export const throttling = (t: GlobeValveType) => get(t).throttling;
export const shutoff = (t: GlobeValveType) => get(t).shutoff;
export const rangeability = (t: GlobeValveType) => get(t).rangeability;
export const cavitationResist = (t: GlobeValveType) => get(t).cavitationResist;
export const gvCost = (t: GlobeValveType) => get(t).gvCost;
export const balanced = (t: GlobeValveType) => get(t).balanced;
export const forHighDp = (t: GlobeValveType) => get(t).forHighDp;
export const trim = (t: GlobeValveType) => get(t).trim;
export const bestUse = (t: GlobeValveType) => get(t).bestUse;
export const globeValveTypes = (): GlobeValveType[] =>
  Object.keys(DATA) as GlobeValveType[];
