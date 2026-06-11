export type AdsorptionColumnType =
  | "fixed_bed_downflow"
  | "fixed_bed_upflow"
  | "moving_bed_continuous"
  | "fluidized_bed_expanded"
  | "pulsed_bed_cyclic";

interface AdsorptionColumnData {
  capacity: number;
  efficiency: number;
  pressure: number;
  regeneration: number;
  acCost: number;
  continuous: boolean;
  forTrace: boolean;
  flowMode: string;
  bestUse: string;
}

const DATA: Record<AdsorptionColumnType, AdsorptionColumnData> = {
  fixed_bed_downflow: {
    capacity: 8, efficiency: 9, pressure: 6, regeneration: 6, acCost: 5,
    continuous: false, forTrace: true,
    flowMode: "gravity_downflow_packed_bed_batch_cycle",
    bestUse: "water_treatment_activated_carbon_voc_removal",
  },
  fixed_bed_upflow: {
    capacity: 7, efficiency: 8, pressure: 7, regeneration: 7, acCost: 5,
    continuous: false, forTrace: true,
    flowMode: "upflow_expanded_backwash_capable_batch",
    bestUse: "ion_exchange_softening_demin_water_treat",
  },
  moving_bed_continuous: {
    capacity: 9, efficiency: 8, pressure: 5, regeneration: 9, acCost: 8,
    continuous: true, forTrace: false,
    flowMode: "countercurrent_moving_sorbent_continuous",
    bestUse: "large_scale_gas_purification_simulated_moving",
  },
  fluidized_bed_expanded: {
    capacity: 7, efficiency: 7, pressure: 8, regeneration: 8, acCost: 7,
    continuous: true, forTrace: false,
    flowMode: "fluidized_sorbent_high_contact_area_mix",
    bestUse: "flue_gas_desulfurization_high_dust_load",
  },
  pulsed_bed_cyclic: {
    capacity: 6, efficiency: 9, pressure: 7, regeneration: 10, acCost: 6,
    continuous: false, forTrace: true,
    flowMode: "rapid_cycle_psa_tsa_short_bed_pulse",
    bestUse: "psa_hydrogen_purification_oxygen_generation",
  },
};

function get(t: AdsorptionColumnType): AdsorptionColumnData {
  return DATA[t];
}

export const capacity = (t: AdsorptionColumnType) => get(t).capacity;
export const efficiency = (t: AdsorptionColumnType) => get(t).efficiency;
export const pressure = (t: AdsorptionColumnType) => get(t).pressure;
export const regeneration = (t: AdsorptionColumnType) => get(t).regeneration;
export const acCost = (t: AdsorptionColumnType) => get(t).acCost;
export const continuous = (t: AdsorptionColumnType) => get(t).continuous;
export const forTrace = (t: AdsorptionColumnType) => get(t).forTrace;
export const flowMode = (t: AdsorptionColumnType) => get(t).flowMode;
export const bestUse = (t: AdsorptionColumnType) => get(t).bestUse;
export const adsorptionColumnTypes = (): AdsorptionColumnType[] =>
  Object.keys(DATA) as AdsorptionColumnType[];
