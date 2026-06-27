export type EaselType = "h_frame_studio" | "a_frame_lyre" | "tabletop_mini" | "french_portable" | "single_mast";

export function stabilityRating(e: EaselType): number {
  const m: Record<EaselType, number> = {
    h_frame_studio: 10, a_frame_lyre: 7, tabletop_mini: 4, french_portable: 5, single_mast: 6,
  };
  return m[e];
}

export function maxCanvasSize(e: EaselType): number {
  const m: Record<EaselType, number> = {
    h_frame_studio: 10, a_frame_lyre: 7, tabletop_mini: 3, french_portable: 5, single_mast: 8,
  };
  return m[e];
}

export function portabilityScore(e: EaselType): number {
  const m: Record<EaselType, number> = {
    h_frame_studio: 1, a_frame_lyre: 4, tabletop_mini: 9, french_portable: 10, single_mast: 3,
  };
  return m[e];
}

export function adjustability(e: EaselType): number {
  const m: Record<EaselType, number> = {
    h_frame_studio: 10, a_frame_lyre: 6, tabletop_mini: 4, french_portable: 7, single_mast: 8,
  };
  return m[e];
}

export function easelCost(e: EaselType): number {
  const m: Record<EaselType, number> = {
    h_frame_studio: 9, a_frame_lyre: 5, tabletop_mini: 2, french_portable: 7, single_mast: 4,
  };
  return m[e];
}

export function hasStorage(e: EaselType): boolean {
  const m: Record<EaselType, boolean> = {
    h_frame_studio: true, a_frame_lyre: false, tabletop_mini: false, french_portable: true, single_mast: false,
  };
  return m[e];
}

export function foldFlat(e: EaselType): boolean {
  const m: Record<EaselType, boolean> = {
    h_frame_studio: false, a_frame_lyre: true, tabletop_mini: true, french_portable: true, single_mast: false,
  };
  return m[e];
}

export function frameMaterial(e: EaselType): string {
  const m: Record<EaselType, string> = {
    h_frame_studio: "heavy_hardwood_beech_oak", a_frame_lyre: "lightweight_beech_tripod",
    tabletop_mini: "aluminum_compact_folding", french_portable: "beech_box_with_drawer",
    single_mast: "aluminum_telescoping_pole",
  };
  return m[e];
}

export function bestSetting(e: EaselType): string {
  const m: Record<EaselType, string> = {
    h_frame_studio: "permanent_studio_large_work", a_frame_lyre: "classroom_shared_space",
    tabletop_mini: "small_apartment_desk", french_portable: "plein_air_outdoor_travel",
    single_mast: "display_gallery_presentation",
  };
  return m[e];
}

export function easelTypes(): EaselType[] {
  return ["h_frame_studio", "a_frame_lyre", "tabletop_mini", "french_portable", "single_mast"];
}
