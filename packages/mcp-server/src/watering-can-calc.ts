export type WateringCanType = "plastic_long_spout" | "galvanized_metal" | "indoor_copper_mini" | "haws_heritage" | "self_watering_globe";

export function waterCapacity(t: WateringCanType): number {
  const m: Record<WateringCanType, number> = {
    plastic_long_spout: 8, galvanized_metal: 9, indoor_copper_mini: 3, haws_heritage: 7, self_watering_globe: 2,
  };
  return m[t];
}

export function pourControl(t: WateringCanType): number {
  const m: Record<WateringCanType, number> = {
    plastic_long_spout: 8, galvanized_metal: 6, indoor_copper_mini: 7, haws_heritage: 10, self_watering_globe: 3,
  };
  return m[t];
}

export function durability(t: WateringCanType): number {
  const m: Record<WateringCanType, number> = {
    plastic_long_spout: 5, galvanized_metal: 9, indoor_copper_mini: 8, haws_heritage: 10, self_watering_globe: 4,
  };
  return m[t];
}

export function weightEmpty(t: WateringCanType): number {
  const m: Record<WateringCanType, number> = {
    plastic_long_spout: 9, galvanized_metal: 4, indoor_copper_mini: 8, haws_heritage: 5, self_watering_globe: 10,
  };
  return m[t];
}

export function canCost(t: WateringCanType): number {
  const m: Record<WateringCanType, number> = {
    plastic_long_spout: 1, galvanized_metal: 3, indoor_copper_mini: 5, haws_heritage: 8, self_watering_globe: 4,
  };
  return m[t];
}

export function hasRoseHead(t: WateringCanType): boolean {
  const m: Record<WateringCanType, boolean> = {
    plastic_long_spout: true, galvanized_metal: true, indoor_copper_mini: false, haws_heritage: true, self_watering_globe: false,
  };
  return m[t];
}

export function indoorSafe(t: WateringCanType): boolean {
  const m: Record<WateringCanType, boolean> = {
    plastic_long_spout: true, galvanized_metal: false, indoor_copper_mini: true, haws_heritage: true, self_watering_globe: true,
  };
  return m[t];
}

export function canMaterial(t: WateringCanType): string {
  const m: Record<WateringCanType, string> = {
    plastic_long_spout: "hdpe_uv_stabilized",
    galvanized_metal: "zinc_coated_steel",
    indoor_copper_mini: "solid_copper_patina",
    haws_heritage: "powder_coat_steel_brass",
    self_watering_globe: "hand_blown_glass_bulb",
  };
  return m[t];
}

export function bestUse(t: WateringCanType): string {
  const m: Record<WateringCanType, string> = {
    plastic_long_spout: "general_garden_beds",
    galvanized_metal: "large_outdoor_garden",
    indoor_copper_mini: "windowsill_succulent",
    haws_heritage: "greenhouse_precision",
    self_watering_globe: "vacation_auto_water",
  };
  return m[t];
}

export function wateringCans(): WateringCanType[] {
  return ["plastic_long_spout", "galvanized_metal", "indoor_copper_mini", "haws_heritage", "self_watering_globe"];
}
