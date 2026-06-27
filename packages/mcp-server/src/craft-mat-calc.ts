export type CraftMatType = "self_heal_cut_grid" | "teflon_non_stick" | "silicone_heat_safe" | "glass_media_smooth" | "foam_stamp_cushion";

export function cutProtect(t: CraftMatType): number {
  const m: Record<CraftMatType, number> = {
    self_heal_cut_grid: 10, teflon_non_stick: 4, silicone_heat_safe: 5, glass_media_smooth: 3, foam_stamp_cushion: 2,
  };
  return m[t];
}

export function nonStick(t: CraftMatType): number {
  const m: Record<CraftMatType, number> = {
    self_heal_cut_grid: 4, teflon_non_stick: 10, silicone_heat_safe: 9, glass_media_smooth: 8, foam_stamp_cushion: 5,
  };
  return m[t];
}

export function heatResist(t: CraftMatType): number {
  const m: Record<CraftMatType, number> = {
    self_heal_cut_grid: 3, teflon_non_stick: 7, silicone_heat_safe: 10, glass_media_smooth: 8, foam_stamp_cushion: 2,
  };
  return m[t];
}

export function durability(t: CraftMatType): number {
  const m: Record<CraftMatType, number> = {
    self_heal_cut_grid: 8, teflon_non_stick: 9, silicone_heat_safe: 7, glass_media_smooth: 10, foam_stamp_cushion: 4,
  };
  return m[t];
}

export function matCost(t: CraftMatType): number {
  const m: Record<CraftMatType, number> = {
    self_heal_cut_grid: 3, teflon_non_stick: 2, silicone_heat_safe: 2, glass_media_smooth: 4, foam_stamp_cushion: 1,
  };
  return m[t];
}

export function hasGrid(t: CraftMatType): boolean {
  const m: Record<CraftMatType, boolean> = {
    self_heal_cut_grid: true, teflon_non_stick: false, silicone_heat_safe: false, glass_media_smooth: false, foam_stamp_cushion: false,
  };
  return m[t];
}

export function washable(t: CraftMatType): boolean {
  const m: Record<CraftMatType, boolean> = {
    self_heal_cut_grid: false, teflon_non_stick: true, silicone_heat_safe: true, glass_media_smooth: true, foam_stamp_cushion: false,
  };
  return m[t];
}

export function matSurface(t: CraftMatType): string {
  const m: Record<CraftMatType, string> = {
    self_heal_cut_grid: "pvc_self_healing",
    teflon_non_stick: "ptfe_coated_sheet",
    silicone_heat_safe: "silicone_flexible_sheet",
    glass_media_smooth: "tempered_glass_flat",
    foam_stamp_cushion: "eva_foam_soft",
  };
  return m[t];
}

export function bestUse(t: CraftMatType): string {
  const m: Record<CraftMatType, string> = {
    self_heal_cut_grid: "precision_cutting_measure",
    teflon_non_stick: "iron_adhesive_release",
    silicone_heat_safe: "heat_emboss_protect",
    glass_media_smooth: "mixed_media_palette",
    foam_stamp_cushion: "stamp_press_cushion",
  };
  return m[t];
}

export function craftMats(): CraftMatType[] {
  return ["self_heal_cut_grid", "teflon_non_stick", "silicone_heat_safe", "glass_media_smooth", "foam_stamp_cushion"];
}
