export type QuillingToolType = "slotted_needle_basic" | "needle_fine_tight" | "crimper_wave_texture" | "fringe_cutter_strip" | "circle_sizer_board";

export function coilControl(t: QuillingToolType): number {
  const m: Record<QuillingToolType, number> = {
    slotted_needle_basic: 7, needle_fine_tight: 10, crimper_wave_texture: 4, fringe_cutter_strip: 3, circle_sizer_board: 8,
  };
  return m[t];
}

export function easeOfUse(t: QuillingToolType): number {
  const m: Record<QuillingToolType, number> = {
    slotted_needle_basic: 10, needle_fine_tight: 6, crimper_wave_texture: 8, fringe_cutter_strip: 7, circle_sizer_board: 9,
  };
  return m[t];
}

export function shapeVariety(t: QuillingToolType): number {
  const m: Record<QuillingToolType, number> = {
    slotted_needle_basic: 8, needle_fine_tight: 9, crimper_wave_texture: 4, fringe_cutter_strip: 3, circle_sizer_board: 10,
  };
  return m[t];
}

export function speedOutput(t: QuillingToolType): number {
  const m: Record<QuillingToolType, number> = {
    slotted_needle_basic: 9, needle_fine_tight: 5, crimper_wave_texture: 8, fringe_cutter_strip: 10, circle_sizer_board: 6,
  };
  return m[t];
}

export function toolCost(t: QuillingToolType): number {
  const m: Record<QuillingToolType, number> = {
    slotted_needle_basic: 1, needle_fine_tight: 1, crimper_wave_texture: 2, fringe_cutter_strip: 2, circle_sizer_board: 1,
  };
  return m[t];
}

export function forBeginners(t: QuillingToolType): boolean {
  const m: Record<QuillingToolType, boolean> = {
    slotted_needle_basic: true, needle_fine_tight: false, crimper_wave_texture: true, fringe_cutter_strip: true, circle_sizer_board: true,
  };
  return m[t];
}

export function makesTexture(t: QuillingToolType): boolean {
  const m: Record<QuillingToolType, boolean> = {
    slotted_needle_basic: false, needle_fine_tight: false, crimper_wave_texture: true, fringe_cutter_strip: true, circle_sizer_board: false,
  };
  return m[t];
}

export function toolAction(t: QuillingToolType): string {
  const m: Record<QuillingToolType, string> = {
    slotted_needle_basic: "slot_insert_wind",
    needle_fine_tight: "pin_tip_tight_coil",
    crimper_wave_texture: "gear_crimp_wave",
    fringe_cutter_strip: "blade_cut_fringe",
    circle_sizer_board: "template_pin_shape",
  };
  return m[t];
}

export function bestShape(t: QuillingToolType): string {
  const m: Record<QuillingToolType, string> = {
    slotted_needle_basic: "teardrop_marquise_general",
    needle_fine_tight: "tight_coil_center_detail",
    crimper_wave_texture: "wavy_grass_texture",
    fringe_cutter_strip: "flower_petal_fringe",
    circle_sizer_board: "uniform_circle_set",
  };
  return m[t];
}

export function quillingTools(): QuillingToolType[] {
  return ["slotted_needle_basic", "needle_fine_tight", "crimper_wave_texture", "fringe_cutter_strip", "circle_sizer_board"];
}
