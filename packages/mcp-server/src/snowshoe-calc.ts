export type SnowshoeType = "recreational_flat" | "hiking_moderate" | "backcountry_steep" | "running_light" | "mountaineering_crampon";

export function flotation(t: SnowshoeType): number {
  const m: Record<SnowshoeType, number> = {
    recreational_flat: 7, hiking_moderate: 8, backcountry_steep: 9, running_light: 5, mountaineering_crampon: 6,
  };
  return m[t];
}

export function traction(t: SnowshoeType): number {
  const m: Record<SnowshoeType, number> = {
    recreational_flat: 5, hiking_moderate: 7, backcountry_steep: 10, running_light: 6, mountaineering_crampon: 10,
  };
  return m[t];
}

export function shoeWeight(t: SnowshoeType): number {
  const m: Record<SnowshoeType, number> = {
    recreational_flat: 5, hiking_moderate: 6, backcountry_steep: 7, running_light: 2, mountaineering_crampon: 8,
  };
  return m[t];
}

export function bindingEase(t: SnowshoeType): number {
  const m: Record<SnowshoeType, number> = {
    recreational_flat: 10, hiking_moderate: 8, backcountry_steep: 6, running_light: 9, mountaineering_crampon: 4,
  };
  return m[t];
}

export function shoeCost(t: SnowshoeType): number {
  const m: Record<SnowshoeType, number> = {
    recreational_flat: 3, hiking_moderate: 5, backcountry_steep: 8, running_light: 7, mountaineering_crampon: 10,
  };
  return m[t];
}

export function heelLift(t: SnowshoeType): boolean {
  const m: Record<SnowshoeType, boolean> = {
    recreational_flat: false, hiking_moderate: true, backcountry_steep: true, running_light: false, mountaineering_crampon: true,
  };
  return m[t];
}

export function cramponSteel(t: SnowshoeType): boolean {
  const m: Record<SnowshoeType, boolean> = {
    recreational_flat: false, hiking_moderate: false, backcountry_steep: true, running_light: false, mountaineering_crampon: true,
  };
  return m[t];
}

export function frameMaterial(t: SnowshoeType): string {
  const m: Record<SnowshoeType, string> = {
    recreational_flat: "aluminum_tube_deck",
    hiking_moderate: "composite_frame_pivot",
    backcountry_steep: "carbon_aluminum_hybrid",
    running_light: "ultralight_plastic_flex",
    mountaineering_crampon: "steel_frame_rigid",
  };
  return m[t];
}

export function bestTerrain(t: SnowshoeType): string {
  const m: Record<SnowshoeType, string> = {
    recreational_flat: "groomed_trail_flat",
    hiking_moderate: "rolling_hills_forest",
    backcountry_steep: "steep_untracked_powder",
    running_light: "packed_trail_winter_run",
    mountaineering_crampon: "icy_alpine_summit",
  };
  return m[t];
}

export function snowshoes(): SnowshoeType[] {
  return ["recreational_flat", "hiking_moderate", "backcountry_steep", "running_light", "mountaineering_crampon"];
}
