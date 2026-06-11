export type LidarSensorType =
  | "mechanical_spinning_360"
  | "solid_state_flash"
  | "mems_mirror_scanning"
  | "opal_frequency_modulated"
  | "single_photon_spad";

const DATA: Record<LidarSensorType, {
  range: number; resolution: number; framerate: number;
  fov: number; ldCost: number; noMovingParts: boolean;
  forAutomotive: boolean; scanning: string; bestUse: string;
}> = {
  mechanical_spinning_360: {
    range: 9, resolution: 8, framerate: 7,
    fov: 10, ldCost: 5, noMovingParts: false,
    forAutomotive: true, scanning: "rotating_mirror_assembly",
    bestUse: "autonomous_vehicle_360_perception",
  },
  solid_state_flash: {
    range: 5, resolution: 7, framerate: 10,
    fov: 4, ldCost: 2, noMovingParts: true,
    forAutomotive: true, scanning: "flash_illumination_array",
    bestUse: "adas_forward_collision_detect",
  },
  mems_mirror_scanning: {
    range: 7, resolution: 9, framerate: 8,
    fov: 6, ldCost: 3, noMovingParts: false,
    forAutomotive: true, scanning: "mems_micro_mirror_raster",
    bestUse: "robotaxi_high_res_mapping",
  },
  opal_frequency_modulated: {
    range: 10, resolution: 10, framerate: 6,
    fov: 5, ldCost: 5, noMovingParts: true,
    forAutomotive: false, scanning: "fmcw_coherent_detection",
    bestUse: "wind_turbine_blade_inspection",
  },
  single_photon_spad: {
    range: 10, resolution: 6, framerate: 5,
    fov: 3, ldCost: 4, noMovingParts: true,
    forAutomotive: false, scanning: "spad_array_time_correlated",
    bestUse: "topographic_aerial_survey_canopy",
  },
};

const get = (t: LidarSensorType) => DATA[t];

export const range = (t: LidarSensorType) => get(t).range;
export const resolution = (t: LidarSensorType) => get(t).resolution;
export const framerate = (t: LidarSensorType) => get(t).framerate;
export const fov = (t: LidarSensorType) => get(t).fov;
export const ldCost = (t: LidarSensorType) => get(t).ldCost;
export const noMovingParts = (t: LidarSensorType) => get(t).noMovingParts;
export const forAutomotive = (t: LidarSensorType) => get(t).forAutomotive;
export const scanning = (t: LidarSensorType) => get(t).scanning;
export const bestUse = (t: LidarSensorType) => get(t).bestUse;
export const lidarSensorTypes = (): LidarSensorType[] => Object.keys(DATA) as LidarSensorType[];
