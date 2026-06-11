export type MembraneDistillType =
  | "direct_contact_dcmd"
  | "air_gap_agmd"
  | "vacuum_membrane_vmd"
  | "sweeping_gas_sgmd"
  | "permeate_gap_pgmd";

interface MembraneDistillData {
  flux: number;
  rejection: number;
  energyUse: number;
  foulingResist: number;
  mdCost: number;
  lowGrade: boolean;
  forDesalination: boolean;
  config: string;
  bestUse: string;
}

const DATA: Record<MembraneDistillType, MembraneDistillData> = {
  direct_contact_dcmd: {
    flux: 9, rejection: 9, energyUse: 5, foulingResist: 6, mdCost: 5,
    lowGrade: true, forDesalination: true,
    config: "hot_feed_cold_permeate_direct_membrane_contact",
    bestUse: "seawater_desalination_brine_concentration",
  },
  air_gap_agmd: {
    flux: 6, rejection: 10, energyUse: 7, foulingResist: 8, mdCost: 7,
    lowGrade: true, forDesalination: true,
    config: "air_gap_between_membrane_and_condensation",
    bestUse: "high_purity_water_volatile_removal_solar",
  },
  vacuum_membrane_vmd: {
    flux: 10, rejection: 9, energyUse: 6, foulingResist: 5, mdCost: 8,
    lowGrade: false, forDesalination: false,
    config: "vacuum_applied_permeate_side_high_flux",
    bestUse: "volatile_organic_removal_aroma_recovery",
  },
  sweeping_gas_sgmd: {
    flux: 7, rejection: 9, energyUse: 6, foulingResist: 7, mdCost: 7,
    lowGrade: true, forDesalination: false,
    config: "inert_gas_sweeps_permeate_side_external_condense",
    bestUse: "dissolved_gas_removal_ammonia_stripping",
  },
  permeate_gap_pgmd: {
    flux: 8, rejection: 10, energyUse: 8, foulingResist: 7, mdCost: 6,
    lowGrade: true, forDesalination: true,
    config: "stagnant_permeate_gap_internal_heat_recovery",
    bestUse: "zero_liquid_discharge_inland_brine_treat",
  },
};

function get(t: MembraneDistillType): MembraneDistillData {
  return DATA[t];
}

export const flux = (t: MembraneDistillType) => get(t).flux;
export const rejection = (t: MembraneDistillType) => get(t).rejection;
export const energyUse = (t: MembraneDistillType) => get(t).energyUse;
export const foulingResist = (t: MembraneDistillType) => get(t).foulingResist;
export const mdCost = (t: MembraneDistillType) => get(t).mdCost;
export const lowGrade = (t: MembraneDistillType) => get(t).lowGrade;
export const forDesalination = (t: MembraneDistillType) => get(t).forDesalination;
export const config = (t: MembraneDistillType) => get(t).config;
export const bestUse = (t: MembraneDistillType) => get(t).bestUse;
export const membraneDistillTypes = (): MembraneDistillType[] =>
  Object.keys(DATA) as MembraneDistillType[];
