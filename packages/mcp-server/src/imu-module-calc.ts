// imu-module-calc - IMU (inertial measurement unit) module types

export type ImuModule =
  | "mpu6050_6axis_basic"
  | "bno055_9axis_fusion"
  | "icm20948_9axis_low"
  | "lsm6dso_6axis_precise"
  | "bmi270_6axis_wearable";

const DATA: Record<ImuModule, {
  axisCount: number; fusionQuality: number; driftLow: number; powerDraw: number;
  cost: number; onboardFusion: boolean; nineAxis: boolean; chipFamily: string; bestUse: string;
}> = {
  mpu6050_6axis_basic:    { axisCount: 6, fusionQuality: 5, driftLow: 5, powerDraw: 6, cost: 2, onboardFusion: false, nineAxis: false, chipFamily: "invensense_mpu", bestUse: "hobby_motion_track" },
  bno055_9axis_fusion:    { axisCount: 10, fusionQuality: 10, driftLow: 9, powerDraw: 5, cost: 7, onboardFusion: true, nineAxis: true, chipFamily: "bosch_smart_sensor", bestUse: "heading_orient_fused" },
  icm20948_9axis_low:     { axisCount: 9, fusionQuality: 7, driftLow: 7, powerDraw: 8, cost: 5, onboardFusion: false, nineAxis: true, chipFamily: "invensense_icm", bestUse: "low_power_9axis" },
  lsm6dso_6axis_precise:  { axisCount: 7, fusionQuality: 6, driftLow: 8, powerDraw: 9, cost: 4, onboardFusion: false, nineAxis: false, chipFamily: "st_micro_lsm", bestUse: "precise_accel_gyro" },
  bmi270_6axis_wearable:  { axisCount: 7, fusionQuality: 6, driftLow: 7, powerDraw: 10, cost: 5, onboardFusion: false, nineAxis: false, chipFamily: "bosch_bmi_wear", bestUse: "wearable_step_track" },
};

const get = (i: ImuModule) => DATA[i];
export const axisCount = (i: ImuModule) => get(i).axisCount;
export const fusionQuality = (i: ImuModule) => get(i).fusionQuality;
export const driftLow = (i: ImuModule) => get(i).driftLow;
export const powerDraw = (i: ImuModule) => get(i).powerDraw;
export const imuCost = (i: ImuModule) => get(i).cost;
export const onboardFusion = (i: ImuModule) => get(i).onboardFusion;
export const nineAxis = (i: ImuModule) => get(i).nineAxis;
export const chipFamily = (i: ImuModule) => get(i).chipFamily;
export const bestUse = (i: ImuModule) => get(i).bestUse;
export const imuModules = (): ImuModule[] => Object.keys(DATA) as ImuModule[];
