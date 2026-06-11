export type GroundingRelayType =
  | "overcurrent_ground"
  | "directional_ground"
  | "differential_ground"
  | "distance_ground"
  | "zero_sequence";

interface GroundingRelayData {
  sensitivity: number;
  throughput: number;
  selectivity: number;
  speedOfOperation: number;
  grCost: number;
  directional: boolean;
  forHighResistance: boolean;
  relayConfig: string;
  bestUse: string;
}

const DATA: Record<GroundingRelayType, GroundingRelayData> = {
  overcurrent_ground: {
    sensitivity: 6, throughput: 8, selectivity: 5, speedOfOperation: 7, grCost: 3,
    directional: false, forHighResistance: false,
    relayConfig: "overcurrent_ground_relay_time_inverse_pickup_zero_sequence_ct",
    bestUse: "radial_feeder_overcurrent_ground_relay_simple_time_graded_clear",
  },
  directional_ground: {
    sensitivity: 8, throughput: 8, selectivity: 8, speedOfOperation: 8, grCost: 6,
    directional: true, forHighResistance: false,
    relayConfig: "directional_ground_relay_polarize_zero_sequence_voltage_current",
    bestUse: "ring_bus_directional_ground_relay_selective_fault_direction_trip",
  },
  differential_ground: {
    sensitivity: 9, throughput: 7, selectivity: 10, speedOfOperation: 10, grCost: 8,
    directional: false, forHighResistance: true,
    relayConfig: "differential_ground_relay_restricted_earth_fault_zone_protect",
    bestUse: "transformer_differential_ground_relay_restricted_earth_fault",
  },
  distance_ground: {
    sensitivity: 7, throughput: 9, selectivity: 9, speedOfOperation: 9, grCost: 9,
    directional: true, forHighResistance: false,
    relayConfig: "distance_ground_relay_mho_impedance_zone_reach_pilot_scheme",
    bestUse: "transmission_line_distance_ground_relay_zone_reach_pilot_trip",
  },
  zero_sequence: {
    sensitivity: 10, throughput: 7, selectivity: 7, speedOfOperation: 6, grCost: 4,
    directional: false, forHighResistance: true,
    relayConfig: "zero_sequence_relay_core_balance_ct_residual_sum_detect_leak",
    bestUse: "motor_feeder_zero_sequence_relay_sensitive_ground_fault_detect",
  },
};

function get(t: GroundingRelayType): GroundingRelayData {
  return DATA[t];
}

export const sensitivity = (t: GroundingRelayType) => get(t).sensitivity;
export const throughput = (t: GroundingRelayType) => get(t).throughput;
export const selectivity = (t: GroundingRelayType) => get(t).selectivity;
export const speedOfOperation = (t: GroundingRelayType) => get(t).speedOfOperation;
export const grCost = (t: GroundingRelayType) => get(t).grCost;
export const directional = (t: GroundingRelayType) => get(t).directional;
export const forHighResistance = (t: GroundingRelayType) => get(t).forHighResistance;
export const relayConfig = (t: GroundingRelayType) => get(t).relayConfig;
export const bestUse = (t: GroundingRelayType) => get(t).bestUse;
export const groundingRelayTypes = (): GroundingRelayType[] =>
  Object.keys(DATA) as GroundingRelayType[];
