export type WaferDicerType =
  | "blade_dicer"
  | "laser_dicer"
  | "stealth_dicer"
  | "plasma_dicer"
  | "scribe_break";

interface WaferDicerData {
  cutAccuracy: number;
  throughput: number;
  kerf: number;
  chipping: number;
  wdCost: number;
  contactFree: boolean;
  forThinWafer: boolean;
  dicerConfig: string;
  bestUse: string;
}

const DATA: Record<WaferDicerType, WaferDicerData> = {
  blade_dicer: {
    cutAccuracy: 7, throughput: 8, kerf: 5, chipping: 6, wdCost: 5,
    contactFree: false, forThinWafer: false,
    dicerConfig: "blade_wafer_dicer_diamond_wheel_coolant_street_cut_silicon",
    bestUse: "standard_silicon_blade_wafer_dicer_diamond_wheel_high_volume",
  },
  laser_dicer: {
    cutAccuracy: 9, throughput: 7, kerf: 8, chipping: 8, wdCost: 8,
    contactFree: true, forThinWafer: true,
    dicerConfig: "laser_wafer_dicer_ablation_beam_narrow_kerf_no_contact_cut",
    bestUse: "mems_sensor_laser_wafer_dicer_narrow_kerf_no_contact_fragile",
  },
  stealth_dicer: {
    cutAccuracy: 10, throughput: 6, kerf: 10, chipping: 10, wdCost: 10,
    contactFree: true, forThinWafer: true,
    dicerConfig: "stealth_wafer_dicer_internal_laser_modify_zero_kerf_split",
    bestUse: "ultra_thin_stealth_wafer_dicer_zero_kerf_internal_modify_split",
  },
  plasma_dicer: {
    cutAccuracy: 9, throughput: 5, kerf: 9, chipping: 10, wdCost: 9,
    contactFree: true, forThinWafer: true,
    dicerConfig: "plasma_wafer_dicer_deep_etch_bosch_process_zero_chipping",
    bestUse: "thin_wafer_plasma_dicer_deep_etch_bosch_process_chip_free",
  },
  scribe_break: {
    cutAccuracy: 6, throughput: 9, kerf: 7, chipping: 5, wdCost: 3,
    contactFree: false, forThinWafer: false,
    dicerConfig: "scribe_break_wafer_dicer_diamond_tip_scratch_cleave_simple",
    bestUse: "simple_led_scribe_break_wafer_dicer_diamond_scratch_cleave",
  },
};

function get(t: WaferDicerType): WaferDicerData {
  return DATA[t];
}

export const cutAccuracy = (t: WaferDicerType) => get(t).cutAccuracy;
export const throughput = (t: WaferDicerType) => get(t).throughput;
export const kerf = (t: WaferDicerType) => get(t).kerf;
export const chipping = (t: WaferDicerType) => get(t).chipping;
export const wdCost = (t: WaferDicerType) => get(t).wdCost;
export const contactFree = (t: WaferDicerType) => get(t).contactFree;
export const forThinWafer = (t: WaferDicerType) => get(t).forThinWafer;
export const dicerConfig = (t: WaferDicerType) => get(t).dicerConfig;
export const bestUse = (t: WaferDicerType) => get(t).bestUse;
export const waferDicerTypes = (): WaferDicerType[] =>
  Object.keys(DATA) as WaferDicerType[];
