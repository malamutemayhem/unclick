export type DocumentHolderType = "inline_between_keyboard_monitor" | "freestanding_easel_desk" | "monitor_clip_side_attach" | "slant_board_angled" | "arm_mount_adjustable";

export function neckRelief(t: DocumentHolderType): number {
  const m: Record<DocumentHolderType, number> = {
    inline_between_keyboard_monitor: 10, freestanding_easel_desk: 7, monitor_clip_side_attach: 9, slant_board_angled: 6, arm_mount_adjustable: 9,
  };
  return m[t];
}

export function pageCapacity(t: DocumentHolderType): number {
  const m: Record<DocumentHolderType, number> = {
    inline_between_keyboard_monitor: 5, freestanding_easel_desk: 8, monitor_clip_side_attach: 3, slant_board_angled: 10, arm_mount_adjustable: 6,
  };
  return m[t];
}

export function deskFootprint(t: DocumentHolderType): number {
  const m: Record<DocumentHolderType, number> = {
    inline_between_keyboard_monitor: 4, freestanding_easel_desk: 5, monitor_clip_side_attach: 10, slant_board_angled: 3, arm_mount_adjustable: 9,
  };
  return m[t];
}

export function stability(t: DocumentHolderType): number {
  const m: Record<DocumentHolderType, number> = {
    inline_between_keyboard_monitor: 8, freestanding_easel_desk: 7, monitor_clip_side_attach: 6, slant_board_angled: 9, arm_mount_adjustable: 8,
  };
  return m[t];
}

export function holderCost(t: DocumentHolderType): number {
  const m: Record<DocumentHolderType, number> = {
    inline_between_keyboard_monitor: 3, freestanding_easel_desk: 2, monitor_clip_side_attach: 2, slant_board_angled: 2, arm_mount_adjustable: 4,
  };
  return m[t];
}

export function adjustableAngle(t: DocumentHolderType): boolean {
  const m: Record<DocumentHolderType, boolean> = {
    inline_between_keyboard_monitor: true, freestanding_easel_desk: true, monitor_clip_side_attach: false, slant_board_angled: true, arm_mount_adjustable: true,
  };
  return m[t];
}

export function attachToMonitor(t: DocumentHolderType): boolean {
  const m: Record<DocumentHolderType, boolean> = {
    inline_between_keyboard_monitor: false, freestanding_easel_desk: false, monitor_clip_side_attach: true, slant_board_angled: false, arm_mount_adjustable: false,
  };
  return m[t];
}

export function holdStyle(t: DocumentHolderType): string {
  const m: Record<DocumentHolderType, string> = {
    inline_between_keyboard_monitor: "platform_raised_shelf",
    freestanding_easel_desk: "wire_easel_clip",
    monitor_clip_side_attach: "spring_clip_arm",
    slant_board_angled: "tilted_surface_lip",
    arm_mount_adjustable: "articulating_arm_clamp",
  };
  return m[t];
}

export function bestTask(t: DocumentHolderType): string {
  const m: Record<DocumentHolderType, string> = {
    inline_between_keyboard_monitor: "data_entry_typing",
    freestanding_easel_desk: "reference_reading",
    monitor_clip_side_attach: "dual_monitor_cramped",
    slant_board_angled: "drafting_sketching",
    arm_mount_adjustable: "multi_position_flex",
  };
  return m[t];
}

export function documentHolders(): DocumentHolderType[] {
  return ["inline_between_keyboard_monitor", "freestanding_easel_desk", "monitor_clip_side_attach", "slant_board_angled", "arm_mount_adjustable"];
}
