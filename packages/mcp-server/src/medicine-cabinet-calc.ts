export type MedicineCabinetType = "recessed_mirror" | "surface_mount_basic" | "corner_triangle" | "lighted_led_mirror" | "open_shelf_modern";

export function storageCapacity(t: MedicineCabinetType): number {
  const m: Record<MedicineCabinetType, number> = {
    recessed_mirror: 8, surface_mount_basic: 7, corner_triangle: 5, lighted_led_mirror: 6, open_shelf_modern: 4,
  };
  return m[t];
}

export function installEase(t: MedicineCabinetType): number {
  const m: Record<MedicineCabinetType, number> = {
    recessed_mirror: 3, surface_mount_basic: 9, corner_triangle: 5, lighted_led_mirror: 4, open_shelf_modern: 8,
  };
  return m[t];
}

export function mirrorQuality(t: MedicineCabinetType): number {
  const m: Record<MedicineCabinetType, number> = {
    recessed_mirror: 8, surface_mount_basic: 6, corner_triangle: 5, lighted_led_mirror: 10, open_shelf_modern: 1,
  };
  return m[t];
}

export function aestheticClean(t: MedicineCabinetType): number {
  const m: Record<MedicineCabinetType, number> = {
    recessed_mirror: 9, surface_mount_basic: 5, corner_triangle: 6, lighted_led_mirror: 10, open_shelf_modern: 8,
  };
  return m[t];
}

export function cabinetCost(t: MedicineCabinetType): number {
  const m: Record<MedicineCabinetType, number> = {
    recessed_mirror: 6, surface_mount_basic: 3, corner_triangle: 4, lighted_led_mirror: 9, open_shelf_modern: 5,
  };
  return m[t];
}

export function flushMount(t: MedicineCabinetType): boolean {
  const m: Record<MedicineCabinetType, boolean> = {
    recessed_mirror: true, surface_mount_basic: false, corner_triangle: false, lighted_led_mirror: true, open_shelf_modern: false,
  };
  return m[t];
}

export function hasLighting(t: MedicineCabinetType): boolean {
  const m: Record<MedicineCabinetType, boolean> = {
    recessed_mirror: false, surface_mount_basic: false, corner_triangle: false, lighted_led_mirror: true, open_shelf_modern: false,
  };
  return m[t];
}

export function doorType(t: MedicineCabinetType): string {
  const m: Record<MedicineCabinetType, string> = {
    recessed_mirror: "single_mirror_swing",
    surface_mount_basic: "double_mirror_bi_fold",
    corner_triangle: "angled_mirror_pivot",
    lighted_led_mirror: "slow_close_mirror_touch",
    open_shelf_modern: "no_door_open_face",
  };
  return m[t];
}

export function bestBathroom(t: MedicineCabinetType): string {
  const m: Record<MedicineCabinetType, string> = {
    recessed_mirror: "master_bath_renovation",
    surface_mount_basic: "rental_quick_upgrade",
    corner_triangle: "small_powder_room",
    lighted_led_mirror: "luxury_spa_vanity",
    open_shelf_modern: "minimalist_display_bath",
  };
  return m[t];
}

export function medicineCabinets(): MedicineCabinetType[] {
  return ["recessed_mirror", "surface_mount_basic", "corner_triangle", "lighted_led_mirror", "open_shelf_modern"];
}
