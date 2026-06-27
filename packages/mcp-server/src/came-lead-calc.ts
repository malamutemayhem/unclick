export type CameLeadType = "h_channel_standard" | "u_channel_border" | "round_profile_decorative" | "zinc_came_rigid" | "brass_came_strong";

export function flexAbility(t: CameLeadType): number {
  const m: Record<CameLeadType, number> = {
    h_channel_standard: 9, u_channel_border: 8, round_profile_decorative: 7, zinc_came_rigid: 4, brass_came_strong: 3,
  };
  return m[t];
}

export function structStrength(t: CameLeadType): number {
  const m: Record<CameLeadType, number> = {
    h_channel_standard: 5, u_channel_border: 6, round_profile_decorative: 4, zinc_came_rigid: 9, brass_came_strong: 10,
  };
  return m[t];
}

export function solderEase(t: CameLeadType): number {
  const m: Record<CameLeadType, number> = {
    h_channel_standard: 9, u_channel_border: 9, round_profile_decorative: 8, zinc_came_rigid: 6, brass_came_strong: 5,
  };
  return m[t];
}

export function visualLine(t: CameLeadType): number {
  const m: Record<CameLeadType, number> = {
    h_channel_standard: 6, u_channel_border: 5, round_profile_decorative: 10, zinc_came_rigid: 7, brass_came_strong: 8,
  };
  return m[t];
}

export function cameCost(t: CameLeadType): number {
  const m: Record<CameLeadType, number> = {
    h_channel_standard: 1, u_channel_border: 1, round_profile_decorative: 2, zinc_came_rigid: 3, brass_came_strong: 4,
  };
  return m[t];
}

export function leadFree(t: CameLeadType): boolean {
  const m: Record<CameLeadType, boolean> = {
    h_channel_standard: false, u_channel_border: false, round_profile_decorative: false, zinc_came_rigid: true, brass_came_strong: true,
  };
  return m[t];
}

export function forBorder(t: CameLeadType): boolean {
  const m: Record<CameLeadType, boolean> = {
    h_channel_standard: false, u_channel_border: true, round_profile_decorative: false, zinc_came_rigid: false, brass_came_strong: false,
  };
  return m[t];
}

export function profileShape(t: CameLeadType): string {
  const m: Record<CameLeadType, string> = {
    h_channel_standard: "flat_h_double_channel",
    u_channel_border: "flat_u_single_channel",
    round_profile_decorative: "round_bead_channel",
    zinc_came_rigid: "flat_h_rigid_zinc",
    brass_came_strong: "flat_h_solid_brass",
  };
  return m[t];
}

export function bestPanel(t: CameLeadType): string {
  const m: Record<CameLeadType, string> = {
    h_channel_standard: "traditional_window_panel",
    u_channel_border: "panel_outer_frame",
    round_profile_decorative: "decorative_lamp_shade",
    zinc_came_rigid: "large_structural_window",
    brass_came_strong: "exterior_door_panel",
  };
  return m[t];
}

export function cameLeads(): CameLeadType[] {
  return ["h_channel_standard", "u_channel_border", "round_profile_decorative", "zinc_came_rigid", "brass_came_strong"];
}
