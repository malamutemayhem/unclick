export type ShellTubeHxType =
  | "fixed_tubesheet_standard"
  | "u_tube_bundle"
  | "floating_head_pull"
  | "kettle_reboiler"
  | "double_tubesheet_safe";

interface ShellTubeHxData {
  heatTransfer: number;
  pressureRating: number;
  thermalExpansion: number;
  cleanability: number;
  stCost: number;
  removableBundle: boolean;
  forHighPress: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<ShellTubeHxType, ShellTubeHxData> = {
  fixed_tubesheet_standard: {
    heatTransfer: 7, pressureRating: 9, thermalExpansion: 4, cleanability: 5, stCost: 4,
    removableBundle: false, forHighPress: true,
    design: "fixed_tubesheet_both_ends_welded_shell",
    bestUse: "general_chemical_process_clean_fluids",
  },
  u_tube_bundle: {
    heatTransfer: 7, pressureRating: 8, thermalExpansion: 10, cleanability: 6, stCost: 5,
    removableBundle: true, forHighPress: true,
    design: "u_shaped_tubes_free_thermal_expansion",
    bestUse: "high_temp_diff_steam_heater_condenser",
  },
  floating_head_pull: {
    heatTransfer: 7, pressureRating: 7, thermalExpansion: 9, cleanability: 9, stCost: 8,
    removableBundle: true, forHighPress: false,
    design: "floating_head_pull_through_removable_bundle",
    bestUse: "refinery_fouling_service_frequent_cleaning",
  },
  kettle_reboiler: {
    heatTransfer: 9, pressureRating: 6, thermalExpansion: 7, cleanability: 7, stCost: 7,
    removableBundle: true, forHighPress: false,
    design: "oversized_shell_pool_boiling_vapor_space",
    bestUse: "distillation_column_reboiler_vaporization",
  },
  double_tubesheet_safe: {
    heatTransfer: 6, pressureRating: 8, thermalExpansion: 5, cleanability: 4, stCost: 9,
    removableBundle: false, forHighPress: true,
    design: "double_tubesheet_leak_detection_no_mixing",
    bestUse: "nuclear_pharma_toxic_no_cross_contamination",
  },
};

function get(t: ShellTubeHxType): ShellTubeHxData {
  return DATA[t];
}

export const heatTransfer = (t: ShellTubeHxType) => get(t).heatTransfer;
export const pressureRating = (t: ShellTubeHxType) => get(t).pressureRating;
export const thermalExpansion = (t: ShellTubeHxType) => get(t).thermalExpansion;
export const cleanability = (t: ShellTubeHxType) => get(t).cleanability;
export const stCost = (t: ShellTubeHxType) => get(t).stCost;
export const removableBundle = (t: ShellTubeHxType) => get(t).removableBundle;
export const forHighPress = (t: ShellTubeHxType) => get(t).forHighPress;
export const design = (t: ShellTubeHxType) => get(t).design;
export const bestUse = (t: ShellTubeHxType) => get(t).bestUse;
export const shellTubeHxTypes = (): ShellTubeHxType[] =>
  Object.keys(DATA) as ShellTubeHxType[];
