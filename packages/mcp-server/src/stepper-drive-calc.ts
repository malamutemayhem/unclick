export type StepperDrive =
  | "full_step_wave"
  | "half_step_interleave"
  | "microstepping_256"
  | "closed_loop_servo"
  | "five_phase_hybrid";

const DATA: Record<StepperDrive, {
  resolution: number; torque: number; smoothness: number;
  speed: number; stpCost: number; encoderRequired: boolean;
  forPrecision: boolean; excitation: string; bestUse: string;
}> = {
  full_step_wave: {
    resolution: 2, torque: 8, smoothness: 2,
    speed: 7, stpCost: 1, encoderRequired: false,
    forPrecision: false, excitation: "one_phase_on_sequence",
    bestUse: "simple_valve_actuator",
  },
  half_step_interleave: {
    resolution: 4, torque: 7, smoothness: 4,
    speed: 6, stpCost: 1, encoderRequired: false,
    forPrecision: false, excitation: "alternating_one_two_phase",
    bestUse: "printer_carriage_drive",
  },
  microstepping_256: {
    resolution: 9, torque: 5, smoothness: 9,
    speed: 5, stpCost: 3, encoderRequired: false,
    forPrecision: true, excitation: "sinusoidal_current_profile",
    bestUse: "3d_printer_smooth_axis",
  },
  closed_loop_servo: {
    resolution: 10, torque: 9, smoothness: 8,
    speed: 8, stpCost: 6, encoderRequired: true,
    forPrecision: true, excitation: "encoder_feedback_commute",
    bestUse: "cnc_position_guarantee",
  },
  five_phase_hybrid: {
    resolution: 8, torque: 10, smoothness: 7,
    speed: 7, stpCost: 5, encoderRequired: false,
    forPrecision: true, excitation: "pentagon_winding_sequence",
    bestUse: "semiconductor_handler",
  },
};

const get = (t: StepperDrive) => DATA[t];

export const resolution = (t: StepperDrive) => get(t).resolution;
export const torque = (t: StepperDrive) => get(t).torque;
export const smoothness = (t: StepperDrive) => get(t).smoothness;
export const speed = (t: StepperDrive) => get(t).speed;
export const stpCost = (t: StepperDrive) => get(t).stpCost;
export const encoderRequired = (t: StepperDrive) => get(t).encoderRequired;
export const forPrecision = (t: StepperDrive) => get(t).forPrecision;
export const excitation = (t: StepperDrive) => get(t).excitation;
export const bestUse = (t: StepperDrive) => get(t).bestUse;
export const stepperDrives = (): StepperDrive[] => Object.keys(DATA) as StepperDrive[];
