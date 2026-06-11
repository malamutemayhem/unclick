export type RfHarvest =
  | "rectenna_dipole"
  | "ambient_wifi_scavenge"
  | "dedicated_915mhz"
  | "multi_band_wideband"
  | "backscatter_reflect";

const DATA: Record<RfHarvest, {
  sensitivity: number; range: number; efficiency: number;
  bandwidth: number; rfhCost: number; ambient: boolean;
  forIot: boolean; antenna: string; bestUse: string;
}> = {
  rectenna_dipole: {
    sensitivity: 6, range: 7, efficiency: 8,
    bandwidth: 4, rfhCost: 3, ambient: false,
    forIot: false, antenna: "printed_dipole_rectifier",
    bestUse: "dedicated_power_beam",
  },
  ambient_wifi_scavenge: {
    sensitivity: 8, range: 4, efficiency: 4,
    bandwidth: 6, rfhCost: 4, ambient: true,
    forIot: true, antenna: "patch_voltage_doubler",
    bestUse: "indoor_sensor_trickle",
  },
  dedicated_915mhz: {
    sensitivity: 7, range: 9, efficiency: 9,
    bandwidth: 3, rfhCost: 5, ambient: false,
    forIot: true, antenna: "yagi_uda_focused_beam",
    bestUse: "warehouse_tag_recharge",
  },
  multi_band_wideband: {
    sensitivity: 9, range: 5, efficiency: 5,
    bandwidth: 10, rfhCost: 7, ambient: true,
    forIot: true, antenna: "spiral_log_periodic",
    bestUse: "urban_multi_source_harvest",
  },
  backscatter_reflect: {
    sensitivity: 10, range: 3, efficiency: 3,
    bandwidth: 5, rfhCost: 2, ambient: false,
    forIot: true, antenna: "modulated_impedance_tag",
    bestUse: "rfid_batteryless_sensor",
  },
};

const get = (t: RfHarvest) => DATA[t];

export const sensitivity = (t: RfHarvest) => get(t).sensitivity;
export const range = (t: RfHarvest) => get(t).range;
export const efficiency = (t: RfHarvest) => get(t).efficiency;
export const bandwidth = (t: RfHarvest) => get(t).bandwidth;
export const rfhCost = (t: RfHarvest) => get(t).rfhCost;
export const ambient = (t: RfHarvest) => get(t).ambient;
export const forIot = (t: RfHarvest) => get(t).forIot;
export const antenna = (t: RfHarvest) => get(t).antenna;
export const bestUse = (t: RfHarvest) => get(t).bestUse;
export const rfHarvests = (): RfHarvest[] => Object.keys(DATA) as RfHarvest[];
