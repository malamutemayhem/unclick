export type TorqueSensor =
  | "strain_gauge_shaft"
  | "magnetoelastic_sar"
  | "optical_phase_shift"
  | "piezoelectric_rotary"
  | "reaction_load_cell";

const DATA: Record<TorqueSensor, {
  accuracy: number; bandwidth: number; overload: number;
  rotaryCapable: number; torqCost: number; contactless: boolean;
  forDyno: boolean; principle: string; bestUse: string;
}> = {
  strain_gauge_shaft: {
    accuracy: 9, bandwidth: 7, overload: 6,
    rotaryCapable: 8, torqCost: 5, contactless: false,
    forDyno: true, principle: "foil_gauge_wheatstone_telemetry",
    bestUse: "engine_dyno_power_curve",
  },
  magnetoelastic_sar: {
    accuracy: 7, bandwidth: 9, overload: 8,
    rotaryCapable: 10, torqCost: 6, contactless: true,
    forDyno: false, principle: "permeability_stress_change",
    bestUse: "eps_steering_torque",
  },
  optical_phase_shift: {
    accuracy: 10, bandwidth: 10, overload: 5,
    rotaryCapable: 7, torqCost: 9, contactless: true,
    forDyno: true, principle: "fiber_bragg_torsion_shift",
    bestUse: "high_precision_calibration",
  },
  piezoelectric_rotary: {
    accuracy: 8, bandwidth: 10, overload: 7,
    rotaryCapable: 6, torqCost: 7, contactless: false,
    forDyno: true, principle: "quartz_charge_shear_mode",
    bestUse: "machining_spindle_monitor",
  },
  reaction_load_cell: {
    accuracy: 9, bandwidth: 5, overload: 9,
    rotaryCapable: 3, torqCost: 3, contactless: false,
    forDyno: true, principle: "flanged_beam_bending",
    bestUse: "static_torque_test_stand",
  },
};

const get = (t: TorqueSensor) => DATA[t];

export const accuracy = (t: TorqueSensor) => get(t).accuracy;
export const bandwidth = (t: TorqueSensor) => get(t).bandwidth;
export const overload = (t: TorqueSensor) => get(t).overload;
export const rotaryCapable = (t: TorqueSensor) => get(t).rotaryCapable;
export const torqCost = (t: TorqueSensor) => get(t).torqCost;
export const contactless = (t: TorqueSensor) => get(t).contactless;
export const forDyno = (t: TorqueSensor) => get(t).forDyno;
export const principle = (t: TorqueSensor) => get(t).principle;
export const bestUse = (t: TorqueSensor) => get(t).bestUse;
export const torqueSensors = (): TorqueSensor[] => Object.keys(DATA) as TorqueSensor[];
