export type TatShuttleType = "clover_plastic_bobbin" | "vintage_metal_post" | "wood_hand_turned" | "aero_pointed_tip" | "pop_shuttle_easy";

export function threadCapacity(t: TatShuttleType): number {
  const m: Record<TatShuttleType, number> = {
    clover_plastic_bobbin: 9, vintage_metal_post: 7, wood_hand_turned: 6, aero_pointed_tip: 8, pop_shuttle_easy: 5,
  };
  return m[t];
}

export function joinEase(t: TatShuttleType): number {
  const m: Record<TatShuttleType, number> = {
    clover_plastic_bobbin: 7, vintage_metal_post: 8, wood_hand_turned: 6, aero_pointed_tip: 10, pop_shuttle_easy: 9,
  };
  return m[t];
}

export function handFeel(t: TatShuttleType): number {
  const m: Record<TatShuttleType, number> = {
    clover_plastic_bobbin: 7, vintage_metal_post: 6, wood_hand_turned: 10, aero_pointed_tip: 8, pop_shuttle_easy: 7,
  };
  return m[t];
}

export function durability(t: TatShuttleType): number {
  const m: Record<TatShuttleType, number> = {
    clover_plastic_bobbin: 8, vintage_metal_post: 10, wood_hand_turned: 6, aero_pointed_tip: 9, pop_shuttle_easy: 7,
  };
  return m[t];
}

export function shuttleCost(t: TatShuttleType): number {
  const m: Record<TatShuttleType, number> = {
    clover_plastic_bobbin: 2, vintage_metal_post: 4, wood_hand_turned: 5, aero_pointed_tip: 3, pop_shuttle_easy: 2,
  };
  return m[t];
}

export function hasBobbin(t: TatShuttleType): boolean {
  const m: Record<TatShuttleType, boolean> = {
    clover_plastic_bobbin: true, vintage_metal_post: false, wood_hand_turned: false, aero_pointed_tip: false, pop_shuttle_easy: true,
  };
  return m[t];
}

export function hasPickPoint(t: TatShuttleType): boolean {
  const m: Record<TatShuttleType, boolean> = {
    clover_plastic_bobbin: false, vintage_metal_post: true, wood_hand_turned: false, aero_pointed_tip: true, pop_shuttle_easy: false,
  };
  return m[t];
}

export function shuttleMaterial(t: TatShuttleType): string {
  const m: Record<TatShuttleType, string> = {
    clover_plastic_bobbin: "abs_plastic_bobbin",
    vintage_metal_post: "brass_nickel_plate",
    wood_hand_turned: "exotic_wood_lathe",
    aero_pointed_tip: "celluloid_acetate",
    pop_shuttle_easy: "polycarbonate_snap",
  };
  return m[t];
}

export function bestUse(t: TatShuttleType): string {
  const m: Record<TatShuttleType, string> = {
    clover_plastic_bobbin: "beginner_easy_wind",
    vintage_metal_post: "fine_thread_join",
    wood_hand_turned: "collector_art_piece",
    aero_pointed_tip: "fast_join_picot",
    pop_shuttle_easy: "quick_project_start",
  };
  return m[t];
}

export function tatShuttles(): TatShuttleType[] {
  return ["clover_plastic_bobbin", "vintage_metal_post", "wood_hand_turned", "aero_pointed_tip", "pop_shuttle_easy"];
}
