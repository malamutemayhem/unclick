export type CapoType = "spring_trigger" | "screw_adjust" | "toggle_clamp" | "partial_drop" | "shubb_roller";

export function tuningStability(t: CapoType): number {
  const m: Record<CapoType, number> = {
    spring_trigger: 6, screw_adjust: 10, toggle_clamp: 8, partial_drop: 7, shubb_roller: 9,
  };
  return m[t];
}

export function speedOfUse(t: CapoType): number {
  const m: Record<CapoType, number> = {
    spring_trigger: 10, screw_adjust: 4, toggle_clamp: 7, partial_drop: 5, shubb_roller: 8,
  };
  return m[t];
}

export function pressureControl(t: CapoType): number {
  const m: Record<CapoType, number> = {
    spring_trigger: 4, screw_adjust: 10, toggle_clamp: 6, partial_drop: 8, shubb_roller: 9,
  };
  return m[t];
}

export function fretBuzz(t: CapoType): number {
  const m: Record<CapoType, number> = {
    spring_trigger: 5, screw_adjust: 9, toggle_clamp: 7, partial_drop: 8, shubb_roller: 9,
  };
  return m[t];
}

export function capoCost(t: CapoType): number {
  const m: Record<CapoType, number> = {
    spring_trigger: 2, screw_adjust: 5, toggle_clamp: 3, partial_drop: 8, shubb_roller: 6,
  };
  return m[t];
}

export function oneHandOperate(t: CapoType): boolean {
  const m: Record<CapoType, boolean> = {
    spring_trigger: true, screw_adjust: false, toggle_clamp: true, partial_drop: false, shubb_roller: true,
  };
  return m[t];
}

export function partialCapo(t: CapoType): boolean {
  const m: Record<CapoType, boolean> = {
    spring_trigger: false, screw_adjust: false, toggle_clamp: false, partial_drop: true, shubb_roller: false,
  };
  return m[t];
}

export function clampStyle(t: CapoType): string {
  const m: Record<CapoType, string> = {
    spring_trigger: "spring_loaded_squeeze", screw_adjust: "threaded_knob_turn",
    toggle_clamp: "lever_lock_snap", partial_drop: "selective_string_block",
    shubb_roller: "lever_roller_slide",
  };
  return m[t];
}

export function bestGuitar(t: CapoType): string {
  const m: Record<CapoType, string> = {
    spring_trigger: "live_performance_quick_change", screw_adjust: "studio_recording_precise",
    toggle_clamp: "acoustic_general_purpose", partial_drop: "open_tuning_creative",
    shubb_roller: "classical_nylon_string",
  };
  return m[t];
}

export function capos(): CapoType[] {
  return ["spring_trigger", "screw_adjust", "toggle_clamp", "partial_drop", "shubb_roller"];
}
