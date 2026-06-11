export type ServoAmplifierType =
  | "analog_velocity_mode"
  | "digital_multi_axis"
  | "integrated_drive_motor"
  | "network_ethercat_slave"
  | "micro_stepper_hybrid";

interface ServoAmplifierData {
  powerRange: number;
  controlModes: number;
  networkIntegration: number;
  compactness: number;
  saCost: number;
  multiAxis: boolean;
  forIntegrated: boolean;
  topology: string;
  bestUse: string;
}

const DATA: Record<ServoAmplifierType, ServoAmplifierData> = {
  analog_velocity_mode: {
    powerRange: 7, controlModes: 4, networkIntegration: 3, compactness: 6, saCost: 4,
    multiAxis: false, forIntegrated: false,
    topology: "single_axis_analog_10v_velocity_torque_command",
    bestUse: "legacy_machine_retrofit_simple_speed_control_loop",
  },
  digital_multi_axis: {
    powerRange: 9, controlModes: 9, networkIntegration: 8, compactness: 7, saCost: 8,
    multiAxis: true, forIntegrated: false,
    topology: "multi_axis_book_format_shared_bus_digital_command",
    bestUse: "cnc_machine_multi_axis_robot_coordinated_motion",
  },
  integrated_drive_motor: {
    powerRange: 5, controlModes: 7, networkIntegration: 7, compactness: 10, saCost: 6,
    multiAxis: false, forIntegrated: true,
    topology: "drive_electronics_mounted_on_motor_single_cable",
    bestUse: "conveyor_zone_control_distributed_i_o_clean_panel",
  },
  network_ethercat_slave: {
    powerRange: 8, controlModes: 8, networkIntegration: 10, compactness: 8, saCost: 7,
    multiAxis: false, forIntegrated: false,
    topology: "ethercat_slave_distributed_servo_daisy_chain_fast",
    bestUse: "high_speed_packaging_printing_press_synchronization",
  },
  micro_stepper_hybrid: {
    powerRange: 4, controlModes: 5, networkIntegration: 5, compactness: 9, saCost: 3,
    multiAxis: false, forIntegrated: false,
    topology: "stepper_with_encoder_closed_loop_micro_stepping",
    bestUse: "3d_printer_lab_automation_light_duty_positioning",
  },
};

function get(t: ServoAmplifierType): ServoAmplifierData {
  return DATA[t];
}

export const powerRange = (t: ServoAmplifierType) => get(t).powerRange;
export const controlModes = (t: ServoAmplifierType) => get(t).controlModes;
export const networkIntegration = (t: ServoAmplifierType) => get(t).networkIntegration;
export const compactness = (t: ServoAmplifierType) => get(t).compactness;
export const saCost = (t: ServoAmplifierType) => get(t).saCost;
export const multiAxis = (t: ServoAmplifierType) => get(t).multiAxis;
export const forIntegrated = (t: ServoAmplifierType) => get(t).forIntegrated;
export const topology = (t: ServoAmplifierType) => get(t).topology;
export const bestUse = (t: ServoAmplifierType) => get(t).bestUse;
export const servoAmplifierTypes = (): ServoAmplifierType[] =>
  Object.keys(DATA) as ServoAmplifierType[];
