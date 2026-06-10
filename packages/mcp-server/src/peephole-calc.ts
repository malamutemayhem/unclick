export type PeepholeType = "optical_wide_angle" | "digital_screen" | "smart_wifi_camera" | "door_scope_extender" | "fiber_optic_tube";

export function viewAngle(t: PeepholeType): number {
  const m: Record<PeepholeType, number> = {
    optical_wide_angle: 8, digital_screen: 7, smart_wifi_camera: 10, door_scope_extender: 6, fiber_optic_tube: 5,
  };
  return m[t];
}

export function imageClarity(t: PeepholeType): number {
  const m: Record<PeepholeType, number> = {
    optical_wide_angle: 6, digital_screen: 8, smart_wifi_camera: 10, door_scope_extender: 5, fiber_optic_tube: 4,
  };
  return m[t];
}

export function nightVision(t: PeepholeType): number {
  const m: Record<PeepholeType, number> = {
    optical_wide_angle: 1, digital_screen: 6, smart_wifi_camera: 10, door_scope_extender: 1, fiber_optic_tube: 2,
  };
  return m[t];
}

export function installEase(t: PeepholeType): number {
  const m: Record<PeepholeType, number> = {
    optical_wide_angle: 9, digital_screen: 7, smart_wifi_camera: 5, door_scope_extender: 8, fiber_optic_tube: 4,
  };
  return m[t];
}

export function peepholeCost(t: PeepholeType): number {
  const m: Record<PeepholeType, number> = {
    optical_wide_angle: 1, digital_screen: 4, smart_wifi_camera: 8, door_scope_extender: 2, fiber_optic_tube: 5,
  };
  return m[t];
}

export function needsPower(t: PeepholeType): boolean {
  const m: Record<PeepholeType, boolean> = {
    optical_wide_angle: false, digital_screen: true, smart_wifi_camera: true, door_scope_extender: false, fiber_optic_tube: false,
  };
  return m[t];
}

export function recordsVideo(t: PeepholeType): boolean {
  const m: Record<PeepholeType, boolean> = {
    optical_wide_angle: false, digital_screen: false, smart_wifi_camera: true, door_scope_extender: false, fiber_optic_tube: false,
  };
  return m[t];
}

export function lensType(t: PeepholeType): string {
  const m: Record<PeepholeType, string> = {
    optical_wide_angle: "fisheye_glass_200deg",
    digital_screen: "cmos_sensor_lcd_display",
    smart_wifi_camera: "hd_camera_wifi_stream",
    door_scope_extender: "relay_lens_long_barrel",
    fiber_optic_tube: "coherent_fiber_bundle",
  };
  return m[t];
}

export function bestDoor(t: PeepholeType): string {
  const m: Record<PeepholeType, string> = {
    optical_wide_angle: "standard_apartment_entry",
    digital_screen: "elderly_accessible_home",
    smart_wifi_camera: "smart_home_security",
    door_scope_extender: "thick_commercial_door",
    fiber_optic_tube: "reinforced_steel_door",
  };
  return m[t];
}

export function peepholes(): PeepholeType[] {
  return ["optical_wide_angle", "digital_screen", "smart_wifi_camera", "door_scope_extender", "fiber_optic_tube"];
}
