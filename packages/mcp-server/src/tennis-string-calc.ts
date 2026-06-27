export type TennisStringType = "natural_gut_premium" | "polyester_mono_spin" | "nylon_multi_comfort" | "kevlar_hybrid_durability" | "co_poly_shaped";

export function power(t: TennisStringType): number {
  const m: Record<TennisStringType, number> = {
    natural_gut_premium: 10, polyester_mono_spin: 5, nylon_multi_comfort: 8, kevlar_hybrid_durability: 4, co_poly_shaped: 6,
  };
  return m[t];
}

export function spinPotential(t: TennisStringType): number {
  const m: Record<TennisStringType, number> = {
    natural_gut_premium: 6, polyester_mono_spin: 10, nylon_multi_comfort: 5, kevlar_hybrid_durability: 4, co_poly_shaped: 9,
  };
  return m[t];
}

export function durability(t: TennisStringType): number {
  const m: Record<TennisStringType, number> = {
    natural_gut_premium: 4, polyester_mono_spin: 7, nylon_multi_comfort: 5, kevlar_hybrid_durability: 10, co_poly_shaped: 8,
  };
  return m[t];
}

export function armFriendly(t: TennisStringType): number {
  const m: Record<TennisStringType, number> = {
    natural_gut_premium: 10, polyester_mono_spin: 3, nylon_multi_comfort: 9, kevlar_hybrid_durability: 2, co_poly_shaped: 5,
  };
  return m[t];
}

export function stringCost(t: TennisStringType): number {
  const m: Record<TennisStringType, number> = {
    natural_gut_premium: 10, polyester_mono_spin: 5, nylon_multi_comfort: 3, kevlar_hybrid_durability: 6, co_poly_shaped: 7,
  };
  return m[t];
}

export function tensionHold(t: TennisStringType): boolean {
  const m: Record<TennisStringType, boolean> = {
    natural_gut_premium: true, polyester_mono_spin: false, nylon_multi_comfort: false, kevlar_hybrid_durability: true, co_poly_shaped: false,
  };
  return m[t];
}

export function texturedSurface(t: TennisStringType): boolean {
  const m: Record<TennisStringType, boolean> = {
    natural_gut_premium: false, polyester_mono_spin: false, nylon_multi_comfort: false, kevlar_hybrid_durability: false, co_poly_shaped: true,
  };
  return m[t];
}

export function stringMaterial(t: TennisStringType): string {
  const m: Record<TennisStringType, string> = {
    natural_gut_premium: "beef_serosa_natural_fiber",
    polyester_mono_spin: "monofilament_polyester_core",
    nylon_multi_comfort: "multifilament_nylon_wrap",
    kevlar_hybrid_durability: "aramid_kevlar_nylon_hybrid",
    co_poly_shaped: "copolyester_pentagonal_profile",
  };
  return m[t];
}

export function bestPlayer(t: TennisStringType): string {
  const m: Record<TennisStringType, string> = {
    natural_gut_premium: "advanced_feel_touch_player",
    polyester_mono_spin: "aggressive_topspin_hitter",
    nylon_multi_comfort: "beginner_recreational_arm",
    kevlar_hybrid_durability: "chronic_string_breaker",
    co_poly_shaped: "intermediate_spin_control",
  };
  return m[t];
}

export function tennisStrings(): TennisStringType[] {
  return ["natural_gut_premium", "polyester_mono_spin", "nylon_multi_comfort", "kevlar_hybrid_durability", "co_poly_shaped"];
}
