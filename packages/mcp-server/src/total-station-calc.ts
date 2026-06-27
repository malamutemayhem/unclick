export type TotalStationType =
  | "manual_optical_standard"
  | "robotic_motorized_track"
  | "reflectorless_edm_direct"
  | "scanning_3d_point_cloud"
  | "imaging_camera_integrated";

interface TotalStationData {
  accuracy: number;
  range: number;
  speed: number;
  automation: number;
  tsCost: number;
  robotic: boolean;
  forLayout: boolean;
  measurement: string;
  bestUse: string;
}

const DATA: Record<TotalStationType, TotalStationData> = {
  manual_optical_standard: {
    accuracy: 7, range: 6, speed: 4, automation: 2, tsCost: 4,
    robotic: false, forLayout: true,
    measurement: "prism_reflector_edm_angle_encoder",
    bestUse: "basic_survey_boundary_topo_control",
  },
  robotic_motorized_track: {
    accuracy: 8, range: 8, speed: 9, automation: 9, tsCost: 9,
    robotic: true, forLayout: true,
    measurement: "auto_target_lock_servo_motor",
    bestUse: "one_person_layout_monitoring_machine",
  },
  reflectorless_edm_direct: {
    accuracy: 6, range: 7, speed: 7, automation: 5, tsCost: 6,
    robotic: false, forLayout: true,
    measurement: "laser_pulse_direct_surface_return",
    bestUse: "facade_measure_inaccessible_point",
  },
  scanning_3d_point_cloud: {
    accuracy: 7, range: 7, speed: 10, automation: 8, tsCost: 10,
    robotic: true, forLayout: false,
    measurement: "rapid_scan_point_cloud_servo_edm",
    bestUse: "as_built_bim_capture_complex_site",
  },
  imaging_camera_integrated: {
    accuracy: 7, range: 7, speed: 8, automation: 7, tsCost: 8,
    robotic: true, forLayout: true,
    measurement: "coaxial_camera_overlay_photo_measure",
    bestUse: "documentation_photo_point_forensic",
  },
};

function get(t: TotalStationType): TotalStationData {
  return DATA[t];
}

export const accuracy = (t: TotalStationType) => get(t).accuracy;
export const range = (t: TotalStationType) => get(t).range;
export const speed = (t: TotalStationType) => get(t).speed;
export const automation = (t: TotalStationType) => get(t).automation;
export const tsCost = (t: TotalStationType) => get(t).tsCost;
export const robotic = (t: TotalStationType) => get(t).robotic;
export const forLayout = (t: TotalStationType) => get(t).forLayout;
export const measurement = (t: TotalStationType) => get(t).measurement;
export const bestUse = (t: TotalStationType) => get(t).bestUse;
export const totalStationTypes = (): TotalStationType[] =>
  Object.keys(DATA) as TotalStationType[];
