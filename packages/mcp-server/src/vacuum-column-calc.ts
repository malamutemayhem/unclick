export type VacuumColumnType =
  | "packed_vacuum_standard"
  | "structured_pack_low_dp"
  | "falling_film_vacuum"
  | "short_path_vacuum"
  | "spinning_band_lab";

interface VacuumColumnData {
  separation: number;
  pressureDrop: number;
  thermalDamage: number;
  capacity: number;
  vcCost: number;
  deepVacuum: boolean;
  forThermLabile: boolean;
  internals: string;
  bestUse: string;
}

const DATA: Record<VacuumColumnType, VacuumColumnData> = {
  packed_vacuum_standard: {
    separation: 8, pressureDrop: 7, thermalDamage: 7, capacity: 8, vcCost: 5,
    deepVacuum: false, forThermLabile: false,
    internals: "random_packing_low_holdup_vacuum_operation",
    bestUse: "crude_vacuum_unit_lube_oil_base_stock_fraction",
  },
  structured_pack_low_dp: {
    separation: 9, pressureDrop: 10, thermalDamage: 9, capacity: 9, vcCost: 7,
    deepVacuum: true, forThermLabile: true,
    internals: "structured_packing_gauze_or_sheet_ultra_low_dp",
    bestUse: "fine_chemical_pharma_intermediate_vacuum_distill",
  },
  falling_film_vacuum: {
    separation: 7, pressureDrop: 8, thermalDamage: 9, capacity: 7, vcCost: 6,
    deepVacuum: false, forThermLabile: true,
    internals: "falling_film_evaporator_short_residence_time",
    bestUse: "edible_oil_fatty_acid_deodorization_vacuum",
  },
  short_path_vacuum: {
    separation: 6, pressureDrop: 10, thermalDamage: 10, capacity: 4, vcCost: 9,
    deepVacuum: true, forThermLabile: true,
    internals: "internal_condenser_molecular_distillation",
    bestUse: "vitamin_e_omega_3_cbd_molecular_vacuum_distill",
  },
  spinning_band_lab: {
    separation: 10, pressureDrop: 8, thermalDamage: 8, capacity: 2, vcCost: 8,
    deepVacuum: true, forThermLabile: false,
    internals: "spinning_band_helix_high_efficiency_lab_scale",
    bestUse: "research_lab_reference_standard_high_purity",
  },
};

function get(t: VacuumColumnType): VacuumColumnData {
  return DATA[t];
}

export const separation = (t: VacuumColumnType) => get(t).separation;
export const pressureDrop = (t: VacuumColumnType) => get(t).pressureDrop;
export const thermalDamage = (t: VacuumColumnType) => get(t).thermalDamage;
export const capacity = (t: VacuumColumnType) => get(t).capacity;
export const vcCost = (t: VacuumColumnType) => get(t).vcCost;
export const deepVacuum = (t: VacuumColumnType) => get(t).deepVacuum;
export const forThermLabile = (t: VacuumColumnType) => get(t).forThermLabile;
export const internals = (t: VacuumColumnType) => get(t).internals;
export const bestUse = (t: VacuumColumnType) => get(t).bestUse;
export const vacuumColumnTypes = (): VacuumColumnType[] =>
  Object.keys(DATA) as VacuumColumnType[];
