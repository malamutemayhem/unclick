export type DrainCoverType = "mesh_screen_flat" | "pop_up_click" | "hair_catcher_dome" | "linear_slot_channel" | "mushroom_push_pull";

export function flowRate(t: DrainCoverType): number {
  const m: Record<DrainCoverType, number> = {
    mesh_screen_flat: 6, pop_up_click: 8, hair_catcher_dome: 5, linear_slot_channel: 10, mushroom_push_pull: 7,
  };
  return m[t];
}

export function clogPrevention(t: DrainCoverType): number {
  const m: Record<DrainCoverType, number> = {
    mesh_screen_flat: 7, pop_up_click: 4, hair_catcher_dome: 10, linear_slot_channel: 6, mushroom_push_pull: 5,
  };
  return m[t];
}

export function cleanEase(t: DrainCoverType): number {
  const m: Record<DrainCoverType, number> = {
    mesh_screen_flat: 9, pop_up_click: 6, hair_catcher_dome: 8, linear_slot_channel: 4, mushroom_push_pull: 7,
  };
  return m[t];
}

export function aestheticClean(t: DrainCoverType): number {
  const m: Record<DrainCoverType, number> = {
    mesh_screen_flat: 4, pop_up_click: 7, hair_catcher_dome: 3, linear_slot_channel: 10, mushroom_push_pull: 6,
  };
  return m[t];
}

export function coverCost(t: DrainCoverType): number {
  const m: Record<DrainCoverType, number> = {
    mesh_screen_flat: 1, pop_up_click: 4, hair_catcher_dome: 2, linear_slot_channel: 8, mushroom_push_pull: 3,
  };
  return m[t];
}

export function toolFreeInstall(t: DrainCoverType): boolean {
  const m: Record<DrainCoverType, boolean> = {
    mesh_screen_flat: true, pop_up_click: false, hair_catcher_dome: true, linear_slot_channel: false, mushroom_push_pull: false,
  };
  return m[t];
}

export function universalFit(t: DrainCoverType): boolean {
  const m: Record<DrainCoverType, boolean> = {
    mesh_screen_flat: true, pop_up_click: false, hair_catcher_dome: true, linear_slot_channel: false, mushroom_push_pull: false,
  };
  return m[t];
}

export function coverMaterial(t: DrainCoverType): string {
  const m: Record<DrainCoverType, string> = {
    mesh_screen_flat: "stainless_steel_perforated",
    pop_up_click: "chrome_plated_brass",
    hair_catcher_dome: "silicone_flexible_mesh",
    linear_slot_channel: "brushed_stainless_trough",
    mushroom_push_pull: "abs_chrome_finish",
  };
  return m[t];
}

export function bestLocation(t: DrainCoverType): string {
  const m: Record<DrainCoverType, string> = {
    mesh_screen_flat: "kitchen_sink_strainer",
    pop_up_click: "bathroom_sink_basin",
    hair_catcher_dome: "shower_floor_drain",
    linear_slot_channel: "curbless_shower_wet_room",
    mushroom_push_pull: "bathtub_overflow_drain",
  };
  return m[t];
}

export function drainCovers(): DrainCoverType[] {
  return ["mesh_screen_flat", "pop_up_click", "hair_catcher_dome", "linear_slot_channel", "mushroom_push_pull"];
}
