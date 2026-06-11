export type ScreenFilterType =
  | "bar_screen"
  | "drum_screen"
  | "step_screen"
  | "wedge_wire"
  | "micro_screen";

interface ScreenFilterData {
  solidsRemoval: number;
  throughput: number;
  selfCleaning: number;
  meshFineness: number;
  sfCost: number;
  automated: boolean;
  forFine: boolean;
  screenConfig: string;
  bestUse: string;
}

const DATA: Record<ScreenFilterType, ScreenFilterData> = {
  bar_screen: {
    solidsRemoval: 6, throughput: 10, selfCleaning: 7, meshFineness: 3, sfCost: 4,
    automated: true, forFine: false,
    screenConfig: "bar_screen_filter_parallel_bars_rake_clean_coarse_debris_trap",
    bestUse: "wastewater_headworks_bar_screen_coarse_debris_rags_removal",
  },
  drum_screen: {
    solidsRemoval: 8, throughput: 8, selfCleaning: 9, meshFineness: 7, sfCost: 7,
    automated: true, forFine: false,
    screenConfig: "drum_screen_filter_rotating_cylinder_mesh_backwash_continuous",
    bestUse: "industrial_pretreat_drum_screen_continuous_solids_separation",
  },
  step_screen: {
    solidsRemoval: 8, throughput: 9, selfCleaning: 10, meshFineness: 6, sfCost: 8,
    automated: true, forFine: false,
    screenConfig: "step_screen_filter_moving_lamella_self_clean_lift_solids_out",
    bestUse: "municipal_wastewater_step_screen_self_cleaning_reliable_cso",
  },
  wedge_wire: {
    solidsRemoval: 9, throughput: 7, selfCleaning: 8, meshFineness: 8, sfCost: 6,
    automated: false, forFine: true,
    screenConfig: "wedge_wire_screen_filter_vee_profile_slot_precise_gap_dewater",
    bestUse: "food_process_wedge_wire_screen_dewatering_starch_fiber_recovery",
  },
  micro_screen: {
    solidsRemoval: 10, throughput: 6, selfCleaning: 8, meshFineness: 10, sfCost: 9,
    automated: true, forFine: true,
    screenConfig: "micro_screen_filter_fine_mesh_drum_backwash_tss_algae_remove",
    bestUse: "tertiary_wastewater_micro_screen_fine_solids_algae_polishing",
  },
};

function get(t: ScreenFilterType): ScreenFilterData {
  return DATA[t];
}

export const solidsRemoval = (t: ScreenFilterType) => get(t).solidsRemoval;
export const throughput = (t: ScreenFilterType) => get(t).throughput;
export const selfCleaning = (t: ScreenFilterType) => get(t).selfCleaning;
export const meshFineness = (t: ScreenFilterType) => get(t).meshFineness;
export const sfCost = (t: ScreenFilterType) => get(t).sfCost;
export const automated = (t: ScreenFilterType) => get(t).automated;
export const forFine = (t: ScreenFilterType) => get(t).forFine;
export const screenConfig = (t: ScreenFilterType) => get(t).screenConfig;
export const bestUse = (t: ScreenFilterType) => get(t).bestUse;
export const screenFilterTypes = (): ScreenFilterType[] =>
  Object.keys(DATA) as ScreenFilterType[];
