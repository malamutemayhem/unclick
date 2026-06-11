export type ShotPeeningType =
  | "steel_shot_gravity"
  | "glass_bead_precision"
  | "ceramic_bead_high_temp"
  | "ultrasonic_needle_peening"
  | "laser_shock_peening";

interface ShotPeeningData {
  intensity: number;
  coverage: number;
  depth: number;
  surfaceFinish: number;
  spCost: number;
  noMedia: boolean;
  forAerospace: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<ShotPeeningType, ShotPeeningData> = {
  steel_shot_gravity: {
    intensity: 8, coverage: 9, depth: 7, surfaceFinish: 5, spCost: 3,
    noMedia: false, forAerospace: false,
    media: "cast_steel_shot_s230_s330",
    bestUse: "spring_gear_automotive_fatigue",
  },
  glass_bead_precision: {
    intensity: 5, coverage: 8, depth: 4, surfaceFinish: 9, spCost: 5,
    noMedia: false, forAerospace: true,
    media: "glass_bead_mil_spec_sieved",
    bestUse: "medical_implant_cosmetic_finish",
  },
  ceramic_bead_high_temp: {
    intensity: 7, coverage: 9, depth: 6, surfaceFinish: 8, spCost: 7,
    noMedia: false, forAerospace: true,
    media: "zirconia_ceramic_bead_z300",
    bestUse: "turbine_disc_blade_root_peen",
  },
  ultrasonic_needle_peening: {
    intensity: 9, coverage: 7, depth: 8, surfaceFinish: 6, spCost: 8,
    noMedia: true, forAerospace: true,
    media: "vibrating_tungsten_needle_pins",
    bestUse: "weld_toe_stress_relief_bridge",
  },
  laser_shock_peening: {
    intensity: 10, coverage: 6, depth: 10, surfaceFinish: 7, spCost: 10,
    noMedia: true, forAerospace: true,
    media: "pulsed_laser_ablation_plasma",
    bestUse: "fan_blade_leading_edge_fod",
  },
};

function get(t: ShotPeeningType): ShotPeeningData {
  return DATA[t];
}

export const intensity = (t: ShotPeeningType) => get(t).intensity;
export const coverage = (t: ShotPeeningType) => get(t).coverage;
export const depth = (t: ShotPeeningType) => get(t).depth;
export const surfaceFinish = (t: ShotPeeningType) => get(t).surfaceFinish;
export const spCost = (t: ShotPeeningType) => get(t).spCost;
export const noMedia = (t: ShotPeeningType) => get(t).noMedia;
export const forAerospace = (t: ShotPeeningType) => get(t).forAerospace;
export const media = (t: ShotPeeningType) => get(t).media;
export const bestUse = (t: ShotPeeningType) => get(t).bestUse;
export const shotPeeningTypes = (): ShotPeeningType[] =>
  Object.keys(DATA) as ShotPeeningType[];
