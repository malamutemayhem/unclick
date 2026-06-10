export type PetLeashType = "standard_nylon_6ft" | "retractable_cord_extend" | "leather_braided_classic" | "hands_free_waist_belt" | "double_coupler_splitter";

export function control(t: PetLeashType): number {
  const m: Record<PetLeashType, number> = {
    standard_nylon_6ft: 8, retractable_cord_extend: 4, leather_braided_classic: 9, hands_free_waist_belt: 6, double_coupler_splitter: 7,
  };
  return m[t];
}

export function freedom(t: PetLeashType): number {
  const m: Record<PetLeashType, number> = {
    standard_nylon_6ft: 5, retractable_cord_extend: 10, leather_braided_classic: 5, hands_free_waist_belt: 7, double_coupler_splitter: 4,
  };
  return m[t];
}

export function durability(t: PetLeashType): number {
  const m: Record<PetLeashType, number> = {
    standard_nylon_6ft: 7, retractable_cord_extend: 4, leather_braided_classic: 10, hands_free_waist_belt: 8, double_coupler_splitter: 7,
  };
  return m[t];
}

export function convenience(t: PetLeashType): number {
  const m: Record<PetLeashType, number> = {
    standard_nylon_6ft: 7, retractable_cord_extend: 8, leather_braided_classic: 5, hands_free_waist_belt: 10, double_coupler_splitter: 6,
  };
  return m[t];
}

export function leashCost(t: PetLeashType): number {
  const m: Record<PetLeashType, number> = {
    standard_nylon_6ft: 1, retractable_cord_extend: 4, leather_braided_classic: 6, hands_free_waist_belt: 4, double_coupler_splitter: 3,
  };
  return m[t];
}

export function handsFree(t: PetLeashType): boolean {
  const m: Record<PetLeashType, boolean> = {
    standard_nylon_6ft: false, retractable_cord_extend: false, leather_braided_classic: false, hands_free_waist_belt: true, double_coupler_splitter: false,
  };
  return m[t];
}

export function multiDog(t: PetLeashType): boolean {
  const m: Record<PetLeashType, boolean> = {
    standard_nylon_6ft: false, retractable_cord_extend: false, leather_braided_classic: false, hands_free_waist_belt: false, double_coupler_splitter: true,
  };
  return m[t];
}

export function leashMaterial(t: PetLeashType): string {
  const m: Record<PetLeashType, string> = {
    standard_nylon_6ft: "woven_nylon_padded_handle",
    retractable_cord_extend: "nylon_cord_spring_housing",
    leather_braided_classic: "braided_full_grain_leather",
    hands_free_waist_belt: "nylon_elastic_bungee_belt",
    double_coupler_splitter: "nylon_splitter_swivel_clip",
  };
  return m[t];
}

export function bestWalk(t: PetLeashType): string {
  const m: Record<PetLeashType, string> = {
    standard_nylon_6ft: "daily_walk_training",
    retractable_cord_extend: "park_open_area_sniff",
    leather_braided_classic: "show_ring_city_walk",
    hands_free_waist_belt: "jogging_hiking_active",
    double_coupler_splitter: "two_dog_household",
  };
  return m[t];
}

export function petLeashes(): PetLeashType[] {
  return ["standard_nylon_6ft", "retractable_cord_extend", "leather_braided_classic", "hands_free_waist_belt", "double_coupler_splitter"];
}
