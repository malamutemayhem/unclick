export type SmartBulbType = "wifi_color_rgb" | "zigbee_white_tunable" | "bluetooth_simple_dim" | "filament_vintage_smart" | "flood_outdoor_spot";

export function colorRange(t: SmartBulbType): number {
  const m: Record<SmartBulbType, number> = {
    wifi_color_rgb: 10, zigbee_white_tunable: 5, bluetooth_simple_dim: 3, filament_vintage_smart: 4, flood_outdoor_spot: 7,
  };
  return m[t];
}

export function brightness(t: SmartBulbType): number {
  const m: Record<SmartBulbType, number> = {
    wifi_color_rgb: 8, zigbee_white_tunable: 9, bluetooth_simple_dim: 6, filament_vintage_smart: 5, flood_outdoor_spot: 10,
  };
  return m[t];
}

export function setupEase(t: SmartBulbType): number {
  const m: Record<SmartBulbType, number> = {
    wifi_color_rgb: 7, zigbee_white_tunable: 5, bluetooth_simple_dim: 10, filament_vintage_smart: 7, flood_outdoor_spot: 6,
  };
  return m[t];
}

export function energyEfficiency(t: SmartBulbType): number {
  const m: Record<SmartBulbType, number> = {
    wifi_color_rgb: 7, zigbee_white_tunable: 9, bluetooth_simple_dim: 8, filament_vintage_smart: 6, flood_outdoor_spot: 7,
  };
  return m[t];
}

export function bulbCost(t: SmartBulbType): number {
  const m: Record<SmartBulbType, number> = {
    wifi_color_rgb: 5, zigbee_white_tunable: 4, bluetooth_simple_dim: 2, filament_vintage_smart: 5, flood_outdoor_spot: 6,
  };
  return m[t];
}

export function needsHub(t: SmartBulbType): boolean {
  const m: Record<SmartBulbType, boolean> = {
    wifi_color_rgb: false, zigbee_white_tunable: true, bluetooth_simple_dim: false, filament_vintage_smart: false, flood_outdoor_spot: false,
  };
  return m[t];
}

export function weatherRated(t: SmartBulbType): boolean {
  const m: Record<SmartBulbType, boolean> = {
    wifi_color_rgb: false, zigbee_white_tunable: false, bluetooth_simple_dim: false, filament_vintage_smart: false, flood_outdoor_spot: true,
  };
  return m[t];
}

export function connectType(t: SmartBulbType): string {
  const m: Record<SmartBulbType, string> = {
    wifi_color_rgb: "wifi_direct_cloud",
    zigbee_white_tunable: "zigbee_mesh_hub",
    bluetooth_simple_dim: "bluetooth_le_local",
    filament_vintage_smart: "wifi_edison_style",
    flood_outdoor_spot: "wifi_ip65_rated",
  };
  return m[t];
}

export function bestRoom(t: SmartBulbType): string {
  const m: Record<SmartBulbType, string> = {
    wifi_color_rgb: "living_room_mood_party",
    zigbee_white_tunable: "whole_home_automation",
    bluetooth_simple_dim: "bedroom_simple_control",
    filament_vintage_smart: "exposed_fixture_cafe",
    flood_outdoor_spot: "porch_yard_security",
  };
  return m[t];
}

export function smartBulbs(): SmartBulbType[] {
  return ["wifi_color_rgb", "zigbee_white_tunable", "bluetooth_simple_dim", "filament_vintage_smart", "flood_outdoor_spot"];
}
