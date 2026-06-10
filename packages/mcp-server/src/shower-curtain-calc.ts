export type ShowerCurtainType = "fabric_polyester" | "vinyl_peva" | "linen_cotton" | "glass_panel_fixed" | "hookless_snap";

export function waterResistance(t: ShowerCurtainType): number {
  const m: Record<ShowerCurtainType, number> = {
    fabric_polyester: 7, vinyl_peva: 10, linen_cotton: 3, glass_panel_fixed: 10, hookless_snap: 8,
  };
  return m[t];
}

export function styleAppeal(t: ShowerCurtainType): number {
  const m: Record<ShowerCurtainType, number> = {
    fabric_polyester: 7, vinyl_peva: 4, linen_cotton: 9, glass_panel_fixed: 10, hookless_snap: 6,
  };
  return m[t];
}

export function easyClean(t: ShowerCurtainType): number {
  const m: Record<ShowerCurtainType, number> = {
    fabric_polyester: 8, vinyl_peva: 6, linen_cotton: 4, glass_panel_fixed: 9, hookless_snap: 10,
  };
  return m[t];
}

export function airflow(t: ShowerCurtainType): number {
  const m: Record<ShowerCurtainType, number> = {
    fabric_polyester: 7, vinyl_peva: 3, linen_cotton: 10, glass_panel_fixed: 2, hookless_snap: 6,
  };
  return m[t];
}

export function curtainCost(t: ShowerCurtainType): number {
  const m: Record<ShowerCurtainType, number> = {
    fabric_polyester: 3, vinyl_peva: 1, linen_cotton: 5, glass_panel_fixed: 10, hookless_snap: 4,
  };
  return m[t];
}

export function machineWash(t: ShowerCurtainType): boolean {
  const m: Record<ShowerCurtainType, boolean> = {
    fabric_polyester: true, vinyl_peva: false, linen_cotton: true, glass_panel_fixed: false, hookless_snap: true,
  };
  return m[t];
}

export function needsLiner(t: ShowerCurtainType): boolean {
  const m: Record<ShowerCurtainType, boolean> = {
    fabric_polyester: false, vinyl_peva: false, linen_cotton: true, glass_panel_fixed: false, hookless_snap: false,
  };
  return m[t];
}

export function hangMethod(t: ShowerCurtainType): string {
  const m: Record<ShowerCurtainType, string> = {
    fabric_polyester: "grommet_ring_rod",
    vinyl_peva: "hook_hole_ring",
    linen_cotton: "tab_top_clip_ring",
    glass_panel_fixed: "hinge_mount_frameless",
    hookless_snap: "built_in_hook_snap_liner",
  };
  return m[t];
}

export function bestBathroom(t: ShowerCurtainType): string {
  const m: Record<ShowerCurtainType, string> = {
    fabric_polyester: "everyday_pattern_color",
    vinyl_peva: "budget_rental_quick",
    linen_cotton: "spa_farmhouse_natural",
    glass_panel_fixed: "modern_walk_in_remodel",
    hookless_snap: "hotel_quick_change",
  };
  return m[t];
}

export function showerCurtains(): ShowerCurtainType[] {
  return ["fabric_polyester", "vinyl_peva", "linen_cotton", "glass_panel_fixed", "hookless_snap"];
}
