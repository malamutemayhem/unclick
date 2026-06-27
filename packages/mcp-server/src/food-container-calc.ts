export type FoodContainerType = "glass_snap_lock" | "plastic_clip_lid" | "stainless_steel" | "silicone_collapsible" | "vacuum_seal_pump";

export function freshness(t: FoodContainerType): number {
  const m: Record<FoodContainerType, number> = {
    glass_snap_lock: 8, plastic_clip_lid: 6, stainless_steel: 7, silicone_collapsible: 5, vacuum_seal_pump: 10,
  };
  return m[t];
}

export function durability(t: FoodContainerType): number {
  const m: Record<FoodContainerType, number> = {
    glass_snap_lock: 9, plastic_clip_lid: 5, stainless_steel: 10, silicone_collapsible: 7, vacuum_seal_pump: 6,
  };
  return m[t];
}

export function stackability(t: FoodContainerType): number {
  const m: Record<FoodContainerType, number> = {
    glass_snap_lock: 8, plastic_clip_lid: 9, stainless_steel: 7, silicone_collapsible: 4, vacuum_seal_pump: 6,
  };
  return m[t];
}

export function weightEmpty(t: FoodContainerType): number {
  const m: Record<FoodContainerType, number> = {
    glass_snap_lock: 3, plastic_clip_lid: 9, stainless_steel: 4, silicone_collapsible: 8, vacuum_seal_pump: 7,
  };
  return m[t];
}

export function containerCost(t: FoodContainerType): number {
  const m: Record<FoodContainerType, number> = {
    glass_snap_lock: 5, plastic_clip_lid: 2, stainless_steel: 7, silicone_collapsible: 4, vacuum_seal_pump: 6,
  };
  return m[t];
}

export function microwaveSafe(t: FoodContainerType): boolean {
  const m: Record<FoodContainerType, boolean> = {
    glass_snap_lock: true, plastic_clip_lid: true, stainless_steel: false, silicone_collapsible: true, vacuum_seal_pump: false,
  };
  return m[t];
}

export function leakProof(t: FoodContainerType): boolean {
  const m: Record<FoodContainerType, boolean> = {
    glass_snap_lock: true, plastic_clip_lid: false, stainless_steel: true, silicone_collapsible: false, vacuum_seal_pump: true,
  };
  return m[t];
}

export function lidType(t: FoodContainerType): string {
  const m: Record<FoodContainerType, string> = {
    glass_snap_lock: "four_clip_silicone_seal",
    plastic_clip_lid: "snap_fit_flex_lid",
    stainless_steel: "press_fit_silicone_ring",
    silicone_collapsible: "fold_flat_stretch_lid",
    vacuum_seal_pump: "valve_pump_airtight",
  };
  return m[t];
}

export function bestUse(t: FoodContainerType): string {
  const m: Record<FoodContainerType, string> = {
    glass_snap_lock: "meal_prep_oven_to_table",
    plastic_clip_lid: "kids_lunch_everyday",
    stainless_steel: "outdoor_camping_durable",
    silicone_collapsible: "travel_save_space",
    vacuum_seal_pump: "marinate_preserve_long",
  };
  return m[t];
}

export function foodContainers(): FoodContainerType[] {
  return ["glass_snap_lock", "plastic_clip_lid", "stainless_steel", "silicone_collapsible", "vacuum_seal_pump"];
}
