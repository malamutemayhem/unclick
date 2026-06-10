export type TheaterCurtain = "main_drape" | "cyclorama" | "scrim" | "traveler" | "blackout";

export function lightBlocking(t: TheaterCurtain): number {
  const m: Record<TheaterCurtain, number> = {
    main_drape: 10, cyclorama: 3, scrim: 2, traveler: 8, blackout: 10,
  };
  return m[t];
}

export function visualImpact(t: TheaterCurtain): number {
  const m: Record<TheaterCurtain, number> = {
    main_drape: 10, cyclorama: 8, scrim: 9, traveler: 5, blackout: 3,
  };
  return m[t];
}

export function lightTransmission(t: TheaterCurtain): number {
  const m: Record<TheaterCurtain, number> = {
    main_drape: 1, cyclorama: 7, scrim: 10, traveler: 2, blackout: 1,
  };
  return m[t];
}

export function riggingComplexity(t: TheaterCurtain): number {
  const m: Record<TheaterCurtain, number> = {
    main_drape: 7, cyclorama: 8, scrim: 5, traveler: 6, blackout: 4,
  };
  return m[t];
}

export function fabricCost(t: TheaterCurtain): number {
  const m: Record<TheaterCurtain, number> = {
    main_drape: 9, cyclorama: 7, scrim: 6, traveler: 5, blackout: 4,
  };
  return m[t];
}

export function flameRetardant(t: TheaterCurtain): boolean {
  const m: Record<TheaterCurtain, boolean> = {
    main_drape: true, cyclorama: true, scrim: true, traveler: true, blackout: true,
  };
  return m[t];
}

export function projectionSurface(t: TheaterCurtain): boolean {
  const m: Record<TheaterCurtain, boolean> = {
    main_drape: false, cyclorama: true, scrim: true, traveler: false, blackout: false,
  };
  return m[t];
}

export function fabricType(t: TheaterCurtain): string {
  const m: Record<TheaterCurtain, string> = {
    main_drape: "velour_commando_weighted", cyclorama: "muslin_vinyl_stretched",
    scrim: "sharkstooth_gauze_open_weave", traveler: "velour_poly_track_mounted",
    blackout: "duvetyn_commando_opaque",
  };
  return m[t];
}

export function bestUse(t: TheaterCurtain): string {
  const m: Record<TheaterCurtain, string> = {
    main_drape: "grand_opening_proscenium", cyclorama: "sky_backdrop_projection",
    scrim: "reveal_effect_transparent", traveler: "scene_change_wing_mask",
    blackout: "backstage_masking_wing",
  };
  return m[t];
}

export function theaterCurtains(): TheaterCurtain[] {
  return ["main_drape", "cyclorama", "scrim", "traveler", "blackout"];
}
