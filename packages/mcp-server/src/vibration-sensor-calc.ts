export type VibrationSensorType =
  | "piezoelectric_accelerometer"
  | "mems_triaxial_wireless"
  | "velocity_seismic_probe"
  | "eddy_current_proximity"
  | "fiber_optic_distributed";

interface VibrationSensorData {
  sensitivity: number;
  bandwidth: number;
  durability: number;
  installEase: number;
  vsCost: number;
  wireless: boolean;
  forRotating: boolean;
  output: string;
  bestUse: string;
}

const DATA: Record<VibrationSensorType, VibrationSensorData> = {
  piezoelectric_accelerometer: {
    sensitivity: 9, bandwidth: 10, durability: 8, installEase: 7, vsCost: 6,
    wireless: false, forRotating: true,
    output: "iepe_charge_mode_analog_mv_g",
    bestUse: "motor_pump_bearing_condition",
  },
  mems_triaxial_wireless: {
    sensitivity: 7, bandwidth: 7, durability: 7, installEase: 10, vsCost: 5,
    wireless: true, forRotating: true,
    output: "digital_wireless_gateway_cloud",
    bestUse: "fleet_iiot_predictive_maint",
  },
  velocity_seismic_probe: {
    sensitivity: 8, bandwidth: 6, durability: 9, installEase: 6, vsCost: 5,
    wireless: false, forRotating: false,
    output: "velocity_ips_4_20ma_analog",
    bestUse: "turbine_generator_foundation",
  },
  eddy_current_proximity: {
    sensitivity: 10, bandwidth: 9, durability: 9, installEase: 4, vsCost: 8,
    wireless: false, forRotating: true,
    output: "eddy_current_gap_voltage_dc",
    bestUse: "journal_bearing_shaft_orbit",
  },
  fiber_optic_distributed: {
    sensitivity: 8, bandwidth: 8, durability: 10, installEase: 3, vsCost: 10,
    wireless: false, forRotating: false,
    output: "distributed_acoustic_sensing_das",
    bestUse: "pipeline_bridge_structural_health",
  },
};

function get(t: VibrationSensorType): VibrationSensorData {
  return DATA[t];
}

export const sensitivity = (t: VibrationSensorType) => get(t).sensitivity;
export const bandwidth = (t: VibrationSensorType) => get(t).bandwidth;
export const durability = (t: VibrationSensorType) => get(t).durability;
export const installEase = (t: VibrationSensorType) => get(t).installEase;
export const vsCost = (t: VibrationSensorType) => get(t).vsCost;
export const wireless = (t: VibrationSensorType) => get(t).wireless;
export const forRotating = (t: VibrationSensorType) => get(t).forRotating;
export const output = (t: VibrationSensorType) => get(t).output;
export const bestUse = (t: VibrationSensorType) => get(t).bestUse;
export const vibrationSensorTypes = (): VibrationSensorType[] =>
  Object.keys(DATA) as VibrationSensorType[];
