export type RollerCompactorType =
  | "smooth_drum_static"
  | "vibratory_single_drum"
  | "sheepsfoot_padfoot_drum"
  | "pneumatic_tire_multi"
  | "combination_padfoot_smooth";

interface RollerData {
  compaction: number;
  depth: number;
  speed: number;
  versatility: number;
  rcCost: number;
  vibratory: boolean;
  forAsphalt: boolean;
  drum: string;
  bestUse: string;
}

const DATA: Record<RollerCompactorType, RollerData> = {
  smooth_drum_static: {
    compaction: 6, depth: 5, speed: 7, versatility: 6, rcCost: 4,
    vibratory: false, forAsphalt: true,
    drum: "smooth_steel_single_or_tandem",
    bestUse: "asphalt_finish_roll_proof_roll",
  },
  vibratory_single_drum: {
    compaction: 9, depth: 9, speed: 8, versatility: 8, rcCost: 7,
    vibratory: true, forAsphalt: false,
    drum: "smooth_steel_eccentric_vibrator",
    bestUse: "granular_fill_subgrade_deep_lift",
  },
  sheepsfoot_padfoot_drum: {
    compaction: 8, depth: 8, speed: 6, versatility: 5, rcCost: 6,
    vibratory: true, forAsphalt: false,
    drum: "padfoot_protruding_tamping_feet",
    bestUse: "cohesive_clay_dam_core_embankment",
  },
  pneumatic_tire_multi: {
    compaction: 7, depth: 6, speed: 8, versatility: 7, rcCost: 5,
    vibratory: false, forAsphalt: true,
    drum: "multiple_rubber_tire_overlap",
    bestUse: "asphalt_intermediate_seal_chip",
  },
  combination_padfoot_smooth: {
    compaction: 8, depth: 7, speed: 7, versatility: 9, rcCost: 8,
    vibratory: true, forAsphalt: false,
    drum: "convertible_padfoot_smooth_shell",
    bestUse: "mixed_soil_versatile_single_machine",
  },
};

function get(t: RollerCompactorType): RollerData {
  return DATA[t];
}

export const compaction = (t: RollerCompactorType) => get(t).compaction;
export const depth = (t: RollerCompactorType) => get(t).depth;
export const speed = (t: RollerCompactorType) => get(t).speed;
export const versatility = (t: RollerCompactorType) => get(t).versatility;
export const rcCost = (t: RollerCompactorType) => get(t).rcCost;
export const vibratory = (t: RollerCompactorType) => get(t).vibratory;
export const forAsphalt = (t: RollerCompactorType) => get(t).forAsphalt;
export const drum = (t: RollerCompactorType) => get(t).drum;
export const bestUse = (t: RollerCompactorType) => get(t).bestUse;
export const rollerCompactorTypes = (): RollerCompactorType[] =>
  Object.keys(DATA) as RollerCompactorType[];
