export type WifiModuleType =
  | "wifi4_n_2g4"
  | "wifi5_ac_5g"
  | "wifi6_ax_dual"
  | "wifi6e_6ghz"
  | "wifi_halow_iot";

const DATA: Record<WifiModuleType, {
  throughput: number; range: number; powerDraw: number;
  latency: number; moduleCost: number; dualBand: boolean;
  forIot: boolean; standard: string; bestUse: string;
}> = {
  wifi4_n_2g4: { throughput: 4, range: 7, powerDraw: 5, latency: 5, moduleCost: 1, dualBand: false, forIot: true, standard: "ieee_802_11n", bestUse: "basic_iot_gateway_link" },
  wifi5_ac_5g: { throughput: 7, range: 5, powerDraw: 4, latency: 6, moduleCost: 3, dualBand: true, forIot: false, standard: "ieee_802_11ac", bestUse: "video_streaming_device" },
  wifi6_ax_dual: { throughput: 9, range: 7, powerDraw: 7, latency: 9, moduleCost: 5, dualBand: true, forIot: true, standard: "ieee_802_11ax", bestUse: "dense_environment_ap" },
  wifi6e_6ghz: { throughput: 10, range: 4, powerDraw: 6, latency: 10, moduleCost: 8, dualBand: true, forIot: false, standard: "ieee_802_11ax_6ghz", bestUse: "ar_vr_low_latency" },
  wifi_halow_iot: { throughput: 2, range: 10, powerDraw: 9, latency: 4, moduleCost: 4, dualBand: false, forIot: true, standard: "ieee_802_11ah", bestUse: "outdoor_iot_km_range" },
};

const get = (t: WifiModuleType) => DATA[t];

export const throughput = (t: WifiModuleType) => get(t).throughput;
export const range = (t: WifiModuleType) => get(t).range;
export const powerDraw = (t: WifiModuleType) => get(t).powerDraw;
export const latency = (t: WifiModuleType) => get(t).latency;
export const moduleCost = (t: WifiModuleType) => get(t).moduleCost;
export const dualBand = (t: WifiModuleType) => get(t).dualBand;
export const forIot = (t: WifiModuleType) => get(t).forIot;
export const standard = (t: WifiModuleType) => get(t).standard;
export const bestUse = (t: WifiModuleType) => get(t).bestUse;
export const wifiModules = (): WifiModuleType[] => Object.keys(DATA) as WifiModuleType[];
