export type CrossPeenType = "goldsmith_2oz_light" | "silversmith_8oz_medium" | "planishing_flat_face" | "chasing_short_handle" | "riveting_narrow_peen";

export function strikeForce(t: CrossPeenType): number {
  const m: Record<CrossPeenType, number> = {
    goldsmith_2oz_light: 4, silversmith_8oz_medium: 8, planishing_flat_face: 6, chasing_short_handle: 5, riveting_narrow_peen: 7,
  };
  return m[t];
}

export function controlPrecision(t: CrossPeenType): number {
  const m: Record<CrossPeenType, number> = {
    goldsmith_2oz_light: 10, silversmith_8oz_medium: 7, planishing_flat_face: 9, chasing_short_handle: 8, riveting_narrow_peen: 6,
  };
  return m[t];
}

export function textureAbility(t: CrossPeenType): number {
  const m: Record<CrossPeenType, number> = {
    goldsmith_2oz_light: 6, silversmith_8oz_medium: 9, planishing_flat_face: 4, chasing_short_handle: 7, riveting_narrow_peen: 8,
  };
  return m[t];
}

export function balance(t: CrossPeenType): number {
  const m: Record<CrossPeenType, number> = {
    goldsmith_2oz_light: 9, silversmith_8oz_medium: 8, planishing_flat_face: 10, chasing_short_handle: 7, riveting_narrow_peen: 6,
  };
  return m[t];
}

export function hammerCost(t: CrossPeenType): number {
  const m: Record<CrossPeenType, number> = {
    goldsmith_2oz_light: 2, silversmith_8oz_medium: 2, planishing_flat_face: 3, chasing_short_handle: 2, riveting_narrow_peen: 1,
  };
  return m[t];
}

export function polishedFace(t: CrossPeenType): boolean {
  const m: Record<CrossPeenType, boolean> = {
    goldsmith_2oz_light: true, silversmith_8oz_medium: false, planishing_flat_face: true, chasing_short_handle: false, riveting_narrow_peen: false,
  };
  return m[t];
}

export function shortHandle(t: CrossPeenType): boolean {
  const m: Record<CrossPeenType, boolean> = {
    goldsmith_2oz_light: false, silversmith_8oz_medium: false, planishing_flat_face: false, chasing_short_handle: true, riveting_narrow_peen: false,
  };
  return m[t];
}

export function headMaterial(t: CrossPeenType): string {
  const m: Record<CrossPeenType, string> = {
    goldsmith_2oz_light: "hardened_steel_mirror",
    silversmith_8oz_medium: "forged_steel_satin",
    planishing_flat_face: "tool_steel_polished",
    chasing_short_handle: "mild_steel_crowned",
    riveting_narrow_peen: "carbon_steel_ground",
  };
  return m[t];
}

export function bestUse(t: CrossPeenType): string {
  const m: Record<CrossPeenType, string> = {
    goldsmith_2oz_light: "fine_gold_spread",
    silversmith_8oz_medium: "silver_sheet_form",
    planishing_flat_face: "smooth_surface_finish",
    chasing_short_handle: "detail_chase_work",
    riveting_narrow_peen: "rivet_head_spread",
  };
  return m[t];
}

export function crossPeens(): CrossPeenType[] {
  return ["goldsmith_2oz_light", "silversmith_8oz_medium", "planishing_flat_face", "chasing_short_handle", "riveting_narrow_peen"];
}
