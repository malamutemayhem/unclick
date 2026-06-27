export type LpwanTechType =
  | "lorawan_class_a"
  | "sigfox_ultra_nb"
  | "nbiot_cellular"
  | "lte_m_cat_m1"
  | "mioty_telegram";

const DATA: Record<LpwanTechType, {
  range: number; batteryLife: number; dataRate: number;
  coverage: number; techCost: number; licensed: boolean;
  forMassive: boolean; spectrum: string; bestUse: string;
}> = {
  lorawan_class_a: { range: 8, batteryLife: 9, dataRate: 3, coverage: 7, techCost: 2, licensed: false, forMassive: true, spectrum: "ism_sub_ghz_unlicensed", bestUse: "farm_sensor_low_power" },
  sigfox_ultra_nb: { range: 9, batteryLife: 10, dataRate: 1, coverage: 8, techCost: 1, licensed: false, forMassive: true, spectrum: "ultra_narrowband_100hz", bestUse: "asset_tracker_monthly" },
  nbiot_cellular: { range: 7, batteryLife: 7, dataRate: 5, coverage: 10, techCost: 4, licensed: true, forMassive: true, spectrum: "lte_in_band_guard", bestUse: "smart_meter_cellular" },
  lte_m_cat_m1: { range: 7, batteryLife: 6, dataRate: 7, coverage: 9, techCost: 5, licensed: true, forMassive: false, spectrum: "lte_1_4mhz_band", bestUse: "voice_capable_wearable" },
  mioty_telegram: { range: 8, batteryLife: 9, dataRate: 2, coverage: 8, techCost: 3, licensed: false, forMassive: true, spectrum: "telegram_split_ism", bestUse: "massive_sensor_deploy" },
};

const get = (t: LpwanTechType) => DATA[t];

export const range = (t: LpwanTechType) => get(t).range;
export const batteryLife = (t: LpwanTechType) => get(t).batteryLife;
export const dataRate = (t: LpwanTechType) => get(t).dataRate;
export const coverage = (t: LpwanTechType) => get(t).coverage;
export const techCost = (t: LpwanTechType) => get(t).techCost;
export const licensed = (t: LpwanTechType) => get(t).licensed;
export const forMassive = (t: LpwanTechType) => get(t).forMassive;
export const spectrum = (t: LpwanTechType) => get(t).spectrum;
export const bestUse = (t: LpwanTechType) => get(t).bestUse;
export const lpwanTechs = (): LpwanTechType[] => Object.keys(DATA) as LpwanTechType[];
