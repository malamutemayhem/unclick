export type JuicerType = "centrifugal_fast_spin" | "masticating_slow_press" | "triturating_twin_gear" | "citrus_press_manual" | "steam_extraction_cook";

export function juiceYield(t: JuicerType): number {
  const m: Record<JuicerType, number> = {
    centrifugal_fast_spin: 6, masticating_slow_press: 9, triturating_twin_gear: 10, citrus_press_manual: 7, steam_extraction_cook: 8,
  };
  return m[t];
}

export function juiceSpeed(t: JuicerType): number {
  const m: Record<JuicerType, number> = {
    centrifugal_fast_spin: 10, masticating_slow_press: 4, triturating_twin_gear: 3, citrus_press_manual: 5, steam_extraction_cook: 2,
  };
  return m[t];
}

export function nutrientRetention(t: JuicerType): number {
  const m: Record<JuicerType, number> = {
    centrifugal_fast_spin: 5, masticating_slow_press: 9, triturating_twin_gear: 10, citrus_press_manual: 8, steam_extraction_cook: 6,
  };
  return m[t];
}

export function noiseLevel(t: JuicerType): number {
  const m: Record<JuicerType, number> = {
    centrifugal_fast_spin: 2, masticating_slow_press: 7, triturating_twin_gear: 6, citrus_press_manual: 10, steam_extraction_cook: 8,
  };
  return m[t];
}

export function juicerCost(t: JuicerType): number {
  const m: Record<JuicerType, number> = {
    centrifugal_fast_spin: 3, masticating_slow_press: 6, triturating_twin_gear: 9, citrus_press_manual: 1, steam_extraction_cook: 5,
  };
  return m[t];
}

export function handlesLeafy(t: JuicerType): boolean {
  const m: Record<JuicerType, boolean> = {
    centrifugal_fast_spin: false, masticating_slow_press: true, triturating_twin_gear: true, citrus_press_manual: false, steam_extraction_cook: false,
  };
  return m[t];
}

export function needsPower(t: JuicerType): boolean {
  const m: Record<JuicerType, boolean> = {
    centrifugal_fast_spin: true, masticating_slow_press: true, triturating_twin_gear: true, citrus_press_manual: false, steam_extraction_cook: true,
  };
  return m[t];
}

export function extractMethod(t: JuicerType): string {
  const m: Record<JuicerType, string> = {
    centrifugal_fast_spin: "high_speed_blade_basket",
    masticating_slow_press: "auger_crush_squeeze",
    triturating_twin_gear: "twin_gear_press_grind",
    citrus_press_manual: "lever_press_reamer",
    steam_extraction_cook: "steam_heat_drip_collect",
  };
  return m[t];
}

export function bestProduce(t: JuicerType): string {
  const m: Record<JuicerType, string> = {
    centrifugal_fast_spin: "hard_fruit_carrot_apple",
    masticating_slow_press: "leafy_green_wheatgrass",
    triturating_twin_gear: "all_produce_nut_milk",
    citrus_press_manual: "orange_lemon_grapefruit",
    steam_extraction_cook: "grape_berry_large_batch",
  };
  return m[t];
}

export function juicers(): JuicerType[] {
  return ["centrifugal_fast_spin", "masticating_slow_press", "triturating_twin_gear", "citrus_press_manual", "steam_extraction_cook"];
}
