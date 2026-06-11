export type SafetyBootType =
  | "steel_toe_cap_industrial"
  | "composite_toe_lightweight"
  | "metatarsal_guard_foundry"
  | "rubber_waterproof_chemical"
  | "electrical_hazard_eh_rated";

interface SafetyBootData {
  protection: number;
  comfort: number;
  weight: number;
  durability: number;
  sbCost: number;
  metalFree: boolean;
  forHeavy: boolean;
  sole: string;
  bestUse: string;
}

const DATA: Record<SafetyBootType, SafetyBootData> = {
  steel_toe_cap_industrial: {
    protection: 8, comfort: 5, weight: 4, durability: 9, sbCost: 5,
    metalFree: false, forHeavy: true,
    sole: "rubber_oil_resist_slip_tread",
    bestUse: "warehouse_construction_general_heavy",
  },
  composite_toe_lightweight: {
    protection: 7, comfort: 8, weight: 8, durability: 7, sbCost: 7,
    metalFree: true, forHeavy: false,
    sole: "eva_cushion_rubber_outsole",
    bestUse: "airport_security_checkpoint_light",
  },
  metatarsal_guard_foundry: {
    protection: 10, comfort: 4, weight: 3, durability: 9, sbCost: 8,
    metalFree: false, forHeavy: true,
    sole: "heat_resistant_nitrile_pour_stop",
    bestUse: "foundry_molten_metal_heavy_drop",
  },
  rubber_waterproof_chemical: {
    protection: 7, comfort: 5, weight: 5, durability: 8, sbCost: 6,
    metalFree: true, forHeavy: false,
    sole: "acid_resist_pvc_nitrile_sealed",
    bestUse: "chemical_plant_washdown_wet_area",
  },
  electrical_hazard_eh_rated: {
    protection: 7, comfort: 7, weight: 7, durability: 7, sbCost: 7,
    metalFree: true, forHeavy: false,
    sole: "dielectric_non_conductive_insole",
    bestUse: "electrical_work_live_circuit_utility",
  },
};

function get(t: SafetyBootType): SafetyBootData {
  return DATA[t];
}

export const protection = (t: SafetyBootType) => get(t).protection;
export const comfort = (t: SafetyBootType) => get(t).comfort;
export const weight = (t: SafetyBootType) => get(t).weight;
export const durability = (t: SafetyBootType) => get(t).durability;
export const sbCost = (t: SafetyBootType) => get(t).sbCost;
export const metalFree = (t: SafetyBootType) => get(t).metalFree;
export const forHeavy = (t: SafetyBootType) => get(t).forHeavy;
export const sole = (t: SafetyBootType) => get(t).sole;
export const bestUse = (t: SafetyBootType) => get(t).bestUse;
export const safetyBootTypes = (): SafetyBootType[] =>
  Object.keys(DATA) as SafetyBootType[];
