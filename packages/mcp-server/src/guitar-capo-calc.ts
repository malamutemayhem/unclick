export type GuitarCapoType = "spring_clamp_trigger" | "screw_adjust_precise" | "toggle_latch_flip" | "partial_drop_tune" | "sliding_rail_glide";

export function tuningStability(t: GuitarCapoType): number {
  const m: Record<GuitarCapoType, number> = {
    spring_clamp_trigger: 7, screw_adjust_precise: 10, toggle_latch_flip: 8, partial_drop_tune: 6, sliding_rail_glide: 7,
  };
  return m[t];
}

export function speedOfUse(t: GuitarCapoType): number {
  const m: Record<GuitarCapoType, number> = {
    spring_clamp_trigger: 10, screw_adjust_precise: 4, toggle_latch_flip: 8, partial_drop_tune: 5, sliding_rail_glide: 9,
  };
  return m[t];
}

export function pressureControl(t: GuitarCapoType): number {
  const m: Record<GuitarCapoType, number> = {
    spring_clamp_trigger: 5, screw_adjust_precise: 10, toggle_latch_flip: 7, partial_drop_tune: 8, sliding_rail_glide: 6,
  };
  return m[t];
}

export function versatility(t: GuitarCapoType): number {
  const m: Record<GuitarCapoType, number> = {
    spring_clamp_trigger: 7, screw_adjust_precise: 8, toggle_latch_flip: 6, partial_drop_tune: 10, sliding_rail_glide: 7,
  };
  return m[t];
}

export function capoCost(t: GuitarCapoType): number {
  const m: Record<GuitarCapoType, number> = {
    spring_clamp_trigger: 2, screw_adjust_precise: 3, toggle_latch_flip: 2, partial_drop_tune: 4, sliding_rail_glide: 4,
  };
  return m[t];
}

export function oneHanded(t: GuitarCapoType): boolean {
  const m: Record<GuitarCapoType, boolean> = {
    spring_clamp_trigger: true, screw_adjust_precise: false, toggle_latch_flip: true, partial_drop_tune: false, sliding_rail_glide: true,
  };
  return m[t];
}

export function partialCapo(t: GuitarCapoType): boolean {
  const m: Record<GuitarCapoType, boolean> = {
    spring_clamp_trigger: false, screw_adjust_precise: false, toggle_latch_flip: false, partial_drop_tune: true, sliding_rail_glide: false,
  };
  return m[t];
}

export function clampMechanism(t: GuitarCapoType): string {
  const m: Record<GuitarCapoType, string> = {
    spring_clamp_trigger: "spring_loaded_jaw",
    screw_adjust_precise: "threaded_knob_bar",
    toggle_latch_flip: "cam_lever_lock",
    partial_drop_tune: "selective_string_pad",
    sliding_rail_glide: "rail_track_slide",
  };
  return m[t];
}

export function bestGuitar(t: GuitarCapoType): string {
  const m: Record<GuitarCapoType, string> = {
    spring_clamp_trigger: "acoustic_steel_string",
    screw_adjust_precise: "classical_nylon_wide",
    toggle_latch_flip: "electric_thin_neck",
    partial_drop_tune: "open_tuning_creative",
    sliding_rail_glide: "live_performance_quick",
  };
  return m[t];
}

export function guitarCapos(): GuitarCapoType[] {
  return ["spring_clamp_trigger", "screw_adjust_precise", "toggle_latch_flip", "partial_drop_tune", "sliding_rail_glide"];
}
