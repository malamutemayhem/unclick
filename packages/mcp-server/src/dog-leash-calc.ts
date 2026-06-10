export type DogLeashType = "standard_nylon" | "retractable_cord" | "leather_braided" | "chain_metal" | "hands_free_waist";

export function strengthRating(t: DogLeashType): number {
  const m: Record<DogLeashType, number> = {
    standard_nylon: 7, retractable_cord: 4, leather_braided: 9, chain_metal: 10, hands_free_waist: 7,
  };
  return m[t];
}

export function controlLevel(t: DogLeashType): number {
  const m: Record<DogLeashType, number> = {
    standard_nylon: 8, retractable_cord: 3, leather_braided: 9, chain_metal: 8, hands_free_waist: 5,
  };
  return m[t];
}

export function comfortGrip(t: DogLeashType): number {
  const m: Record<DogLeashType, number> = {
    standard_nylon: 6, retractable_cord: 7, leather_braided: 10, chain_metal: 3, hands_free_waist: 9,
  };
  return m[t];
}

export function weightGrams(t: DogLeashType): number {
  const m: Record<DogLeashType, number> = {
    standard_nylon: 3, retractable_cord: 7, leather_braided: 6, chain_metal: 10, hands_free_waist: 5,
  };
  return m[t];
}

export function leashCost(t: DogLeashType): number {
  const m: Record<DogLeashType, number> = {
    standard_nylon: 2, retractable_cord: 5, leather_braided: 9, chain_metal: 4, hands_free_waist: 6,
  };
  return m[t];
}

export function chewResistant(t: DogLeashType): boolean {
  const m: Record<DogLeashType, boolean> = {
    standard_nylon: false, retractable_cord: false, leather_braided: true, chain_metal: true, hands_free_waist: false,
  };
  return m[t];
}

export function adjustableLength(t: DogLeashType): boolean {
  const m: Record<DogLeashType, boolean> = {
    standard_nylon: false, retractable_cord: true, leather_braided: false, chain_metal: false, hands_free_waist: true,
  };
  return m[t];
}

export function material(t: DogLeashType): string {
  const m: Record<DogLeashType, string> = {
    standard_nylon: "woven_nylon_webbing", retractable_cord: "internal_spring_cord",
    leather_braided: "full_grain_cowhide", chain_metal: "welded_stainless_steel",
    hands_free_waist: "elastic_bungee_nylon",
  };
  return m[t];
}

export function bestDog(t: DogLeashType): string {
  const m: Record<DogLeashType, string> = {
    standard_nylon: "everyday_walk_any_size", retractable_cord: "small_calm_open_area",
    leather_braided: "large_strong_puller", chain_metal: "heavy_chewer_deterrent",
    hands_free_waist: "running_jogging_partner",
  };
  return m[t];
}

export function dogLeashes(): DogLeashType[] {
  return ["standard_nylon", "retractable_cord", "leather_braided", "chain_metal", "hands_free_waist"];
}
