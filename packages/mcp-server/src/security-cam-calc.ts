export type SecurityCamType = "indoor_wifi" | "outdoor_poe" | "ptz_dome" | "doorbell_cam" | "floodlight_cam";

export function videoResolution(t: SecurityCamType): number {
  const m: Record<SecurityCamType, number> = {
    indoor_wifi: 6, outdoor_poe: 9, ptz_dome: 10, doorbell_cam: 7, floodlight_cam: 8,
  };
  return m[t];
}

export function nightVision(t: SecurityCamType): number {
  const m: Record<SecurityCamType, number> = {
    indoor_wifi: 5, outdoor_poe: 9, ptz_dome: 10, doorbell_cam: 6, floodlight_cam: 8,
  };
  return m[t];
}

export function fieldOfView(t: SecurityCamType): number {
  const m: Record<SecurityCamType, number> = {
    indoor_wifi: 7, outdoor_poe: 6, ptz_dome: 10, doorbell_cam: 8, floodlight_cam: 7,
  };
  return m[t];
}

export function weatherResistance(t: SecurityCamType): number {
  const m: Record<SecurityCamType, number> = {
    indoor_wifi: 1, outdoor_poe: 10, ptz_dome: 9, doorbell_cam: 7, floodlight_cam: 9,
  };
  return m[t];
}

export function camCost(t: SecurityCamType): number {
  const m: Record<SecurityCamType, number> = {
    indoor_wifi: 2, outdoor_poe: 6, ptz_dome: 10, doorbell_cam: 4, floodlight_cam: 7,
  };
  return m[t];
}

export function twoWayAudio(t: SecurityCamType): boolean {
  const m: Record<SecurityCamType, boolean> = {
    indoor_wifi: true, outdoor_poe: false, ptz_dome: true, doorbell_cam: true, floodlight_cam: true,
  };
  return m[t];
}

export function localStorage(t: SecurityCamType): boolean {
  const m: Record<SecurityCamType, boolean> = {
    indoor_wifi: true, outdoor_poe: true, ptz_dome: true, doorbell_cam: false, floodlight_cam: false,
  };
  return m[t];
}

export function connectionType(t: SecurityCamType): string {
  const m: Record<SecurityCamType, string> = {
    indoor_wifi: "wifi_24ghz_5ghz", outdoor_poe: "poe_ethernet_cat6",
    ptz_dome: "poe_plus_high_power", doorbell_cam: "wifi_battery_wired",
    floodlight_cam: "wifi_hardwired_120v",
  };
  return m[t];
}

export function bestLocation(t: SecurityCamType): string {
  const m: Record<SecurityCamType, string> = {
    indoor_wifi: "baby_monitor_pet_watch", outdoor_poe: "perimeter_driveway_garage",
    ptz_dome: "large_lot_parking_area", doorbell_cam: "front_door_package_theft",
    floodlight_cam: "backyard_dark_alley",
  };
  return m[t];
}

export function securityCams(): SecurityCamType[] {
  return ["indoor_wifi", "outdoor_poe", "ptz_dome", "doorbell_cam", "floodlight_cam"];
}
