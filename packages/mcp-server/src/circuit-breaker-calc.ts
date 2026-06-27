export type CircuitBreakerType =
  | "air_circuit_breaker"
  | "vacuum_circuit_breaker"
  | "sf6_gas_breaker"
  | "molded_case_mccb"
  | "miniature_mcb";

interface CircuitBreakerData {
  interruptCapacity: number;
  arcQuenching: number;
  operatingLife: number;
  compactness: number;
  cbCost: number;
  motorized: boolean;
  forHighVoltage: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<CircuitBreakerType, CircuitBreakerData> = {
  air_circuit_breaker: {
    interruptCapacity: 8, arcQuenching: 7, operatingLife: 9, compactness: 4, cbCost: 7,
    motorized: true, forHighVoltage: false,
    medium: "air_break_arc_chute_deion_plate_stack",
    bestUse: "low_voltage_switchgear_main_breaker_bus_tie",
  },
  vacuum_circuit_breaker: {
    interruptCapacity: 9, arcQuenching: 10, operatingLife: 10, compactness: 7, cbCost: 8,
    motorized: true, forHighVoltage: true,
    medium: "vacuum_interrupter_bottle_sealed_contact_gap",
    bestUse: "medium_voltage_distribution_industrial_feeder",
  },
  sf6_gas_breaker: {
    interruptCapacity: 10, arcQuenching: 10, operatingLife: 9, compactness: 8, cbCost: 10,
    motorized: true, forHighVoltage: true,
    medium: "sf6_gas_puffer_interrupter_sealed_tank",
    bestUse: "high_voltage_transmission_substation_grid",
  },
  molded_case_mccb: {
    interruptCapacity: 6, arcQuenching: 6, operatingLife: 7, compactness: 8, cbCost: 4,
    motorized: false, forHighVoltage: false,
    medium: "molded_insulating_case_thermal_magnetic_trip",
    bestUse: "branch_circuit_motor_feeder_panel_protection",
  },
  miniature_mcb: {
    interruptCapacity: 3, arcQuenching: 4, operatingLife: 6, compactness: 10, cbCost: 2,
    motorized: false, forHighVoltage: false,
    medium: "din_rail_thermal_magnetic_miniature_module",
    bestUse: "residential_commercial_lighting_outlet_branch",
  },
};

function get(t: CircuitBreakerType): CircuitBreakerData {
  return DATA[t];
}

export const interruptCapacity = (t: CircuitBreakerType) => get(t).interruptCapacity;
export const arcQuenching = (t: CircuitBreakerType) => get(t).arcQuenching;
export const operatingLife = (t: CircuitBreakerType) => get(t).operatingLife;
export const compactness = (t: CircuitBreakerType) => get(t).compactness;
export const cbCost = (t: CircuitBreakerType) => get(t).cbCost;
export const motorized = (t: CircuitBreakerType) => get(t).motorized;
export const forHighVoltage = (t: CircuitBreakerType) => get(t).forHighVoltage;
export const medium = (t: CircuitBreakerType) => get(t).medium;
export const bestUse = (t: CircuitBreakerType) => get(t).bestUse;
export const circuitBreakerTypes = (): CircuitBreakerType[] =>
  Object.keys(DATA) as CircuitBreakerType[];
