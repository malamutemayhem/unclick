export type CoatHookType = "wall_mount_single" | "over_door_hanger" | "rail_multi_hook" | "adhesive_stick_on" | "freestanding_tree_rack";

export function holdingCapacity(t: CoatHookType): number {
  const m: Record<CoatHookType, number> = {
    wall_mount_single: 6, over_door_hanger: 5, rail_multi_hook: 9, adhesive_stick_on: 3, freestanding_tree_rack: 10,
  };
  return m[t];
}

export function installEase(t: CoatHookType): number {
  const m: Record<CoatHookType, number> = {
    wall_mount_single: 5, over_door_hanger: 10, rail_multi_hook: 4, adhesive_stick_on: 9, freestanding_tree_rack: 10,
  };
  return m[t];
}

export function durability(t: CoatHookType): number {
  const m: Record<CoatHookType, number> = {
    wall_mount_single: 9, over_door_hanger: 6, rail_multi_hook: 8, adhesive_stick_on: 4, freestanding_tree_rack: 7,
  };
  return m[t];
}

export function spaceEfficiency(t: CoatHookType): number {
  const m: Record<CoatHookType, number> = {
    wall_mount_single: 8, over_door_hanger: 9, rail_multi_hook: 7, adhesive_stick_on: 10, freestanding_tree_rack: 3,
  };
  return m[t];
}

export function hookCost(t: CoatHookType): number {
  const m: Record<CoatHookType, number> = {
    wall_mount_single: 3, over_door_hanger: 4, rail_multi_hook: 6, adhesive_stick_on: 2, freestanding_tree_rack: 7,
  };
  return m[t];
}

export function noDrilling(t: CoatHookType): boolean {
  const m: Record<CoatHookType, boolean> = {
    wall_mount_single: false, over_door_hanger: true, rail_multi_hook: false, adhesive_stick_on: true, freestanding_tree_rack: true,
  };
  return m[t];
}

export function foldFlat(t: CoatHookType): boolean {
  const m: Record<CoatHookType, boolean> = {
    wall_mount_single: true, over_door_hanger: false, rail_multi_hook: false, adhesive_stick_on: false, freestanding_tree_rack: false,
  };
  return m[t];
}

export function hookMaterial(t: CoatHookType): string {
  const m: Record<CoatHookType, string> = {
    wall_mount_single: "brushed_stainless_steel",
    over_door_hanger: "chrome_plated_wire",
    rail_multi_hook: "cast_iron_industrial",
    adhesive_stick_on: "abs_plastic_3m_tape",
    freestanding_tree_rack: "solid_wood_oak",
  };
  return m[t];
}

export function bestSpace(t: CoatHookType): string {
  const m: Record<CoatHookType, string> = {
    wall_mount_single: "entryway_permanent_hallway",
    over_door_hanger: "rental_apartment_dorm",
    rail_multi_hook: "mudroom_family_entry",
    adhesive_stick_on: "bathroom_kitchen_light",
    freestanding_tree_rack: "office_lobby_reception",
  };
  return m[t];
}

export function coatHooks(): CoatHookType[] {
  return ["wall_mount_single", "over_door_hanger", "rail_multi_hook", "adhesive_stick_on", "freestanding_tree_rack"];
}
