export type BackflowPreventerType =
  | "reduced_pressure_zone_rpz"
  | "double_check_valve_dcva"
  | "pressure_vacuum_breaker_pvb"
  | "atmospheric_vacuum_avb"
  | "spill_resistant_vacuum_svb";

interface BackflowPreventerData {
  protection: number;
  pressure: number;
  installEase: number;
  maintenance: number;
  bpCost: number;
  testable: boolean;
  forHighHazard: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<BackflowPreventerType, BackflowPreventerData> = {
  reduced_pressure_zone_rpz: {
    protection: 10, pressure: 8, installEase: 4, maintenance: 4, bpCost: 9,
    testable: true, forHighHazard: true,
    mechanism: "dual_check_relief_valve_zone",
    bestUse: "chemical_plant_medical_high_hazard",
  },
  double_check_valve_dcva: {
    protection: 7, pressure: 8, installEase: 6, maintenance: 7, bpCost: 6,
    testable: true, forHighHazard: false,
    mechanism: "dual_check_valve_spring_loaded",
    bestUse: "fire_sprinkler_irrigation_low_hazard",
  },
  pressure_vacuum_breaker_pvb: {
    protection: 8, pressure: 6, installEase: 8, maintenance: 6, bpCost: 4,
    testable: true, forHighHazard: true,
    mechanism: "check_valve_air_inlet_vent",
    bestUse: "irrigation_system_above_grade_outdoor",
  },
  atmospheric_vacuum_avb: {
    protection: 5, pressure: 4, installEase: 10, maintenance: 9, bpCost: 1,
    testable: false, forHighHazard: false,
    mechanism: "air_gap_check_atmospheric_vent",
    bestUse: "hose_bibb_utility_sink_simple",
  },
  spill_resistant_vacuum_svb: {
    protection: 8, pressure: 5, installEase: 7, maintenance: 6, bpCost: 5,
    testable: true, forHighHazard: true,
    mechanism: "canopy_air_inlet_spill_resist",
    bestUse: "indoor_irrigation_lab_faucet",
  },
};

function get(t: BackflowPreventerType): BackflowPreventerData {
  return DATA[t];
}

export const protection = (t: BackflowPreventerType) => get(t).protection;
export const pressure = (t: BackflowPreventerType) => get(t).pressure;
export const installEase = (t: BackflowPreventerType) => get(t).installEase;
export const maintenance = (t: BackflowPreventerType) => get(t).maintenance;
export const bpCost = (t: BackflowPreventerType) => get(t).bpCost;
export const testable = (t: BackflowPreventerType) => get(t).testable;
export const forHighHazard = (t: BackflowPreventerType) => get(t).forHighHazard;
export const mechanism = (t: BackflowPreventerType) => get(t).mechanism;
export const bestUse = (t: BackflowPreventerType) => get(t).bestUse;
export const backflowPreventerTypes = (): BackflowPreventerType[] =>
  Object.keys(DATA) as BackflowPreventerType[];
