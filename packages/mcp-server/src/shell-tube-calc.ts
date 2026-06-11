export type ShellTubeType =
  | "fixed_tubesheet_standard"
  | "u_tube_removable"
  | "floating_head_pull_through"
  | "kettle_reboiler"
  | "double_pipe_hairpin";

interface ShellTubeData {
  efficiency: number;
  pressure: number;
  temperature: number;
  maintenance: number;
  stCost: number;
  removableBundle: boolean;
  forHighPressure: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<ShellTubeType, ShellTubeData> = {
  fixed_tubesheet_standard: {
    efficiency: 7, pressure: 9, temperature: 9, maintenance: 5, stCost: 5,
    removableBundle: false, forHighPressure: true,
    construction: "welded_tubesheet_expansion_joint",
    bestUse: "clean_fluid_moderate_temperature_diff",
  },
  u_tube_removable: {
    efficiency: 7, pressure: 8, temperature: 10, maintenance: 8, stCost: 6,
    removableBundle: true, forHighPressure: true,
    construction: "u_bend_single_tubesheet",
    bestUse: "high_temp_diff_thermal_expansion",
  },
  floating_head_pull_through: {
    efficiency: 7, pressure: 7, temperature: 8, maintenance: 10, stCost: 9,
    removableBundle: true, forHighPressure: false,
    construction: "rear_floating_head_pull_through",
    bestUse: "refinery_fouling_service_frequent_clean",
  },
  kettle_reboiler: {
    efficiency: 8, pressure: 6, temperature: 8, maintenance: 7, stCost: 8,
    removableBundle: true, forHighPressure: false,
    construction: "oversized_shell_vapor_disengagement",
    bestUse: "distillation_column_reboiler",
  },
  double_pipe_hairpin: {
    efficiency: 6, pressure: 10, temperature: 9, maintenance: 7, stCost: 4,
    removableBundle: false, forHighPressure: true,
    construction: "concentric_pipe_counter_current",
    bestUse: "small_duty_high_pressure_sample",
  },
};

function get(t: ShellTubeType): ShellTubeData {
  return DATA[t];
}

export const efficiency = (t: ShellTubeType) => get(t).efficiency;
export const pressure = (t: ShellTubeType) => get(t).pressure;
export const temperature = (t: ShellTubeType) => get(t).temperature;
export const maintenance = (t: ShellTubeType) => get(t).maintenance;
export const stCost = (t: ShellTubeType) => get(t).stCost;
export const removableBundle = (t: ShellTubeType) => get(t).removableBundle;
export const forHighPressure = (t: ShellTubeType) => get(t).forHighPressure;
export const construction = (t: ShellTubeType) => get(t).construction;
export const bestUse = (t: ShellTubeType) => get(t).bestUse;
export const shellTubeTypes = (): ShellTubeType[] =>
  Object.keys(DATA) as ShellTubeType[];
