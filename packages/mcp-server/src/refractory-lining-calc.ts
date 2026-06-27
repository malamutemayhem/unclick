export type RefractoryLiningType =
  | "fireclay_brick_std"
  | "high_alumina_brick"
  | "castable_monolithic"
  | "ceramic_fiber_blanket"
  | "silicon_carbide_brick";

interface RefractoryLiningData {
  tempRating: number;
  abrasionResist: number;
  thermalShock: number;
  installSpeed: number;
  rlCost: number;
  monolithic: boolean;
  forSlagContact: boolean;
  composition: string;
  bestUse: string;
}

const DATA: Record<RefractoryLiningType, RefractoryLiningData> = {
  fireclay_brick_std: {
    tempRating: 6, abrasionResist: 7, thermalShock: 7, installSpeed: 5, rlCost: 3,
    monolithic: false, forSlagContact: false,
    composition: "alumina_silica_fireclay_pressed_fired_brick",
    bestUse: "general_furnace_kiln_backup_lining_standard",
  },
  high_alumina_brick: {
    tempRating: 9, abrasionResist: 9, thermalShock: 6, installSpeed: 5, rlCost: 7,
    monolithic: false, forSlagContact: true,
    composition: "high_alumina_70_90_percent_al2o3_dense_brick",
    bestUse: "blast_furnace_ladle_lining_slag_contact_zone",
  },
  castable_monolithic: {
    tempRating: 8, abrasionResist: 8, thermalShock: 8, installSpeed: 9, rlCost: 5,
    monolithic: true, forSlagContact: false,
    composition: "hydraulic_bonded_castable_vibration_pour_gun",
    bestUse: "complex_shape_boiler_duct_rapid_repair_gunning",
  },
  ceramic_fiber_blanket: {
    tempRating: 7, abrasionResist: 3, thermalShock: 10, installSpeed: 10, rlCost: 4,
    monolithic: false, forSlagContact: false,
    composition: "alumina_silica_ceramic_fiber_needle_blanket",
    bestUse: "backup_insulation_periodic_kiln_low_thermal_mass",
  },
  silicon_carbide_brick: {
    tempRating: 10, abrasionResist: 10, thermalShock: 9, installSpeed: 4, rlCost: 9,
    monolithic: false, forSlagContact: true,
    composition: "silicon_carbide_bonded_nitride_self_bonded",
    bestUse: "incinerator_aluminum_melter_severe_erosion",
  },
};

function get(t: RefractoryLiningType): RefractoryLiningData {
  return DATA[t];
}

export const tempRating = (t: RefractoryLiningType) => get(t).tempRating;
export const abrasionResist = (t: RefractoryLiningType) => get(t).abrasionResist;
export const thermalShock = (t: RefractoryLiningType) => get(t).thermalShock;
export const installSpeed = (t: RefractoryLiningType) => get(t).installSpeed;
export const rlCost = (t: RefractoryLiningType) => get(t).rlCost;
export const monolithic = (t: RefractoryLiningType) => get(t).monolithic;
export const forSlagContact = (t: RefractoryLiningType) => get(t).forSlagContact;
export const composition = (t: RefractoryLiningType) => get(t).composition;
export const bestUse = (t: RefractoryLiningType) => get(t).bestUse;
export const refractoryLiningTypes = (): RefractoryLiningType[] =>
  Object.keys(DATA) as RefractoryLiningType[];
