export type FishFinderType = "basic_flasher" | "color_lcd" | "chirp_sonar" | "side_imaging" | "live_scope_forward";

export function depthRange(t: FishFinderType): number {
  const m: Record<FishFinderType, number> = {
    basic_flasher: 4, color_lcd: 6, chirp_sonar: 9, side_imaging: 8, live_scope_forward: 7,
  };
  return m[t];
}

export function targetSeparation(t: FishFinderType): number {
  const m: Record<FishFinderType, number> = {
    basic_flasher: 3, color_lcd: 5, chirp_sonar: 9, side_imaging: 8, live_scope_forward: 10,
  };
  return m[t];
}

export function coverageArea(t: FishFinderType): number {
  const m: Record<FishFinderType, number> = {
    basic_flasher: 2, color_lcd: 4, chirp_sonar: 6, side_imaging: 10, live_scope_forward: 7,
  };
  return m[t];
}

export function realTimeDetail(t: FishFinderType): number {
  const m: Record<FishFinderType, number> = {
    basic_flasher: 5, color_lcd: 4, chirp_sonar: 7, side_imaging: 8, live_scope_forward: 10,
  };
  return m[t];
}

export function finderCost(t: FishFinderType): number {
  const m: Record<FishFinderType, number> = {
    basic_flasher: 1, color_lcd: 3, chirp_sonar: 6, side_imaging: 8, live_scope_forward: 10,
  };
  return m[t];
}

export function gpsBuiltIn(t: FishFinderType): boolean {
  const m: Record<FishFinderType, boolean> = {
    basic_flasher: false, color_lcd: true, chirp_sonar: true, side_imaging: true, live_scope_forward: true,
  };
  return m[t];
}

export function networkCapable(t: FishFinderType): boolean {
  const m: Record<FishFinderType, boolean> = {
    basic_flasher: false, color_lcd: false, chirp_sonar: true, side_imaging: true, live_scope_forward: true,
  };
  return m[t];
}

export function transducerType(t: FishFinderType): string {
  const m: Record<FishFinderType, string> = {
    basic_flasher: "single_cone_beam", color_lcd: "dual_beam_transom",
    chirp_sonar: "broadband_chirp_element", side_imaging: "tri_beam_side_scan",
    live_scope_forward: "panoptix_forward_facing",
  };
  return m[t];
}

export function bestFishing(t: FishFinderType): string {
  const m: Record<FishFinderType, string> = {
    basic_flasher: "ice_fishing_jigging", color_lcd: "casual_trolling_lake",
    chirp_sonar: "deep_water_structure", side_imaging: "reservoir_bank_scanning",
    live_scope_forward: "sight_fishing_bass_crappie",
  };
  return m[t];
}

export function fishFinders(): FishFinderType[] {
  return ["basic_flasher", "color_lcd", "chirp_sonar", "side_imaging", "live_scope_forward"];
}
