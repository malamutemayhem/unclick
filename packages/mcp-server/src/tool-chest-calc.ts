export type ToolChestType = "rolling_cabinet" | "top_chest_stack" | "portable_carry_box" | "wall_mount_panel" | "soft_bag_tote";

export function storageCapacity(t: ToolChestType): number {
  const m: Record<ToolChestType, number> = {
    rolling_cabinet: 10, top_chest_stack: 8, portable_carry_box: 4, wall_mount_panel: 6, soft_bag_tote: 3,
  };
  return m[t];
}

export function organization(t: ToolChestType): number {
  const m: Record<ToolChestType, number> = {
    rolling_cabinet: 9, top_chest_stack: 8, portable_carry_box: 6, wall_mount_panel: 10, soft_bag_tote: 4,
  };
  return m[t];
}

export function portability(t: ToolChestType): number {
  const m: Record<ToolChestType, number> = {
    rolling_cabinet: 5, top_chest_stack: 2, portable_carry_box: 9, wall_mount_panel: 1, soft_bag_tote: 10,
  };
  return m[t];
}

export function security(t: ToolChestType): number {
  const m: Record<ToolChestType, number> = {
    rolling_cabinet: 9, top_chest_stack: 8, portable_carry_box: 6, wall_mount_panel: 3, soft_bag_tote: 2,
  };
  return m[t];
}

export function chestCost(t: ToolChestType): number {
  const m: Record<ToolChestType, number> = {
    rolling_cabinet: 8, top_chest_stack: 6, portable_carry_box: 3, wall_mount_panel: 4, soft_bag_tote: 2,
  };
  return m[t];
}

export function lockable(t: ToolChestType): boolean {
  const m: Record<ToolChestType, boolean> = {
    rolling_cabinet: true, top_chest_stack: true, portable_carry_box: true, wall_mount_panel: false, soft_bag_tote: false,
  };
  return m[t];
}

export function hasWheels(t: ToolChestType): boolean {
  const m: Record<ToolChestType, boolean> = {
    rolling_cabinet: true, top_chest_stack: false, portable_carry_box: false, wall_mount_panel: false, soft_bag_tote: false,
  };
  return m[t];
}

export function drawerType(t: ToolChestType): string {
  const m: Record<ToolChestType, string> = {
    rolling_cabinet: "ball_bearing_slide_deep",
    top_chest_stack: "ball_bearing_slide_shallow",
    portable_carry_box: "cantilever_tray_fold",
    wall_mount_panel: "pegboard_hook_slot",
    soft_bag_tote: "zippered_pocket_divider",
  };
  return m[t];
}

export function bestUser(t: ToolChestType): string {
  const m: Record<ToolChestType, string> = {
    rolling_cabinet: "professional_mechanic_garage",
    top_chest_stack: "home_workshop_hobbyist",
    portable_carry_box: "onsite_repair_technician",
    wall_mount_panel: "small_shop_visible_access",
    soft_bag_tote: "handyman_house_call",
  };
  return m[t];
}

export function toolChests(): ToolChestType[] {
  return ["rolling_cabinet", "top_chest_stack", "portable_carry_box", "wall_mount_panel", "soft_bag_tote"];
}
