export type ExtruderDieType = "round_tube_hollow" | "square_coil_solid" | "ribbon_flat_strip" | "handle_pull_shape" | "custom_cut_brass";

export function shapeConsist(t: ExtruderDieType): number {
  const m: Record<ExtruderDieType, number> = {
    round_tube_hollow: 9, square_coil_solid: 8, ribbon_flat_strip: 10, handle_pull_shape: 6, custom_cut_brass: 7,
  };
  return m[t];
}

export function wallThickness(t: ExtruderDieType): number {
  const m: Record<ExtruderDieType, number> = {
    round_tube_hollow: 8, square_coil_solid: 10, ribbon_flat_strip: 5, handle_pull_shape: 7, custom_cut_brass: 6,
  };
  return m[t];
}

export function profileVariety(t: ExtruderDieType): number {
  const m: Record<ExtruderDieType, number> = {
    round_tube_hollow: 6, square_coil_solid: 5, ribbon_flat_strip: 4, handle_pull_shape: 8, custom_cut_brass: 10,
  };
  return m[t];
}

export function durability(t: ExtruderDieType): number {
  const m: Record<ExtruderDieType, number> = {
    round_tube_hollow: 8, square_coil_solid: 8, ribbon_flat_strip: 9, handle_pull_shape: 7, custom_cut_brass: 10,
  };
  return m[t];
}

export function dieCost(t: ExtruderDieType): number {
  const m: Record<ExtruderDieType, number> = {
    round_tube_hollow: 1, square_coil_solid: 1, ribbon_flat_strip: 1, handle_pull_shape: 2, custom_cut_brass: 3,
  };
  return m[t];
}

export function hollowCore(t: ExtruderDieType): boolean {
  const m: Record<ExtruderDieType, boolean> = {
    round_tube_hollow: true, square_coil_solid: false, ribbon_flat_strip: false, handle_pull_shape: true, custom_cut_brass: false,
  };
  return m[t];
}

export function customDesign(t: ExtruderDieType): boolean {
  const m: Record<ExtruderDieType, boolean> = {
    round_tube_hollow: false, square_coil_solid: false, ribbon_flat_strip: false, handle_pull_shape: false, custom_cut_brass: true,
  };
  return m[t];
}

export function dieMaterial(t: ExtruderDieType): string {
  const m: Record<ExtruderDieType, string> = {
    round_tube_hollow: "aluminum_machined_disc",
    square_coil_solid: "aluminum_square_cut",
    ribbon_flat_strip: "stainless_slot_plate",
    handle_pull_shape: "aluminum_profile_cut",
    custom_cut_brass: "brass_waterjet_cut",
  };
  return m[t];
}

export function bestUse(t: ExtruderDieType): string {
  const m: Record<ExtruderDieType, string> = {
    round_tube_hollow: "pipe_tube_coil",
    square_coil_solid: "structural_coil_build",
    ribbon_flat_strip: "decorative_ribbon_trim",
    handle_pull_shape: "mug_handle_pull",
    custom_cut_brass: "unique_profile_design",
  };
  return m[t];
}

export function extruderDies(): ExtruderDieType[] {
  return ["round_tube_hollow", "square_coil_solid", "ribbon_flat_strip", "handle_pull_shape", "custom_cut_brass"];
}
