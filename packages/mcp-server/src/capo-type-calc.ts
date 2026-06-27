export type CapoType = "spring_clamp" | "screw_adjust" | "toggle_latch" | "partial_cut" | "spider_individual";

export function clampPressure(c: CapoType): number {
  const m: Record<CapoType, number> = {
    spring_clamp: 7, screw_adjust: 10, toggle_latch: 8, partial_cut: 6, spider_individual: 9,
  };
  return m[c];
}

export function tuningStability(c: CapoType): number {
  const m: Record<CapoType, number> = {
    spring_clamp: 6, screw_adjust: 10, toggle_latch: 7, partial_cut: 8, spider_individual: 9,
  };
  return m[c];
}

export function speedOfUse(c: CapoType): number {
  const m: Record<CapoType, number> = {
    spring_clamp: 10, screw_adjust: 4, toggle_latch: 8, partial_cut: 3, spider_individual: 2,
  };
  return m[c];
}

export function fretboardContact(c: CapoType): number {
  const m: Record<CapoType, number> = {
    spring_clamp: 6, screw_adjust: 9, toggle_latch: 7, partial_cut: 5, spider_individual: 10,
  };
  return m[c];
}

export function capoCost(c: CapoType): number {
  const m: Record<CapoType, number> = {
    spring_clamp: 2, screw_adjust: 4, toggle_latch: 3, partial_cut: 6, spider_individual: 8,
  };
  return m[c];
}

export function oneHandOperable(c: CapoType): boolean {
  const m: Record<CapoType, boolean> = {
    spring_clamp: true, screw_adjust: false, toggle_latch: true, partial_cut: false, spider_individual: false,
  };
  return m[c];
}

export function partialFretCapable(c: CapoType): boolean {
  const m: Record<CapoType, boolean> = {
    spring_clamp: false, screw_adjust: false, toggle_latch: false, partial_cut: true, spider_individual: true,
  };
  return m[c];
}

export function clampMechanism(c: CapoType): string {
  const m: Record<CapoType, string> = {
    spring_clamp: "spring_loaded_jaw_squeeze", screw_adjust: "threaded_knob_micro_adjust",
    toggle_latch: "lever_lock_flip_clamp", partial_cut: "short_bar_select_strings",
    spider_individual: "per_string_pin_pressure",
  };
  return m[c];
}

export function bestInstrument(c: CapoType): string {
  const m: Record<CapoType, string> = {
    spring_clamp: "acoustic_guitar_quick_change", screw_adjust: "classical_nylon_precise",
    toggle_latch: "electric_guitar_stage_use", partial_cut: "open_tuning_partial_barre",
    spider_individual: "fingerstyle_alternate_tuning",
  };
  return m[c];
}

export function capoTypes(): CapoType[] {
  return ["spring_clamp", "screw_adjust", "toggle_latch", "partial_cut", "spider_individual"];
}
