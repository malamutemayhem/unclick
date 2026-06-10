export type WalkFootType = "even_feed_standard" | "open_toe_visible" | "adjustable_guide_bar" | "narrow_quarter_inch" | "free_motion_drop";

export function feedEven(t: WalkFootType): number {
  const m: Record<WalkFootType, number> = {
    even_feed_standard: 10, open_toe_visible: 8, adjustable_guide_bar: 9, narrow_quarter_inch: 7, free_motion_drop: 3,
  };
  return m[t];
}

export function visibility(t: WalkFootType): number {
  const m: Record<WalkFootType, number> = {
    even_feed_standard: 6, open_toe_visible: 10, adjustable_guide_bar: 7, narrow_quarter_inch: 8, free_motion_drop: 9,
  };
  return m[t];
}

export function precision(t: WalkFootType): number {
  const m: Record<WalkFootType, number> = {
    even_feed_standard: 7, open_toe_visible: 8, adjustable_guide_bar: 9, narrow_quarter_inch: 10, free_motion_drop: 6,
  };
  return m[t];
}

export function versatility(t: WalkFootType): number {
  const m: Record<WalkFootType, number> = {
    even_feed_standard: 9, open_toe_visible: 7, adjustable_guide_bar: 10, narrow_quarter_inch: 5, free_motion_drop: 8,
  };
  return m[t];
}

export function footCost(t: WalkFootType): number {
  const m: Record<WalkFootType, number> = {
    even_feed_standard: 3, open_toe_visible: 3, adjustable_guide_bar: 4, narrow_quarter_inch: 2, free_motion_drop: 3,
  };
  return m[t];
}

export function forQuilting(t: WalkFootType): boolean {
  const m: Record<WalkFootType, boolean> = {
    even_feed_standard: true, open_toe_visible: true, adjustable_guide_bar: true, narrow_quarter_inch: true, free_motion_drop: true,
  };
  return m[t];
}

export function freeMotion(t: WalkFootType): boolean {
  const m: Record<WalkFootType, boolean> = {
    even_feed_standard: false, open_toe_visible: false, adjustable_guide_bar: false, narrow_quarter_inch: false, free_motion_drop: true,
  };
  return m[t];
}

export function footMaterial(t: WalkFootType): string {
  const m: Record<WalkFootType, string> = {
    even_feed_standard: "steel_chrome_plated",
    open_toe_visible: "clear_plastic_steel",
    adjustable_guide_bar: "steel_with_bar_guide",
    narrow_quarter_inch: "steel_narrow_slot",
    free_motion_drop: "spring_loaded_steel",
  };
  return m[t];
}

export function bestUse(t: WalkFootType): string {
  const m: Record<WalkFootType, string> = {
    even_feed_standard: "straight_line_quilt",
    open_toe_visible: "decorative_stitch_view",
    adjustable_guide_bar: "parallel_line_spacing",
    narrow_quarter_inch: "precise_seam_piecing",
    free_motion_drop: "stipple_meander_art",
  };
  return m[t];
}

export function walkFeet(): WalkFootType[] {
  return ["even_feed_standard", "open_toe_visible", "adjustable_guide_bar", "narrow_quarter_inch", "free_motion_drop"];
}
