export type CompressionSockType = "graduated_medical" | "athletic_calf_sleeve" | "travel_knee_high" | "open_toe_toeless" | "recovery_full_leg";

export function compressionLevel(t: CompressionSockType): number {
  const m: Record<CompressionSockType, number> = {
    graduated_medical: 10, athletic_calf_sleeve: 6, travel_knee_high: 7, open_toe_toeless: 8, recovery_full_leg: 9,
  };
  return m[t];
}

export function comfort(t: CompressionSockType): number {
  const m: Record<CompressionSockType, number> = {
    graduated_medical: 6, athletic_calf_sleeve: 9, travel_knee_high: 7, open_toe_toeless: 8, recovery_full_leg: 5,
  };
  return m[t];
}

export function breathability(t: CompressionSockType): number {
  const m: Record<CompressionSockType, number> = {
    graduated_medical: 5, athletic_calf_sleeve: 9, travel_knee_high: 6, open_toe_toeless: 10, recovery_full_leg: 4,
  };
  return m[t];
}

export function durability(t: CompressionSockType): number {
  const m: Record<CompressionSockType, number> = {
    graduated_medical: 8, athletic_calf_sleeve: 7, travel_knee_high: 7, open_toe_toeless: 6, recovery_full_leg: 8,
  };
  return m[t];
}

export function sockCost(t: CompressionSockType): number {
  const m: Record<CompressionSockType, number> = {
    graduated_medical: 8, athletic_calf_sleeve: 5, travel_knee_high: 6, open_toe_toeless: 7, recovery_full_leg: 9,
  };
  return m[t];
}

export function moistureWicking(t: CompressionSockType): boolean {
  const m: Record<CompressionSockType, boolean> = {
    graduated_medical: true, athletic_calf_sleeve: true, travel_knee_high: true, open_toe_toeless: true, recovery_full_leg: false,
  };
  return m[t];
}

export function toeOpen(t: CompressionSockType): boolean {
  const m: Record<CompressionSockType, boolean> = {
    graduated_medical: false, athletic_calf_sleeve: false, travel_knee_high: false, open_toe_toeless: true, recovery_full_leg: false,
  };
  return m[t];
}

export function fabricBlend(t: CompressionSockType): string {
  const m: Record<CompressionSockType, string> = {
    graduated_medical: "nylon_spandex_medical_grade",
    athletic_calf_sleeve: "coolmax_lycra_arch_support",
    travel_knee_high: "merino_nylon_anti_odor",
    open_toe_toeless: "microfiber_elastane_open",
    recovery_full_leg: "compression_knit_full_wrap",
  };
  return m[t];
}

export function bestActivity(t: CompressionSockType): string {
  const m: Record<CompressionSockType, string> = {
    graduated_medical: "post_surgery_vein_therapy",
    athletic_calf_sleeve: "running_cycling_sport",
    travel_knee_high: "long_flight_sitting_edema",
    open_toe_toeless: "sandal_warm_climate_wear",
    recovery_full_leg: "post_marathon_full_recovery",
  };
  return m[t];
}

export function compressionSocks(): CompressionSockType[] {
  return ["graduated_medical", "athletic_calf_sleeve", "travel_knee_high", "open_toe_toeless", "recovery_full_leg"];
}
