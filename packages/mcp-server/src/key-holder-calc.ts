export type KeyHolderType = "wall_mount_row" | "magnetic_strip_bar" | "cabinet_box_lockable" | "valet_tray_drop" | "smart_tracker_tile";

export function keyCapacity(t: KeyHolderType): number {
  const m: Record<KeyHolderType, number> = {
    wall_mount_row: 8, magnetic_strip_bar: 6, cabinet_box_lockable: 10, valet_tray_drop: 5, smart_tracker_tile: 1,
  };
  return m[t];
}

export function accessibility(t: KeyHolderType): number {
  const m: Record<KeyHolderType, number> = {
    wall_mount_row: 9, magnetic_strip_bar: 10, cabinet_box_lockable: 5, valet_tray_drop: 8, smart_tracker_tile: 7,
  };
  return m[t];
}

export function security(t: KeyHolderType): number {
  const m: Record<KeyHolderType, number> = {
    wall_mount_row: 3, magnetic_strip_bar: 2, cabinet_box_lockable: 10, valet_tray_drop: 2, smart_tracker_tile: 8,
  };
  return m[t];
}

export function aesthetics(t: KeyHolderType): number {
  const m: Record<KeyHolderType, number> = {
    wall_mount_row: 7, magnetic_strip_bar: 8, cabinet_box_lockable: 6, valet_tray_drop: 9, smart_tracker_tile: 5,
  };
  return m[t];
}

export function holderCost(t: KeyHolderType): number {
  const m: Record<KeyHolderType, number> = {
    wall_mount_row: 3, magnetic_strip_bar: 4, cabinet_box_lockable: 6, valet_tray_drop: 5, smart_tracker_tile: 7,
  };
  return m[t];
}

export function holdsExtras(t: KeyHolderType): boolean {
  const m: Record<KeyHolderType, boolean> = {
    wall_mount_row: false, magnetic_strip_bar: false, cabinet_box_lockable: true, valet_tray_drop: true, smart_tracker_tile: false,
  };
  return m[t];
}

export function findable(t: KeyHolderType): boolean {
  const m: Record<KeyHolderType, boolean> = {
    wall_mount_row: false, magnetic_strip_bar: false, cabinet_box_lockable: false, valet_tray_drop: false, smart_tracker_tile: true,
  };
  return m[t];
}

export function holderMaterial(t: KeyHolderType): string {
  const m: Record<KeyHolderType, string> = {
    wall_mount_row: "powder_coated_steel",
    magnetic_strip_bar: "neodymium_walnut_bar",
    cabinet_box_lockable: "pine_cabinet_glass_door",
    valet_tray_drop: "leather_lined_catchall",
    smart_tracker_tile: "bluetooth_abs_fob",
  };
  return m[t];
}

export function bestUser(t: KeyHolderType): string {
  const m: Record<KeyHolderType, string> = {
    wall_mount_row: "family_entryway_multiple",
    magnetic_strip_bar: "minimalist_modern_quick",
    cabinet_box_lockable: "property_manager_office",
    valet_tray_drop: "nightstand_pocket_empty",
    smart_tracker_tile: "forgetful_always_losing",
  };
  return m[t];
}

export function keyHolders(): KeyHolderType[] {
  return ["wall_mount_row", "magnetic_strip_bar", "cabinet_box_lockable", "valet_tray_drop", "smart_tracker_tile"];
}
