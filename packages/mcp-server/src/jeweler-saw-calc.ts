export type JewelerSawType = "adjustable_frame_standard" | "deep_throat_piercing" | "fixed_frame_student" | "coping_saw_heavy" | "wire_saw_flexible";

export function cutPrecision(t: JewelerSawType): number {
  const m: Record<JewelerSawType, number> = {
    adjustable_frame_standard: 9, deep_throat_piercing: 10, fixed_frame_student: 7, coping_saw_heavy: 5, wire_saw_flexible: 6,
  };
  return m[t];
}

export function bladeVariety(t: JewelerSawType): number {
  const m: Record<JewelerSawType, number> = {
    adjustable_frame_standard: 10, deep_throat_piercing: 9, fixed_frame_student: 6, coping_saw_heavy: 4, wire_saw_flexible: 7,
  };
  return m[t];
}

export function piercingAccess(t: JewelerSawType): number {
  const m: Record<JewelerSawType, number> = {
    adjustable_frame_standard: 7, deep_throat_piercing: 10, fixed_frame_student: 5, coping_saw_heavy: 6, wire_saw_flexible: 8,
  };
  return m[t];
}

export function easeOfUse(t: JewelerSawType): number {
  const m: Record<JewelerSawType, number> = {
    adjustable_frame_standard: 8, deep_throat_piercing: 7, fixed_frame_student: 10, coping_saw_heavy: 8, wire_saw_flexible: 6,
  };
  return m[t];
}

export function sawCost(t: JewelerSawType): number {
  const m: Record<JewelerSawType, number> = {
    adjustable_frame_standard: 2, deep_throat_piercing: 3, fixed_frame_student: 1, coping_saw_heavy: 1, wire_saw_flexible: 2,
  };
  return m[t];
}

export function adjustableFrame(t: JewelerSawType): boolean {
  const m: Record<JewelerSawType, boolean> = {
    adjustable_frame_standard: true, deep_throat_piercing: true, fixed_frame_student: false, coping_saw_heavy: false, wire_saw_flexible: false,
  };
  return m[t];
}

export function forInterior(t: JewelerSawType): boolean {
  const m: Record<JewelerSawType, boolean> = {
    adjustable_frame_standard: true, deep_throat_piercing: true, fixed_frame_student: false, coping_saw_heavy: false, wire_saw_flexible: true,
  };
  return m[t];
}

export function frameStyle(t: JewelerSawType): string {
  const m: Record<JewelerSawType, string> = {
    adjustable_frame_standard: "c_frame_adjustable",
    deep_throat_piercing: "deep_c_frame_wide",
    fixed_frame_student: "fixed_c_frame_light",
    coping_saw_heavy: "d_handle_heavy",
    wire_saw_flexible: "spiral_wire_blade",
  };
  return m[t];
}

export function bestCut(t: JewelerSawType): string {
  const m: Record<JewelerSawType, string> = {
    adjustable_frame_standard: "general_metal_sheet",
    deep_throat_piercing: "interior_piercing_work",
    fixed_frame_student: "beginner_practice_cut",
    coping_saw_heavy: "thick_stock_rough",
    wire_saw_flexible: "wax_model_carve",
  };
  return m[t];
}

export function jewelerSaws(): JewelerSawType[] {
  return ["adjustable_frame_standard", "deep_throat_piercing", "fixed_frame_student", "coping_saw_heavy", "wire_saw_flexible"];
}
