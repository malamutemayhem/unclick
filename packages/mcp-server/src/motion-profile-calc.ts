export type MotionProfile =
  | "trapezoidal_vel"
  | "s_curve_jerk"
  | "polynomial_5th"
  | "sinusoidal_cam"
  | "minimum_time_opt";

const DATA: Record<MotionProfile, {
  smoothness: number; speed: number; accuracy: number;
  computeLoad: number; mpCost: number; jerkLimited: boolean;
  forCnc: boolean; shape: string; bestUse: string;
}> = {
  trapezoidal_vel: {
    smoothness: 4, speed: 8, accuracy: 6,
    computeLoad: 9, mpCost: 1, jerkLimited: false,
    forCnc: true, shape: "accel_cruise_decel",
    bestUse: "simple_point_to_point",
  },
  s_curve_jerk: {
    smoothness: 8, speed: 7, accuracy: 8,
    computeLoad: 7, mpCost: 2, jerkLimited: true,
    forCnc: true, shape: "seven_segment_jerk",
    bestUse: "industrial_robot_joint",
  },
  polynomial_5th: {
    smoothness: 9, speed: 6, accuracy: 9,
    computeLoad: 5, mpCost: 3, jerkLimited: true,
    forCnc: false, shape: "quintic_boundary_match",
    bestUse: "smooth_trajectory_interp",
  },
  sinusoidal_cam: {
    smoothness: 7, speed: 7, accuracy: 7,
    computeLoad: 8, mpCost: 2, jerkLimited: true,
    forCnc: false, shape: "modified_sine_cycloidal",
    bestUse: "cam_follower_mechanism",
  },
  minimum_time_opt: {
    smoothness: 5, speed: 10, accuracy: 8,
    computeLoad: 3, mpCost: 5, jerkLimited: false,
    forCnc: true, shape: "bang_bang_time_optimal",
    bestUse: "pick_place_throughput",
  },
};

const get = (t: MotionProfile) => DATA[t];

export const smoothness = (t: MotionProfile) => get(t).smoothness;
export const speed = (t: MotionProfile) => get(t).speed;
export const accuracy = (t: MotionProfile) => get(t).accuracy;
export const computeLoad = (t: MotionProfile) => get(t).computeLoad;
export const mpCost = (t: MotionProfile) => get(t).mpCost;
export const jerkLimited = (t: MotionProfile) => get(t).jerkLimited;
export const forCnc = (t: MotionProfile) => get(t).forCnc;
export const shape = (t: MotionProfile) => get(t).shape;
export const bestUse = (t: MotionProfile) => get(t).bestUse;
export const motionProfiles = (): MotionProfile[] => Object.keys(DATA) as MotionProfile[];
