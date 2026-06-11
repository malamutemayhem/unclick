export type ConductivityMeterType =
  | "contacting_two_electrode"
  | "contacting_four_electrode"
  | "inductive_toroidal"
  | "electrodeless_capacitive"
  | "micro_flow_cell";

interface ConductivityMeterData {
  accuracy: number;
  range: number;
  foulingResist: number;
  maintenance: number;
  cmCost: number;
  nonContact: boolean;
  forHighCond: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<ConductivityMeterType, ConductivityMeterData> = {
  contacting_two_electrode: {
    accuracy: 7, range: 5, foulingResist: 4, maintenance: 5, cmCost: 3,
    nonContact: false, forHighCond: false,
    sensor: "two_plate_electrode_cell_constant",
    bestUse: "pure_water_low_conductivity_lab_rinse",
  },
  contacting_four_electrode: {
    accuracy: 9, range: 8, foulingResist: 5, maintenance: 6, cmCost: 5,
    nonContact: false, forHighCond: false,
    sensor: "four_electrode_polarization_compensate",
    bestUse: "process_water_wide_range_chemical_dose",
  },
  inductive_toroidal: {
    accuracy: 7, range: 9, foulingResist: 9, maintenance: 9, cmCost: 6,
    nonContact: true, forHighCond: true,
    sensor: "toroidal_coil_inductive_coupling",
    bestUse: "chemical_plant_acid_base_high_conduct",
  },
  electrodeless_capacitive: {
    accuracy: 6, range: 7, foulingResist: 8, maintenance: 8, cmCost: 5,
    nonContact: true, forHighCond: true,
    sensor: "capacitive_coupled_no_electrode_contact",
    bestUse: "corrosive_liquid_coating_slurry_process",
  },
  micro_flow_cell: {
    accuracy: 10, range: 4, foulingResist: 3, maintenance: 4, cmCost: 7,
    nonContact: false, forHighCond: false,
    sensor: "micro_volume_cell_precision_platinum",
    bestUse: "ultrapure_water_semiconductor_pharma",
  },
};

function get(t: ConductivityMeterType): ConductivityMeterData {
  return DATA[t];
}

export const accuracy = (t: ConductivityMeterType) => get(t).accuracy;
export const range = (t: ConductivityMeterType) => get(t).range;
export const foulingResist = (t: ConductivityMeterType) => get(t).foulingResist;
export const maintenance = (t: ConductivityMeterType) => get(t).maintenance;
export const cmCost = (t: ConductivityMeterType) => get(t).cmCost;
export const nonContact = (t: ConductivityMeterType) => get(t).nonContact;
export const forHighCond = (t: ConductivityMeterType) => get(t).forHighCond;
export const sensor = (t: ConductivityMeterType) => get(t).sensor;
export const bestUse = (t: ConductivityMeterType) => get(t).bestUse;
export const conductivityMeterTypes = (): ConductivityMeterType[] =>
  Object.keys(DATA) as ConductivityMeterType[];
