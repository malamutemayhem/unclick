export type StepperType =
  | "permanent_magnet_pm"
  | "variable_reluctance_vr"
  | "hybrid_two_phase"
  | "closed_loop_servo_step"
  | "tin_can_unipolar";

const DATA: Record<StepperType, {
  torque: number; speed: number; precision: number;
  efficiency: number; stCost: number; encoderBuiltin: boolean;
  forCnc: boolean; winding: string; bestUse: string;
}> = {
  permanent_magnet_pm: {
    torque: 5, speed: 6, precision: 5,
    efficiency: 5, stCost: 1, encoderBuiltin: false,
    forCnc: false, winding: "permanent_magnet_rotor",
    bestUse: "office_printer_paper_feed",
  },
  variable_reluctance_vr: {
    torque: 4, speed: 8, precision: 6,
    efficiency: 4, stCost: 2, encoderBuiltin: false,
    forCnc: false, winding: "toothed_rotor_no_magnet",
    bestUse: "textile_loom_shuttle_position",
  },
  hybrid_two_phase: {
    torque: 8, speed: 7, precision: 9,
    efficiency: 7, stCost: 3, encoderBuiltin: false,
    forCnc: true, winding: "two_phase_hybrid_rotor",
    bestUse: "3d_printer_cnc_axis_drive",
  },
  closed_loop_servo_step: {
    torque: 9, speed: 8, precision: 10,
    efficiency: 9, stCost: 5, encoderBuiltin: true,
    forCnc: true, winding: "hybrid_with_encoder_feedback",
    bestUse: "pick_place_robot_arm_joint",
  },
  tin_can_unipolar: {
    torque: 3, speed: 5, precision: 4,
    efficiency: 3, stCost: 1, encoderBuiltin: false,
    forCnc: false, winding: "unipolar_claw_pole",
    bestUse: "hvac_damper_actuator_valve",
  },
};

const get = (t: StepperType) => DATA[t];

export const torque = (t: StepperType) => get(t).torque;
export const speed = (t: StepperType) => get(t).speed;
export const precision = (t: StepperType) => get(t).precision;
export const efficiency = (t: StepperType) => get(t).efficiency;
export const stCost = (t: StepperType) => get(t).stCost;
export const encoderBuiltin = (t: StepperType) => get(t).encoderBuiltin;
export const forCnc = (t: StepperType) => get(t).forCnc;
export const winding = (t: StepperType) => get(t).winding;
export const bestUse = (t: StepperType) => get(t).bestUse;
export const stepperTypes = (): StepperType[] => Object.keys(DATA) as StepperType[];
