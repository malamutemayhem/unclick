export type YarnWinderType = "hand_crank_ball" | "electric_motor_speed" | "nostepinne_stick" | "swift_umbrella_combo" | "cone_holder_guide";

export function windSpeed(t: YarnWinderType): number {
  const m: Record<YarnWinderType, number> = {
    hand_crank_ball: 7, electric_motor_speed: 10, nostepinne_stick: 3, swift_umbrella_combo: 7, cone_holder_guide: 6,
  };
  return m[t];
}

export function yarnCare(t: YarnWinderType): number {
  const m: Record<YarnWinderType, number> = {
    hand_crank_ball: 8, electric_motor_speed: 6, nostepinne_stick: 10, swift_umbrella_combo: 8, cone_holder_guide: 7,
  };
  return m[t];
}

export function portability(t: YarnWinderType): number {
  const m: Record<YarnWinderType, number> = {
    hand_crank_ball: 7, electric_motor_speed: 4, nostepinne_stick: 10, swift_umbrella_combo: 5, cone_holder_guide: 6,
  };
  return m[t];
}

export function cakeSize(t: YarnWinderType): number {
  const m: Record<YarnWinderType, number> = {
    hand_crank_ball: 7, electric_motor_speed: 9, nostepinne_stick: 5, swift_umbrella_combo: 8, cone_holder_guide: 10,
  };
  return m[t];
}

export function winderCost(t: YarnWinderType): number {
  const m: Record<YarnWinderType, number> = {
    hand_crank_ball: 1, electric_motor_speed: 3, nostepinne_stick: 1, swift_umbrella_combo: 2, cone_holder_guide: 2,
  };
  return m[t];
}

export function needsPower(t: YarnWinderType): boolean {
  const m: Record<YarnWinderType, boolean> = {
    hand_crank_ball: false, electric_motor_speed: true, nostepinne_stick: false, swift_umbrella_combo: false, cone_holder_guide: false,
  };
  return m[t];
}

export function centerPull(t: YarnWinderType): boolean {
  const m: Record<YarnWinderType, boolean> = {
    hand_crank_ball: true, electric_motor_speed: true, nostepinne_stick: true, swift_umbrella_combo: true, cone_holder_guide: false,
  };
  return m[t];
}

export function driveType(t: YarnWinderType): string {
  const m: Record<YarnWinderType, string> = {
    hand_crank_ball: "gear_crank_handle",
    electric_motor_speed: "dc_motor_pedal",
    nostepinne_stick: "hand_wrap_manual",
    swift_umbrella_combo: "umbrella_swift_crank",
    cone_holder_guide: "cone_spindle_guide",
  };
  return m[t];
}

export function bestYarn(t: YarnWinderType): string {
  const m: Record<YarnWinderType, string> = {
    hand_crank_ball: "skein_to_cake_general",
    electric_motor_speed: "bulk_production_batch",
    nostepinne_stick: "delicate_silk_lace",
    swift_umbrella_combo: "hank_to_ball_convert",
    cone_holder_guide: "cone_to_ball_rewind",
  };
  return m[t];
}

export function yarnWinders(): YarnWinderType[] {
  return ["hand_crank_ball", "electric_motor_speed", "nostepinne_stick", "swift_umbrella_combo", "cone_holder_guide"];
}
