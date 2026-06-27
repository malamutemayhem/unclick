export type ContactorType =
  | "ac3_motor_start"
  | "dc_coil_contactor"
  | "vacuum_medium_voltage"
  | "definite_purpose_hvac"
  | "reversing_pair_interlock";

const DATA: Record<ContactorType, {
  current: number; voltage: number; life: number;
  arcQuench: number; ctCost: number; sealed: boolean;
  forMotor: boolean; mechanism: string; bestUse: string;
}> = {
  ac3_motor_start: {
    current: 8, voltage: 6, life: 7,
    arcQuench: 6, ctCost: 2, sealed: false,
    forMotor: true, mechanism: "electromagnetic_coil_armature",
    bestUse: "3_phase_motor_direct_online",
  },
  dc_coil_contactor: {
    current: 7, voltage: 5, life: 6,
    arcQuench: 7, ctCost: 2, sealed: false,
    forMotor: false, mechanism: "dc_magnetic_blowout_coil",
    bestUse: "battery_disconnect_ev_charger",
  },
  vacuum_medium_voltage: {
    current: 10, voltage: 10, life: 10,
    arcQuench: 10, ctCost: 5, sealed: true,
    forMotor: true, mechanism: "vacuum_bottle_arc_interrupt",
    bestUse: "medium_voltage_motor_switching",
  },
  definite_purpose_hvac: {
    current: 5, voltage: 4, life: 5,
    arcQuench: 4, ctCost: 1, sealed: false,
    forMotor: true, mechanism: "single_pole_snap_action",
    bestUse: "residential_ac_compressor_start",
  },
  reversing_pair_interlock: {
    current: 8, voltage: 6, life: 7,
    arcQuench: 6, ctCost: 3, sealed: false,
    forMotor: true, mechanism: "mechanical_interlock_pair",
    bestUse: "conveyor_motor_forward_reverse",
  },
};

const get = (t: ContactorType) => DATA[t];

export const current = (t: ContactorType) => get(t).current;
export const voltage = (t: ContactorType) => get(t).voltage;
export const life = (t: ContactorType) => get(t).life;
export const arcQuench = (t: ContactorType) => get(t).arcQuench;
export const ctCost = (t: ContactorType) => get(t).ctCost;
export const sealed = (t: ContactorType) => get(t).sealed;
export const forMotor = (t: ContactorType) => get(t).forMotor;
export const mechanism = (t: ContactorType) => get(t).mechanism;
export const bestUse = (t: ContactorType) => get(t).bestUse;
export const contactorTypes = (): ContactorType[] => Object.keys(DATA) as ContactorType[];
