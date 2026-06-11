export type FenceSensorType =
  | "vibration_accelerometer"
  | "taut_wire_tension"
  | "electric_field_capacitive"
  | "fiber_optic_distributed"
  | "microphonic_cable_listen";

interface FenceSensorData {
  sensitivity: number;
  falseAlarm: number;
  coverage: number;
  durability: number;
  fsCost: number;
  covert: boolean;
  forHighSecurity: boolean;
  sensing: string;
  bestUse: string;
}

const DATA: Record<FenceSensorType, FenceSensorData> = {
  vibration_accelerometer: {
    sensitivity: 7, falseAlarm: 6, coverage: 6, durability: 8, fsCost: 4,
    covert: true, forHighSecurity: false,
    sensing: "piezo_accelerometer_on_fence",
    bestUse: "commercial_chain_link_fence",
  },
  taut_wire_tension: {
    sensitivity: 9, falseAlarm: 9, coverage: 7, durability: 9, fsCost: 8,
    covert: false, forHighSecurity: true,
    sensing: "tensioned_wire_strain_gauge",
    bestUse: "prison_military_high_security",
  },
  electric_field_capacitive: {
    sensitivity: 8, falseAlarm: 7, coverage: 8, durability: 7, fsCost: 6,
    covert: true, forHighSecurity: false,
    sensing: "capacitive_field_disturbance",
    bestUse: "non_conductive_fence_wall_top",
  },
  fiber_optic_distributed: {
    sensitivity: 9, falseAlarm: 8, coverage: 10, durability: 9, fsCost: 9,
    covert: true, forHighSecurity: true,
    sensing: "distributed_acoustic_fiber",
    bestUse: "long_perimeter_pipeline_border",
  },
  microphonic_cable_listen: {
    sensitivity: 7, falseAlarm: 6, coverage: 7, durability: 7, fsCost: 5,
    covert: true, forHighSecurity: false,
    sensing: "coaxial_cable_acoustic_listen",
    bestUse: "standard_metal_fence_retrofit",
  },
};

function get(t: FenceSensorType): FenceSensorData {
  return DATA[t];
}

export const sensitivity = (t: FenceSensorType) => get(t).sensitivity;
export const falseAlarm = (t: FenceSensorType) => get(t).falseAlarm;
export const coverage = (t: FenceSensorType) => get(t).coverage;
export const durability = (t: FenceSensorType) => get(t).durability;
export const fsCost = (t: FenceSensorType) => get(t).fsCost;
export const covert = (t: FenceSensorType) => get(t).covert;
export const forHighSecurity = (t: FenceSensorType) => get(t).forHighSecurity;
export const sensing = (t: FenceSensorType) => get(t).sensing;
export const bestUse = (t: FenceSensorType) => get(t).bestUse;
export const fenceSensorTypes = (): FenceSensorType[] =>
  Object.keys(DATA) as FenceSensorType[];
