// stepper-motor-calc - stepper motor types

export type StepperMotor =
  | "nema17_bipolar_std"
  | "nema23_high_torque"
  | "nema14_compact"
  | "geared_stepper_ratio"
  | "closed_loop_encoder";

const DATA: Record<StepperMotor, {
  holdTorque: number; stepAccuracy: number; speedRange: number; sizeCompact: number;
  cost: number; closedLoop: boolean; geared: boolean; stepAngle: string; bestUse: string;
}> = {
  nema17_bipolar_std:    { holdTorque: 6, stepAccuracy: 8, speedRange: 7, sizeCompact: 7, cost: 4, closedLoop: false, geared: false, stepAngle: "1_8_degree_200_step", bestUse: "3d_printer_axis" },
  nema23_high_torque:    { holdTorque: 10, stepAccuracy: 8, speedRange: 6, sizeCompact: 4, cost: 6, closedLoop: false, geared: false, stepAngle: "1_8_degree_200_step", bestUse: "cnc_heavy_axis" },
  nema14_compact:        { holdTorque: 4, stepAccuracy: 8, speedRange: 8, sizeCompact: 9, cost: 5, closedLoop: false, geared: false, stepAngle: "1_8_degree_200_step", bestUse: "compact_light_move" },
  geared_stepper_ratio:  { holdTorque: 8, stepAccuracy: 10, speedRange: 4, sizeCompact: 6, cost: 7, closedLoop: false, geared: true, stepAngle: "micro_step_geared", bestUse: "high_resolution_pos" },
  closed_loop_encoder:   { holdTorque: 7, stepAccuracy: 10, speedRange: 9, sizeCompact: 5, cost: 9, closedLoop: true, geared: false, stepAngle: "encoder_feedback_step", bestUse: "no_miss_step_drive" },
};

const get = (m: StepperMotor) => DATA[m];
export const holdTorque = (m: StepperMotor) => get(m).holdTorque;
export const stepAccuracy = (m: StepperMotor) => get(m).stepAccuracy;
export const speedRange = (m: StepperMotor) => get(m).speedRange;
export const sizeCompact = (m: StepperMotor) => get(m).sizeCompact;
export const motorCost = (m: StepperMotor) => get(m).cost;
export const closedLoop = (m: StepperMotor) => get(m).closedLoop;
export const geared = (m: StepperMotor) => get(m).geared;
export const stepAngle = (m: StepperMotor) => get(m).stepAngle;
export const bestUse = (m: StepperMotor) => get(m).bestUse;
export const stepperMotors = (): StepperMotor[] => Object.keys(DATA) as StepperMotor[];
