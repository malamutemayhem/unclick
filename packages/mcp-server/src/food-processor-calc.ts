export type FoodProcessorType = "full_size_14_cup" | "mini_chopper_3_cup" | "combo_blender_processor" | "spiralizer_attachment" | "commercial_batch";

export function choppingPower(t: FoodProcessorType): number {
  const m: Record<FoodProcessorType, number> = {
    full_size_14_cup: 9, mini_chopper_3_cup: 5, combo_blender_processor: 7, spiralizer_attachment: 3, commercial_batch: 10,
  };
  return m[t];
}

export function bowlCapacity(t: FoodProcessorType): number {
  const m: Record<FoodProcessorType, number> = {
    full_size_14_cup: 9, mini_chopper_3_cup: 2, combo_blender_processor: 7, spiralizer_attachment: 4, commercial_batch: 10,
  };
  return m[t];
}

export function attachmentVariety(t: FoodProcessorType): number {
  const m: Record<FoodProcessorType, number> = {
    full_size_14_cup: 9, mini_chopper_3_cup: 3, combo_blender_processor: 7, spiralizer_attachment: 10, commercial_batch: 5,
  };
  return m[t];
}

export function compactStorage(t: FoodProcessorType): number {
  const m: Record<FoodProcessorType, number> = {
    full_size_14_cup: 3, mini_chopper_3_cup: 10, combo_blender_processor: 4, spiralizer_attachment: 6, commercial_batch: 1,
  };
  return m[t];
}

export function processorCost(t: FoodProcessorType): number {
  const m: Record<FoodProcessorType, number> = {
    full_size_14_cup: 6, mini_chopper_3_cup: 2, combo_blender_processor: 7, spiralizer_attachment: 4, commercial_batch: 10,
  };
  return m[t];
}

export function doughCapable(t: FoodProcessorType): boolean {
  const m: Record<FoodProcessorType, boolean> = {
    full_size_14_cup: true, mini_chopper_3_cup: false, combo_blender_processor: false, spiralizer_attachment: false, commercial_batch: true,
  };
  return m[t];
}

export function dishwasherSafe(t: FoodProcessorType): boolean {
  const m: Record<FoodProcessorType, boolean> = {
    full_size_14_cup: true, mini_chopper_3_cup: true, combo_blender_processor: true, spiralizer_attachment: true, commercial_batch: false,
  };
  return m[t];
}

export function driveType(t: FoodProcessorType): string {
  const m: Record<FoodProcessorType, string> = {
    full_size_14_cup: "direct_drive_s_blade",
    mini_chopper_3_cup: "compact_pulse_motor",
    combo_blender_processor: "dual_function_base",
    spiralizer_attachment: "mandoline_spiral_disc",
    commercial_batch: "induction_heavy_duty",
  };
  return m[t];
}

export function bestTask(t: FoodProcessorType): string {
  const m: Record<FoodProcessorType, string> = {
    full_size_14_cup: "pie_crust_large_batch",
    mini_chopper_3_cup: "garlic_herb_quick_chop",
    combo_blender_processor: "smoothie_and_salsa",
    spiralizer_attachment: "veggie_noodle_zoodle",
    commercial_batch: "restaurant_prep_volume",
  };
  return m[t];
}

export function foodProcessors(): FoodProcessorType[] {
  return ["full_size_14_cup", "mini_chopper_3_cup", "combo_blender_processor", "spiralizer_attachment", "commercial_batch"];
}
