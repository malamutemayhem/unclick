export type DynamicBalanceType =
  | "single_plane_static"
  | "two_plane_dynamic"
  | "field_portable_vibrate"
  | "crankshaft_v_block"
  | "turbine_vacuum_spin";

interface DynamicBalanceData {
  precision: number;
  speed: number;
  capacity: number;
  automation: number;
  dbCost: number;
  fieldUse: boolean;
  forRotor: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<DynamicBalanceType, DynamicBalanceData> = {
  single_plane_static: {
    precision: 6, speed: 8, capacity: 5, automation: 7, dbCost: 4,
    fieldUse: false, forRotor: false,
    sensor: "single_accelerometer_phase_ref",
    bestUse: "fan_blade_pulley_disc_flywheel",
  },
  two_plane_dynamic: {
    precision: 9, speed: 7, capacity: 8, automation: 9, dbCost: 7,
    fieldUse: false, forRotor: true,
    sensor: "dual_plane_accelerometer_pair",
    bestUse: "motor_armature_spindle_roller",
  },
  field_portable_vibrate: {
    precision: 7, speed: 9, capacity: 6, automation: 5, dbCost: 5,
    fieldUse: true, forRotor: true,
    sensor: "portable_vibration_analyzer_laser",
    bestUse: "in_situ_fan_pump_field_trim",
  },
  crankshaft_v_block: {
    precision: 10, speed: 6, capacity: 9, automation: 8, dbCost: 9,
    fieldUse: false, forRotor: false,
    sensor: "force_measurement_v_block_bearing",
    bestUse: "crankshaft_camshaft_driveshaft",
  },
  turbine_vacuum_spin: {
    precision: 10, speed: 5, capacity: 10, automation: 10, dbCost: 10,
    fieldUse: false, forRotor: true,
    sensor: "vacuum_chamber_laser_displacement",
    bestUse: "jet_engine_turbo_rotor_gyroscope",
  },
};

function get(t: DynamicBalanceType): DynamicBalanceData {
  return DATA[t];
}

export const precision = (t: DynamicBalanceType) => get(t).precision;
export const speed = (t: DynamicBalanceType) => get(t).speed;
export const capacity = (t: DynamicBalanceType) => get(t).capacity;
export const automation = (t: DynamicBalanceType) => get(t).automation;
export const dbaCost = (t: DynamicBalanceType) => get(t).dbCost;
export const fieldUse = (t: DynamicBalanceType) => get(t).fieldUse;
export const forRotor = (t: DynamicBalanceType) => get(t).forRotor;
export const sensor = (t: DynamicBalanceType) => get(t).sensor;
export const bestUse = (t: DynamicBalanceType) => get(t).bestUse;
export const dynamicBalanceTypes = (): DynamicBalanceType[] =>
  Object.keys(DATA) as DynamicBalanceType[];
