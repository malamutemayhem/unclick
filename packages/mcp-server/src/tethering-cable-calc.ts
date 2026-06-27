export type TetheringCableType = "usb_c_high_speed" | "usb_a_standard_legacy" | "thunderbolt_max_throughput" | "right_angle_low_profile" | "coiled_stretch_flexible";

export function transferSpeed(t: TetheringCableType): number {
  const m: Record<TetheringCableType, number> = {
    usb_c_high_speed: 9, usb_a_standard_legacy: 5, thunderbolt_max_throughput: 10, right_angle_low_profile: 8, coiled_stretch_flexible: 7,
  };
  return m[t];
}

export function cableReliability(t: TetheringCableType): number {
  const m: Record<TetheringCableType, number> = {
    usb_c_high_speed: 8, usb_a_standard_legacy: 7, thunderbolt_max_throughput: 9, right_angle_low_profile: 8, coiled_stretch_flexible: 7,
  };
  return m[t];
}

export function flexibility(t: TetheringCableType): number {
  const m: Record<TetheringCableType, number> = {
    usb_c_high_speed: 7, usb_a_standard_legacy: 7, thunderbolt_max_throughput: 5, right_angle_low_profile: 6, coiled_stretch_flexible: 10,
  };
  return m[t];
}

export function portStress(t: TetheringCableType): number {
  const m: Record<TetheringCableType, number> = {
    usb_c_high_speed: 6, usb_a_standard_legacy: 5, thunderbolt_max_throughput: 6, right_angle_low_profile: 10, coiled_stretch_flexible: 8,
  };
  return m[t];
}

export function cableCost(t: TetheringCableType): number {
  const m: Record<TetheringCableType, number> = {
    usb_c_high_speed: 2, usb_a_standard_legacy: 1, thunderbolt_max_throughput: 3, right_angle_low_profile: 2, coiled_stretch_flexible: 2,
  };
  return m[t];
}

export function powersCamera(t: TetheringCableType): boolean {
  const m: Record<TetheringCableType, boolean> = {
    usb_c_high_speed: true, usb_a_standard_legacy: false, thunderbolt_max_throughput: true, right_angle_low_profile: true, coiled_stretch_flexible: false,
  };
  return m[t];
}

export function lockingConnector(t: TetheringCableType): boolean {
  const m: Record<TetheringCableType, boolean> = {
    usb_c_high_speed: false, usb_a_standard_legacy: false, thunderbolt_max_throughput: true, right_angle_low_profile: false, coiled_stretch_flexible: false,
  };
  return m[t];
}

export function connectorType(t: TetheringCableType): string {
  const m: Record<TetheringCableType, string> = {
    usb_c_high_speed: "usb_c_to_usb_c_gen2",
    usb_a_standard_legacy: "usb_a_to_mini_b",
    thunderbolt_max_throughput: "thunderbolt_4_active",
    right_angle_low_profile: "usb_c_90_degree_angle",
    coiled_stretch_flexible: "usb_c_coiled_spring",
  };
  return m[t];
}

export function bestSetup(t: TetheringCableType): string {
  const m: Record<TetheringCableType, string> = {
    usb_c_high_speed: "studio_portrait_speed",
    usb_a_standard_legacy: "older_camera_dslr",
    thunderbolt_max_throughput: "high_res_medium_format",
    right_angle_low_profile: "tripod_tight_space",
    coiled_stretch_flexible: "handheld_walk_around",
  };
  return m[t];
}

export function tetheringCables(): TetheringCableType[] {
  return ["usb_c_high_speed", "usb_a_standard_legacy", "thunderbolt_max_throughput", "right_angle_low_profile", "coiled_stretch_flexible"];
}
