export type ClosetDividerType = "shelf_divider_clip" | "hanging_organizer" | "drawer_insert_grid" | "door_hook_rack" | "modular_cube_system";

export function compartments(t: ClosetDividerType): number {
  const m: Record<ClosetDividerType, number> = {
    shelf_divider_clip: 4, hanging_organizer: 8, drawer_insert_grid: 9, door_hook_rack: 6, modular_cube_system: 10,
  };
  return m[t];
}

export function installEase(t: ClosetDividerType): number {
  const m: Record<ClosetDividerType, number> = {
    shelf_divider_clip: 10, hanging_organizer: 9, drawer_insert_grid: 7, door_hook_rack: 8, modular_cube_system: 4,
  };
  return m[t];
}

export function visibility(t: ClosetDividerType): number {
  const m: Record<ClosetDividerType, number> = {
    shelf_divider_clip: 8, hanging_organizer: 6, drawer_insert_grid: 5, door_hook_rack: 9, modular_cube_system: 7,
  };
  return m[t];
}

export function adjustability(t: ClosetDividerType): number {
  const m: Record<ClosetDividerType, number> = {
    shelf_divider_clip: 7, hanging_organizer: 3, drawer_insert_grid: 8, door_hook_rack: 4, modular_cube_system: 10,
  };
  return m[t];
}

export function dividerCost(t: ClosetDividerType): number {
  const m: Record<ClosetDividerType, number> = {
    shelf_divider_clip: 1, hanging_organizer: 3, drawer_insert_grid: 4, door_hook_rack: 2, modular_cube_system: 8,
  };
  return m[t];
}

export function toolFree(t: ClosetDividerType): boolean {
  const m: Record<ClosetDividerType, boolean> = {
    shelf_divider_clip: true, hanging_organizer: true, drawer_insert_grid: true, door_hook_rack: true, modular_cube_system: false,
  };
  return m[t];
}

export function expandable(t: ClosetDividerType): boolean {
  const m: Record<ClosetDividerType, boolean> = {
    shelf_divider_clip: false, hanging_organizer: false, drawer_insert_grid: true, door_hook_rack: false, modular_cube_system: true,
  };
  return m[t];
}

export function mountType(t: ClosetDividerType): string {
  const m: Record<ClosetDividerType, string> = {
    shelf_divider_clip: "clip_on_shelf_edge",
    hanging_organizer: "rod_hook_fabric_shelf",
    drawer_insert_grid: "drop_in_adjustable_wall",
    door_hook_rack: "over_door_metal_hook",
    modular_cube_system: "stack_connect_cube_frame",
  };
  return m[t];
}

export function bestCloset(t: ClosetDividerType): string {
  const m: Record<ClosetDividerType, string> = {
    shelf_divider_clip: "sweater_stack_shelf",
    hanging_organizer: "hanging_clothes_sort",
    drawer_insert_grid: "sock_underwear_drawer",
    door_hook_rack: "scarf_belt_accessory",
    modular_cube_system: "whole_closet_redesign",
  };
  return m[t];
}

export function closetDividers(): ClosetDividerType[] {
  return ["shelf_divider_clip", "hanging_organizer", "drawer_insert_grid", "door_hook_rack", "modular_cube_system"];
}
