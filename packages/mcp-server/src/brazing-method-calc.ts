export type BrazingMethodType =
  | "torch_brazing_manual"
  | "furnace_brazing_batch"
  | "induction_brazing_coil"
  | "dip_brazing_salt_bath"
  | "vacuum_brazing_aero";

interface BrazingMethodData {
  jointStrength: number;
  precision: number;
  throughput: number;
  cleanliness: number;
  bzCost: number;
  fluxFree: boolean;
  forMass: boolean;
  filler: string;
  bestUse: string;
}

const DATA: Record<BrazingMethodType, BrazingMethodData> = {
  torch_brazing_manual: {
    jointStrength: 7, precision: 5, throughput: 4, cleanliness: 5, bzCost: 3,
    fluxFree: false, forMass: false,
    filler: "silver_copper_phosphorus_rod_flux",
    bestUse: "hvac_pipe_repair_small_batch_job",
  },
  furnace_brazing_batch: {
    jointStrength: 9, precision: 8, throughput: 9, cleanliness: 8, bzCost: 7,
    fluxFree: true, forMass: true,
    filler: "copper_nickel_paste_preform_atmos",
    bestUse: "heat_exchanger_batch_carbide_tool",
  },
  induction_brazing_coil: {
    jointStrength: 8, precision: 9, throughput: 8, cleanliness: 7, bzCost: 6,
    fluxFree: false, forMass: true,
    filler: "ring_preform_alloy_induction_heat",
    bestUse: "carbide_tip_tube_fitting_inline",
  },
  dip_brazing_salt_bath: {
    jointStrength: 8, precision: 7, throughput: 8, cleanliness: 6, bzCost: 5,
    fluxFree: false, forMass: true,
    filler: "aluminum_silicon_clad_sheet_dip",
    bestUse: "aluminum_heat_exchanger_complex",
  },
  vacuum_brazing_aero: {
    jointStrength: 10, precision: 10, throughput: 6, cleanliness: 10, bzCost: 10,
    fluxFree: true, forMass: false,
    filler: "nickel_gold_palladium_foil_vacuum",
    bestUse: "aerospace_turbine_medical_implant",
  },
};

function get(t: BrazingMethodType): BrazingMethodData {
  return DATA[t];
}

export const jointStrength = (t: BrazingMethodType) => get(t).jointStrength;
export const precision = (t: BrazingMethodType) => get(t).precision;
export const throughput = (t: BrazingMethodType) => get(t).throughput;
export const cleanliness = (t: BrazingMethodType) => get(t).cleanliness;
export const bzCost = (t: BrazingMethodType) => get(t).bzCost;
export const fluxFree = (t: BrazingMethodType) => get(t).fluxFree;
export const forMass = (t: BrazingMethodType) => get(t).forMass;
export const filler = (t: BrazingMethodType) => get(t).filler;
export const bestUse = (t: BrazingMethodType) => get(t).bestUse;
export const brazingMethodTypes = (): BrazingMethodType[] =>
  Object.keys(DATA) as BrazingMethodType[];
