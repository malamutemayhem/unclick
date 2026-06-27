export type MicType = "dynamic_cardioid" | "large_diaphragm_condenser" | "small_diaphragm_condenser" | "ribbon_bidirectional" | "usb_desktop";

export function sensitivity(t: MicType): number {
  const m: Record<MicType, number> = {
    dynamic_cardioid: 5, large_diaphragm_condenser: 9, small_diaphragm_condenser: 8, ribbon_bidirectional: 7, usb_desktop: 6,
  };
  return m[t];
}

export function noiseRejection(t: MicType): number {
  const m: Record<MicType, number> = {
    dynamic_cardioid: 10, large_diaphragm_condenser: 5, small_diaphragm_condenser: 6, ribbon_bidirectional: 4, usb_desktop: 7,
  };
  return m[t];
}

export function frequencyResponse(t: MicType): number {
  const m: Record<MicType, number> = {
    dynamic_cardioid: 6, large_diaphragm_condenser: 10, small_diaphragm_condenser: 9, ribbon_bidirectional: 8, usb_desktop: 5,
  };
  return m[t];
}

export function durabilityScore(t: MicType): number {
  const m: Record<MicType, number> = {
    dynamic_cardioid: 10, large_diaphragm_condenser: 5, small_diaphragm_condenser: 6, ribbon_bidirectional: 3, usb_desktop: 7,
  };
  return m[t];
}

export function micCost(t: MicType): number {
  const m: Record<MicType, number> = {
    dynamic_cardioid: 4, large_diaphragm_condenser: 8, small_diaphragm_condenser: 7, ribbon_bidirectional: 10, usb_desktop: 3,
  };
  return m[t];
}

export function needsPhantomPower(t: MicType): boolean {
  const m: Record<MicType, boolean> = {
    dynamic_cardioid: false, large_diaphragm_condenser: true, small_diaphragm_condenser: true, ribbon_bidirectional: false, usb_desktop: false,
  };
  return m[t];
}

export function selfPowered(t: MicType): boolean {
  const m: Record<MicType, boolean> = {
    dynamic_cardioid: false, large_diaphragm_condenser: false, small_diaphragm_condenser: false, ribbon_bidirectional: false, usb_desktop: true,
  };
  return m[t];
}

export function polarPattern(t: MicType): string {
  const m: Record<MicType, string> = {
    dynamic_cardioid: "cardioid_fixed", large_diaphragm_condenser: "multi_pattern_switchable",
    small_diaphragm_condenser: "cardioid_pencil", ribbon_bidirectional: "figure_eight_natural",
    usb_desktop: "cardioid_front_address",
  };
  return m[t];
}

export function bestUse(t: MicType): string {
  const m: Record<MicType, string> = {
    dynamic_cardioid: "live_vocal_loud_stage", large_diaphragm_condenser: "studio_vocal_voiceover",
    small_diaphragm_condenser: "acoustic_instrument_overhead", ribbon_bidirectional: "guitar_amp_warm_tone",
    usb_desktop: "podcast_streaming_video_call",
  };
  return m[t];
}

export function micTypes(): MicType[] {
  return ["dynamic_cardioid", "large_diaphragm_condenser", "small_diaphragm_condenser", "ribbon_bidirectional", "usb_desktop"];
}
