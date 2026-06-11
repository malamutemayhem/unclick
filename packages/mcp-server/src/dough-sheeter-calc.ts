export type DoughSheeterType =
  | "reversible_floor"
  | "tabletop_bench"
  | "automatic_line"
  | "croissant_laminator"
  | "pizza_press";

interface DoughSheeterData {
  speed: number;
  thickness: number;
  consistency: number;
  doughGentle: number;
  dsCost: number;
  automatic: boolean;
  forLaminated: boolean;
  action: string;
  bestUse: string;
}

const DATA: Record<DoughSheeterType, DoughSheeterData> = {
  reversible_floor: {
    speed: 7, thickness: 9, consistency: 8, doughGentle: 8, dsCost: 7,
    automatic: false, forLaminated: true,
    action: "reversing_conveyor_belt_adjustable_roller_gap_fold_pass",
    bestUse: "bakery_pastry_puff_dough_croissant_danish_artisan_batch",
  },
  tabletop_bench: {
    speed: 4, thickness: 7, consistency: 6, doughGentle: 7, dsCost: 3,
    automatic: false, forLaminated: false,
    action: "compact_bench_roller_manual_feed_small_batch_thin_sheet",
    bestUse: "small_bakery_pizza_base_pasta_sheet_pie_crust_tortilla",
  },
  automatic_line: {
    speed: 10, thickness: 10, consistency: 10, doughGentle: 6, dsCost: 10,
    automatic: true, forLaminated: true,
    action: "multi_stage_roller_calibration_conveyor_continuous_inline",
    bestUse: "industrial_bread_biscuit_cracker_continuous_dough_line",
  },
  croissant_laminator: {
    speed: 8, thickness: 10, consistency: 9, doughGentle: 9, dsCost: 9,
    automatic: true, forLaminated: true,
    action: "butter_fold_roll_repeat_automatic_lamination_layer_count",
    bestUse: "croissant_puff_pastry_danish_laminated_butter_dough_layers",
  },
  pizza_press: {
    speed: 9, thickness: 6, consistency: 8, doughGentle: 5, dsCost: 5,
    automatic: true, forLaminated: false,
    action: "heated_platen_press_flatten_round_dough_ball_to_disk",
    bestUse: "pizza_chain_flatbread_tortilla_high_volume_round_disk",
  },
};

function get(t: DoughSheeterType): DoughSheeterData {
  return DATA[t];
}

export const speed = (t: DoughSheeterType) => get(t).speed;
export const thickness = (t: DoughSheeterType) => get(t).thickness;
export const consistency = (t: DoughSheeterType) => get(t).consistency;
export const doughGentle = (t: DoughSheeterType) => get(t).doughGentle;
export const dsCost = (t: DoughSheeterType) => get(t).dsCost;
export const automatic = (t: DoughSheeterType) => get(t).automatic;
export const forLaminated = (t: DoughSheeterType) => get(t).forLaminated;
export const action = (t: DoughSheeterType) => get(t).action;
export const bestUse = (t: DoughSheeterType) => get(t).bestUse;
export const doughSheeterTypes = (): DoughSheeterType[] =>
  Object.keys(DATA) as DoughSheeterType[];
