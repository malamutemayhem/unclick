export type AcrylicBlockType = "small_square_grip" | "large_rect_base" | "round_circle_press" | "handle_grip_ergo" | "thin_flex_see";

export function seeThrough(t: AcrylicBlockType): number {
  const m: Record<AcrylicBlockType, number> = {
    small_square_grip: 9, large_rect_base: 8, round_circle_press: 9, handle_grip_ergo: 6, thin_flex_see: 10,
  };
  return m[t];
}

export function stampGrip(t: AcrylicBlockType): number {
  const m: Record<AcrylicBlockType, number> = {
    small_square_grip: 7, large_rect_base: 8, round_circle_press: 6, handle_grip_ergo: 10, thin_flex_see: 5,
  };
  return m[t];
}

export function pressEven(t: AcrylicBlockType): number {
  const m: Record<AcrylicBlockType, number> = {
    small_square_grip: 7, large_rect_base: 10, round_circle_press: 8, handle_grip_ergo: 9, thin_flex_see: 5,
  };
  return m[t];
}

export function portability(t: AcrylicBlockType): number {
  const m: Record<AcrylicBlockType, number> = {
    small_square_grip: 10, large_rect_base: 4, round_circle_press: 7, handle_grip_ergo: 5, thin_flex_see: 9,
  };
  return m[t];
}

export function blockCost(t: AcrylicBlockType): number {
  const m: Record<AcrylicBlockType, number> = {
    small_square_grip: 1, large_rect_base: 3, round_circle_press: 2, handle_grip_ergo: 3, thin_flex_see: 2,
  };
  return m[t];
}

export function gridLines(t: AcrylicBlockType): boolean {
  const m: Record<AcrylicBlockType, boolean> = {
    small_square_grip: true, large_rect_base: true, round_circle_press: false, handle_grip_ergo: true, thin_flex_see: true,
  };
  return m[t];
}

export function hasHandle(t: AcrylicBlockType): boolean {
  const m: Record<AcrylicBlockType, boolean> = {
    small_square_grip: false, large_rect_base: false, round_circle_press: false, handle_grip_ergo: true, thin_flex_see: false,
  };
  return m[t];
}

export function blockShape(t: AcrylicBlockType): string {
  const m: Record<AcrylicBlockType, string> = {
    small_square_grip: "square_clear_etched",
    large_rect_base: "rectangle_thick_clear",
    round_circle_press: "circle_clear_flat",
    handle_grip_ergo: "rect_handle_molded",
    thin_flex_see: "thin_flexible_sheet",
  };
  return m[t];
}

export function bestUse(t: AcrylicBlockType): string {
  const m: Record<AcrylicBlockType, string> = {
    small_square_grip: "small_sentiment_stamp",
    large_rect_base: "large_background_stamp",
    round_circle_press: "circle_motif_stamp",
    handle_grip_ergo: "comfort_repeat_stamp",
    thin_flex_see: "travel_light_stamp",
  };
  return m[t];
}

export function acrylicBlocks(): AcrylicBlockType[] {
  return ["small_square_grip", "large_rect_base", "round_circle_press", "handle_grip_ergo", "thin_flex_see"];
}
