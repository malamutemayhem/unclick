export type LaserWeldType =
  | "co2_cw"
  | "fiber_cw"
  | "pulsed_nd_yag"
  | "disk_laser"
  | "blue_diode";

interface LaserWeldData {
  penetration: number;
  speed: number;
  precision: number;
  heatAffectedZone: number;
  lwCost: number;
  contactless: boolean;
  forReflective: boolean;
  source: string;
  bestUse: string;
}

const DATA: Record<LaserWeldType, LaserWeldData> = {
  co2_cw: {
    penetration: 9, speed: 8, precision: 7, heatAffectedZone: 7, lwCost: 7,
    contactless: true, forReflective: false,
    source: "co2_gas_resonator_10600nm_infrared_continuous_wave_beam",
    bestUse: "thick_steel_plate_shipbuilding_structural_deep_penetration",
  },
  fiber_cw: {
    penetration: 10, speed: 10, precision: 9, heatAffectedZone: 9, lwCost: 8,
    contactless: true, forReflective: true,
    source: "ytterbium_doped_fiber_1070nm_single_mode_high_brightness",
    bestUse: "automotive_body_in_white_battery_tab_high_speed_seam_weld",
  },
  pulsed_nd_yag: {
    penetration: 6, speed: 6, precision: 9, heatAffectedZone: 8, lwCost: 6,
    contactless: true, forReflective: true,
    source: "nd_yag_crystal_1064nm_pulsed_peak_power_spot_weld_repair",
    bestUse: "mold_repair_jewelry_dental_prosthetic_precision_spot_weld",
  },
  disk_laser: {
    penetration: 9, speed: 9, precision: 9, heatAffectedZone: 9, lwCost: 9,
    contactless: true, forReflective: true,
    source: "thin_disk_yag_crystal_1030nm_high_beam_quality_multikilowatt",
    bestUse: "aerospace_titanium_aluminum_remote_scanner_weld_high_power",
  },
  blue_diode: {
    penetration: 5, speed: 7, precision: 8, heatAffectedZone: 7, lwCost: 10,
    contactless: true, forReflective: true,
    source: "gallium_nitride_diode_450nm_blue_high_copper_absorption",
    bestUse: "copper_foil_ev_battery_hairpin_motor_winding_high_absorb",
  },
};

function get(t: LaserWeldType): LaserWeldData {
  return DATA[t];
}

export const penetration = (t: LaserWeldType) => get(t).penetration;
export const speed = (t: LaserWeldType) => get(t).speed;
export const precision = (t: LaserWeldType) => get(t).precision;
export const heatAffectedZone = (t: LaserWeldType) => get(t).heatAffectedZone;
export const lwCost = (t: LaserWeldType) => get(t).lwCost;
export const contactless = (t: LaserWeldType) => get(t).contactless;
export const forReflective = (t: LaserWeldType) => get(t).forReflective;
export const source = (t: LaserWeldType) => get(t).source;
export const bestUse = (t: LaserWeldType) => get(t).bestUse;
export const laserWeldTypes = (): LaserWeldType[] =>
  Object.keys(DATA) as LaserWeldType[];
