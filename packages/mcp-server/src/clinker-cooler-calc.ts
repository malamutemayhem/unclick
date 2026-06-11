export type ClinkerCoolerType =
  | "grate_cooler"
  | "rotary_cooler"
  | "satellite_cooler"
  | "shaft_cooler"
  | "rapid_cooler";

interface ClinkerCoolerData {
  coolingEfficiency: number;
  throughput: number;
  heatRecovery: number;
  clinkerQuality: number;
  clCost: number;
  inline: boolean;
  forModern: boolean;
  coolerConfig: string;
  bestUse: string;
}

const DATA: Record<ClinkerCoolerType, ClinkerCoolerData> = {
  grate_cooler: {
    coolingEfficiency: 9, throughput: 10, heatRecovery: 9, clinkerQuality: 9, clCost: 8,
    inline: true, forModern: true,
    coolerConfig: "grate_cooler_clinker_reciprocating_plate_cross_flow_air_cool",
    bestUse: "modern_cement_plant_grate_cooler_high_capacity_heat_recovery",
  },
  rotary_cooler: {
    coolingEfficiency: 7, throughput: 7, heatRecovery: 7, clinkerQuality: 7, clCost: 6,
    inline: true, forModern: false,
    coolerConfig: "rotary_cooler_clinker_inclined_cylinder_tumble_air_counter_flow",
    bestUse: "older_cement_plant_rotary_cooler_simple_reliable_moderate_capacity",
  },
  satellite_cooler: {
    coolingEfficiency: 6, throughput: 6, heatRecovery: 6, clinkerQuality: 6, clCost: 5,
    inline: true, forModern: false,
    coolerConfig: "satellite_cooler_clinker_tubes_mounted_kiln_shell_gravity_cool",
    bestUse: "wet_process_cement_satellite_cooler_kiln_mounted_no_extra_drive",
  },
  shaft_cooler: {
    coolingEfficiency: 8, throughput: 5, heatRecovery: 8, clinkerQuality: 8, clCost: 4,
    inline: false, forModern: false,
    coolerConfig: "shaft_cooler_clinker_vertical_column_counter_flow_air_gravity",
    bestUse: "small_cement_plant_shaft_cooler_vertical_counter_flow_compact",
  },
  rapid_cooler: {
    coolingEfficiency: 10, throughput: 9, heatRecovery: 10, clinkerQuality: 10, clCost: 10,
    inline: true, forModern: true,
    coolerConfig: "rapid_cooler_clinker_high_pressure_air_quench_fast_cool_quality",
    bestUse: "premium_cement_rapid_cooler_fast_quench_high_quality_clinker",
  },
};

function get(t: ClinkerCoolerType): ClinkerCoolerData {
  return DATA[t];
}

export const coolingEfficiency = (t: ClinkerCoolerType) => get(t).coolingEfficiency;
export const throughput = (t: ClinkerCoolerType) => get(t).throughput;
export const heatRecovery = (t: ClinkerCoolerType) => get(t).heatRecovery;
export const clinkerQuality = (t: ClinkerCoolerType) => get(t).clinkerQuality;
export const clCost = (t: ClinkerCoolerType) => get(t).clCost;
export const inline = (t: ClinkerCoolerType) => get(t).inline;
export const forModern = (t: ClinkerCoolerType) => get(t).forModern;
export const coolerConfig = (t: ClinkerCoolerType) => get(t).coolerConfig;
export const bestUse = (t: ClinkerCoolerType) => get(t).bestUse;
export const clinkerCoolerTypes = (): ClinkerCoolerType[] =>
  Object.keys(DATA) as ClinkerCoolerType[];
