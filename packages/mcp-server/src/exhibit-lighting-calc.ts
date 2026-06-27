export type ExhibitLighting = "halogen_spot" | "led_track" | "fiber_optic" | "ambient_wash" | "uv_filtered";

export function colorRendering(l: ExhibitLighting): number {
  const m: Record<ExhibitLighting, number> = {
    halogen_spot: 10, led_track: 8, fiber_optic: 7, ambient_wash: 6, uv_filtered: 9,
  };
  return m[l];
}

export function energyEfficiency(l: ExhibitLighting): number {
  const m: Record<ExhibitLighting, number> = {
    halogen_spot: 2, led_track: 10, fiber_optic: 7, ambient_wash: 8, uv_filtered: 6,
  };
  return m[l];
}

export function heatOutput(l: ExhibitLighting): number {
  const m: Record<ExhibitLighting, number> = {
    halogen_spot: 10, led_track: 3, fiber_optic: 1, ambient_wash: 4, uv_filtered: 5,
  };
  return m[l];
}

export function installCost(l: ExhibitLighting): number {
  const m: Record<ExhibitLighting, number> = {
    halogen_spot: 4, led_track: 6, fiber_optic: 9, ambient_wash: 5, uv_filtered: 7,
  };
  return m[l];
}

export function adjustability(l: ExhibitLighting): number {
  const m: Record<ExhibitLighting, number> = {
    halogen_spot: 7, led_track: 10, fiber_optic: 8, ambient_wash: 4, uv_filtered: 6,
  };
  return m[l];
}

export function safeForArtwork(l: ExhibitLighting): boolean {
  const m: Record<ExhibitLighting, boolean> = {
    halogen_spot: false, led_track: true, fiber_optic: true, ambient_wash: true, uv_filtered: true,
  };
  return m[l];
}

export function dimmable(l: ExhibitLighting): boolean {
  const m: Record<ExhibitLighting, boolean> = {
    halogen_spot: true, led_track: true, fiber_optic: true, ambient_wash: true, uv_filtered: false,
  };
  return m[l];
}

export function beamType(l: ExhibitLighting): string {
  const m: Record<ExhibitLighting, string> = {
    halogen_spot: "narrow_focused_spot", led_track: "adjustable_spot_flood",
    fiber_optic: "pinpoint_display_case", ambient_wash: "wide_diffused_fill",
    uv_filtered: "filtered_daylight_match",
  };
  return m[l];
}

export function bestApplication(l: ExhibitLighting): string {
  const m: Record<ExhibitLighting, string> = {
    halogen_spot: "sculpture_dramatic_accent", led_track: "gallery_flexible_hanging",
    fiber_optic: "jewelry_manuscript_case", ambient_wash: "immersive_installation",
    uv_filtered: "textile_watercolor_photo",
  };
  return m[l];
}

export function exhibitLightings(): ExhibitLighting[] {
  return ["halogen_spot", "led_track", "fiber_optic", "ambient_wash", "uv_filtered"];
}
