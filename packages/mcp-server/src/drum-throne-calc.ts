export type DrumThroneType = "round_top_standard" | "saddle_seat_ergonomic" | "backrest_support_tall" | "hydraulic_lift_adjust" | "motorcycle_seat_cutaway";

export function seatComfort(t: DrumThroneType): number {
  const m: Record<DrumThroneType, number> = {
    round_top_standard: 6, saddle_seat_ergonomic: 9, backrest_support_tall: 10, hydraulic_lift_adjust: 8, motorcycle_seat_cutaway: 8,
  };
  return m[t];
}

export function spineSupport(t: DrumThroneType): number {
  const m: Record<DrumThroneType, number> = {
    round_top_standard: 4, saddle_seat_ergonomic: 8, backrest_support_tall: 10, hydraulic_lift_adjust: 5, motorcycle_seat_cutaway: 7,
  };
  return m[t];
}

export function adjustability(t: DrumThroneType): number {
  const m: Record<DrumThroneType, number> = {
    round_top_standard: 6, saddle_seat_ergonomic: 7, backrest_support_tall: 8, hydraulic_lift_adjust: 10, motorcycle_seat_cutaway: 7,
  };
  return m[t];
}

export function stability(t: DrumThroneType): number {
  const m: Record<DrumThroneType, number> = {
    round_top_standard: 7, saddle_seat_ergonomic: 8, backrest_support_tall: 9, hydraulic_lift_adjust: 8, motorcycle_seat_cutaway: 7,
  };
  return m[t];
}

export function throneCost(t: DrumThroneType): number {
  const m: Record<DrumThroneType, number> = {
    round_top_standard: 1, saddle_seat_ergonomic: 3, backrest_support_tall: 4, hydraulic_lift_adjust: 4, motorcycle_seat_cutaway: 3,
  };
  return m[t];
}

export function hasBackrest(t: DrumThroneType): boolean {
  const m: Record<DrumThroneType, boolean> = {
    round_top_standard: false, saddle_seat_ergonomic: false, backrest_support_tall: true, hydraulic_lift_adjust: false, motorcycle_seat_cutaway: false,
  };
  return m[t];
}

export function hydraulicLift(t: DrumThroneType): boolean {
  const m: Record<DrumThroneType, boolean> = {
    round_top_standard: false, saddle_seat_ergonomic: false, backrest_support_tall: false, hydraulic_lift_adjust: true, motorcycle_seat_cutaway: false,
  };
  return m[t];
}

export function seatShape(t: DrumThroneType): string {
  const m: Record<DrumThroneType, string> = {
    round_top_standard: "circular_flat_padded",
    saddle_seat_ergonomic: "contoured_saddle_dip",
    backrest_support_tall: "round_with_lumbar",
    hydraulic_lift_adjust: "round_gas_cylinder",
    motorcycle_seat_cutaway: "tractor_cutaway_wide",
  };
  return m[t];
}

export function bestPlayer(t: DrumThroneType): string {
  const m: Record<DrumThroneType, string> = {
    round_top_standard: "beginner_casual_kit",
    saddle_seat_ergonomic: "session_drummer_long",
    backrest_support_tall: "back_pain_extended",
    hydraulic_lift_adjust: "studio_multi_height",
    motorcycle_seat_cutaway: "rock_heavy_hitter",
  };
  return m[t];
}

export function drumThrones(): DrumThroneType[] {
  return ["round_top_standard", "saddle_seat_ergonomic", "backrest_support_tall", "hydraulic_lift_adjust", "motorcycle_seat_cutaway"];
}
