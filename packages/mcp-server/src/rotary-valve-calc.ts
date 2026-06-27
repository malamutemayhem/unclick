export type RotaryValveType =
  | "drop_through_gravity"
  | "blow_through_pneumatic"
  | "metering_pocket_prec"
  | "high_temp_cast_iron"
  | "sanitary_stainless_food";

interface RotaryValveData {
  airlock: number;
  feedAccuracy: number;
  wearResist: number;
  cleanability: number;
  rvCost: number;
  pressureRated: boolean;
  forPneumatic: boolean;
  rotor: string;
  bestUse: string;
}

const DATA: Record<RotaryValveType, RotaryValveData> = {
  drop_through_gravity: {
    airlock: 7, feedAccuracy: 7, wearResist: 7, cleanability: 7, rvCost: 4,
    pressureRated: false, forPneumatic: false,
    rotor: "open_end_rotor_gravity_drop_through_housing",
    bestUse: "grain_flour_powder_gravity_discharge_metering",
  },
  blow_through_pneumatic: {
    airlock: 10, feedAccuracy: 7, wearResist: 8, cleanability: 6, rvCost: 6,
    pressureRated: true, forPneumatic: true,
    rotor: "closed_end_rotor_blow_through_air_injection",
    bestUse: "pneumatic_conveying_pressure_vacuum_airlock",
  },
  metering_pocket_prec: {
    airlock: 8, feedAccuracy: 10, wearResist: 7, cleanability: 8, rvCost: 7,
    pressureRated: false, forPneumatic: false,
    rotor: "precision_pocket_rotor_variable_speed_metering",
    bestUse: "chemical_dosing_catalyst_feed_precise_rate",
  },
  high_temp_cast_iron: {
    airlock: 9, feedAccuracy: 6, wearResist: 10, cleanability: 4, rvCost: 7,
    pressureRated: true, forPneumatic: true,
    rotor: "cast_iron_rotor_high_temp_abrasive_heavy_duty",
    bestUse: "cement_ash_clinker_high_temp_abrasive_material",
  },
  sanitary_stainless_food: {
    airlock: 8, feedAccuracy: 8, wearResist: 6, cleanability: 10, rvCost: 8,
    pressureRated: false, forPneumatic: false,
    rotor: "polished_stainless_rotor_quick_release_cip",
    bestUse: "food_dairy_pharma_sanitary_clean_in_place",
  },
};

function get(t: RotaryValveType): RotaryValveData {
  return DATA[t];
}

export const airlock = (t: RotaryValveType) => get(t).airlock;
export const feedAccuracy = (t: RotaryValveType) => get(t).feedAccuracy;
export const wearResist = (t: RotaryValveType) => get(t).wearResist;
export const cleanability = (t: RotaryValveType) => get(t).cleanability;
export const rvCost = (t: RotaryValveType) => get(t).rvCost;
export const pressureRated = (t: RotaryValveType) => get(t).pressureRated;
export const forPneumatic = (t: RotaryValveType) => get(t).forPneumatic;
export const rotor = (t: RotaryValveType) => get(t).rotor;
export const bestUse = (t: RotaryValveType) => get(t).bestUse;
export const rotaryValveTypes = (): RotaryValveType[] =>
  Object.keys(DATA) as RotaryValveType[];
