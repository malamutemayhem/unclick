export type UwbConfigType =
  | "twr_two_way_range"
  | "tdoa_anchor_grid"
  | "pdoa_angle_measure"
  | "uwb_radar_detect"
  | "uwb_secure_range";

const DATA: Record<UwbConfigType, {
  accuracy: number; range: number; updateRate: number;
  anchorCount: number; configCost: number; lineOfSight: boolean;
  forIndoor: boolean; technique: string; bestUse: string;
}> = {
  twr_two_way_range: { accuracy: 8, range: 7, updateRate: 7, anchorCount: 3, configCost: 3, lineOfSight: false, forIndoor: true, technique: "ss_ds_twr_tof", bestUse: "peer_distance_measure" },
  tdoa_anchor_grid: { accuracy: 9, range: 8, updateRate: 9, anchorCount: 8, configCost: 7, lineOfSight: false, forIndoor: true, technique: "tdoa_sync_anchor", bestUse: "warehouse_3d_tracking" },
  pdoa_angle_measure: { accuracy: 7, range: 5, updateRate: 8, anchorCount: 2, configCost: 4, lineOfSight: true, forIndoor: true, technique: "pdoa_aoa_antenna", bestUse: "device_pointing_find" },
  uwb_radar_detect: { accuracy: 6, range: 4, updateRate: 10, anchorCount: 1, configCost: 5, lineOfSight: true, forIndoor: false, technique: "impulse_radar_cir", bestUse: "presence_gesture_detect" },
  uwb_secure_range: { accuracy: 8, range: 6, updateRate: 6, anchorCount: 3, configCost: 6, lineOfSight: false, forIndoor: true, technique: "sts_scrambled_ts", bestUse: "car_key_secure_unlock" },
};

const get = (t: UwbConfigType) => DATA[t];

export const accuracy = (t: UwbConfigType) => get(t).accuracy;
export const range = (t: UwbConfigType) => get(t).range;
export const updateRate = (t: UwbConfigType) => get(t).updateRate;
export const anchorCount = (t: UwbConfigType) => get(t).anchorCount;
export const configCost = (t: UwbConfigType) => get(t).configCost;
export const lineOfSight = (t: UwbConfigType) => get(t).lineOfSight;
export const forIndoor = (t: UwbConfigType) => get(t).forIndoor;
export const technique = (t: UwbConfigType) => get(t).technique;
export const bestUse = (t: UwbConfigType) => get(t).bestUse;
export const uwbConfigs = (): UwbConfigType[] => Object.keys(DATA) as UwbConfigType[];
