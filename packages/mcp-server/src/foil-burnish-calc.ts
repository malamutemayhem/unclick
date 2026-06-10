export type FoilBurnishType = "wood_fid_smooth" | "plastic_roller_press" | "teflon_folder_slide" | "bone_point_crease" | "brass_wheel_edge";

export function burnishEven(t: FoilBurnishType): number {
  const m: Record<FoilBurnishType, number> = {
    wood_fid_smooth: 7, plastic_roller_press: 10, teflon_folder_slide: 8, bone_point_crease: 6, brass_wheel_edge: 9,
  };
  return m[t];
}

export function foilAdhere(t: FoilBurnishType): number {
  const m: Record<FoilBurnishType, number> = {
    wood_fid_smooth: 8, plastic_roller_press: 9, teflon_folder_slide: 7, bone_point_crease: 6, brass_wheel_edge: 10,
  };
  return m[t];
}

export function edgeDetail(t: FoilBurnishType): number {
  const m: Record<FoilBurnishType, number> = {
    wood_fid_smooth: 7, plastic_roller_press: 5, teflon_folder_slide: 8, bone_point_crease: 10, brass_wheel_edge: 9,
  };
  return m[t];
}

export function durability(t: FoilBurnishType): number {
  const m: Record<FoilBurnishType, number> = {
    wood_fid_smooth: 8, plastic_roller_press: 6, teflon_folder_slide: 7, bone_point_crease: 9, brass_wheel_edge: 10,
  };
  return m[t];
}

export function toolCost(t: FoilBurnishType): number {
  const m: Record<FoilBurnishType, number> = {
    wood_fid_smooth: 1, plastic_roller_press: 2, teflon_folder_slide: 2, bone_point_crease: 2, brass_wheel_edge: 3,
  };
  return m[t];
}

export function forCorners(t: FoilBurnishType): boolean {
  const m: Record<FoilBurnishType, boolean> = {
    wood_fid_smooth: true, plastic_roller_press: false, teflon_folder_slide: true, bone_point_crease: true, brass_wheel_edge: false,
  };
  return m[t];
}

export function nonScratch(t: FoilBurnishType): boolean {
  const m: Record<FoilBurnishType, boolean> = {
    wood_fid_smooth: true, plastic_roller_press: true, teflon_folder_slide: true, bone_point_crease: false, brass_wheel_edge: false,
  };
  return m[t];
}

export function tipShape(t: FoilBurnishType): string {
  const m: Record<FoilBurnishType, string> = {
    wood_fid_smooth: "tapered_flat_wood",
    plastic_roller_press: "cylinder_roller_pvc",
    teflon_folder_slide: "flat_ptfe_blade",
    bone_point_crease: "pointed_bone_tip",
    brass_wheel_edge: "brass_edge_wheel",
  };
  return m[t];
}

export function bestUse(t: FoilBurnishType): string {
  const m: Record<FoilBurnishType, string> = {
    wood_fid_smooth: "general_foil_smooth",
    plastic_roller_press: "large_area_press",
    teflon_folder_slide: "delicate_foil_fold",
    bone_point_crease: "tight_corner_detail",
    brass_wheel_edge: "edge_foil_crimp",
  };
  return m[t];
}

export function foilBurnishers(): FoilBurnishType[] {
  return ["wood_fid_smooth", "plastic_roller_press", "teflon_folder_slide", "bone_point_crease", "brass_wheel_edge"];
}
