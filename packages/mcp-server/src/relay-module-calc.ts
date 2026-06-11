// relay-module-calc - relay module types for electronics

export type RelayModule =
  | "mechanical_spdt_std"
  | "solid_state_ssr"
  | "reed_relay_sealed"
  | "latching_bistable"
  | "time_delay_relay";

const DATA: Record<RelayModule, {
  switchSpeed: number; currentCapacity: number; lifeSpan: number; noiseLevel: number;
  cost: number; solidState: boolean; latching: boolean; contactType: string; bestUse: string;
}> = {
  mechanical_spdt_std:  { switchSpeed: 5, currentCapacity: 8, lifeSpan: 6, noiseLevel: 3, cost: 3, solidState: false, latching: false, contactType: "silver_alloy_spdt", bestUse: "general_load_switch" },
  solid_state_ssr:      { switchSpeed: 10, currentCapacity: 7, lifeSpan: 10, noiseLevel: 10, cost: 6, solidState: true, latching: false, contactType: "triac_optocoupled", bestUse: "fast_silent_switch" },
  reed_relay_sealed:    { switchSpeed: 8, currentCapacity: 4, lifeSpan: 9, noiseLevel: 7, cost: 4, solidState: false, latching: false, contactType: "hermetic_reed_blade", bestUse: "low_current_signal" },
  latching_bistable:    { switchSpeed: 5, currentCapacity: 7, lifeSpan: 7, noiseLevel: 4, cost: 5, solidState: false, latching: true, contactType: "magnetic_latch_spdt", bestUse: "power_save_hold" },
  time_delay_relay:     { switchSpeed: 3, currentCapacity: 8, lifeSpan: 6, noiseLevel: 3, cost: 7, solidState: false, latching: false, contactType: "timer_circuit_spdt", bestUse: "timed_sequence_ctrl" },
};

const get = (r: RelayModule) => DATA[r];
export const switchSpeed = (r: RelayModule) => get(r).switchSpeed;
export const currentCapacity = (r: RelayModule) => get(r).currentCapacity;
export const lifeSpan = (r: RelayModule) => get(r).lifeSpan;
export const noiseLevel = (r: RelayModule) => get(r).noiseLevel;
export const relayCost = (r: RelayModule) => get(r).cost;
export const solidState = (r: RelayModule) => get(r).solidState;
export const latching = (r: RelayModule) => get(r).latching;
export const contactType = (r: RelayModule) => get(r).contactType;
export const bestUse = (r: RelayModule) => get(r).bestUse;
export const relayModules = (): RelayModule[] => Object.keys(DATA) as RelayModule[];
