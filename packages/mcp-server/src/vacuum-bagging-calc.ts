export type VacuumBaggingType =
  | "nylon_bag"
  | "silicone_bag"
  | "elastomeric_tool"
  | "double_bag"
  | "integrally_heated";

interface VacuumBaggingData {
  consolidation: number;
  throughput: number;
  conformability: number;
  voidReduction: number;
  vbCost: number;
  reusable: boolean;
  forAutoclave: boolean;
  baggingConfig: string;
  bestUse: string;
}

const DATA: Record<VacuumBaggingType, VacuumBaggingData> = {
  nylon_bag: {
    consolidation: 7, throughput: 7, conformability: 8, voidReduction: 7, vbCost: 3,
    reusable: false, forAutoclave: true,
    baggingConfig: "nylon_bag_vacuum_bagging_single_use_sealant_tape_breather_ply",
    bestUse: "flat_panel_nylon_bag_vacuum_bagging_single_use_oven_cure_layup",
  },
  silicone_bag: {
    consolidation: 8, throughput: 8, conformability: 9, voidReduction: 8, vbCost: 6,
    reusable: true, forAutoclave: true,
    baggingConfig: "silicone_bag_vacuum_bagging_reusable_molded_shape_quick_apply",
    bestUse: "repeat_part_silicone_bag_vacuum_bagging_reusable_fast_bag_cycle",
  },
  elastomeric_tool: {
    consolidation: 9, throughput: 6, conformability: 7, voidReduction: 9, vbCost: 8,
    reusable: true, forAutoclave: true,
    baggingConfig: "elastomeric_tool_vacuum_bagging_matched_rubber_press_even_load",
    bestUse: "complex_flange_elastomeric_tool_vacuum_bagging_even_pressure",
  },
  double_bag: {
    consolidation: 9, throughput: 4, conformability: 6, voidReduction: 9, vbCost: 5,
    reusable: false, forAutoclave: false,
    baggingConfig: "double_bag_vacuum_bagging_inner_outer_bag_volatile_path_escape",
    bestUse: "thick_laminate_double_bag_vacuum_bagging_volatile_escape_path",
  },
  integrally_heated: {
    consolidation: 8, throughput: 5, conformability: 7, voidReduction: 8, vbCost: 9,
    reusable: true, forAutoclave: false,
    baggingConfig: "integrally_heated_vacuum_bagging_heater_mat_embed_zone_control",
    bestUse: "field_repair_integrally_heated_vacuum_bagging_on_aircraft_patch",
  },
};

function get(t: VacuumBaggingType): VacuumBaggingData {
  return DATA[t];
}

export const consolidation = (t: VacuumBaggingType) => get(t).consolidation;
export const throughput = (t: VacuumBaggingType) => get(t).throughput;
export const conformability = (t: VacuumBaggingType) => get(t).conformability;
export const voidReduction = (t: VacuumBaggingType) => get(t).voidReduction;
export const vbCost = (t: VacuumBaggingType) => get(t).vbCost;
export const reusable = (t: VacuumBaggingType) => get(t).reusable;
export const forAutoclave = (t: VacuumBaggingType) => get(t).forAutoclave;
export const baggingConfig = (t: VacuumBaggingType) => get(t).baggingConfig;
export const bestUse = (t: VacuumBaggingType) => get(t).bestUse;
export const vacuumBaggingTypes = (): VacuumBaggingType[] =>
  Object.keys(DATA) as VacuumBaggingType[];
