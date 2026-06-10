export type TapeDispenserType = "desktop_weighted" | "handheld_gun" | "washi_multi_roll" | "packing_tape_gun" | "automatic_cut";

export function cutCleanness(t: TapeDispenserType): number {
  const m: Record<TapeDispenserType, number> = {
    desktop_weighted: 8, handheld_gun: 6, washi_multi_roll: 5, packing_tape_gun: 7, automatic_cut: 10,
  };
  return m[t];
}

export function oneHandUse(t: TapeDispenserType): number {
  const m: Record<TapeDispenserType, number> = {
    desktop_weighted: 9, handheld_gun: 7, washi_multi_roll: 4, packing_tape_gun: 8, automatic_cut: 10,
  };
  return m[t];
}

export function tapeWidth(t: TapeDispenserType): number {
  const m: Record<TapeDispenserType, number> = {
    desktop_weighted: 4, handheld_gun: 5, washi_multi_roll: 3, packing_tape_gun: 10, automatic_cut: 5,
  };
  return m[t];
}

export function portability(t: TapeDispenserType): number {
  const m: Record<TapeDispenserType, number> = {
    desktop_weighted: 3, handheld_gun: 8, washi_multi_roll: 6, packing_tape_gun: 5, automatic_cut: 4,
  };
  return m[t];
}

export function dispenserCost(t: TapeDispenserType): number {
  const m: Record<TapeDispenserType, number> = {
    desktop_weighted: 3, handheld_gun: 2, washi_multi_roll: 4, packing_tape_gun: 3, automatic_cut: 8,
  };
  return m[t];
}

export function nonSlipBase(t: TapeDispenserType): boolean {
  const m: Record<TapeDispenserType, boolean> = {
    desktop_weighted: true, handheld_gun: false, washi_multi_roll: true, packing_tape_gun: false, automatic_cut: true,
  };
  return m[t];
}

export function autoAdvance(t: TapeDispenserType): boolean {
  const m: Record<TapeDispenserType, boolean> = {
    desktop_weighted: false, handheld_gun: false, washi_multi_roll: false, packing_tape_gun: false, automatic_cut: true,
  };
  return m[t];
}

export function bladeType(t: TapeDispenserType): string {
  const m: Record<TapeDispenserType, string> = {
    desktop_weighted: "serrated_metal_edge",
    handheld_gun: "retractable_safety_blade",
    washi_multi_roll: "tear_edge_plastic",
    packing_tape_gun: "steel_roller_blade",
    automatic_cut: "sensor_motor_guillotine",
  };
  return m[t];
}

export function bestUse(t: TapeDispenserType): string {
  const m: Record<TapeDispenserType, string> = {
    desktop_weighted: "office_desk_gift_wrap",
    handheld_gun: "warehouse_quick_seal",
    washi_multi_roll: "craft_scrapbook_decor",
    packing_tape_gun: "shipping_box_close",
    automatic_cut: "production_line_speed",
  };
  return m[t];
}

export function tapeDispensers(): TapeDispenserType[] {
  return ["desktop_weighted", "handheld_gun", "washi_multi_roll", "packing_tape_gun", "automatic_cut"];
}
