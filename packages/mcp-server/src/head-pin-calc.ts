export type HeadPinType = "flat_head_standard" | "ball_head_decorative" | "paddle_head_wide" | "nail_head_thin" | "ornate_head_fancy";

export function holdStrength(t: HeadPinType): number {
  const m: Record<HeadPinType, number> = {
    flat_head_standard: 8, ball_head_decorative: 7, paddle_head_wide: 10, nail_head_thin: 6, ornate_head_fancy: 7,
  };
  return m[t];
}

export function decorativeValue(t: HeadPinType): number {
  const m: Record<HeadPinType, number> = {
    flat_head_standard: 4, ball_head_decorative: 8, paddle_head_wide: 6, nail_head_thin: 3, ornate_head_fancy: 10,
  };
  return m[t];
}

export function versatility(t: HeadPinType): number {
  const m: Record<HeadPinType, number> = {
    flat_head_standard: 10, ball_head_decorative: 7, paddle_head_wide: 6, nail_head_thin: 8, ornate_head_fancy: 5,
  };
  return m[t];
}

export function beadRange(t: HeadPinType): number {
  const m: Record<HeadPinType, number> = {
    flat_head_standard: 9, ball_head_decorative: 7, paddle_head_wide: 10, nail_head_thin: 6, ornate_head_fancy: 5,
  };
  return m[t];
}

export function pinCost(t: HeadPinType): number {
  const m: Record<HeadPinType, number> = {
    flat_head_standard: 1, ball_head_decorative: 2, paddle_head_wide: 3, nail_head_thin: 1, ornate_head_fancy: 4,
  };
  return m[t];
}

export function forHeavyBead(t: HeadPinType): boolean {
  const m: Record<HeadPinType, boolean> = {
    flat_head_standard: true, ball_head_decorative: false, paddle_head_wide: true, nail_head_thin: false, ornate_head_fancy: false,
  };
  return m[t];
}

export function decorativeHead(t: HeadPinType): boolean {
  const m: Record<HeadPinType, boolean> = {
    flat_head_standard: false, ball_head_decorative: true, paddle_head_wide: false, nail_head_thin: false, ornate_head_fancy: true,
  };
  return m[t];
}

export function pinMetal(t: HeadPinType): string {
  const m: Record<HeadPinType, string> = {
    flat_head_standard: "brass_nickel_plated",
    ball_head_decorative: "sterling_silver_ball",
    paddle_head_wide: "gold_filled_paddle",
    nail_head_thin: "stainless_steel_thin",
    ornate_head_fancy: "vermeil_filigree_top",
  };
  return m[t];
}

export function bestUse(t: HeadPinType): string {
  const m: Record<HeadPinType, string> = {
    flat_head_standard: "general_bead_dangle",
    ball_head_decorative: "earring_drop_accent",
    paddle_head_wide: "large_hole_bead_stop",
    nail_head_thin: "seed_bead_stack",
    ornate_head_fancy: "focal_bead_feature",
  };
  return m[t];
}

export function headPins(): HeadPinType[] {
  return ["flat_head_standard", "ball_head_decorative", "paddle_head_wide", "nail_head_thin", "ornate_head_fancy"];
}
