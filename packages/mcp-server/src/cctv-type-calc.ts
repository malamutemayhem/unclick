export type CctvType =
  | "analog_coax_bnc"
  | "ip_poe_megapixel"
  | "ptz_dome_motorized"
  | "thermal_ir_uncooled"
  | "fisheye_360_dewarped";

const DATA: Record<CctvType, {
  resolution: number; nightVision: number; coverage: number;
  analytics: number; ccCost: number; poe: boolean;
  forOutdoor: boolean; sensor: string; bestUse: string;
}> = {
  analog_coax_bnc: {
    resolution: 3, nightVision: 4, coverage: 5,
    analytics: 2, ccCost: 1, poe: false,
    forOutdoor: true, sensor: "cmos_analog_composite_out",
    bestUse: "legacy_retrofit_budget_install",
  },
  ip_poe_megapixel: {
    resolution: 9, nightVision: 7, coverage: 7,
    analytics: 9, ccCost: 3, poe: true,
    forOutdoor: true, sensor: "cmos_progressive_h265_encode",
    bestUse: "enterprise_smart_surveillance",
  },
  ptz_dome_motorized: {
    resolution: 8, nightVision: 8, coverage: 10,
    analytics: 8, ccCost: 4, poe: true,
    forOutdoor: true, sensor: "motorized_zoom_auto_track",
    bestUse: "parking_lot_perimeter_patrol",
  },
  thermal_ir_uncooled: {
    resolution: 4, nightVision: 10, coverage: 6,
    analytics: 7, ccCost: 5, poe: true,
    forOutdoor: true, sensor: "vanadium_oxide_microbolometer",
    bestUse: "critical_infra_night_intruder",
  },
  fisheye_360_dewarped: {
    resolution: 7, nightVision: 5, coverage: 10,
    analytics: 6, ccCost: 3, poe: true,
    forOutdoor: false, sensor: "wide_angle_lens_dewarping_dsp",
    bestUse: "retail_store_overhead_full_view",
  },
};

const get = (t: CctvType) => DATA[t];

export const resolution = (t: CctvType) => get(t).resolution;
export const nightVision = (t: CctvType) => get(t).nightVision;
export const coverage = (t: CctvType) => get(t).coverage;
export const analytics = (t: CctvType) => get(t).analytics;
export const ccCost = (t: CctvType) => get(t).ccCost;
export const poe = (t: CctvType) => get(t).poe;
export const forOutdoor = (t: CctvType) => get(t).forOutdoor;
export const sensor = (t: CctvType) => get(t).sensor;
export const bestUse = (t: CctvType) => get(t).bestUse;
export const cctvTypes = (): CctvType[] => Object.keys(DATA) as CctvType[];
