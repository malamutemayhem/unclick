export type BleModuleType =
  | "soc_integrated"
  | "module_certified"
  | "beacon_broadcast"
  | "mesh_network"
  | "long_range_coded";

const DATA: Record<BleModuleType, {
  dataRate: number; range: number; powerDraw: number;
  security: number; moduleCost: number; meshCapable: boolean;
  forIot: boolean; bleVersion: string; bestUse: string;
}> = {
  soc_integrated: { dataRate: 7, range: 6, powerDraw: 9, security: 7, moduleCost: 2, meshCapable: false, forIot: true, bleVersion: "ble_5_3_soc", bestUse: "custom_wearable_design" },
  module_certified: { dataRate: 7, range: 7, powerDraw: 7, security: 8, moduleCost: 5, meshCapable: false, forIot: true, bleVersion: "ble_5_2_module", bestUse: "fast_time_to_market" },
  beacon_broadcast: { dataRate: 2, range: 5, powerDraw: 10, security: 3, moduleCost: 1, meshCapable: false, forIot: true, bleVersion: "ble_5_0_beacon", bestUse: "asset_tracking_proximity" },
  mesh_network: { dataRate: 5, range: 8, powerDraw: 5, security: 8, moduleCost: 4, meshCapable: true, forIot: true, bleVersion: "ble_mesh_1_1", bestUse: "smart_lighting_building" },
  long_range_coded: { dataRate: 3, range: 10, powerDraw: 6, security: 7, moduleCost: 4, meshCapable: false, forIot: true, bleVersion: "ble_5_lr_coded", bestUse: "outdoor_sensor_long_range" },
};

const get = (t: BleModuleType) => DATA[t];

export const dataRate = (t: BleModuleType) => get(t).dataRate;
export const range = (t: BleModuleType) => get(t).range;
export const powerDraw = (t: BleModuleType) => get(t).powerDraw;
export const security = (t: BleModuleType) => get(t).security;
export const moduleCost = (t: BleModuleType) => get(t).moduleCost;
export const meshCapable = (t: BleModuleType) => get(t).meshCapable;
export const forIot = (t: BleModuleType) => get(t).forIot;
export const bleVersion = (t: BleModuleType) => get(t).bleVersion;
export const bestUse = (t: BleModuleType) => get(t).bestUse;
export const bleModules = (): BleModuleType[] => Object.keys(DATA) as BleModuleType[];
