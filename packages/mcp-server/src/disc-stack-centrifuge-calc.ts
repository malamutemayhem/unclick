export type DiscStackCentrifugeType =
  | "self_cleaning_solids"
  | "nozzle_discharge_conc"
  | "hermetic_sealed_hyg"
  | "clarifier_no_solids"
  | "purifier_two_liquid";

interface DiscStackCentrifugeData {
  clarification: number;
  throughput: number;
  gForce: number;
  hygiene: number;
  dsCost: number;
  solidsDischarge: boolean;
  forBiotech: boolean;
  bowl: string;
  bestUse: string;
}

const DATA: Record<DiscStackCentrifugeType, DiscStackCentrifugeData> = {
  self_cleaning_solids: {
    clarification: 9, throughput: 8, gForce: 9, hygiene: 8, dsCost: 7,
    solidsDischarge: true, forBiotech: false,
    bowl: "self_cleaning_intermittent_solids_ejection",
    bestUse: "dairy_beverage_edible_oil_solids_separation",
  },
  nozzle_discharge_conc: {
    clarification: 8, throughput: 10, gForce: 8, hygiene: 7, dsCost: 6,
    solidsDischarge: true, forBiotech: false,
    bowl: "continuous_nozzle_discharge_concentrate_stream",
    bestUse: "starch_yeast_kaolin_continuous_concentration",
  },
  hermetic_sealed_hyg: {
    clarification: 9, throughput: 7, gForce: 9, hygiene: 10, dsCost: 9,
    solidsDischarge: true, forBiotech: true,
    bowl: "hermetic_sealed_oxygen_free_sterile_design",
    bestUse: "pharma_biotech_vaccine_cell_harvest_sterile",
  },
  clarifier_no_solids: {
    clarification: 10, throughput: 9, gForce: 10, hygiene: 8, dsCost: 6,
    solidsDischarge: false, forBiotech: false,
    bowl: "solid_wall_bowl_no_discharge_manual_clean",
    bestUse: "transformer_oil_fuel_oil_ultra_fine_clarify",
  },
  purifier_two_liquid: {
    clarification: 8, throughput: 8, gForce: 9, hygiene: 8, dsCost: 7,
    solidsDischarge: true, forBiotech: false,
    bowl: "gravity_disc_two_liquid_phase_interface_adjust",
    bestUse: "marine_fuel_lube_oil_water_separation_purify",
  },
};

function get(t: DiscStackCentrifugeType): DiscStackCentrifugeData {
  return DATA[t];
}

export const clarification = (t: DiscStackCentrifugeType) => get(t).clarification;
export const throughput = (t: DiscStackCentrifugeType) => get(t).throughput;
export const gForce = (t: DiscStackCentrifugeType) => get(t).gForce;
export const hygiene = (t: DiscStackCentrifugeType) => get(t).hygiene;
export const dsCost = (t: DiscStackCentrifugeType) => get(t).dsCost;
export const solidsDischarge = (t: DiscStackCentrifugeType) => get(t).solidsDischarge;
export const forBiotech = (t: DiscStackCentrifugeType) => get(t).forBiotech;
export const bowl = (t: DiscStackCentrifugeType) => get(t).bowl;
export const bestUse = (t: DiscStackCentrifugeType) => get(t).bestUse;
export const discStackCentrifugeTypes = (): DiscStackCentrifugeType[] =>
  Object.keys(DATA) as DiscStackCentrifugeType[];
