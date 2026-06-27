export type KalmanFilter =
  | "standard_linear"
  | "extended_ekf"
  | "unscented_ukf"
  | "particle_pf"
  | "cubature_ckf";

const DATA: Record<KalmanFilter, {
  accuracy: number; speed: number; nonlinear: number;
  robustness: number; kfCost: number; gaussianReq: boolean;
  forNavigation: boolean; propagation: string; bestUse: string;
}> = {
  standard_linear: {
    accuracy: 7, speed: 10, nonlinear: 1,
    robustness: 6, kfCost: 1, gaussianReq: true,
    forNavigation: false, propagation: "state_transition_matrix",
    bestUse: "linear_sensor_fusion",
  },
  extended_ekf: {
    accuracy: 7, speed: 8, nonlinear: 6,
    robustness: 5, kfCost: 3, gaussianReq: true,
    forNavigation: true, propagation: "jacobian_linearization",
    bestUse: "gps_ins_navigation",
  },
  unscented_ukf: {
    accuracy: 9, speed: 6, nonlinear: 8,
    robustness: 8, kfCost: 4, gaussianReq: true,
    forNavigation: true, propagation: "sigma_point_transform",
    bestUse: "spacecraft_attitude_est",
  },
  particle_pf: {
    accuracy: 10, speed: 3, nonlinear: 10,
    robustness: 9, kfCost: 8, gaussianReq: false,
    forNavigation: false, propagation: "monte_carlo_resample",
    bestUse: "robot_localization_map",
  },
  cubature_ckf: {
    accuracy: 9, speed: 7, nonlinear: 9,
    robustness: 8, kfCost: 5, gaussianReq: true,
    forNavigation: true, propagation: "cubature_spherical_radial",
    bestUse: "high_dim_state_tracking",
  },
};

const get = (t: KalmanFilter) => DATA[t];

export const accuracy = (t: KalmanFilter) => get(t).accuracy;
export const speed = (t: KalmanFilter) => get(t).speed;
export const nonlinear = (t: KalmanFilter) => get(t).nonlinear;
export const robustness = (t: KalmanFilter) => get(t).robustness;
export const kfCost = (t: KalmanFilter) => get(t).kfCost;
export const gaussianReq = (t: KalmanFilter) => get(t).gaussianReq;
export const forNavigation = (t: KalmanFilter) => get(t).forNavigation;
export const propagation = (t: KalmanFilter) => get(t).propagation;
export const bestUse = (t: KalmanFilter) => get(t).bestUse;
export const kalmanFilters = (): KalmanFilter[] => Object.keys(DATA) as KalmanFilter[];
