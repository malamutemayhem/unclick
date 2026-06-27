export type RubberMountType =
  | "cylindrical_bonded_stud"
  | "sandwich_plate_shear"
  | "conical_compression_deflect"
  | "bushing_torsional_pivot"
  | "bellows_air_spring";

interface RubberMountData {
  isolation: number;
  loadCapacity: number;
  durability: number;
  frequency: number;
  rmCost: number;
  tunable: boolean;
  forEngine: boolean;
  compound: string;
  bestUse: string;
}

const DATA: Record<RubberMountType, RubberMountData> = {
  cylindrical_bonded_stud: {
    isolation: 7, loadCapacity: 6, durability: 8, frequency: 7, rmCost: 3,
    tunable: false, forEngine: false,
    compound: "natural_rubber_bonded_steel_stud",
    bestUse: "small_motor_pump_general_mount",
  },
  sandwich_plate_shear: {
    isolation: 8, loadCapacity: 8, durability: 9, frequency: 6, rmCost: 4,
    tunable: false, forEngine: true,
    compound: "neoprene_steel_sandwich_laminate",
    bestUse: "generator_compressor_base_mount",
  },
  conical_compression_deflect: {
    isolation: 6, loadCapacity: 9, durability: 8, frequency: 5, rmCost: 5,
    tunable: false, forEngine: true,
    compound: "silicone_rubber_conical_bonded",
    bestUse: "diesel_engine_marine_heavy_equip",
  },
  bushing_torsional_pivot: {
    isolation: 7, loadCapacity: 7, durability: 7, frequency: 8, rmCost: 4,
    tunable: false, forEngine: false,
    compound: "nbr_rubber_steel_sleeve_bushing",
    bestUse: "suspension_arm_pivot_linkage",
  },
  bellows_air_spring: {
    isolation: 10, loadCapacity: 10, durability: 7, frequency: 10, rmCost: 8,
    tunable: true, forEngine: false,
    compound: "reinforced_rubber_bellows_air_fill",
    bestUse: "precision_instrument_active_isolate",
  },
};

function get(t: RubberMountType): RubberMountData {
  return DATA[t];
}

export const isolation = (t: RubberMountType) => get(t).isolation;
export const loadCapacity = (t: RubberMountType) => get(t).loadCapacity;
export const durability = (t: RubberMountType) => get(t).durability;
export const frequency = (t: RubberMountType) => get(t).frequency;
export const rmCost = (t: RubberMountType) => get(t).rmCost;
export const tunable = (t: RubberMountType) => get(t).tunable;
export const forEngine = (t: RubberMountType) => get(t).forEngine;
export const compound = (t: RubberMountType) => get(t).compound;
export const bestUse = (t: RubberMountType) => get(t).bestUse;
export const rubberMountTypes = (): RubberMountType[] =>
  Object.keys(DATA) as RubberMountType[];
