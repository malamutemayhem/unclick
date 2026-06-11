export type IsolationAmp =
  | "opto_linear"
  | "capacitive_sigma"
  | "magnetic_giant_mr"
  | "transformer_mod"
  | "digital_isolator";

const DATA: Record<IsolationAmp, {
  bandwidth: number; accuracy: number; cmrr: number;
  isolationVoltage: number; ampCost: number; reinforced: boolean;
  forMotorDrive: boolean; coupling: string; bestUse: string;
}> = {
  opto_linear: {
    bandwidth: 3, accuracy: 4, cmrr: 6,
    isolationVoltage: 7, ampCost: 4, reinforced: true,
    forMotorDrive: false, coupling: "led_photodiode_servo",
    bestUse: "medical_patient_monitor",
  },
  capacitive_sigma: {
    bandwidth: 7, accuracy: 8, cmrr: 9,
    isolationVoltage: 8, ampCost: 6, reinforced: true,
    forMotorDrive: true, coupling: "sio2_cap_modulated",
    bestUse: "inverter_current_sense",
  },
  magnetic_giant_mr: {
    bandwidth: 9, accuracy: 6, cmrr: 7,
    isolationVoltage: 6, ampCost: 7, reinforced: false,
    forMotorDrive: true, coupling: "gmr_wheatstone_bridge",
    bestUse: "dc_bus_voltage_sense",
  },
  transformer_mod: {
    bandwidth: 5, accuracy: 7, cmrr: 8,
    isolationVoltage: 9, ampCost: 5, reinforced: true,
    forMotorDrive: false, coupling: "micro_transformer_am",
    bestUse: "isolated_adc_front_end",
  },
  digital_isolator: {
    bandwidth: 10, accuracy: 9, cmrr: 10,
    isolationVoltage: 8, ampCost: 5, reinforced: true,
    forMotorDrive: true, coupling: "oi_capacitive_digital",
    bestUse: "gate_driver_feedback",
  },
};

const get = (t: IsolationAmp) => DATA[t];

export const bandwidth = (t: IsolationAmp) => get(t).bandwidth;
export const accuracy = (t: IsolationAmp) => get(t).accuracy;
export const cmrr = (t: IsolationAmp) => get(t).cmrr;
export const isolationVoltage = (t: IsolationAmp) => get(t).isolationVoltage;
export const ampCost = (t: IsolationAmp) => get(t).ampCost;
export const reinforced = (t: IsolationAmp) => get(t).reinforced;
export const forMotorDrive = (t: IsolationAmp) => get(t).forMotorDrive;
export const coupling = (t: IsolationAmp) => get(t).coupling;
export const bestUse = (t: IsolationAmp) => get(t).bestUse;
export const isolationAmps = (): IsolationAmp[] => Object.keys(DATA) as IsolationAmp[];
