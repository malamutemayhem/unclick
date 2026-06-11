export type DuctDetectorType =
  | "photoelectric_sampling"
  | "ionization_duct_mount"
  | "beam_projected_duct"
  | "air_sampling_aspirating"
  | "combination_photo_heat";

interface DuctDetectorData {
  sensitivity: number;
  airVelocity: number;
  maintenance: number;
  falseAlarm: number;
  ddCost: number;
  aspirating: boolean;
  forHvac: boolean;
  sampling: string;
  bestUse: string;
}

const DATA: Record<DuctDetectorType, DuctDetectorData> = {
  photoelectric_sampling: {
    sensitivity: 7, airVelocity: 8, maintenance: 7, falseAlarm: 7, ddCost: 5,
    aspirating: false, forHvac: true,
    sampling: "duct_tube_probe_chamber",
    bestUse: "standard_hvac_duct_shutdown",
  },
  ionization_duct_mount: {
    sensitivity: 8, airVelocity: 7, maintenance: 6, falseAlarm: 5, ddCost: 4,
    aspirating: false, forHvac: true,
    sampling: "duct_mount_ionization_chamber",
    bestUse: "fast_flaming_fire_detection",
  },
  beam_projected_duct: {
    sensitivity: 6, airVelocity: 9, maintenance: 5, falseAlarm: 6, ddCost: 7,
    aspirating: false, forHvac: true,
    sampling: "infrared_beam_reflector_pair",
    bestUse: "large_duct_high_velocity",
  },
  air_sampling_aspirating: {
    sensitivity: 10, airVelocity: 10, maintenance: 4, falseAlarm: 8, ddCost: 9,
    aspirating: true, forHvac: true,
    sampling: "pipe_network_laser_particle",
    bestUse: "data_center_clean_room_early",
  },
  combination_photo_heat: {
    sensitivity: 8, airVelocity: 7, maintenance: 7, falseAlarm: 8, ddCost: 6,
    aspirating: false, forHvac: true,
    sampling: "dual_sensor_photo_therm_duct",
    bestUse: "commercial_ahu_multi_criteria",
  },
};

function get(t: DuctDetectorType): DuctDetectorData {
  return DATA[t];
}

export const sensitivity = (t: DuctDetectorType) => get(t).sensitivity;
export const airVelocity = (t: DuctDetectorType) => get(t).airVelocity;
export const maintenance = (t: DuctDetectorType) => get(t).maintenance;
export const falseAlarm = (t: DuctDetectorType) => get(t).falseAlarm;
export const ddCost = (t: DuctDetectorType) => get(t).ddCost;
export const aspirating = (t: DuctDetectorType) => get(t).aspirating;
export const forHvac = (t: DuctDetectorType) => get(t).forHvac;
export const sampling = (t: DuctDetectorType) => get(t).sampling;
export const bestUse = (t: DuctDetectorType) => get(t).bestUse;
export const ductDetectorTypes = (): DuctDetectorType[] =>
  Object.keys(DATA) as DuctDetectorType[];
