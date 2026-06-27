export type RelayType =
  | "electromechanical_spdt"
  | "solid_state_ssr"
  | "reed_hermetic_glass"
  | "latching_bistable"
  | "time_delay_adjustable";

const DATA: Record<RelayType, {
  current: number; speed: number; life: number;
  isolation: number; rlCost: number; silent: boolean;
  forSafety: boolean; contact: string; bestUse: string;
}> = {
  electromechanical_spdt: {
    current: 8, speed: 5, life: 5,
    isolation: 9, rlCost: 1, silent: false,
    forSafety: true, contact: "silver_alloy_mechanical_arm",
    bestUse: "industrial_control_panel_logic",
  },
  solid_state_ssr: {
    current: 7, speed: 10, life: 10,
    isolation: 7, rlCost: 3, silent: true,
    forSafety: false, contact: "triac_or_mosfet_semiconductor",
    bestUse: "heater_control_fast_cycle_pwm",
  },
  reed_hermetic_glass: {
    current: 3, speed: 8, life: 8,
    isolation: 6, rlCost: 2, silent: true,
    forSafety: false, contact: "ferromagnetic_reed_blade",
    bestUse: "telecom_signal_switching_matrix",
  },
  latching_bistable: {
    current: 6, speed: 6, life: 7,
    isolation: 8, rlCost: 2, silent: false,
    forSafety: false, contact: "dual_coil_permanent_magnet",
    bestUse: "energy_meter_disconnect_switch",
  },
  time_delay_adjustable: {
    current: 7, speed: 3, life: 5,
    isolation: 8, rlCost: 2, silent: false,
    forSafety: true, contact: "rc_timer_mechanical_delay",
    bestUse: "motor_star_delta_starter_sequence",
  },
};

const get = (t: RelayType) => DATA[t];

export const current = (t: RelayType) => get(t).current;
export const speed = (t: RelayType) => get(t).speed;
export const life = (t: RelayType) => get(t).life;
export const isolation = (t: RelayType) => get(t).isolation;
export const rlCost = (t: RelayType) => get(t).rlCost;
export const silent = (t: RelayType) => get(t).silent;
export const forSafety = (t: RelayType) => get(t).forSafety;
export const contact = (t: RelayType) => get(t).contact;
export const bestUse = (t: RelayType) => get(t).bestUse;
export const relayTypes = (): RelayType[] => Object.keys(DATA) as RelayType[];
