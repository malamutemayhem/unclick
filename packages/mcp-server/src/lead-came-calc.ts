export type LeadCameType = "h_channel_standard" | "u_channel_border" | "round_face_decorative" | "flat_face_modern" | "zinc_came_rigid";

export function flexibility(t: LeadCameType): number {
  const m: Record<LeadCameType, number> = {
    h_channel_standard: 9, u_channel_border: 7, round_face_decorative: 8, flat_face_modern: 6, zinc_came_rigid: 3,
  };
  return m[t];
}

export function solderEase(t: LeadCameType): number {
  const m: Record<LeadCameType, number> = {
    h_channel_standard: 9, u_channel_border: 8, round_face_decorative: 7, flat_face_modern: 8, zinc_came_rigid: 5,
  };
  return m[t];
}

export function structStrength(t: LeadCameType): number {
  const m: Record<LeadCameType, number> = {
    h_channel_standard: 7, u_channel_border: 8, round_face_decorative: 6, flat_face_modern: 7, zinc_came_rigid: 10,
  };
  return m[t];
}

export function aesthetic(t: LeadCameType): number {
  const m: Record<LeadCameType, number> = {
    h_channel_standard: 6, u_channel_border: 7, round_face_decorative: 10, flat_face_modern: 8, zinc_came_rigid: 5,
  };
  return m[t];
}

export function cameCost(t: LeadCameType): number {
  const m: Record<LeadCameType, number> = {
    h_channel_standard: 2, u_channel_border: 2, round_face_decorative: 3, flat_face_modern: 3, zinc_came_rigid: 4,
  };
  return m[t];
}

export function forBorder(t: LeadCameType): boolean {
  const m: Record<LeadCameType, boolean> = {
    h_channel_standard: false, u_channel_border: true, round_face_decorative: false, flat_face_modern: false, zinc_came_rigid: true,
  };
  return m[t];
}

export function leadFree(t: LeadCameType): boolean {
  const m: Record<LeadCameType, boolean> = {
    h_channel_standard: false, u_channel_border: false, round_face_decorative: false, flat_face_modern: false, zinc_came_rigid: true,
  };
  return m[t];
}

export function cameProfile(t: LeadCameType): string {
  const m: Record<LeadCameType, string> = {
    h_channel_standard: "h_shape_double_channel",
    u_channel_border: "u_shape_single_edge",
    round_face_decorative: "round_bead_profile",
    flat_face_modern: "flat_smooth_face",
    zinc_came_rigid: "zinc_alloy_rigid",
  };
  return m[t];
}

export function bestUse(t: LeadCameType): string {
  const m: Record<LeadCameType, string> = {
    h_channel_standard: "interior_panel_join",
    u_channel_border: "panel_edge_border",
    round_face_decorative: "decorative_window",
    flat_face_modern: "modern_clean_line",
    zinc_came_rigid: "structural_border_frame",
  };
  return m[t];
}

export function leadCames(): LeadCameType[] {
  return ["h_channel_standard", "u_channel_border", "round_face_decorative", "flat_face_modern", "zinc_came_rigid"];
}
