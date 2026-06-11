export type DeltaPickerType =
  | "standard_delta"
  | "high_speed_delta"
  | "hygienic_delta"
  | "heavy_payload_delta"
  | "vision_guided_delta";

interface DeltaPickerData {
  pickRate: number;
  throughput: number;
  payload: number;
  workspace: number;
  dpCost_: number;
  washdown: boolean;
  forFood: boolean;
  pickerConfig: string;
  bestUse: string;
}

const DATA: Record<DeltaPickerType, DeltaPickerData> = {
  standard_delta: {
    pickRate: 8, throughput: 8, payload: 5, workspace: 7, dpCost_: 6,
    washdown: false, forFood: false,
    pickerConfig: "standard_delta_picker_parallel_link_ceiling_mount_fast_pick_place",
    bestUse: "electronics_sort_standard_delta_picker_fast_pick_place_conveyor",
  },
  high_speed_delta: {
    pickRate: 9, throughput: 9, payload: 3, workspace: 6, dpCost_: 8,
    washdown: false, forFood: false,
    pickerConfig: "high_speed_delta_picker_carbon_arm_low_inertia_200_picks_min",
    bestUse: "blister_pack_high_speed_delta_picker_200_picks_min_light_item",
  },
  hygienic_delta: {
    pickRate: 8, throughput: 8, payload: 4, workspace: 7, dpCost_: 8,
    washdown: true, forFood: true,
    pickerConfig: "hygienic_delta_picker_stainless_ip67_washdown_food_contact_safe",
    bestUse: "bakery_line_hygienic_delta_picker_food_safe_washdown_pick_tray",
  },
  heavy_payload_delta: {
    pickRate: 6, throughput: 6, payload: 8, workspace: 8, dpCost_: 7,
    washdown: false, forFood: false,
    pickerConfig: "heavy_payload_delta_picker_reinforced_link_large_workspace_carton",
    bestUse: "case_packing_heavy_payload_delta_picker_carton_collate_layer",
  },
  vision_guided_delta: {
    pickRate: 8, throughput: 8, payload: 5, workspace: 7, dpCost_: 9,
    washdown: false, forFood: false,
    pickerConfig: "vision_guided_delta_picker_camera_track_conveyor_pick_random_pose",
    bestUse: "random_bin_vision_guided_delta_picker_camera_track_moving_belt",
  },
};

function get(t: DeltaPickerType): DeltaPickerData {
  return DATA[t];
}

export const pickRate = (t: DeltaPickerType) => get(t).pickRate;
export const throughput = (t: DeltaPickerType) => get(t).throughput;
export const payload = (t: DeltaPickerType) => get(t).payload;
export const workspace = (t: DeltaPickerType) => get(t).workspace;
export const dpCost_ = (t: DeltaPickerType) => get(t).dpCost_;
export const washdown = (t: DeltaPickerType) => get(t).washdown;
export const forFood = (t: DeltaPickerType) => get(t).forFood;
export const pickerConfig = (t: DeltaPickerType) => get(t).pickerConfig;
export const bestUse = (t: DeltaPickerType) => get(t).bestUse;
export const deltaPickerTypes = (): DeltaPickerType[] =>
  Object.keys(DATA) as DeltaPickerType[];
