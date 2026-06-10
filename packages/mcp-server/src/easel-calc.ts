export type EaselType = "a_frame_studio" | "h_frame_heavy" | "tabletop_mini" | "plein_air_field" | "single_mast_display";

export function canvasCapacity(t: EaselType): number {
  const m: Record<EaselType, number> = {
    a_frame_studio: 8, h_frame_heavy: 10, tabletop_mini: 3, plein_air_field: 5, single_mast_display: 7,
  };
  return m[t];
}

export function stability(t: EaselType): number {
  const m: Record<EaselType, number> = {
    a_frame_studio: 8, h_frame_heavy: 10, tabletop_mini: 5, plein_air_field: 4, single_mast_display: 6,
  };
  return m[t];
}

export function angleAdjust(t: EaselType): number {
  const m: Record<EaselType, number> = {
    a_frame_studio: 8, h_frame_heavy: 10, tabletop_mini: 6, plein_air_field: 7, single_mast_display: 4,
  };
  return m[t];
}

export function portability(t: EaselType): number {
  const m: Record<EaselType, number> = {
    a_frame_studio: 3, h_frame_heavy: 1, tabletop_mini: 9, plein_air_field: 10, single_mast_display: 6,
  };
  return m[t];
}

export function easelCost(t: EaselType): number {
  const m: Record<EaselType, number> = {
    a_frame_studio: 5, h_frame_heavy: 9, tabletop_mini: 2, plein_air_field: 6, single_mast_display: 3,
  };
  return m[t];
}

export function foldFlat(t: EaselType): boolean {
  const m: Record<EaselType, boolean> = {
    a_frame_studio: true, h_frame_heavy: false, tabletop_mini: true, plein_air_field: true, single_mast_display: true,
  };
  return m[t];
}

export function hasTray(t: EaselType): boolean {
  const m: Record<EaselType, boolean> = {
    a_frame_studio: true, h_frame_heavy: true, tabletop_mini: false, plein_air_field: true, single_mast_display: false,
  };
  return m[t];
}

export function frameMaterial(t: EaselType): string {
  const m: Record<EaselType, string> = {
    a_frame_studio: "beechwood_tripod_frame",
    h_frame_heavy: "oak_h_frame_crank",
    tabletop_mini: "aluminum_compact_leg",
    plein_air_field: "pochade_box_tripod",
    single_mast_display: "aluminum_mast_clamp",
  };
  return m[t];
}

export function bestUse(t: EaselType): string {
  const m: Record<EaselType, string> = {
    a_frame_studio: "home_studio_versatile",
    h_frame_heavy: "professional_large_canvas",
    tabletop_mini: "small_space_desk_art",
    plein_air_field: "outdoor_landscape_travel",
    single_mast_display: "gallery_show_presentation",
  };
  return m[t];
}

export function easels(): EaselType[] {
  return ["a_frame_studio", "h_frame_heavy", "tabletop_mini", "plein_air_field", "single_mast_display"];
}
