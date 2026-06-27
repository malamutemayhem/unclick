export type HarmonicFilterType =
  | "passive_tuned"
  | "active_harmonic"
  | "hybrid_harmonic"
  | "broadband_passive"
  | "line_reactor";

interface HarmonicFilterData {
  thd_reduction: number;
  throughput: number;
  responseSpeed: number;
  powerFactor: number;
  hfCost: number;
  adaptive: boolean;
  forVfd: boolean;
  filterConfig: string;
  bestUse: string;
}

const DATA: Record<HarmonicFilterType, HarmonicFilterData> = {
  passive_tuned: {
    thd_reduction: 7, throughput: 8, responseSpeed: 3, powerFactor: 7, hfCost: 4,
    adaptive: false, forVfd: true,
    filterConfig: "passive_tuned_harmonic_filter_lc_resonant_trap_specific_frequency",
    bestUse: "vfd_input_passive_tuned_harmonic_filter_5th_7th_trap_comply_ieee",
  },
  active_harmonic: {
    thd_reduction: 9, throughput: 7, responseSpeed: 9, powerFactor: 9, hfCost: 9,
    adaptive: true, forVfd: true,
    filterConfig: "active_harmonic_filter_inject_cancel_current_real_time_compensate",
    bestUse: "data_center_active_harmonic_filter_real_time_cancel_all_harmonics",
  },
  hybrid_harmonic: {
    thd_reduction: 9, throughput: 8, responseSpeed: 8, powerFactor: 9, hfCost: 8,
    adaptive: true, forVfd: true,
    filterConfig: "hybrid_harmonic_filter_passive_base_active_trim_cost_effective",
    bestUse: "factory_floor_hybrid_harmonic_filter_passive_base_active_fine_tune",
  },
  broadband_passive: {
    thd_reduction: 6, throughput: 9, responseSpeed: 3, powerFactor: 6, hfCost: 3,
    adaptive: false, forVfd: true,
    filterConfig: "broadband_passive_harmonic_filter_wide_band_impedance_simple_cheap",
    bestUse: "small_drive_broadband_passive_harmonic_filter_simple_cheap_comply",
  },
  line_reactor: {
    thd_reduction: 4, throughput: 9, responseSpeed: 3, powerFactor: 5, hfCost: 2,
    adaptive: false, forVfd: true,
    filterConfig: "line_reactor_harmonic_filter_series_inductor_limit_di_dt_protect",
    bestUse: "drive_protect_line_reactor_harmonic_filter_limit_inrush_current",
  },
};

function get(t: HarmonicFilterType): HarmonicFilterData {
  return DATA[t];
}

export const thd_reduction = (t: HarmonicFilterType) => get(t).thd_reduction;
export const throughput = (t: HarmonicFilterType) => get(t).throughput;
export const responseSpeed = (t: HarmonicFilterType) => get(t).responseSpeed;
export const powerFactor = (t: HarmonicFilterType) => get(t).powerFactor;
export const hfCost = (t: HarmonicFilterType) => get(t).hfCost;
export const adaptive = (t: HarmonicFilterType) => get(t).adaptive;
export const forVfd = (t: HarmonicFilterType) => get(t).forVfd;
export const filterConfig = (t: HarmonicFilterType) => get(t).filterConfig;
export const bestUse = (t: HarmonicFilterType) => get(t).bestUse;
export const harmonicFilterTypes = (): HarmonicFilterType[] =>
  Object.keys(DATA) as HarmonicFilterType[];
