export type GnssReceiverType =
  | "single_freq_l1"
  | "dual_freq_l1l5"
  | "rtk_centimeter"
  | "ppp_precise_point"
  | "dead_reckon_imu";

const DATA: Record<GnssReceiverType, {
  accuracy: number; convergence: number; powerDraw: number;
  multipath: number; receiverCost: number; correction: boolean;
  forAutonomous: boolean; constellation: string; bestUse: string;
}> = {
  single_freq_l1: { accuracy: 4, convergence: 8, powerDraw: 9, multipath: 3, receiverCost: 1, correction: false, forAutonomous: false, constellation: "gps_l1_ca_only", bestUse: "phone_fitness_tracker" },
  dual_freq_l1l5: { accuracy: 7, convergence: 7, powerDraw: 7, multipath: 6, receiverCost: 3, correction: false, forAutonomous: false, constellation: "gps_gal_l1_l5", bestUse: "survey_mapping_grade" },
  rtk_centimeter: { accuracy: 10, convergence: 9, powerDraw: 5, multipath: 8, receiverCost: 7, correction: true, forAutonomous: true, constellation: "multi_gnss_rtk_base", bestUse: "precision_ag_drone" },
  ppp_precise_point: { accuracy: 9, convergence: 4, powerDraw: 6, multipath: 7, receiverCost: 5, correction: true, forAutonomous: false, constellation: "multi_gnss_ppp_ssr", bestUse: "offshore_geodetic_survey" },
  dead_reckon_imu: { accuracy: 6, convergence: 10, powerDraw: 4, multipath: 10, receiverCost: 6, correction: false, forAutonomous: true, constellation: "gnss_imu_odom_fused", bestUse: "tunnel_urban_canyon_nav" },
};

const get = (t: GnssReceiverType) => DATA[t];

export const accuracy = (t: GnssReceiverType) => get(t).accuracy;
export const convergence = (t: GnssReceiverType) => get(t).convergence;
export const powerDraw = (t: GnssReceiverType) => get(t).powerDraw;
export const multipath = (t: GnssReceiverType) => get(t).multipath;
export const receiverCost = (t: GnssReceiverType) => get(t).receiverCost;
export const correction = (t: GnssReceiverType) => get(t).correction;
export const forAutonomous = (t: GnssReceiverType) => get(t).forAutonomous;
export const constellation = (t: GnssReceiverType) => get(t).constellation;
export const bestUse = (t: GnssReceiverType) => get(t).bestUse;
export const gnssReceivers = (): GnssReceiverType[] => Object.keys(DATA) as GnssReceiverType[];
