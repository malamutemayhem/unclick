export type ImuFusion =
  | "complementary_simple"
  | "madgwick_gradient"
  | "mahony_pi"
  | "ekf_quaternion"
  | "ukf_full_state";

const DATA: Record<ImuFusion, {
  accuracy: number; speed: number; driftReject: number;
  magRequired: number; fusCost: number; adaptiveGain: boolean;
  forDrone: boolean; algorithm: string; bestUse: string;
}> = {
  complementary_simple: {
    accuracy: 4, speed: 10, driftReject: 4,
    magRequired: 3, fusCost: 1, adaptiveGain: false,
    forDrone: false, algorithm: "high_low_pass_blend",
    bestUse: "hobby_balance_robot",
  },
  madgwick_gradient: {
    accuracy: 7, speed: 8, driftReject: 7,
    magRequired: 5, fusCost: 2, adaptiveGain: true,
    forDrone: true, algorithm: "gradient_descent_quaternion",
    bestUse: "wearable_motion_capture",
  },
  mahony_pi: {
    accuracy: 7, speed: 9, driftReject: 7,
    magRequired: 5, fusCost: 2, adaptiveGain: true,
    forDrone: true, algorithm: "pi_error_correction",
    bestUse: "small_quadrotor_ahrs",
  },
  ekf_quaternion: {
    accuracy: 9, speed: 6, driftReject: 9,
    magRequired: 7, fusCost: 5, adaptiveGain: false,
    forDrone: true, algorithm: "extended_kalman_quat",
    bestUse: "commercial_drone_nav",
  },
  ukf_full_state: {
    accuracy: 10, speed: 4, driftReject: 10,
    magRequired: 8, fusCost: 7, adaptiveGain: false,
    forDrone: false, algorithm: "unscented_15_state",
    bestUse: "autonomous_vehicle_ins",
  },
};

const get = (t: ImuFusion) => DATA[t];

export const accuracy = (t: ImuFusion) => get(t).accuracy;
export const speed = (t: ImuFusion) => get(t).speed;
export const driftReject = (t: ImuFusion) => get(t).driftReject;
export const magRequired = (t: ImuFusion) => get(t).magRequired;
export const fusCost = (t: ImuFusion) => get(t).fusCost;
export const adaptiveGain = (t: ImuFusion) => get(t).adaptiveGain;
export const forDrone = (t: ImuFusion) => get(t).forDrone;
export const algorithm = (t: ImuFusion) => get(t).algorithm;
export const bestUse = (t: ImuFusion) => get(t).bestUse;
export const imuFusions = (): ImuFusion[] => Object.keys(DATA) as ImuFusion[];
