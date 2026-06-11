export type PressureReliefType =
  | "spring_loaded_prv"
  | "pilot_operated_prv"
  | "balanced_bellows"
  | "buckling_pin"
  | "vacuum_breaker";

interface PressureReliefData {
  setAccuracy: number;
  flowCapacity: number;
  reseatability: number;
  backpressureTolerance: number;
  prCost: number;
  reclosing: boolean;
  forCorrosive: boolean;
  actuationMethod: string;
  bestUse: string;
}

const DATA: Record<PressureReliefType, PressureReliefData> = {
  spring_loaded_prv: {
    setAccuracy: 7, flowCapacity: 8, reseatability: 8, backpressureTolerance: 5, prCost: 5,
    reclosing: true, forCorrosive: false,
    actuationMethod: "compressed_spring_disc_lift_direct_process_pressure_overcome",
    bestUse: "steam_boiler_pressure_vessel_general_process_overpressure",
  },
  pilot_operated_prv: {
    setAccuracy: 10, flowCapacity: 10, reseatability: 9, backpressureTolerance: 9, prCost: 8,
    reclosing: true, forCorrosive: false,
    actuationMethod: "small_pilot_valve_sense_pressure_amplify_open_main_valve_snap",
    bestUse: "high_pressure_pipeline_gas_transmission_tight_set_tolerance",
  },
  balanced_bellows: {
    setAccuracy: 8, flowCapacity: 7, reseatability: 8, backpressureTolerance: 10, prCost: 7,
    reclosing: true, forCorrosive: true,
    actuationMethod: "metal_bellows_isolate_spring_from_backpressure_balanced_force",
    bestUse: "refinery_header_variable_backpressure_corrosive_service",
  },
  buckling_pin: {
    setAccuracy: 10, flowCapacity: 9, reseatability: 3, backpressureTolerance: 10, prCost: 6,
    reclosing: false, forCorrosive: true,
    actuationMethod: "calibrated_pin_buckle_at_set_pressure_full_bore_open_once",
    bestUse: "subsea_wellhead_remote_pipeline_zero_leak_non_reclosing",
  },
  vacuum_breaker: {
    setAccuracy: 6, flowCapacity: 7, reseatability: 9, backpressureTolerance: 4, prCost: 4,
    reclosing: true, forCorrosive: false,
    actuationMethod: "weighted_pallet_open_inward_atmospheric_air_admit_prevent_collapse",
    bestUse: "storage_tank_condenser_vessel_vacuum_collapse_prevent_inbreath",
  },
};

function get(t: PressureReliefType): PressureReliefData {
  return DATA[t];
}

export const setAccuracy = (t: PressureReliefType) => get(t).setAccuracy;
export const flowCapacity = (t: PressureReliefType) => get(t).flowCapacity;
export const reseatability = (t: PressureReliefType) => get(t).reseatability;
export const backpressureTolerance = (t: PressureReliefType) => get(t).backpressureTolerance;
export const prCost = (t: PressureReliefType) => get(t).prCost;
export const reclosing = (t: PressureReliefType) => get(t).reclosing;
export const forCorrosive = (t: PressureReliefType) => get(t).forCorrosive;
export const actuationMethod = (t: PressureReliefType) => get(t).actuationMethod;
export const bestUse = (t: PressureReliefType) => get(t).bestUse;
export const pressureReliefTypes = (): PressureReliefType[] =>
  Object.keys(DATA) as PressureReliefType[];
