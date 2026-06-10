export type BobberType = "round_clip_on_red" | "slip_float_sliding" | "waggler_pencil_thin" | "popping_cork_noise" | "lighted_night_glow";

export function visibility(t: BobberType): number {
  const m: Record<BobberType, number> = {
    round_clip_on_red: 7, slip_float_sliding: 6, waggler_pencil_thin: 5, popping_cork_noise: 8, lighted_night_glow: 10,
  };
  return m[t];
}

export function sensitivity(t: BobberType): number {
  const m: Record<BobberType, number> = {
    round_clip_on_red: 4, slip_float_sliding: 8, waggler_pencil_thin: 10, popping_cork_noise: 5, lighted_night_glow: 6,
  };
  return m[t];
}

export function depthControl(t: BobberType): number {
  const m: Record<BobberType, number> = {
    round_clip_on_red: 4, slip_float_sliding: 10, waggler_pencil_thin: 7, popping_cork_noise: 6, lighted_night_glow: 5,
  };
  return m[t];
}

export function castDistance(t: BobberType): number {
  const m: Record<BobberType, number> = {
    round_clip_on_red: 5, slip_float_sliding: 9, waggler_pencil_thin: 8, popping_cork_noise: 7, lighted_night_glow: 6,
  };
  return m[t];
}

export function bobberCost(t: BobberType): number {
  const m: Record<BobberType, number> = {
    round_clip_on_red: 2, slip_float_sliding: 4, waggler_pencil_thin: 5, popping_cork_noise: 6, lighted_night_glow: 8,
  };
  return m[t];
}

export function needsBattery(t: BobberType): boolean {
  const m: Record<BobberType, boolean> = {
    round_clip_on_red: false, slip_float_sliding: false, waggler_pencil_thin: false, popping_cork_noise: false, lighted_night_glow: true,
  };
  return m[t];
}

export function makesNoise(t: BobberType): boolean {
  const m: Record<BobberType, boolean> = {
    round_clip_on_red: false, slip_float_sliding: false, waggler_pencil_thin: false, popping_cork_noise: true, lighted_night_glow: false,
  };
  return m[t];
}

export function floatShape(t: BobberType): string {
  const m: Record<BobberType, string> = {
    round_clip_on_red: "sphere_spring_clip",
    slip_float_sliding: "cigar_peg_stop",
    waggler_pencil_thin: "slim_pencil_stem",
    popping_cork_noise: "concave_face_rattle",
    lighted_night_glow: "cylinder_led_insert",
  };
  return m[t];
}

export function bestScenario(t: BobberType): string {
  const m: Record<BobberType, string> = {
    round_clip_on_red: "kids_panfish_shallow",
    slip_float_sliding: "deep_water_walleye",
    waggler_pencil_thin: "still_water_trout",
    popping_cork_noise: "redfish_speckled_trout",
    lighted_night_glow: "night_catfish_dock",
  };
  return m[t];
}

export function bobbers(): BobberType[] {
  return ["round_clip_on_red", "slip_float_sliding", "waggler_pencil_thin", "popping_cork_noise", "lighted_night_glow"];
}
