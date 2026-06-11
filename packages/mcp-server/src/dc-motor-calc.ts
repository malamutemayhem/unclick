// dc-motor-calc - DC motor types for electronics

export type DcMotor =
  | "brushed_standard_hobby"
  | "brushless_outrunner"
  | "geared_dc_torque"
  | "coreless_dc_fast"
  | "planetary_gear_dc";

const DATA: Record<DcMotor, {
  speedOutput: number; torqueOutput: number; efficiency: number; durability: number;
  cost: number; brushless: boolean; geared: boolean; driveType: string; bestUse: string;
}> = {
  brushed_standard_hobby:  { speedOutput: 8, torqueOutput: 5, efficiency: 5, durability: 5, cost: 2, brushless: false, geared: false, driveType: "carbon_brush_commute", bestUse: "general_hobby_spin" },
  brushless_outrunner:     { speedOutput: 9, torqueOutput: 7, efficiency: 9, durability: 9, cost: 7, brushless: true, geared: false, driveType: "esc_electronic_commute", bestUse: "drone_propeller_drive" },
  geared_dc_torque:        { speedOutput: 4, torqueOutput: 9, efficiency: 6, durability: 7, cost: 4, brushless: false, geared: true, driveType: "spur_gear_reduction", bestUse: "slow_torque_drive" },
  coreless_dc_fast:        { speedOutput: 10, torqueOutput: 4, efficiency: 8, durability: 6, cost: 6, brushless: false, geared: false, driveType: "coreless_rotor_wind", bestUse: "fast_response_actuate" },
  planetary_gear_dc:       { speedOutput: 5, torqueOutput: 10, efficiency: 7, durability: 8, cost: 8, brushless: false, geared: true, driveType: "planetary_gear_set", bestUse: "precision_high_torque" },
};

const get = (m: DcMotor) => DATA[m];
export const speedOutput = (m: DcMotor) => get(m).speedOutput;
export const torqueOutput = (m: DcMotor) => get(m).torqueOutput;
export const efficiency = (m: DcMotor) => get(m).efficiency;
export const durability = (m: DcMotor) => get(m).durability;
export const motorCost = (m: DcMotor) => get(m).cost;
export const brushless = (m: DcMotor) => get(m).brushless;
export const geared = (m: DcMotor) => get(m).geared;
export const driveType = (m: DcMotor) => get(m).driveType;
export const bestUse = (m: DcMotor) => get(m).bestUse;
export const dcMotors = (): DcMotor[] => Object.keys(DATA) as DcMotor[];
