export type LaserWelderType =
  | "co2_laser_deep"
  | "fiber_laser_fine"
  | "nd_yag_pulsed"
  | "diode_laser_clad"
  | "disc_laser_high_power";

interface LaserWelderData {
  precision: number;
  penetration: number;
  speed: number;
  heatAffected: number;
  lwCost: number;
  fiberDelivery: boolean;
  forMicro: boolean;
  source: string;
  bestUse: string;
}

const DATA: Record<LaserWelderType, LaserWelderData> = {
  co2_laser_deep: {
    precision: 7, penetration: 10, speed: 8, heatAffected: 7, lwCost: 7,
    fiberDelivery: false, forMicro: false,
    source: "co2_gas_laser_10_6um_mirror_delivery",
    bestUse: "thick_steel_shipbuilding_deep_keyhole",
  },
  fiber_laser_fine: {
    precision: 9, penetration: 8, speed: 10, heatAffected: 9, lwCost: 8,
    fiberDelivery: true, forMicro: true,
    source: "ytterbium_fiber_laser_1070nm_single_mode",
    bestUse: "automotive_battery_tab_electronics_fine",
  },
  nd_yag_pulsed: {
    precision: 10, penetration: 5, speed: 5, heatAffected: 10, lwCost: 6,
    fiberDelivery: true, forMicro: true,
    source: "nd_yag_crystal_1064nm_pulsed_flash_lamp",
    bestUse: "jewelry_medical_device_micro_spot_weld",
  },
  diode_laser_clad: {
    precision: 6, penetration: 4, speed: 6, heatAffected: 6, lwCost: 5,
    fiberDelivery: true, forMicro: false,
    source: "direct_diode_array_900_980nm_wide_beam",
    bestUse: "surface_cladding_hardfacing_repair_build",
  },
  disc_laser_high_power: {
    precision: 8, penetration: 9, speed: 9, heatAffected: 8, lwCost: 9,
    fiberDelivery: true, forMicro: false,
    source: "yb_yag_thin_disc_1030nm_multi_kw",
    bestUse: "aerospace_titanium_remote_weld_high_power",
  },
};

function get(t: LaserWelderType): LaserWelderData {
  return DATA[t];
}

export const precision = (t: LaserWelderType) => get(t).precision;
export const penetration = (t: LaserWelderType) => get(t).penetration;
export const speed = (t: LaserWelderType) => get(t).speed;
export const heatAffected = (t: LaserWelderType) => get(t).heatAffected;
export const lwCost = (t: LaserWelderType) => get(t).lwCost;
export const fiberDelivery = (t: LaserWelderType) => get(t).fiberDelivery;
export const forMicro = (t: LaserWelderType) => get(t).forMicro;
export const source = (t: LaserWelderType) => get(t).source;
export const bestUse = (t: LaserWelderType) => get(t).bestUse;
export const laserWelderTypes = (): LaserWelderType[] =>
  Object.keys(DATA) as LaserWelderType[];
