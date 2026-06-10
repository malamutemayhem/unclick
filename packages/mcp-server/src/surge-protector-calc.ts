export type SurgeProtectorType = "basic_strip_joule" | "whole_house_panel" | "ups_battery_backup" | "travel_compact" | "rack_mount_server";

export function jouleRating(t: SurgeProtectorType): number {
  const m: Record<SurgeProtectorType, number> = {
    basic_strip_joule: 4, whole_house_panel: 10, ups_battery_backup: 7, travel_compact: 2, rack_mount_server: 9,
  };
  return m[t];
}

export function responseTime(t: SurgeProtectorType): number {
  const m: Record<SurgeProtectorType, number> = {
    basic_strip_joule: 6, whole_house_panel: 10, ups_battery_backup: 8, travel_compact: 5, rack_mount_server: 9,
  };
  return m[t];
}

export function clampingVoltage(t: SurgeProtectorType): number {
  const m: Record<SurgeProtectorType, number> = {
    basic_strip_joule: 5, whole_house_panel: 10, ups_battery_backup: 8, travel_compact: 4, rack_mount_server: 9,
  };
  return m[t];
}

export function portability(t: SurgeProtectorType): number {
  const m: Record<SurgeProtectorType, number> = {
    basic_strip_joule: 7, whole_house_panel: 1, ups_battery_backup: 3, travel_compact: 10, rack_mount_server: 1,
  };
  return m[t];
}

export function protectorCost(t: SurgeProtectorType): number {
  const m: Record<SurgeProtectorType, number> = {
    basic_strip_joule: 2, whole_house_panel: 8, ups_battery_backup: 7, travel_compact: 3, rack_mount_server: 10,
  };
  return m[t];
}

export function batteryBackup(t: SurgeProtectorType): boolean {
  const m: Record<SurgeProtectorType, boolean> = {
    basic_strip_joule: false, whole_house_panel: false, ups_battery_backup: true, travel_compact: false, rack_mount_server: true,
  };
  return m[t];
}

export function professionalInstall(t: SurgeProtectorType): boolean {
  const m: Record<SurgeProtectorType, boolean> = {
    basic_strip_joule: false, whole_house_panel: true, ups_battery_backup: false, travel_compact: false, rack_mount_server: true,
  };
  return m[t];
}

export function protectionScope(t: SurgeProtectorType): string {
  const m: Record<SurgeProtectorType, string> = {
    basic_strip_joule: "single_outlet_strip",
    whole_house_panel: "entire_electrical_panel",
    ups_battery_backup: "critical_device_runtime",
    travel_compact: "portable_single_device",
    rack_mount_server: "server_rack_19_inch",
  };
  return m[t];
}

export function bestUse(t: SurgeProtectorType): string {
  const m: Record<SurgeProtectorType, string> = {
    basic_strip_joule: "general_home_electronics",
    whole_house_panel: "lightning_prone_region",
    ups_battery_backup: "pc_nas_graceful_shutdown",
    travel_compact: "hotel_laptop_phone",
    rack_mount_server: "data_center_server_room",
  };
  return m[t];
}

export function surgeProtectors(): SurgeProtectorType[] {
  return ["basic_strip_joule", "whole_house_panel", "ups_battery_backup", "travel_compact", "rack_mount_server"];
}
