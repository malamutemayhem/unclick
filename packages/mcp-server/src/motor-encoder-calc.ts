export type MotorEncoderType =
  | "incremental_optical"
  | "absolute_single_turn"
  | "absolute_multi_turn"
  | "resolver_analog"
  | "magnetic_hall_effect";

interface MotorEncoderData {
  resolution: number;
  accuracy: number;
  robustness: number;
  speed: number;
  meCost: number;
  absolute: boolean;
  forHarshEnv: boolean;
  sensing: string;
  bestUse: string;
}

const DATA: Record<MotorEncoderType, MotorEncoderData> = {
  incremental_optical: {
    resolution: 9, accuracy: 8, robustness: 5, speed: 9, meCost: 4,
    absolute: false, forHarshEnv: false,
    sensing: "optical_disc_phototransistor_a_b_z_quadrature",
    bestUse: "general_servo_feedback_spindle_speed_positioning",
  },
  absolute_single_turn: {
    resolution: 9, accuracy: 9, robustness: 6, speed: 8, meCost: 6,
    absolute: true, forHarshEnv: false,
    sensing: "optical_or_capacitive_gray_code_unique_position",
    bestUse: "rotary_table_valve_actuator_single_revolution_pos",
  },
  absolute_multi_turn: {
    resolution: 9, accuracy: 9, robustness: 6, speed: 8, meCost: 8,
    absolute: true, forHarshEnv: false,
    sensing: "optical_plus_gear_or_wiegand_multi_revolution_pos",
    bestUse: "elevator_crane_hoist_linear_axis_position_tracking",
  },
  resolver_analog: {
    resolution: 7, accuracy: 7, robustness: 10, speed: 7, meCost: 5,
    absolute: true, forHarshEnv: true,
    sensing: "wound_transformer_sine_cosine_excitation_analog",
    bestUse: "military_aerospace_oil_gas_high_temp_vibration",
  },
  magnetic_hall_effect: {
    resolution: 6, accuracy: 6, robustness: 8, speed: 8, meCost: 3,
    absolute: false, forHarshEnv: true,
    sensing: "hall_sensor_array_magnetic_ring_digital_commutation",
    bestUse: "bldc_commutation_e_bike_motor_low_cost_feedback",
  },
};

function get(t: MotorEncoderType): MotorEncoderData {
  return DATA[t];
}

export const resolution = (t: MotorEncoderType) => get(t).resolution;
export const accuracy = (t: MotorEncoderType) => get(t).accuracy;
export const robustness = (t: MotorEncoderType) => get(t).robustness;
export const speed = (t: MotorEncoderType) => get(t).speed;
export const meCost = (t: MotorEncoderType) => get(t).meCost;
export const absolute = (t: MotorEncoderType) => get(t).absolute;
export const forHarshEnv = (t: MotorEncoderType) => get(t).forHarshEnv;
export const sensing = (t: MotorEncoderType) => get(t).sensing;
export const bestUse = (t: MotorEncoderType) => get(t).bestUse;
export const motorEncoderTypes = (): MotorEncoderType[] =>
  Object.keys(DATA) as MotorEncoderType[];
