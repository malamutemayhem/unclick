export type PenHolderType = "ceramic_cup_classic" | "mesh_metal_organizer" | "leather_roll_wrap" | "magnetic_desk_strip" | "rotating_carousel";

export function capacity(t: PenHolderType): number {
  const m: Record<PenHolderType, number> = {
    ceramic_cup_classic: 7, mesh_metal_organizer: 9, leather_roll_wrap: 5, magnetic_desk_strip: 6, rotating_carousel: 10,
  };
  return m[t];
}

export function organization(t: PenHolderType): number {
  const m: Record<PenHolderType, number> = {
    ceramic_cup_classic: 4, mesh_metal_organizer: 8, leather_roll_wrap: 9, magnetic_desk_strip: 7, rotating_carousel: 10,
  };
  return m[t];
}

export function portability(t: PenHolderType): number {
  const m: Record<PenHolderType, number> = {
    ceramic_cup_classic: 5, mesh_metal_organizer: 6, leather_roll_wrap: 10, magnetic_desk_strip: 3, rotating_carousel: 4,
  };
  return m[t];
}

export function aestheticAppeal(t: PenHolderType): number {
  const m: Record<PenHolderType, number> = {
    ceramic_cup_classic: 8, mesh_metal_organizer: 5, leather_roll_wrap: 10, magnetic_desk_strip: 7, rotating_carousel: 6,
  };
  return m[t];
}

export function holderCost(t: PenHolderType): number {
  const m: Record<PenHolderType, number> = {
    ceramic_cup_classic: 4, mesh_metal_organizer: 3, leather_roll_wrap: 8, magnetic_desk_strip: 6, rotating_carousel: 7,
  };
  return m[t];
}

export function tipsOver(t: PenHolderType): boolean {
  const m: Record<PenHolderType, boolean> = {
    ceramic_cup_classic: false, mesh_metal_organizer: false, leather_roll_wrap: false, magnetic_desk_strip: false, rotating_carousel: false,
  };
  return m[t];
}

export function wallMountable(t: PenHolderType): boolean {
  const m: Record<PenHolderType, boolean> = {
    ceramic_cup_classic: false, mesh_metal_organizer: true, leather_roll_wrap: false, magnetic_desk_strip: true, rotating_carousel: false,
  };
  return m[t];
}

export function holderMaterial(t: PenHolderType): string {
  const m: Record<PenHolderType, string> = {
    ceramic_cup_classic: "glazed_stoneware_weighted",
    mesh_metal_organizer: "powder_coated_steel_mesh",
    leather_roll_wrap: "full_grain_leather_stitched",
    magnetic_desk_strip: "aluminum_neodymium_magnet",
    rotating_carousel: "abs_plastic_ball_bearing",
  };
  return m[t];
}

export function bestUser(t: PenHolderType): string {
  const m: Record<PenHolderType, string> = {
    ceramic_cup_classic: "home_office_simple_desk",
    mesh_metal_organizer: "corporate_multi_supply",
    leather_roll_wrap: "artist_calligrapher_travel",
    magnetic_desk_strip: "drafting_quick_grab_return",
    rotating_carousel: "teacher_shared_supply_station",
  };
  return m[t];
}

export function penHolders(): PenHolderType[] {
  return ["ceramic_cup_classic", "mesh_metal_organizer", "leather_roll_wrap", "magnetic_desk_strip", "rotating_carousel"];
}
