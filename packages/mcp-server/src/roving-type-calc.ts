export type RovingTypeType = "merino_top_fine" | "corriedale_roving_medium" | "romney_batt_coarse" | "bamboo_silk_blend" | "core_wool_bulk";

export function feltAbility(t: RovingTypeType): number {
  const m: Record<RovingTypeType, number> = {
    merino_top_fine: 10, corriedale_roving_medium: 8, romney_batt_coarse: 6, bamboo_silk_blend: 3, core_wool_bulk: 9,
  };
  return m[t];
}

export function colorRange(t: RovingTypeType): number {
  const m: Record<RovingTypeType, number> = {
    merino_top_fine: 10, corriedale_roving_medium: 7, romney_batt_coarse: 5, bamboo_silk_blend: 8, core_wool_bulk: 3,
  };
  return m[t];
}

export function softness(t: RovingTypeType): number {
  const m: Record<RovingTypeType, number> = {
    merino_top_fine: 10, corriedale_roving_medium: 7, romney_batt_coarse: 4, bamboo_silk_blend: 9, core_wool_bulk: 5,
  };
  return m[t];
}

export function structureHold(t: RovingTypeType): number {
  const m: Record<RovingTypeType, number> = {
    merino_top_fine: 7, corriedale_roving_medium: 8, romney_batt_coarse: 9, bamboo_silk_blend: 4, core_wool_bulk: 10,
  };
  return m[t];
}

export function rovingCost(t: RovingTypeType): number {
  const m: Record<RovingTypeType, number> = {
    merino_top_fine: 4, corriedale_roving_medium: 3, romney_batt_coarse: 2, bamboo_silk_blend: 5, core_wool_bulk: 1,
  };
  return m[t];
}

export function pureWool(t: RovingTypeType): boolean {
  const m: Record<RovingTypeType, boolean> = {
    merino_top_fine: true, corriedale_roving_medium: true, romney_batt_coarse: true, bamboo_silk_blend: false, core_wool_bulk: true,
  };
  return m[t];
}

export function forCore(t: RovingTypeType): boolean {
  const m: Record<RovingTypeType, boolean> = {
    merino_top_fine: false, corriedale_roving_medium: false, romney_batt_coarse: false, bamboo_silk_blend: false, core_wool_bulk: true,
  };
  return m[t];
}

export function fiberPrep(t: RovingTypeType): string {
  const m: Record<RovingTypeType, string> = {
    merino_top_fine: "combed_top_aligned",
    corriedale_roving_medium: "carded_roving_loose",
    romney_batt_coarse: "carded_batt_sheet",
    bamboo_silk_blend: "blended_top_smooth",
    core_wool_bulk: "carded_bulk_rough",
  };
  return m[t];
}

export function bestProject(t: RovingTypeType): string {
  const m: Record<RovingTypeType, string> = {
    merino_top_fine: "surface_detail_color",
    corriedale_roving_medium: "general_sculpt_shape",
    romney_batt_coarse: "large_form_base",
    bamboo_silk_blend: "accent_sheen_drape",
    core_wool_bulk: "armature_fill_bulk",
  };
  return m[t];
}

export function rovingTypes(): RovingTypeType[] {
  return ["merino_top_fine", "corriedale_roving_medium", "romney_batt_coarse", "bamboo_silk_blend", "core_wool_bulk"];
}
