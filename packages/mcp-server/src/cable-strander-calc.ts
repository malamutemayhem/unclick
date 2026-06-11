export type CableStranderType =
  | "tubular_strander"
  | "rigid_frame"
  | "planetary_cage"
  | "drum_twister"
  | "skip_strander";

interface CableStranderData {
  strandPrecision: number;
  throughput: number;
  layLength: number;
  wireCount: number;
  csCost_: number;
  highSpeed: boolean;
  forPower: boolean;
  stranderConfig: string;
  bestUse: string;
}

const DATA: Record<CableStranderType, CableStranderData> = {
  tubular_strander: {
    strandPrecision: 9, throughput: 9, layLength: 9, wireCount: 8, csCost_: 8,
    highSpeed: true, forPower: true,
    stranderConfig: "tubular_strander_rotating_tube_bobbin_inside_high_speed_lay",
    bestUse: "power_cable_tubular_strander_high_speed_concentric_lay_compact",
  },
  rigid_frame: {
    strandPrecision: 8, throughput: 8, layLength: 8, wireCount: 10, csCost_: 9,
    highSpeed: false, forPower: true,
    stranderConfig: "rigid_frame_strander_cradle_cage_large_bobbin_heavy_conductor",
    bestUse: "heavy_conductor_rigid_frame_strander_large_cross_section_cable",
  },
  planetary_cage: {
    strandPrecision: 8, throughput: 7, layLength: 7, wireCount: 7, csCost_: 7,
    highSpeed: false, forPower: false,
    stranderConfig: "planetary_cage_strander_rotating_cage_bobbin_orbit_twist_lay",
    bestUse: "telecom_cable_planetary_cage_strander_multi_pair_twisted_lay",
  },
  drum_twister: {
    strandPrecision: 9, throughput: 10, layLength: 9, wireCount: 6, csCost_: 7,
    highSpeed: true, forPower: false,
    stranderConfig: "drum_twister_strander_double_twist_one_rotation_two_twist_fast",
    bestUse: "data_cable_drum_twister_strander_double_twist_high_speed_pair",
  },
  skip_strander: {
    strandPrecision: 7, throughput: 6, layLength: 8, wireCount: 9, csCost_: 6,
    highSpeed: false, forPower: true,
    stranderConfig: "skip_strander_reversing_cage_alternate_direction_layer_build",
    bestUse: "submarine_cable_skip_strander_alternating_lay_multi_layer_armor",
  },
};

function get(t: CableStranderType): CableStranderData {
  return DATA[t];
}

export const strandPrecision = (t: CableStranderType) => get(t).strandPrecision;
export const throughput = (t: CableStranderType) => get(t).throughput;
export const layLength = (t: CableStranderType) => get(t).layLength;
export const wireCount = (t: CableStranderType) => get(t).wireCount;
export const csCost_ = (t: CableStranderType) => get(t).csCost_;
export const highSpeed = (t: CableStranderType) => get(t).highSpeed;
export const forPower = (t: CableStranderType) => get(t).forPower;
export const stranderConfig = (t: CableStranderType) => get(t).stranderConfig;
export const bestUse = (t: CableStranderType) => get(t).bestUse;
export const cableStranderTypes = (): CableStranderType[] =>
  Object.keys(DATA) as CableStranderType[];
