export type SpiceRackType = "tiered_shelf_step" | "lazy_susan_turntable" | "magnetic_wall_strip" | "drawer_insert_angled" | "pull_down_cabinet";

export function capacity(t: SpiceRackType): number {
  const m: Record<SpiceRackType, number> = {
    tiered_shelf_step: 7, lazy_susan_turntable: 8, magnetic_wall_strip: 5, drawer_insert_angled: 9, pull_down_cabinet: 10,
  };
  return m[t];
}

export function visibility(t: SpiceRackType): number {
  const m: Record<SpiceRackType, number> = {
    tiered_shelf_step: 8, lazy_susan_turntable: 7, magnetic_wall_strip: 10, drawer_insert_angled: 9, pull_down_cabinet: 6,
  };
  return m[t];
}

export function accessEase(t: SpiceRackType): number {
  const m: Record<SpiceRackType, number> = {
    tiered_shelf_step: 6, lazy_susan_turntable: 9, magnetic_wall_strip: 10, drawer_insert_angled: 8, pull_down_cabinet: 7,
  };
  return m[t];
}

export function counterSpace(t: SpiceRackType): number {
  const m: Record<SpiceRackType, number> = {
    tiered_shelf_step: 4, lazy_susan_turntable: 5, magnetic_wall_strip: 10, drawer_insert_angled: 10, pull_down_cabinet: 10,
  };
  return m[t];
}

export function rackCost(t: SpiceRackType): number {
  const m: Record<SpiceRackType, number> = {
    tiered_shelf_step: 2, lazy_susan_turntable: 3, magnetic_wall_strip: 4, drawer_insert_angled: 5, pull_down_cabinet: 8,
  };
  return m[t];
}

export function noInstall(t: SpiceRackType): boolean {
  const m: Record<SpiceRackType, boolean> = {
    tiered_shelf_step: true, lazy_susan_turntable: true, magnetic_wall_strip: false, drawer_insert_angled: true, pull_down_cabinet: false,
  };
  return m[t];
}

export function expandable(t: SpiceRackType): boolean {
  const m: Record<SpiceRackType, boolean> = {
    tiered_shelf_step: true, lazy_susan_turntable: false, magnetic_wall_strip: true, drawer_insert_angled: false, pull_down_cabinet: false,
  };
  return m[t];
}

export function mountStyle(t: SpiceRackType): string {
  const m: Record<SpiceRackType, string> = {
    tiered_shelf_step: "freestanding_step_shelf",
    lazy_susan_turntable: "cabinet_turntable_spin",
    magnetic_wall_strip: "magnetic_bar_wall_screw",
    drawer_insert_angled: "drop_in_drawer_angled",
    pull_down_cabinet: "hinge_mount_upper_cab",
  };
  return m[t];
}

export function bestKitchen(t: SpiceRackType): string {
  const m: Record<SpiceRackType, string> = {
    tiered_shelf_step: "pantry_shelf_basic",
    lazy_susan_turntable: "deep_cabinet_corner",
    magnetic_wall_strip: "small_kitchen_wall",
    drawer_insert_angled: "modern_drawer_pullout",
    pull_down_cabinet: "tall_cabinet_hard_reach",
  };
  return m[t];
}

export function spiceRacks(): SpiceRackType[] {
  return ["tiered_shelf_step", "lazy_susan_turntable", "magnetic_wall_strip", "drawer_insert_angled", "pull_down_cabinet"];
}
