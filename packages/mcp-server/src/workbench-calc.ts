export type WorkbenchType = "traditional_hardwood" | "folding_portable" | "steel_frame_mdf" | "adjustable_height_electric" | "wall_mount_drop_leaf";

export function workSurface(t: WorkbenchType): number {
  const m: Record<WorkbenchType, number> = {
    traditional_hardwood: 10, folding_portable: 5, steel_frame_mdf: 8, adjustable_height_electric: 7, wall_mount_drop_leaf: 4,
  };
  return m[t];
}

export function loadCapacity(t: WorkbenchType): number {
  const m: Record<WorkbenchType, number> = {
    traditional_hardwood: 9, folding_portable: 4, steel_frame_mdf: 8, adjustable_height_electric: 7, wall_mount_drop_leaf: 3,
  };
  return m[t];
}

export function portability(t: WorkbenchType): number {
  const m: Record<WorkbenchType, number> = {
    traditional_hardwood: 1, folding_portable: 10, steel_frame_mdf: 3, adjustable_height_electric: 2, wall_mount_drop_leaf: 6,
  };
  return m[t];
}

export function storageBuiltIn(t: WorkbenchType): number {
  const m: Record<WorkbenchType, number> = {
    traditional_hardwood: 7, folding_portable: 3, steel_frame_mdf: 8, adjustable_height_electric: 6, wall_mount_drop_leaf: 2,
  };
  return m[t];
}

export function benchCost(t: WorkbenchType): number {
  const m: Record<WorkbenchType, number> = {
    traditional_hardwood: 8, folding_portable: 3, steel_frame_mdf: 5, adjustable_height_electric: 9, wall_mount_drop_leaf: 4,
  };
  return m[t];
}

export function foldFlat(t: WorkbenchType): boolean {
  const m: Record<WorkbenchType, boolean> = {
    traditional_hardwood: false, folding_portable: true, steel_frame_mdf: false, adjustable_height_electric: false, wall_mount_drop_leaf: true,
  };
  return m[t];
}

export function hasViseMount(t: WorkbenchType): boolean {
  const m: Record<WorkbenchType, boolean> = {
    traditional_hardwood: true, folding_portable: true, steel_frame_mdf: true, adjustable_height_electric: true, wall_mount_drop_leaf: false,
  };
  return m[t];
}

export function topMaterial(t: WorkbenchType): string {
  const m: Record<WorkbenchType, string> = {
    traditional_hardwood: "solid_maple_butcher_block",
    folding_portable: "bamboo_laminate_light",
    steel_frame_mdf: "mdf_melamine_coated",
    adjustable_height_electric: "phenolic_resin_surface",
    wall_mount_drop_leaf: "birch_plywood_folding",
  };
  return m[t];
}

export function bestShop(t: WorkbenchType): string {
  const m: Record<WorkbenchType, string> = {
    traditional_hardwood: "dedicated_woodworking_shop",
    folding_portable: "jobsite_temporary_setup",
    steel_frame_mdf: "garage_general_purpose",
    adjustable_height_electric: "electronics_assembly_lab",
    wall_mount_drop_leaf: "small_apartment_workshop",
  };
  return m[t];
}

export function workbenches(): WorkbenchType[] {
  return ["traditional_hardwood", "folding_portable", "steel_frame_mdf", "adjustable_height_electric", "wall_mount_drop_leaf"];
}
