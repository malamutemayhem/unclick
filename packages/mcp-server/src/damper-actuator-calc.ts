export type DamperActuatorType =
  | "electric_spring_return"
  | "electric_non_spring"
  | "pneumatic_diaphragm"
  | "modulating_analog"
  | "bus_networked";

interface DamperActuatorData {
  torqueOutput: number;
  throughput: number;
  positionAccuracy: number;
  failSafeRating: number;
  daCost: number;
  springReturn: boolean;
  forSmoke: boolean;
  actuatorConfig: string;
  bestUse: string;
}

const DATA: Record<DamperActuatorType, DamperActuatorData> = {
  electric_spring_return: {
    torqueOutput: 7, throughput: 7, positionAccuracy: 7, failSafeRating: 10, daCost: 5,
    springReturn: true, forSmoke: true,
    actuatorConfig: "electric_spring_return_actuator_24v_fail_safe_close_fire_smoke",
    bestUse: "smoke_damper_electric_spring_return_actuator_fail_safe_close_code",
  },
  electric_non_spring: {
    torqueOutput: 8, throughput: 8, positionAccuracy: 8, failSafeRating: 5, daCost: 4,
    springReturn: false, forSmoke: false,
    actuatorConfig: "electric_non_spring_actuator_floating_point_on_off_simple_drive",
    bestUse: "outside_air_electric_non_spring_actuator_economizer_control_basic",
  },
  pneumatic_diaphragm: {
    torqueOutput: 9, throughput: 9, positionAccuracy: 6, failSafeRating: 8, daCost: 6,
    springReturn: true, forSmoke: false,
    actuatorConfig: "pneumatic_diaphragm_actuator_3_15_psi_positioner_large_damper",
    bestUse: "large_ahu_pneumatic_diaphragm_actuator_high_torque_fast_stroke",
  },
  modulating_analog: {
    torqueOutput: 7, throughput: 8, positionAccuracy: 10, failSafeRating: 7, daCost: 7,
    springReturn: true, forSmoke: false,
    actuatorConfig: "modulating_analog_actuator_0_10v_4_20ma_proportional_position",
    bestUse: "vav_zone_modulating_analog_actuator_precise_airflow_proportional",
  },
  bus_networked: {
    torqueOutput: 8, throughput: 10, positionAccuracy: 10, failSafeRating: 9, daCost: 9,
    springReturn: true, forSmoke: true,
    actuatorConfig: "bus_networked_actuator_bacnet_lonworks_diagnostic_position_feedback",
    bestUse: "smart_building_bus_networked_actuator_bacnet_diagnostic_integrate",
  },
};

function get(t: DamperActuatorType): DamperActuatorData {
  return DATA[t];
}

export const torqueOutput = (t: DamperActuatorType) => get(t).torqueOutput;
export const throughput = (t: DamperActuatorType) => get(t).throughput;
export const positionAccuracy = (t: DamperActuatorType) => get(t).positionAccuracy;
export const failSafeRating = (t: DamperActuatorType) => get(t).failSafeRating;
export const daCost = (t: DamperActuatorType) => get(t).daCost;
export const springReturn = (t: DamperActuatorType) => get(t).springReturn;
export const forSmoke = (t: DamperActuatorType) => get(t).forSmoke;
export const actuatorConfig = (t: DamperActuatorType) => get(t).actuatorConfig;
export const bestUse = (t: DamperActuatorType) => get(t).bestUse;
export const damperActuatorTypes = (): DamperActuatorType[] =>
  Object.keys(DATA) as DamperActuatorType[];
