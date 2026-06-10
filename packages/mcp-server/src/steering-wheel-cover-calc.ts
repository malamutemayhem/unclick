export type SteeringWheelCoverType = "leather_wrap_stitch" | "silicone_grip_sport" | "sheepskin_wool_warm" | "microfiber_breathable" | "wood_grain_luxury";

export function gripQuality(t: SteeringWheelCoverType): number {
  const m: Record<SteeringWheelCoverType, number> = {
    leather_wrap_stitch: 9, silicone_grip_sport: 10, sheepskin_wool_warm: 7, microfiber_breathable: 8, wood_grain_luxury: 6,
  };
  return m[t];
}

export function comfort(t: SteeringWheelCoverType): number {
  const m: Record<SteeringWheelCoverType, number> = {
    leather_wrap_stitch: 8, silicone_grip_sport: 6, sheepskin_wool_warm: 10, microfiber_breathable: 7, wood_grain_luxury: 5,
  };
  return m[t];
}

export function heatResist(t: SteeringWheelCoverType): number {
  const m: Record<SteeringWheelCoverType, number> = {
    leather_wrap_stitch: 7, silicone_grip_sport: 10, sheepskin_wool_warm: 4, microfiber_breathable: 6, wood_grain_luxury: 8,
  };
  return m[t];
}

export function aestheticAppeal(t: SteeringWheelCoverType): number {
  const m: Record<SteeringWheelCoverType, number> = {
    leather_wrap_stitch: 9, silicone_grip_sport: 5, sheepskin_wool_warm: 6, microfiber_breathable: 7, wood_grain_luxury: 10,
  };
  return m[t];
}

export function coverCost(t: SteeringWheelCoverType): number {
  const m: Record<SteeringWheelCoverType, number> = {
    leather_wrap_stitch: 7, silicone_grip_sport: 4, sheepskin_wool_warm: 8, microfiber_breathable: 5, wood_grain_luxury: 9,
  };
  return m[t];
}

export function easyInstall(t: SteeringWheelCoverType): boolean {
  const m: Record<SteeringWheelCoverType, boolean> = {
    leather_wrap_stitch: false, silicone_grip_sport: true, sheepskin_wool_warm: true, microfiber_breathable: true, wood_grain_luxury: false,
  };
  return m[t];
}

export function odorFree(t: SteeringWheelCoverType): boolean {
  const m: Record<SteeringWheelCoverType, boolean> = {
    leather_wrap_stitch: false, silicone_grip_sport: true, sheepskin_wool_warm: false, microfiber_breathable: true, wood_grain_luxury: true,
  };
  return m[t];
}

export function coverMaterial(t: SteeringWheelCoverType): string {
  const m: Record<SteeringWheelCoverType, string> = {
    leather_wrap_stitch: "genuine_leather_hand_sewn",
    silicone_grip_sport: "food_grade_silicone_flex",
    sheepskin_wool_warm: "natural_wool_fleece_wrap",
    microfiber_breathable: "suede_microfiber_weave",
    wood_grain_luxury: "hardwood_veneer_inlay",
  };
  return m[t];
}

export function bestClimate(t: SteeringWheelCoverType): string {
  const m: Record<SteeringWheelCoverType, string> = {
    leather_wrap_stitch: "moderate_year_round",
    silicone_grip_sport: "hot_summer_no_burn",
    sheepskin_wool_warm: "cold_winter_frost_guard",
    microfiber_breathable: "humid_tropical_airflow",
    wood_grain_luxury: "temperate_classic_car",
  };
  return m[t];
}

export function steeringWheelCovers(): SteeringWheelCoverType[] {
  return ["leather_wrap_stitch", "silicone_grip_sport", "sheepskin_wool_warm", "microfiber_breathable", "wood_grain_luxury"];
}
