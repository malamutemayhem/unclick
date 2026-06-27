export type MemsSwitch =
  | "ohmic_cantilever"
  | "capacitive_shunt"
  | "lateral_comb_drive"
  | "magnetic_bistable"
  | "piezo_actuated_beam";

const DATA: Record<MemsSwitch, {
  isolation: number; insertionLoss: number; speed: number;
  reliability: number; swCost: number; latching: boolean;
  forRf: boolean; actuation: string; bestUse: string;
}> = {
  ohmic_cantilever: {
    isolation: 8, insertionLoss: 9, speed: 7,
    reliability: 6, swCost: 5, latching: false,
    forRf: true, actuation: "electrostatic_pull_in",
    bestUse: "rf_signal_routing_matrix",
  },
  capacitive_shunt: {
    isolation: 9, insertionLoss: 8, speed: 8,
    reliability: 8, swCost: 4, latching: false,
    forRf: true, actuation: "membrane_snap_down",
    bestUse: "reconfigurable_antenna_tune",
  },
  lateral_comb_drive: {
    isolation: 7, insertionLoss: 7, speed: 6,
    reliability: 7, swCost: 6, latching: false,
    forRf: false, actuation: "interdigitated_slide",
    bestUse: "optical_fiber_crossconnect",
  },
  magnetic_bistable: {
    isolation: 8, insertionLoss: 9, speed: 5,
    reliability: 9, swCost: 7, latching: true,
    forRf: false, actuation: "permanent_magnet_toggle",
    bestUse: "power_relay_micro_grid",
  },
  piezo_actuated_beam: {
    isolation: 9, insertionLoss: 10, speed: 9,
    reliability: 7, swCost: 8, latching: false,
    forRf: true, actuation: "pzt_d31_bending_moment",
    bestUse: "mmwave_5g_phase_shift",
  },
};

const get = (t: MemsSwitch) => DATA[t];

export const isolation = (t: MemsSwitch) => get(t).isolation;
export const insertionLoss = (t: MemsSwitch) => get(t).insertionLoss;
export const speed = (t: MemsSwitch) => get(t).speed;
export const reliability = (t: MemsSwitch) => get(t).reliability;
export const swCost = (t: MemsSwitch) => get(t).swCost;
export const latching = (t: MemsSwitch) => get(t).latching;
export const forRf = (t: MemsSwitch) => get(t).forRf;
export const actuation = (t: MemsSwitch) => get(t).actuation;
export const bestUse = (t: MemsSwitch) => get(t).bestUse;
export const memsSwitches = (): MemsSwitch[] => Object.keys(DATA) as MemsSwitch[];
