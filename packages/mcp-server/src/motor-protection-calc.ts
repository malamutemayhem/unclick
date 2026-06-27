export type MotorProtectionType =
  | "thermal_overload"
  | "electronic_overload"
  | "motor_management"
  | "thermistor_relay"
  | "differential_motor";

interface MotorProtectionData {
  accuracy: number;
  throughput: number;
  featureSet: number;
  responseTime: number;
  mpCost: number;
  communicating: boolean;
  forLargeMotor: boolean;
  protectionConfig: string;
  bestUse: string;
}

const DATA: Record<MotorProtectionType, MotorProtectionData> = {
  thermal_overload: {
    accuracy: 5, throughput: 7, featureSet: 3, responseTime: 5, mpCost: 2,
    communicating: false, forLargeMotor: false,
    protectionConfig: "thermal_overload_relay_bimetal_heater_trip_class_10_20_30",
    bestUse: "small_motor_thermal_overload_relay_simple_bimetal_trip_cheap",
  },
  electronic_overload: {
    accuracy: 7, throughput: 8, featureSet: 6, responseTime: 7, mpCost: 4,
    communicating: true, forLargeMotor: false,
    protectionConfig: "electronic_overload_relay_ct_sense_adjustable_class_comms_bus",
    bestUse: "process_motor_electronic_overload_relay_adjustable_class_comms",
  },
  motor_management: {
    accuracy: 10, throughput: 9, featureSet: 10, responseTime: 9, mpCost: 9,
    communicating: true, forLargeMotor: true,
    protectionConfig: "motor_management_relay_multifunction_49_50_51_46_47_66_rtd",
    bestUse: "critical_drive_motor_management_relay_full_protect_diagnose_log",
  },
  thermistor_relay: {
    accuracy: 8, throughput: 6, featureSet: 4, responseTime: 10, mpCost: 3,
    communicating: false, forLargeMotor: true,
    protectionConfig: "thermistor_relay_ptc_sensor_winding_temp_direct_measure_trip",
    bestUse: "vfd_motor_thermistor_relay_direct_winding_temp_sense_fast_trip",
  },
  differential_motor: {
    accuracy: 9, throughput: 7, featureSet: 8, responseTime: 10, mpCost: 8,
    communicating: true, forLargeMotor: true,
    protectionConfig: "differential_motor_relay_current_balance_turn_fault_detect_fast",
    bestUse: "large_hv_motor_differential_relay_internal_fault_instant_trip",
  },
};

function get(t: MotorProtectionType): MotorProtectionData {
  return DATA[t];
}

export const accuracy = (t: MotorProtectionType) => get(t).accuracy;
export const throughput = (t: MotorProtectionType) => get(t).throughput;
export const featureSet = (t: MotorProtectionType) => get(t).featureSet;
export const responseTime = (t: MotorProtectionType) => get(t).responseTime;
export const mpCost = (t: MotorProtectionType) => get(t).mpCost;
export const communicating = (t: MotorProtectionType) => get(t).communicating;
export const forLargeMotor = (t: MotorProtectionType) => get(t).forLargeMotor;
export const protectionConfig = (t: MotorProtectionType) => get(t).protectionConfig;
export const bestUse = (t: MotorProtectionType) => get(t).bestUse;
export const motorProtectionTypes = (): MotorProtectionType[] =>
  Object.keys(DATA) as MotorProtectionType[];
