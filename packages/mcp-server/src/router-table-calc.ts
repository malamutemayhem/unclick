export type RouterTableType = "benchtop_basic" | "cabinet_enclosed" | "extension_wing" | "portable_fold" | "tilting_angle";

export function surfaceArea(t: RouterTableType): number {
  const m: Record<RouterTableType, number> = {
    benchtop_basic: 5, cabinet_enclosed: 9, extension_wing: 8, portable_fold: 4, tilting_angle: 7,
  };
  return m[t];
}

export function fenceAccuracy(t: RouterTableType): number {
  const m: Record<RouterTableType, number> = {
    benchtop_basic: 6, cabinet_enclosed: 10, extension_wing: 8, portable_fold: 5, tilting_angle: 7,
  };
  return m[t];
}

export function dustCollection(t: RouterTableType): number {
  const m: Record<RouterTableType, number> = {
    benchtop_basic: 4, cabinet_enclosed: 10, extension_wing: 6, portable_fold: 3, tilting_angle: 7,
  };
  return m[t];
}

export function setupSpeed(t: RouterTableType): number {
  const m: Record<RouterTableType, number> = {
    benchtop_basic: 8, cabinet_enclosed: 5, extension_wing: 6, portable_fold: 10, tilting_angle: 4,
  };
  return m[t];
}

export function tableCost(t: RouterTableType): number {
  const m: Record<RouterTableType, number> = {
    benchtop_basic: 3, cabinet_enclosed: 9, extension_wing: 6, portable_fold: 4, tilting_angle: 8,
  };
  return m[t];
}

export function miterSlot(t: RouterTableType): boolean {
  const m: Record<RouterTableType, boolean> = {
    benchtop_basic: true, cabinet_enclosed: true, extension_wing: true, portable_fold: false, tilting_angle: true,
  };
  return m[t];
}

export function angleCapable(t: RouterTableType): boolean {
  const m: Record<RouterTableType, boolean> = {
    benchtop_basic: false, cabinet_enclosed: false, extension_wing: false, portable_fold: false, tilting_angle: true,
  };
  return m[t];
}

export function topMaterial(t: RouterTableType): string {
  const m: Record<RouterTableType, string> = {
    benchtop_basic: "mdf_laminate_flat",
    cabinet_enclosed: "cast_iron_machined",
    extension_wing: "aluminum_wing_mount",
    portable_fold: "phenolic_resin_light",
    tilting_angle: "steel_plate_pivot",
  };
  return m[t];
}

export function bestUse(t: RouterTableType): string {
  const m: Record<RouterTableType, string> = {
    benchtop_basic: "hobby_edge_profile",
    cabinet_enclosed: "professional_cabinet_shop",
    extension_wing: "table_saw_integrated",
    portable_fold: "job_site_trim_work",
    tilting_angle: "raised_panel_angled_cut",
  };
  return m[t];
}

export function routerTables(): RouterTableType[] {
  return ["benchtop_basic", "cabinet_enclosed", "extension_wing", "portable_fold", "tilting_angle"];
}
