export type DepthCameraType =
  | "structured_light_ir"
  | "stereo_vision_passive"
  | "tof_time_of_flight"
  | "active_stereo_ir_dot"
  | "coded_aperture_single";

const DATA: Record<DepthCameraType, {
  accuracy: number; range: number; framerate: number;
  outdoor: number; dcCost: number; activeSensor: boolean;
  forRobotics: boolean; principle: string; bestUse: string;
}> = {
  structured_light_ir: {
    accuracy: 9, range: 4, framerate: 7,
    outdoor: 3, dcCost: 3, activeSensor: true,
    forRobotics: true, principle: "ir_pattern_triangulation",
    bestUse: "3d_scanning_face_recognition",
  },
  stereo_vision_passive: {
    accuracy: 6, range: 8, framerate: 8,
    outdoor: 9, dcCost: 2, activeSensor: false,
    forRobotics: true, principle: "binocular_disparity_matching",
    bestUse: "outdoor_autonomous_nav_slam",
  },
  tof_time_of_flight: {
    accuracy: 7, range: 9, framerate: 9,
    outdoor: 7, dcCost: 4, activeSensor: true,
    forRobotics: true, principle: "modulated_light_phase_shift",
    bestUse: "gesture_recognition_ar_vr",
  },
  active_stereo_ir_dot: {
    accuracy: 8, range: 5, framerate: 8,
    outdoor: 4, dcCost: 2, activeSensor: true,
    forRobotics: true, principle: "ir_dot_stereo_matching",
    bestUse: "warehouse_pick_place_robot",
  },
  coded_aperture_single: {
    accuracy: 5, range: 6, framerate: 6,
    outdoor: 6, dcCost: 1, activeSensor: false,
    forRobotics: false, principle: "defocus_depth_from_blur",
    bestUse: "smartphone_portrait_bokeh_effect",
  },
};

const get = (t: DepthCameraType) => DATA[t];

export const accuracy = (t: DepthCameraType) => get(t).accuracy;
export const range = (t: DepthCameraType) => get(t).range;
export const framerate = (t: DepthCameraType) => get(t).framerate;
export const outdoor = (t: DepthCameraType) => get(t).outdoor;
export const dcCost = (t: DepthCameraType) => get(t).dcCost;
export const activeSensor = (t: DepthCameraType) => get(t).activeSensor;
export const forRobotics = (t: DepthCameraType) => get(t).forRobotics;
export const principle = (t: DepthCameraType) => get(t).principle;
export const bestUse = (t: DepthCameraType) => get(t).bestUse;
export const depthCameraTypes = (): DepthCameraType[] => Object.keys(DATA) as DepthCameraType[];
