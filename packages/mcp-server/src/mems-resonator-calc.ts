export type MemsResonator =
  | "comb_drive_lateral"
  | "film_bulk_fbar"
  | "contour_mode_cme"
  | "wine_glass_disk"
  | "tuning_fork_quartz";

const DATA: Record<MemsResonator, {
  qFactor: number; frequency: number; stability: number;
  size: number; mrCost: number; piezoelectric: boolean;
  forFilter: boolean; mode: string; bestUse: string;
}> = {
  comb_drive_lateral: {
    qFactor: 7, frequency: 4, stability: 6,
    size: 5, mrCost: 4, piezoelectric: false,
    forFilter: false, mode: "electrostatic_in_plane",
    bestUse: "mems_oscillator_clock",
  },
  film_bulk_fbar: {
    qFactor: 8, frequency: 10, stability: 8,
    size: 9, mrCost: 6, piezoelectric: true,
    forFilter: true, mode: "thickness_longitudinal",
    bestUse: "5g_rf_duplexer_filter",
  },
  contour_mode_cme: {
    qFactor: 7, frequency: 9, stability: 7,
    size: 8, mrCost: 5, piezoelectric: true,
    forFilter: true, mode: "lateral_plate_contour",
    bestUse: "multi_freq_single_chip",
  },
  wine_glass_disk: {
    qFactor: 10, frequency: 7, stability: 9,
    size: 7, mrCost: 7, piezoelectric: false,
    forFilter: false, mode: "radial_extensional_disk",
    bestUse: "ultra_stable_reference",
  },
  tuning_fork_quartz: {
    qFactor: 9, frequency: 3, stability: 10,
    size: 4, mrCost: 2, piezoelectric: true,
    forFilter: false, mode: "flexural_prong_vibrate",
    bestUse: "rtc_32khz_watch_crystal",
  },
};

const get = (t: MemsResonator) => DATA[t];

export const qFactor = (t: MemsResonator) => get(t).qFactor;
export const frequency = (t: MemsResonator) => get(t).frequency;
export const stability = (t: MemsResonator) => get(t).stability;
export const size = (t: MemsResonator) => get(t).size;
export const mrCost = (t: MemsResonator) => get(t).mrCost;
export const piezoelectric = (t: MemsResonator) => get(t).piezoelectric;
export const forFilter = (t: MemsResonator) => get(t).forFilter;
export const mode = (t: MemsResonator) => get(t).mode;
export const bestUse = (t: MemsResonator) => get(t).bestUse;
export const memsResonators = (): MemsResonator[] => Object.keys(DATA) as MemsResonator[];
