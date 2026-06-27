export type CombineHarvesterType =
  | "conventional_walker"
  | "rotary_axial"
  | "hybrid"
  | "hillside_leveling"
  | "track_drive";

interface CombineHarvesterData {
  speed: number;
  grainCapacity: number;
  efficiency: number;
  grainQuality: number;
  chCost: number;
  selfLeveling: boolean;
  forRice: boolean;
  separation: string;
  bestUse: string;
}

const DATA: Record<CombineHarvesterType, CombineHarvesterData> = {
  conventional_walker: {
    speed: 6, grainCapacity: 6, efficiency: 7, grainQuality: 9, chCost: 5,
    selfLeveling: false, forRice: false,
    separation: "straw_walker_reciprocating_rack_grain_pan_sieve_fan",
    bestUse: "small_to_medium_farm_wheat_barley_oat_gentle_threshold",
  },
  rotary_axial: {
    speed: 9, grainCapacity: 10, efficiency: 9, grainQuality: 7, chCost: 9,
    selfLeveling: false, forRice: false,
    separation: "single_or_twin_rotor_axial_flow_centrifugal_separation",
    bestUse: "large_scale_corn_soybean_high_throughput_dryland_farming",
  },
  hybrid: {
    speed: 8, grainCapacity: 9, efficiency: 9, grainQuality: 8, chCost: 10,
    selfLeveling: false, forRice: false,
    separation: "conventional_threshing_cylinder_plus_rotary_separation",
    bestUse: "mixed_crop_farm_wheat_canola_versatile_crop_rotation",
  },
  hillside_leveling: {
    speed: 6, grainCapacity: 7, efficiency: 8, grainQuality: 8, chCost: 8,
    selfLeveling: true, forRice: false,
    separation: "auto_leveling_chassis_tilt_body_slope_compensation",
    bestUse: "hillside_vineyard_terrace_steep_slope_grain_harvest",
  },
  track_drive: {
    speed: 7, grainCapacity: 10, efficiency: 8, grainQuality: 7, chCost: 9,
    selfLeveling: false, forRice: true,
    separation: "full_track_undercarriage_low_ground_pressure_flotation",
    bestUse: "wet_paddy_field_rice_soft_soil_low_compaction_harvest",
  },
};

function get(t: CombineHarvesterType): CombineHarvesterData {
  return DATA[t];
}

export const speed = (t: CombineHarvesterType) => get(t).speed;
export const grainCapacity = (t: CombineHarvesterType) => get(t).grainCapacity;
export const efficiency = (t: CombineHarvesterType) => get(t).efficiency;
export const grainQuality = (t: CombineHarvesterType) => get(t).grainQuality;
export const chCost = (t: CombineHarvesterType) => get(t).chCost;
export const selfLeveling = (t: CombineHarvesterType) => get(t).selfLeveling;
export const forRice = (t: CombineHarvesterType) => get(t).forRice;
export const separation = (t: CombineHarvesterType) => get(t).separation;
export const bestUse = (t: CombineHarvesterType) => get(t).bestUse;
export const combineHarvesterTypes = (): CombineHarvesterType[] =>
  Object.keys(DATA) as CombineHarvesterType[];
