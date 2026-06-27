export type StretchWrapperType =
  | "turntable_semi"
  | "turntable_auto"
  | "rotary_arm"
  | "orbital_ring"
  | "robotic_mobile";

interface StretchWrapperData {
  speed: number;
  loadStability: number;
  filmSaving: number;
  flexibility: number;
  swwCost: number;
  automated: boolean;
  forHeavyLoad: boolean;
  wrap: string;
  bestUse: string;
}

const DATA: Record<StretchWrapperType, StretchWrapperData> = {
  turntable_semi: {
    speed: 5, loadStability: 7, filmSaving: 6, flexibility: 8, swwCost: 3,
    automated: false, forHeavyLoad: false,
    wrap: "cast_lldpe_stretch_film_turntable_rotate_pallet_manual_cut",
    bestUse: "low_volume_warehouse_small_pallet_manual_attach_cut_film",
  },
  turntable_auto: {
    speed: 8, loadStability: 8, filmSaving: 8, flexibility: 7, swwCost: 6,
    automated: true, forHeavyLoad: false,
    wrap: "pre_stretch_film_auto_clamp_cut_seal_turntable_conveyor",
    bestUse: "medium_volume_distribution_center_standard_pallet_inline",
  },
  rotary_arm: {
    speed: 9, loadStability: 9, filmSaving: 8, flexibility: 8, swwCost: 8,
    automated: true, forHeavyLoad: true,
    wrap: "rotating_arm_stationary_pallet_unstable_heavy_tall_load",
    bestUse: "heavy_unstable_load_appliance_door_window_tall_pallet",
  },
  orbital_ring: {
    speed: 10, loadStability: 9, filmSaving: 9, flexibility: 6, swwCost: 9,
    automated: true, forHeavyLoad: true,
    wrap: "orbital_ring_horizontal_pass_through_long_product_bundle",
    bestUse: "long_product_lumber_pipe_profile_extrusion_horizontal_wrap",
  },
  robotic_mobile: {
    speed: 6, loadStability: 7, filmSaving: 7, flexibility: 10, swwCost: 10,
    automated: true, forHeavyLoad: true,
    wrap: "agv_mounted_wrapper_robot_drive_around_pallet_any_location",
    bestUse: "floor_level_pallet_no_conveyor_flexible_location_wrap",
  },
};

function get(t: StretchWrapperType): StretchWrapperData {
  return DATA[t];
}

export const speed = (t: StretchWrapperType) => get(t).speed;
export const loadStability = (t: StretchWrapperType) => get(t).loadStability;
export const filmSaving = (t: StretchWrapperType) => get(t).filmSaving;
export const flexibility = (t: StretchWrapperType) => get(t).flexibility;
export const swwCost = (t: StretchWrapperType) => get(t).swwCost;
export const automated = (t: StretchWrapperType) => get(t).automated;
export const forHeavyLoad = (t: StretchWrapperType) => get(t).forHeavyLoad;
export const wrap = (t: StretchWrapperType) => get(t).wrap;
export const bestUse = (t: StretchWrapperType) => get(t).bestUse;
export const stretchWrapperTypes = (): StretchWrapperType[] =>
  Object.keys(DATA) as StretchWrapperType[];
