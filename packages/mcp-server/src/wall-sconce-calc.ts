export type WallSconceType = "uplighter_half_shade" | "swing_arm_reading" | "flush_mount_modern" | "candle_holder_vintage" | "picture_light_gallery";

export function ambientLight(t: WallSconceType): number {
  const m: Record<WallSconceType, number> = {
    uplighter_half_shade: 10, swing_arm_reading: 6, flush_mount_modern: 8, candle_holder_vintage: 5, picture_light_gallery: 4,
  };
  return m[t];
}

export function taskLight(t: WallSconceType): number {
  const m: Record<WallSconceType, number> = {
    uplighter_half_shade: 3, swing_arm_reading: 10, flush_mount_modern: 5, candle_holder_vintage: 2, picture_light_gallery: 9,
  };
  return m[t];
}

export function wallProjection(t: WallSconceType): number {
  const m: Record<WallSconceType, number> = {
    uplighter_half_shade: 7, swing_arm_reading: 3, flush_mount_modern: 10, candle_holder_vintage: 5, picture_light_gallery: 9,
  };
  return m[t];
}

export function styleVersatility(t: WallSconceType): number {
  const m: Record<WallSconceType, number> = {
    uplighter_half_shade: 7, swing_arm_reading: 6, flush_mount_modern: 9, candle_holder_vintage: 8, picture_light_gallery: 5,
  };
  return m[t];
}

export function sconceCost(t: WallSconceType): number {
  const m: Record<WallSconceType, number> = {
    uplighter_half_shade: 3, swing_arm_reading: 4, flush_mount_modern: 5, candle_holder_vintage: 4, picture_light_gallery: 6,
  };
  return m[t];
}

export function adjustable(t: WallSconceType): boolean {
  const m: Record<WallSconceType, boolean> = {
    uplighter_half_shade: false, swing_arm_reading: true, flush_mount_modern: false, candle_holder_vintage: false, picture_light_gallery: true,
  };
  return m[t];
}

export function hardwired(t: WallSconceType): boolean {
  const m: Record<WallSconceType, boolean> = {
    uplighter_half_shade: true, swing_arm_reading: false, flush_mount_modern: true, candle_holder_vintage: true, picture_light_gallery: false,
  };
  return m[t];
}

export function finishType(t: WallSconceType): string {
  const m: Record<WallSconceType, string> = {
    uplighter_half_shade: "brushed_nickel_glass",
    swing_arm_reading: "brass_articulated_arm",
    flush_mount_modern: "matte_black_flush",
    candle_holder_vintage: "wrought_iron_socket",
    picture_light_gallery: "antique_brass_bar",
  };
  return m[t];
}

export function bestSpace(t: WallSconceType): string {
  const m: Record<WallSconceType, string> = {
    uplighter_half_shade: "hallway_staircase_ambient",
    swing_arm_reading: "bedside_reading_nook",
    flush_mount_modern: "bathroom_vanity_narrow",
    candle_holder_vintage: "dining_room_period_home",
    picture_light_gallery: "art_gallery_display_wall",
  };
  return m[t];
}

export function wallSconces(): WallSconceType[] {
  return ["uplighter_half_shade", "swing_arm_reading", "flush_mount_modern", "candle_holder_vintage", "picture_light_gallery"];
}
