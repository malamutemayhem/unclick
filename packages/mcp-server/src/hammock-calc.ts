export type HammockType = "rope_cotton_spread" | "fabric_quilted_pad" | "camping_nylon_ultra" | "mayan_woven_net" | "stand_frame_combo";

export function comfort(t: HammockType): number {
  const m: Record<HammockType, number> = {
    rope_cotton_spread: 7, fabric_quilted_pad: 10, camping_nylon_ultra: 5, mayan_woven_net: 8, stand_frame_combo: 9,
  };
  return m[t];
}

export function portability(t: HammockType): number {
  const m: Record<HammockType, number> = {
    rope_cotton_spread: 5, fabric_quilted_pad: 3, camping_nylon_ultra: 10, mayan_woven_net: 7, stand_frame_combo: 2,
  };
  return m[t];
}

export function weightCapacity(t: HammockType): number {
  const m: Record<HammockType, number> = {
    rope_cotton_spread: 7, fabric_quilted_pad: 8, camping_nylon_ultra: 6, mayan_woven_net: 7, stand_frame_combo: 9,
  };
  return m[t];
}

export function weatherResist(t: HammockType): number {
  const m: Record<HammockType, number> = {
    rope_cotton_spread: 3, fabric_quilted_pad: 4, camping_nylon_ultra: 10, mayan_woven_net: 5, stand_frame_combo: 6,
  };
  return m[t];
}

export function hammockCost(t: HammockType): number {
  const m: Record<HammockType, number> = {
    rope_cotton_spread: 3, fabric_quilted_pad: 5, camping_nylon_ultra: 4, mayan_woven_net: 6, stand_frame_combo: 8,
  };
  return m[t];
}

export function needsTrees(t: HammockType): boolean {
  const m: Record<HammockType, boolean> = {
    rope_cotton_spread: true, fabric_quilted_pad: true, camping_nylon_ultra: true, mayan_woven_net: true, stand_frame_combo: false,
  };
  return m[t];
}

export function twoPerson(t: HammockType): boolean {
  const m: Record<HammockType, boolean> = {
    rope_cotton_spread: true, fabric_quilted_pad: true, camping_nylon_ultra: false, mayan_woven_net: false, stand_frame_combo: true,
  };
  return m[t];
}

export function fabricType(t: HammockType): string {
  const m: Record<HammockType, string> = {
    rope_cotton_spread: "hand_twisted_cotton_rope",
    fabric_quilted_pad: "polyester_quilted_batting",
    camping_nylon_ultra: "ripstop_nylon_parachute",
    mayan_woven_net: "hand_woven_nylon_thread",
    stand_frame_combo: "olefin_weather_resistant",
  };
  return m[t];
}

export function bestSetup(t: HammockType): string {
  const m: Record<HammockType, string> = {
    rope_cotton_spread: "backyard_shade_trees",
    fabric_quilted_pad: "porch_afternoon_nap",
    camping_nylon_ultra: "backpacking_trail_camp",
    mayan_woven_net: "tropical_patio_lounge",
    stand_frame_combo: "apartment_balcony_deck",
  };
  return m[t];
}

export function hammocks(): HammockType[] {
  return ["rope_cotton_spread", "fabric_quilted_pad", "camping_nylon_ultra", "mayan_woven_net", "stand_frame_combo"];
}
