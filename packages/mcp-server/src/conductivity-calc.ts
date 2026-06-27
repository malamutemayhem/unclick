export type ConductivityType =
  | "contacting_two_electrode"
  | "contacting_four_electrode"
  | "inductive_toroidal"
  | "electrodeless_capacitive"
  | "usp_pharmaceutical";

interface ConductivityData {
  accuracy: number;
  range: number;
  foulingResist: number;
  maintenance: number;
  ccCost: number;
  nonContact: boolean;
  forPharma: boolean;
  cell: string;
  bestUse: string;
}

const DATA: Record<ConductivityType, ConductivityData> = {
  contacting_two_electrode: {
    accuracy: 9, range: 6, foulingResist: 5, maintenance: 6, ccCost: 4,
    nonContact: false, forPharma: false,
    cell: "graphite_platinum_two_pin_cell",
    bestUse: "pure_water_cooling_tower_monitor",
  },
  contacting_four_electrode: {
    accuracy: 10, range: 8, foulingResist: 7, maintenance: 7, ccCost: 7,
    nonContact: false, forPharma: false,
    cell: "platinum_four_pin_kelvin_cell",
    bestUse: "chemical_brine_wide_range_process",
  },
  inductive_toroidal: {
    accuracy: 8, range: 10, foulingResist: 10, maintenance: 9, ccCost: 7,
    nonContact: true, forPharma: false,
    cell: "dual_toroid_coil_non_contacting",
    bestUse: "wastewater_chemical_corrosive_slurry",
  },
  electrodeless_capacitive: {
    accuracy: 7, range: 7, foulingResist: 9, maintenance: 8, ccCost: 6,
    nonContact: true, forPharma: false,
    cell: "capacitive_coupled_electrode_free",
    bestUse: "aggressive_chemical_inline_clean",
  },
  usp_pharmaceutical: {
    accuracy: 10, range: 4, foulingResist: 6, maintenance: 7, ccCost: 9,
    nonContact: false, forPharma: true,
    cell: "titanium_usp_645_validated_cell",
    bestUse: "wfi_purified_water_usp_comply",
  },
};

function get(t: ConductivityType): ConductivityData {
  return DATA[t];
}

export const accuracy = (t: ConductivityType) => get(t).accuracy;
export const range = (t: ConductivityType) => get(t).range;
export const foulingResist = (t: ConductivityType) => get(t).foulingResist;
export const maintenance = (t: ConductivityType) => get(t).maintenance;
export const ccCost = (t: ConductivityType) => get(t).ccCost;
export const nonContact = (t: ConductivityType) => get(t).nonContact;
export const forPharma = (t: ConductivityType) => get(t).forPharma;
export const cell = (t: ConductivityType) => get(t).cell;
export const bestUse = (t: ConductivityType) => get(t).bestUse;
export const conductivityTypes = (): ConductivityType[] =>
  Object.keys(DATA) as ConductivityType[];
