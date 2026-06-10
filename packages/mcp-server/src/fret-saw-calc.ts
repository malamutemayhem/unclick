export type FretSawType = "deep_throat_frame" | "adjustable_angle_tilt" | "coping_saw_round" | "spiral_blade_omni" | "jeweler_frame_fine";

export function cutDetail(t: FretSawType): number {
  const m: Record<FretSawType, number> = {
    deep_throat_frame: 8, adjustable_angle_tilt: 7, coping_saw_round: 5, spiral_blade_omni: 9, jeweler_frame_fine: 10,
  };
  return m[t];
}

export function cutDepth(t: FretSawType): number {
  const m: Record<FretSawType, number> = {
    deep_throat_frame: 10, adjustable_angle_tilt: 7, coping_saw_round: 6, spiral_blade_omni: 5, jeweler_frame_fine: 3,
  };
  return m[t];
}

export function turnAbility(t: FretSawType): number {
  const m: Record<FretSawType, number> = {
    deep_throat_frame: 6, adjustable_angle_tilt: 8, coping_saw_round: 9, spiral_blade_omni: 10, jeweler_frame_fine: 7,
  };
  return m[t];
}

export function bladeVariety(t: FretSawType): number {
  const m: Record<FretSawType, number> = {
    deep_throat_frame: 9, adjustable_angle_tilt: 8, coping_saw_round: 5, spiral_blade_omni: 4, jeweler_frame_fine: 10,
  };
  return m[t];
}

export function sawCost(t: FretSawType): number {
  const m: Record<FretSawType, number> = {
    deep_throat_frame: 2, adjustable_angle_tilt: 2, coping_saw_round: 1, spiral_blade_omni: 2, jeweler_frame_fine: 2,
  };
  return m[t];
}

export function adjustable(t: FretSawType): boolean {
  const m: Record<FretSawType, boolean> = {
    deep_throat_frame: false, adjustable_angle_tilt: true, coping_saw_round: false, spiral_blade_omni: false, jeweler_frame_fine: false,
  };
  return m[t];
}

export function spiralBlade(t: FretSawType): boolean {
  const m: Record<FretSawType, boolean> = {
    deep_throat_frame: false, adjustable_angle_tilt: false, coping_saw_round: false, spiral_blade_omni: true, jeweler_frame_fine: false,
  };
  return m[t];
}

export function frameStyle(t: FretSawType): string {
  const m: Record<FretSawType, string> = {
    deep_throat_frame: "deep_c_frame_steel",
    adjustable_angle_tilt: "tilt_clamp_frame",
    coping_saw_round: "round_tube_frame",
    spiral_blade_omni: "standard_pin_frame",
    jeweler_frame_fine: "fine_adjustable_frame",
  };
  return m[t];
}

export function bestUse(t: FretSawType): string {
  const m: Record<FretSawType, string> = {
    deep_throat_frame: "large_fretwork_panel",
    adjustable_angle_tilt: "angled_inlay_cut",
    coping_saw_round: "rough_curve_cut",
    spiral_blade_omni: "omni_direction_scroll",
    jeweler_frame_fine: "fine_metal_pierce",
  };
  return m[t];
}

export function fretSaws(): FretSawType[] {
  return ["deep_throat_frame", "adjustable_angle_tilt", "coping_saw_round", "spiral_blade_omni", "jeweler_frame_fine"];
}
