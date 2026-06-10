export type WhiteboardType = "wall_mount_steel" | "glass_frameless" | "mobile_rolling" | "desktop_small" | "smart_digital";

export function writeSurface(t: WhiteboardType): number {
  const m: Record<WhiteboardType, number> = {
    wall_mount_steel: 8, glass_frameless: 10, mobile_rolling: 7, desktop_small: 6, smart_digital: 9,
  };
  return m[t];
}

export function eraseClean(t: WhiteboardType): number {
  const m: Record<WhiteboardType, number> = {
    wall_mount_steel: 6, glass_frameless: 10, mobile_rolling: 7, desktop_small: 7, smart_digital: 10,
  };
  return m[t];
}

export function boardSize(t: WhiteboardType): number {
  const m: Record<WhiteboardType, number> = {
    wall_mount_steel: 9, glass_frameless: 8, mobile_rolling: 9, desktop_small: 2, smart_digital: 7,
  };
  return m[t];
}

export function portabilityScore(t: WhiteboardType): number {
  const m: Record<WhiteboardType, number> = {
    wall_mount_steel: 1, glass_frameless: 1, mobile_rolling: 8, desktop_small: 10, smart_digital: 5,
  };
  return m[t];
}

export function boardCost(t: WhiteboardType): number {
  const m: Record<WhiteboardType, number> = {
    wall_mount_steel: 4, glass_frameless: 7, mobile_rolling: 6, desktop_small: 2, smart_digital: 10,
  };
  return m[t];
}

export function magnetic(t: WhiteboardType): boolean {
  const m: Record<WhiteboardType, boolean> = {
    wall_mount_steel: true, glass_frameless: true, mobile_rolling: true, desktop_small: false, smart_digital: false,
  };
  return m[t];
}

export function savesDigital(t: WhiteboardType): boolean {
  const m: Record<WhiteboardType, boolean> = {
    wall_mount_steel: false, glass_frameless: false, mobile_rolling: false, desktop_small: false, smart_digital: true,
  };
  return m[t];
}

export function surfaceMaterial(t: WhiteboardType): string {
  const m: Record<WhiteboardType, string> = {
    wall_mount_steel: "melamine_coated_steel",
    glass_frameless: "tempered_glass_panel",
    mobile_rolling: "porcelain_enamel_steel",
    desktop_small: "acrylic_plastic_sheet",
    smart_digital: "lcd_touch_screen",
  };
  return m[t];
}

export function bestRoom(t: WhiteboardType): string {
  const m: Record<WhiteboardType, string> = {
    wall_mount_steel: "classroom_permanent_wall",
    glass_frameless: "modern_office_aesthetic",
    mobile_rolling: "meeting_room_flexible",
    desktop_small: "personal_desk_notes",
    smart_digital: "remote_team_collaboration",
  };
  return m[t];
}

export function whiteboards(): WhiteboardType[] {
  return ["wall_mount_steel", "glass_frameless", "mobile_rolling", "desktop_small", "smart_digital"];
}
