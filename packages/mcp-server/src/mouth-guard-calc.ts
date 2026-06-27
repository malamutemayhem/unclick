export type MouthGuardType = "boil_bite_basic" | "custom_mold_dentist" | "instant_fit_stock" | "double_braces_ortho" | "night_guard_grind";

export function protection(t: MouthGuardType): number {
  const m: Record<MouthGuardType, number> = {
    boil_bite_basic: 7, custom_mold_dentist: 10, instant_fit_stock: 4, double_braces_ortho: 8, night_guard_grind: 6,
  };
  return m[t];
}

export function fit(t: MouthGuardType): number {
  const m: Record<MouthGuardType, number> = {
    boil_bite_basic: 7, custom_mold_dentist: 10, instant_fit_stock: 3, double_braces_ortho: 8, night_guard_grind: 9,
  };
  return m[t];
}

export function breathability(t: MouthGuardType): number {
  const m: Record<MouthGuardType, number> = {
    boil_bite_basic: 6, custom_mold_dentist: 10, instant_fit_stock: 4, double_braces_ortho: 5, night_guard_grind: 8,
  };
  return m[t];
}

export function speakability(t: MouthGuardType): number {
  const m: Record<MouthGuardType, number> = {
    boil_bite_basic: 5, custom_mold_dentist: 9, instant_fit_stock: 3, double_braces_ortho: 4, night_guard_grind: 7,
  };
  return m[t];
}

export function guardCost(t: MouthGuardType): number {
  const m: Record<MouthGuardType, number> = {
    boil_bite_basic: 2, custom_mold_dentist: 9, instant_fit_stock: 1, double_braces_ortho: 5, night_guard_grind: 6,
  };
  return m[t];
}

export function remoldable(t: MouthGuardType): boolean {
  const m: Record<MouthGuardType, boolean> = {
    boil_bite_basic: true, custom_mold_dentist: false, instant_fit_stock: false, double_braces_ortho: true, night_guard_grind: false,
  };
  return m[t];
}

export function bracesCompat(t: MouthGuardType): boolean {
  const m: Record<MouthGuardType, boolean> = {
    boil_bite_basic: false, custom_mold_dentist: true, instant_fit_stock: false, double_braces_ortho: true, night_guard_grind: false,
  };
  return m[t];
}

export function guardMaterial(t: MouthGuardType): string {
  const m: Record<MouthGuardType, string> = {
    boil_bite_basic: "eva_thermoplastic_moldable",
    custom_mold_dentist: "acrylic_laminate_custom",
    instant_fit_stock: "pvc_preformed_generic",
    double_braces_ortho: "silicone_ortho_channel",
    night_guard_grind: "dual_laminate_hard_soft",
  };
  return m[t];
}

export function bestSport(t: MouthGuardType): string {
  const m: Record<MouthGuardType, string> = {
    boil_bite_basic: "general_contact_sport",
    custom_mold_dentist: "pro_combat_high_impact",
    instant_fit_stock: "casual_rec_league",
    double_braces_ortho: "youth_orthodontic_sport",
    night_guard_grind: "sleep_bruxism_tmj",
  };
  return m[t];
}

export function mouthGuards(): MouthGuardType[] {
  return ["boil_bite_basic", "custom_mold_dentist", "instant_fit_stock", "double_braces_ortho", "night_guard_grind"];
}
