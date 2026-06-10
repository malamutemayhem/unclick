export type WireNibType = "tight_loop_fine" | "open_loop_medium" | "flat_blade_shader" | "ball_end_texture" | "custom_bent_special";

export function burnPrecision(t: WireNibType): number {
  const m: Record<WireNibType, number> = {
    tight_loop_fine: 10, open_loop_medium: 7, flat_blade_shader: 5, ball_end_texture: 6, custom_bent_special: 8,
  };
  return m[t];
}

export function heatResponse(t: WireNibType): number {
  const m: Record<WireNibType, number> = {
    tight_loop_fine: 10, open_loop_medium: 9, flat_blade_shader: 7, ball_end_texture: 8, custom_bent_special: 9,
  };
  return m[t];
}

export function coverage(t: WireNibType): number {
  const m: Record<WireNibType, number> = {
    tight_loop_fine: 3, open_loop_medium: 6, flat_blade_shader: 10, ball_end_texture: 7, custom_bent_special: 5,
  };
  return m[t];
}

export function durability(t: WireNibType): number {
  const m: Record<WireNibType, number> = {
    tight_loop_fine: 5, open_loop_medium: 7, flat_blade_shader: 8, ball_end_texture: 9, custom_bent_special: 6,
  };
  return m[t];
}

export function nibCost(t: WireNibType): number {
  const m: Record<WireNibType, number> = {
    tight_loop_fine: 2, open_loop_medium: 2, flat_blade_shader: 3, ball_end_texture: 2, custom_bent_special: 4,
  };
  return m[t];
}

export function replaceable(t: WireNibType): boolean {
  const m: Record<WireNibType, boolean> = {
    tight_loop_fine: true, open_loop_medium: true, flat_blade_shader: true, ball_end_texture: true, custom_bent_special: true,
  };
  return m[t];
}

export function handBent(t: WireNibType): boolean {
  const m: Record<WireNibType, boolean> = {
    tight_loop_fine: false, open_loop_medium: false, flat_blade_shader: false, ball_end_texture: false, custom_bent_special: true,
  };
  return m[t];
}

export function wireGauge(t: WireNibType): string {
  const m: Record<WireNibType, string> = {
    tight_loop_fine: "nichrome_20_gauge",
    open_loop_medium: "nichrome_18_gauge",
    flat_blade_shader: "nichrome_flat_ribbon",
    ball_end_texture: "nichrome_ball_formed",
    custom_bent_special: "nichrome_custom_form",
  };
  return m[t];
}

export function bestUse(t: WireNibType): string {
  const m: Record<WireNibType, string> = {
    tight_loop_fine: "fine_detail_writing",
    open_loop_medium: "general_burn_work",
    flat_blade_shader: "broad_shade_fill",
    ball_end_texture: "dot_stipple_texture",
    custom_bent_special: "specialty_effect",
  };
  return m[t];
}

export function wireNibs(): WireNibType[] {
  return ["tight_loop_fine", "open_loop_medium", "flat_blade_shader", "ball_end_texture", "custom_bent_special"];
}
