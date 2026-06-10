export type MicStandType = "tripod_boom" | "round_base_straight" | "desk_clamp_arm" | "floor_low_profile" | "overhead_studio_crane";

export function stability(t: MicStandType): number {
  const m: Record<MicStandType, number> = {
    tripod_boom: 8, round_base_straight: 9, desk_clamp_arm: 6, floor_low_profile: 7, overhead_studio_crane: 5,
  };
  return m[t];
}

export function reachRange(t: MicStandType): number {
  const m: Record<MicStandType, number> = {
    tripod_boom: 9, round_base_straight: 4, desk_clamp_arm: 7, floor_low_profile: 3, overhead_studio_crane: 10,
  };
  return m[t];
}

export function portability(t: MicStandType): number {
  const m: Record<MicStandType, number> = {
    tripod_boom: 7, round_base_straight: 5, desk_clamp_arm: 8, floor_low_profile: 6, overhead_studio_crane: 2,
  };
  return m[t];
}

export function footprint(t: MicStandType): number {
  const m: Record<MicStandType, number> = {
    tripod_boom: 4, round_base_straight: 6, desk_clamp_arm: 10, floor_low_profile: 8, overhead_studio_crane: 3,
  };
  return m[t];
}

export function standCost(t: MicStandType): number {
  const m: Record<MicStandType, number> = {
    tripod_boom: 4, round_base_straight: 3, desk_clamp_arm: 5, floor_low_profile: 3, overhead_studio_crane: 9,
  };
  return m[t];
}

export function hasBoom(t: MicStandType): boolean {
  const m: Record<MicStandType, boolean> = {
    tripod_boom: true, round_base_straight: false, desk_clamp_arm: true, floor_low_profile: false, overhead_studio_crane: true,
  };
  return m[t];
}

export function foldable(t: MicStandType): boolean {
  const m: Record<MicStandType, boolean> = {
    tripod_boom: true, round_base_straight: false, desk_clamp_arm: false, floor_low_profile: true, overhead_studio_crane: false,
  };
  return m[t];
}

export function baseType(t: MicStandType): string {
  const m: Record<MicStandType, string> = {
    tripod_boom: "folding_tripod_leg",
    round_base_straight: "cast_iron_round_heavy",
    desk_clamp_arm: "c_clamp_spring_arm",
    floor_low_profile: "short_tripod_kick_drum",
    overhead_studio_crane: "counterweight_boom_arm",
  };
  return m[t];
}

export function bestUse(t: MicStandType): string {
  const m: Record<MicStandType, string> = {
    tripod_boom: "live_vocal_performance",
    round_base_straight: "speech_podium_fixed",
    desk_clamp_arm: "podcast_streaming_desk",
    floor_low_profile: "drum_kit_instrument_mic",
    overhead_studio_crane: "recording_studio_overhead",
  };
  return m[t];
}

export function micStands(): MicStandType[] {
  return ["tripod_boom", "round_base_straight", "desk_clamp_arm", "floor_low_profile", "overhead_studio_crane"];
}
