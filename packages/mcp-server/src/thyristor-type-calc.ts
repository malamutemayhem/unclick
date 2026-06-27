export type ThyristorType =
  | "scr_phase_control"
  | "gto_gate_turnoff"
  | "igct_integrated"
  | "triac_bidirect"
  | "mcr_light_trigger";

const DATA: Record<ThyristorType, {
  voltageRating: number; currentRating: number; switchingSpeed: number;
  conduction: number; deviceCost: number; turnOffCapable: boolean;
  forHvdc: boolean; gateType: string; bestUse: string;
}> = {
  scr_phase_control: {
    voltageRating: 8, currentRating: 9, switchingSpeed: 3,
    conduction: 9, deviceCost: 4, turnOffCapable: false,
    forHvdc: true, gateType: "sensitive_gate_pulse",
    bestUse: "grid_phase_control_rectifier",
  },
  gto_gate_turnoff: {
    voltageRating: 9, currentRating: 8, switchingSpeed: 5,
    conduction: 7, deviceCost: 7, turnOffCapable: true,
    forHvdc: true, gateType: "reverse_gate_current",
    bestUse: "traction_inverter_rail",
  },
  igct_integrated: {
    voltageRating: 10, currentRating: 10, switchingSpeed: 6,
    conduction: 8, deviceCost: 9, turnOffCapable: true,
    forHvdc: true, gateType: "hard_driven_integrated",
    bestUse: "medium_voltage_drive",
  },
  triac_bidirect: {
    voltageRating: 4, currentRating: 4, switchingSpeed: 4,
    conduction: 5, deviceCost: 2, turnOffCapable: false,
    forHvdc: false, gateType: "four_quadrant_trigger",
    bestUse: "ac_dimmer_switch",
  },
  mcr_light_trigger: {
    voltageRating: 7, currentRating: 7, switchingSpeed: 7,
    conduction: 6, deviceCost: 6, turnOffCapable: false,
    forHvdc: false, gateType: "optically_triggered",
    bestUse: "high_voltage_crowbar",
  },
};

const get = (t: ThyristorType) => DATA[t];

export const voltageRating = (t: ThyristorType) => get(t).voltageRating;
export const currentRating = (t: ThyristorType) => get(t).currentRating;
export const switchingSpeed = (t: ThyristorType) => get(t).switchingSpeed;
export const conduction = (t: ThyristorType) => get(t).conduction;
export const deviceCost = (t: ThyristorType) => get(t).deviceCost;
export const turnOffCapable = (t: ThyristorType) => get(t).turnOffCapable;
export const forHvdc = (t: ThyristorType) => get(t).forHvdc;
export const gateType = (t: ThyristorType) => get(t).gateType;
export const bestUse = (t: ThyristorType) => get(t).bestUse;
export const thyristorTypes = (): ThyristorType[] => Object.keys(DATA) as ThyristorType[];
