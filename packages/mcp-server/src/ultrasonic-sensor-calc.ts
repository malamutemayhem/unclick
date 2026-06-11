// ultrasonic-sensor-calc - ultrasonic distance sensor types

export type UltrasonicSensor =
  | "hcsr04_basic_trig"
  | "jsn_sr04t_waterproof"
  | "us_100_uart_mode"
  | "maxbotix_analog_pro"
  | "a02yyuw_sealed_uart";

const DATA: Record<UltrasonicSensor, {
  rangeMax: number; accuracy: number; beamAngle: number; durability: number;
  cost: number; waterproof: boolean; uartOutput: boolean; interfaceType: string; bestUse: string;
}> = {
  hcsr04_basic_trig:     { rangeMax: 6, accuracy: 6, beamAngle: 5, durability: 5, cost: 1, waterproof: false, uartOutput: false, interfaceType: "trigger_echo_pulse", bestUse: "basic_distance_detect" },
  jsn_sr04t_waterproof:  { rangeMax: 7, accuracy: 6, beamAngle: 6, durability: 9, cost: 4, waterproof: true, uartOutput: false, interfaceType: "trigger_echo_sealed", bestUse: "outdoor_liquid_level" },
  us_100_uart_mode:      { rangeMax: 7, accuracy: 8, beamAngle: 5, durability: 6, cost: 3, waterproof: false, uartOutput: true, interfaceType: "uart_serial_output", bestUse: "temp_compensated_range" },
  maxbotix_analog_pro:   { rangeMax: 10, accuracy: 10, beamAngle: 8, durability: 8, cost: 8, waterproof: true, uartOutput: true, interfaceType: "analog_uart_pwm", bestUse: "precision_range_find" },
  a02yyuw_sealed_uart:   { rangeMax: 8, accuracy: 9, beamAngle: 7, durability: 10, cost: 5, waterproof: true, uartOutput: true, interfaceType: "uart_sealed_probe", bestUse: "tank_level_measure" },
};

const get = (s: UltrasonicSensor) => DATA[s];
export const rangeMax = (s: UltrasonicSensor) => get(s).rangeMax;
export const accuracy = (s: UltrasonicSensor) => get(s).accuracy;
export const beamAngle = (s: UltrasonicSensor) => get(s).beamAngle;
export const durability = (s: UltrasonicSensor) => get(s).durability;
export const sensorCost = (s: UltrasonicSensor) => get(s).cost;
export const waterproof = (s: UltrasonicSensor) => get(s).waterproof;
export const uartOutput = (s: UltrasonicSensor) => get(s).uartOutput;
export const interfaceType = (s: UltrasonicSensor) => get(s).interfaceType;
export const bestUse = (s: UltrasonicSensor) => get(s).bestUse;
export const ultrasonicSensors = (): UltrasonicSensor[] => Object.keys(DATA) as UltrasonicSensor[];
