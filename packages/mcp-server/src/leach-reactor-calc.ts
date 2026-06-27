export type LeachReactorType =
  | "agitated_tank"
  | "heap_leach"
  | "vat_leach"
  | "autoclave_pressure"
  | "column_leach";

interface LeachReactorData {
  extraction: number;
  throughput: number;
  reagentEfficiency: number;
  capitalCost: number;
  lrCost: number;
  pressurized: boolean;
  forRefractory: boolean;
  vessel: string;
  bestUse: string;
}

const DATA: Record<LeachReactorType, LeachReactorData> = {
  agitated_tank: {
    extraction: 9, throughput: 8, reagentEfficiency: 8, capitalCost: 7, lrCost: 7,
    pressurized: false, forRefractory: false,
    vessel: "mechanically_agitated_cstr_series_cascade_cyanide_leach",
    bestUse: "gold_cil_cip_circuit_oxide_ore_high_recovery_standard",
  },
  heap_leach: {
    extraction: 6, throughput: 10, reagentEfficiency: 5, capitalCost: 4, lrCost: 3,
    pressurized: false, forRefractory: false,
    vessel: "lined_pad_drip_emitter_heap_pile_percolation_leach_cycle",
    bestUse: "low_grade_gold_copper_oxide_ore_large_tonnage_heap_stack",
  },
  vat_leach: {
    extraction: 7, throughput: 6, reagentEfficiency: 7, capitalCost: 5, lrCost: 5,
    pressurized: false, forRefractory: false,
    vessel: "concrete_vat_batch_fill_drain_percolation_soak_leach",
    bestUse: "uranium_oxide_ore_batch_acid_leach_percolation_extraction",
  },
  autoclave_pressure: {
    extraction: 10, throughput: 5, reagentEfficiency: 9, capitalCost: 10, lrCost: 10,
    pressurized: true, forRefractory: true,
    vessel: "titanium_lined_autoclave_high_pressure_oxygen_acid_leach",
    bestUse: "refractory_gold_nickel_laterite_pox_high_pressure_acid",
  },
  column_leach: {
    extraction: 7, throughput: 4, reagentEfficiency: 7, capitalCost: 3, lrCost: 4,
    pressurized: false, forRefractory: false,
    vessel: "pvc_column_lab_pilot_scale_percolation_test_upflow_down",
    bestUse: "metallurgical_test_work_pilot_plant_leach_kinetics_study",
  },
};

function get(t: LeachReactorType): LeachReactorData {
  return DATA[t];
}

export const extraction = (t: LeachReactorType) => get(t).extraction;
export const throughput = (t: LeachReactorType) => get(t).throughput;
export const reagentEfficiency = (t: LeachReactorType) => get(t).reagentEfficiency;
export const capitalCost = (t: LeachReactorType) => get(t).capitalCost;
export const lrCost = (t: LeachReactorType) => get(t).lrCost;
export const pressurized = (t: LeachReactorType) => get(t).pressurized;
export const forRefractory = (t: LeachReactorType) => get(t).forRefractory;
export const vessel = (t: LeachReactorType) => get(t).vessel;
export const bestUse = (t: LeachReactorType) => get(t).bestUse;
export const leachReactorTypes = (): LeachReactorType[] =>
  Object.keys(DATA) as LeachReactorType[];
