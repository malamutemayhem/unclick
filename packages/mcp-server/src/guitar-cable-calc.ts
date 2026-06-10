export type GuitarCableType = "standard_nickel_straight" | "braided_cloth_vintage" | "coiled_curly_retro" | "right_angle_low_profile" | "wireless_digital_system";

export function signalClarity(t: GuitarCableType): number {
  const m: Record<GuitarCableType, number> = {
    standard_nickel_straight: 7, braided_cloth_vintage: 8, coiled_curly_retro: 6, right_angle_low_profile: 7, wireless_digital_system: 9,
  };
  return m[t];
}

export function durability(t: GuitarCableType): number {
  const m: Record<GuitarCableType, number> = {
    standard_nickel_straight: 6, braided_cloth_vintage: 9, coiled_curly_retro: 7, right_angle_low_profile: 7, wireless_digital_system: 5,
  };
  return m[t];
}

export function flexibility(t: GuitarCableType): number {
  const m: Record<GuitarCableType, number> = {
    standard_nickel_straight: 7, braided_cloth_vintage: 8, coiled_curly_retro: 5, right_angle_low_profile: 7, wireless_digital_system: 10,
  };
  return m[t];
}

export function noiseReject(t: GuitarCableType): number {
  const m: Record<GuitarCableType, number> = {
    standard_nickel_straight: 6, braided_cloth_vintage: 8, coiled_curly_retro: 6, right_angle_low_profile: 7, wireless_digital_system: 9,
  };
  return m[t];
}

export function cableCost(t: GuitarCableType): number {
  const m: Record<GuitarCableType, number> = {
    standard_nickel_straight: 1, braided_cloth_vintage: 3, coiled_curly_retro: 2, right_angle_low_profile: 2, wireless_digital_system: 5,
  };
  return m[t];
}

export function needsBattery(t: GuitarCableType): boolean {
  const m: Record<GuitarCableType, boolean> = {
    standard_nickel_straight: false, braided_cloth_vintage: false, coiled_curly_retro: false, right_angle_low_profile: false, wireless_digital_system: true,
  };
  return m[t];
}

export function lowProfile(t: GuitarCableType): boolean {
  const m: Record<GuitarCableType, boolean> = {
    standard_nickel_straight: false, braided_cloth_vintage: false, coiled_curly_retro: false, right_angle_low_profile: true, wireless_digital_system: true,
  };
  return m[t];
}

export function conductorType(t: GuitarCableType): string {
  const m: Record<GuitarCableType, string> = {
    standard_nickel_straight: "copper_core_pvc",
    braided_cloth_vintage: "ofc_cloth_braid",
    coiled_curly_retro: "copper_coil_memory",
    right_angle_low_profile: "copper_flat_ribbon",
    wireless_digital_system: "digital_24bit_radio",
  };
  return m[t];
}

export function bestSetup(t: GuitarCableType): string {
  const m: Record<GuitarCableType, string> = {
    standard_nickel_straight: "home_practice_budget",
    braided_cloth_vintage: "studio_recording_pro",
    coiled_curly_retro: "vintage_amp_aesthetic",
    right_angle_low_profile: "pedalboard_tight_space",
    wireless_digital_system: "live_stage_freedom",
  };
  return m[t];
}

export function guitarCables(): GuitarCableType[] {
  return ["standard_nickel_straight", "braided_cloth_vintage", "coiled_curly_retro", "right_angle_low_profile", "wireless_digital_system"];
}
