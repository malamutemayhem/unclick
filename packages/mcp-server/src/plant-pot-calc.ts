export type PlantPotType = "terracotta_classic" | "ceramic_glazed" | "fabric_grow_bag" | "self_watering_reservoir" | "concrete_modern";

export function drainage(t: PlantPotType): number {
  const m: Record<PlantPotType, number> = {
    terracotta_classic: 10, ceramic_glazed: 7, fabric_grow_bag: 10, self_watering_reservoir: 5, concrete_modern: 6,
  };
  return m[t];
}

export function rootHealth(t: PlantPotType): number {
  const m: Record<PlantPotType, number> = {
    terracotta_classic: 9, ceramic_glazed: 6, fabric_grow_bag: 10, self_watering_reservoir: 7, concrete_modern: 5,
  };
  return m[t];
}

export function aestheticAppeal(t: PlantPotType): number {
  const m: Record<PlantPotType, number> = {
    terracotta_classic: 7, ceramic_glazed: 10, fabric_grow_bag: 3, self_watering_reservoir: 5, concrete_modern: 9,
  };
  return m[t];
}

export function weightEmpty(t: PlantPotType): number {
  const m: Record<PlantPotType, number> = {
    terracotta_classic: 4, ceramic_glazed: 3, fabric_grow_bag: 10, self_watering_reservoir: 6, concrete_modern: 1,
  };
  return m[t];
}

export function potCost(t: PlantPotType): number {
  const m: Record<PlantPotType, number> = {
    terracotta_classic: 2, ceramic_glazed: 5, fabric_grow_bag: 1, self_watering_reservoir: 6, concrete_modern: 7,
  };
  return m[t];
}

export function frostProof(t: PlantPotType): boolean {
  const m: Record<PlantPotType, boolean> = {
    terracotta_classic: false, ceramic_glazed: false, fabric_grow_bag: true, self_watering_reservoir: true, concrete_modern: true,
  };
  return m[t];
}

export function reusable(t: PlantPotType): boolean {
  const m: Record<PlantPotType, boolean> = {
    terracotta_classic: true, ceramic_glazed: true, fabric_grow_bag: true, self_watering_reservoir: true, concrete_modern: true,
  };
  return m[t];
}

export function potMaterial(t: PlantPotType): string {
  const m: Record<PlantPotType, string> = {
    terracotta_classic: "fired_clay_porous",
    ceramic_glazed: "kiln_fired_glaze_coat",
    fabric_grow_bag: "geotextile_felt_fabric",
    self_watering_reservoir: "plastic_wick_reservoir",
    concrete_modern: "fiber_reinforced_cement",
  };
  return m[t];
}

export function bestPlant(t: PlantPotType): string {
  const m: Record<PlantPotType, string> = {
    terracotta_classic: "succulent_cactus_herb",
    ceramic_glazed: "tropical_indoor_display",
    fabric_grow_bag: "vegetable_tomato_potato",
    self_watering_reservoir: "office_desk_low_maint",
    concrete_modern: "architectural_statement",
  };
  return m[t];
}

export function plantPots(): PlantPotType[] {
  return ["terracotta_classic", "ceramic_glazed", "fabric_grow_bag", "self_watering_reservoir", "concrete_modern"];
}
