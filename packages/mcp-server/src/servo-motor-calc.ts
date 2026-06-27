// servo-motor-calc - servo motor types for robotics

export type ServoMotor =
  | "standard_hobby_analog"
  | "digital_high_torque"
  | "micro_servo_compact"
  | "continuous_rotation"
  | "coreless_precision";

const DATA: Record<ServoMotor, {
  torqueOutput: number; speedResponse: number; positionAccuracy: number; durability: number;
  cost: number; digital: boolean; continuous: boolean; gearType: string; bestUse: string;
}> = {
  standard_hobby_analog:  { torqueOutput: 6, speedResponse: 5, positionAccuracy: 6, durability: 7, cost: 2, digital: false, continuous: false, gearType: "nylon_gear_train", bestUse: "general_hobby_position" },
  digital_high_torque:    { torqueOutput: 9, speedResponse: 8, positionAccuracy: 9, durability: 9, cost: 7, digital: true, continuous: false, gearType: "metal_gear_train", bestUse: "heavy_load_precise" },
  micro_servo_compact:    { torqueOutput: 3, speedResponse: 7, positionAccuracy: 7, durability: 5, cost: 3, digital: false, continuous: false, gearType: "nylon_micro_gear", bestUse: "small_space_light" },
  continuous_rotation:    { torqueOutput: 7, speedResponse: 6, positionAccuracy: 3, durability: 8, cost: 4, digital: false, continuous: true, gearType: "metal_spur_gear", bestUse: "wheel_drive_spin" },
  coreless_precision:     { torqueOutput: 5, speedResponse: 10, positionAccuracy: 10, durability: 6, cost: 8, digital: true, continuous: false, gearType: "titanium_gear_set", bestUse: "fast_precision_move" },
};

const get = (s: ServoMotor) => DATA[s];
export const torqueOutput = (s: ServoMotor) => get(s).torqueOutput;
export const speedResponse = (s: ServoMotor) => get(s).speedResponse;
export const positionAccuracy = (s: ServoMotor) => get(s).positionAccuracy;
export const durability = (s: ServoMotor) => get(s).durability;
export const servoCost = (s: ServoMotor) => get(s).cost;
export const digital = (s: ServoMotor) => get(s).digital;
export const continuous = (s: ServoMotor) => get(s).continuous;
export const gearType = (s: ServoMotor) => get(s).gearType;
export const bestUse = (s: ServoMotor) => get(s).bestUse;
export const servoMotors = (): ServoMotor[] => Object.keys(DATA) as ServoMotor[];
