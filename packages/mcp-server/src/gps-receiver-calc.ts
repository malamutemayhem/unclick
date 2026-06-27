export type GpsReceiverType =
  | "handheld_navigation_basic"
  | "gnss_rtk_base_rover"
  | "gnss_ppp_precise_point"
  | "gis_mapping_collector"
  | "machine_control_3d_grade";

interface GpsReceiverData {
  accuracy: number;
  speed: number;
  range: number;
  autonomy: number;
  gpCost: number;
  rtk: boolean;
  forSurvey: boolean;
  correction: string;
  bestUse: string;
}

const DATA: Record<GpsReceiverType, GpsReceiverData> = {
  handheld_navigation_basic: {
    accuracy: 3, speed: 8, range: 10, autonomy: 10, gpCost: 1,
    rtk: false, forSurvey: false,
    correction: "sbas_waas_egnos_free_broadcast",
    bestUse: "hiking_waypoint_field_locate_approx",
  },
  gnss_rtk_base_rover: {
    accuracy: 10, speed: 9, range: 5, autonomy: 4, gpCost: 9,
    rtk: true, forSurvey: true,
    correction: "rtk_base_station_radio_link_fix",
    bestUse: "survey_stakeout_control_cm_accuracy",
  },
  gnss_ppp_precise_point: {
    accuracy: 8, speed: 5, range: 10, autonomy: 8, gpCost: 7,
    rtk: false, forSurvey: true,
    correction: "precise_ephemeris_clock_satellite",
    bestUse: "remote_area_offshore_no_base_needed",
  },
  gis_mapping_collector: {
    accuracy: 5, speed: 8, range: 9, autonomy: 8, gpCost: 4,
    rtk: false, forSurvey: false,
    correction: "postprocess_dgps_sub_meter",
    bestUse: "utility_mapping_asset_inventory_gis",
  },
  machine_control_3d_grade: {
    accuracy: 9, speed: 10, range: 5, autonomy: 3, gpCost: 10,
    rtk: true, forSurvey: false,
    correction: "rtk_ntrip_machine_mount_real_time",
    bestUse: "dozer_grader_excavator_auto_grade",
  },
};

function get(t: GpsReceiverType): GpsReceiverData {
  return DATA[t];
}

export const accuracy = (t: GpsReceiverType) => get(t).accuracy;
export const speed = (t: GpsReceiverType) => get(t).speed;
export const range = (t: GpsReceiverType) => get(t).range;
export const autonomy = (t: GpsReceiverType) => get(t).autonomy;
export const gpCost = (t: GpsReceiverType) => get(t).gpCost;
export const rtk = (t: GpsReceiverType) => get(t).rtk;
export const forSurvey = (t: GpsReceiverType) => get(t).forSurvey;
export const correction = (t: GpsReceiverType) => get(t).correction;
export const bestUse = (t: GpsReceiverType) => get(t).bestUse;
export const gpsReceiverTypes = (): GpsReceiverType[] =>
  Object.keys(DATA) as GpsReceiverType[];
