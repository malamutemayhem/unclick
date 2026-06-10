export type RowCounterType = "barrel_click_thumb" | "digital_lcd_press" | "peg_board_manual" | "app_phone_tap" | "kacha_kacha_ring";

export function countAccuracy(t: RowCounterType): number {
  const m: Record<RowCounterType, number> = {
    barrel_click_thumb: 7, digital_lcd_press: 10, peg_board_manual: 8, app_phone_tap: 9, kacha_kacha_ring: 6,
  };
  return m[t];
}

export function easeOfUse(t: RowCounterType): number {
  const m: Record<RowCounterType, number> = {
    barrel_click_thumb: 9, digital_lcd_press: 8, peg_board_manual: 5, app_phone_tap: 7, kacha_kacha_ring: 10,
  };
  return m[t];
}

export function multiCount(t: RowCounterType): number {
  const m: Record<RowCounterType, number> = {
    barrel_click_thumb: 3, digital_lcd_press: 7, peg_board_manual: 9, app_phone_tap: 10, kacha_kacha_ring: 3,
  };
  return m[t];
}

export function durability(t: RowCounterType): number {
  const m: Record<RowCounterType, number> = {
    barrel_click_thumb: 8, digital_lcd_press: 6, peg_board_manual: 10, app_phone_tap: 5, kacha_kacha_ring: 7,
  };
  return m[t];
}

export function counterCost(t: RowCounterType): number {
  const m: Record<RowCounterType, number> = {
    barrel_click_thumb: 1, digital_lcd_press: 2, peg_board_manual: 2, app_phone_tap: 1, kacha_kacha_ring: 2,
  };
  return m[t];
}

export function handsFree(t: RowCounterType): boolean {
  const m: Record<RowCounterType, boolean> = {
    barrel_click_thumb: false, digital_lcd_press: false, peg_board_manual: false, app_phone_tap: false, kacha_kacha_ring: true,
  };
  return m[t];
}

export function needsBattery(t: RowCounterType): boolean {
  const m: Record<RowCounterType, boolean> = {
    barrel_click_thumb: false, digital_lcd_press: true, peg_board_manual: false, app_phone_tap: true, kacha_kacha_ring: false,
  };
  return m[t];
}

export function counterType(t: RowCounterType): string {
  const m: Record<RowCounterType, string> = {
    barrel_click_thumb: "mechanical_thumb_wheel",
    digital_lcd_press: "electronic_button_lcd",
    peg_board_manual: "wooden_peg_row_board",
    app_phone_tap: "smartphone_app_screen",
    kacha_kacha_ring: "finger_ring_click",
  };
  return m[t];
}

export function bestProject(t: RowCounterType): string {
  const m: Record<RowCounterType, string> = {
    barrel_click_thumb: "simple_row_track",
    digital_lcd_press: "complex_pattern_count",
    peg_board_manual: "multi_section_track",
    app_phone_tap: "pattern_integrate_note",
    kacha_kacha_ring: "continuous_knit_click",
  };
  return m[t];
}

export function rowCounters(): RowCounterType[] {
  return ["barrel_click_thumb", "digital_lcd_press", "peg_board_manual", "app_phone_tap", "kacha_kacha_ring"];
}
