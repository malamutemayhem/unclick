export type LouverTypeType =
  | "fixed_blade_stationary"
  | "adjustable_operable_blade"
  | "drainable_storm_resistant"
  | "acoustic_sound_attenuating"
  | "combination_screen_filter";

interface LouverTypeData {
  airflow: number;
  waterReject: number;
  acoustic: number;
  aesthetic: number;
  lvCost: number;
  operable: boolean;
  forMechanical: boolean;
  blade: string;
  bestUse: string;
}

const DATA: Record<LouverTypeType, LouverTypeData> = {
  fixed_blade_stationary: {
    airflow: 8, waterReject: 5, acoustic: 3, aesthetic: 6, lvCost: 3,
    operable: false, forMechanical: true,
    blade: "fixed_angle_extruded_aluminum",
    bestUse: "standard_air_intake_exhaust",
  },
  adjustable_operable_blade: {
    airflow: 9, waterReject: 6, acoustic: 4, aesthetic: 7, lvCost: 6,
    operable: true, forMechanical: true,
    blade: "motorized_linked_blade_actuator",
    bestUse: "variable_ventilation_damper",
  },
  drainable_storm_resistant: {
    airflow: 6, waterReject: 10, acoustic: 4, aesthetic: 5, lvCost: 7,
    operable: false, forMechanical: true,
    blade: "j_channel_drain_gutter_blade",
    bestUse: "hurricane_zone_coastal_intake",
  },
  acoustic_sound_attenuating: {
    airflow: 5, waterReject: 6, acoustic: 10, aesthetic: 5, lvCost: 8,
    operable: false, forMechanical: true,
    blade: "deep_splitter_lined_absorber",
    bestUse: "generator_room_noise_sensitive",
  },
  combination_screen_filter: {
    airflow: 7, waterReject: 7, acoustic: 3, aesthetic: 6, lvCost: 5,
    operable: false, forMechanical: true,
    blade: "insect_screen_bird_guard_blade",
    bestUse: "food_processing_clean_intake",
  },
};

function get(t: LouverTypeType): LouverTypeData {
  return DATA[t];
}

export const airflow = (t: LouverTypeType) => get(t).airflow;
export const waterReject = (t: LouverTypeType) => get(t).waterReject;
export const acoustic = (t: LouverTypeType) => get(t).acoustic;
export const aesthetic = (t: LouverTypeType) => get(t).aesthetic;
export const lvCost = (t: LouverTypeType) => get(t).lvCost;
export const operable = (t: LouverTypeType) => get(t).operable;
export const forMechanical = (t: LouverTypeType) => get(t).forMechanical;
export const blade = (t: LouverTypeType) => get(t).blade;
export const bestUse = (t: LouverTypeType) => get(t).bestUse;
export const louverTypeTypes = (): LouverTypeType[] =>
  Object.keys(DATA) as LouverTypeType[];
