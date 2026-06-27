export type BarScreenType =
  | "coarse_bar"
  | "fine_bar"
  | "drum_screen"
  | "step_screen"
  | "perforated_plate";

interface BarScreenData {
  captureRate: number;
  throughput: number;
  screeningSize: number;
  selfCleaning: number;
  bsCost_: number;
  automated: boolean;
  forCombinedSewer: boolean;
  screenConfig: string;
  bestUse: string;
}

const DATA: Record<BarScreenType, BarScreenData> = {
  coarse_bar: {
    captureRate: 5, throughput: 9, screeningSize: 3, selfCleaning: 5, bsCost_: 3,
    automated: true, forCombinedSewer: true,
    screenConfig: "coarse_bar_screen_25_75mm_spacing_rake_clean_large_debris_remove",
    bestUse: "headworks_coarse_bar_screen_large_debris_rags_sticks_protect_pump",
  },
  fine_bar: {
    captureRate: 8, throughput: 8, screeningSize: 7, selfCleaning: 7, bsCost_: 5,
    automated: true, forCombinedSewer: false,
    screenConfig: "fine_bar_screen_3_10mm_spacing_continuous_rake_primary_treatment",
    bestUse: "primary_treatment_fine_bar_screen_small_solid_capture_reduce_load",
  },
  drum_screen: {
    captureRate: 9, throughput: 7, screeningSize: 9, selfCleaning: 9, bsCost_: 7,
    automated: true, forCombinedSewer: false,
    screenConfig: "drum_screen_rotating_cylinder_internal_external_feed_wash_spray",
    bestUse: "industrial_pretreat_drum_screen_rotating_wash_fine_particle_catch",
  },
  step_screen: {
    captureRate: 9, throughput: 8, screeningSize: 8, selfCleaning: 10, bsCost_: 8,
    automated: true, forCombinedSewer: true,
    screenConfig: "step_screen_moving_fixed_lamella_self_clean_compact_high_capture",
    bestUse: "compact_wwtp_step_screen_self_cleaning_lamella_high_capture_rate",
  },
  perforated_plate: {
    captureRate: 10, throughput: 6, screeningSize: 10, selfCleaning: 8, bsCost_: 6,
    automated: true, forCombinedSewer: false,
    screenConfig: "perforated_plate_screen_punched_hole_1_6mm_finest_capture_brush",
    bestUse: "membrane_protect_perforated_plate_screen_finest_solids_remove",
  },
};

function get(t: BarScreenType): BarScreenData {
  return DATA[t];
}

export const captureRate = (t: BarScreenType) => get(t).captureRate;
export const throughput = (t: BarScreenType) => get(t).throughput;
export const screeningSize = (t: BarScreenType) => get(t).screeningSize;
export const selfCleaning = (t: BarScreenType) => get(t).selfCleaning;
export const bsCost_ = (t: BarScreenType) => get(t).bsCost_;
export const automated = (t: BarScreenType) => get(t).automated;
export const forCombinedSewer = (t: BarScreenType) => get(t).forCombinedSewer;
export const screenConfig = (t: BarScreenType) => get(t).screenConfig;
export const bestUse = (t: BarScreenType) => get(t).bestUse;
export const barScreenTypes = (): BarScreenType[] =>
  Object.keys(DATA) as BarScreenType[];
