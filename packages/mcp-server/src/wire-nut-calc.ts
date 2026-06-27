export type WireNutType = "small_gray_22awg" | "medium_orange_14awg" | "large_yellow_12awg" | "big_red_10awg" | "waterproof_gel_filled";

export function wireRange(t: WireNutType): number {
  const m: Record<WireNutType, number> = {
    small_gray_22awg: 3, medium_orange_14awg: 6, large_yellow_12awg: 8, big_red_10awg: 10, waterproof_gel_filled: 7,
  };
  return m[t];
}

export function twistEase(t: WireNutType): number {
  const m: Record<WireNutType, number> = {
    small_gray_22awg: 9, medium_orange_14awg: 8, large_yellow_12awg: 6, big_red_10awg: 4, waterproof_gel_filled: 7,
  };
  return m[t];
}

export function connectionSecurity(t: WireNutType): number {
  const m: Record<WireNutType, number> = {
    small_gray_22awg: 6, medium_orange_14awg: 7, large_yellow_12awg: 8, big_red_10awg: 9, waterproof_gel_filled: 10,
  };
  return m[t];
}

export function temperatureRating(t: WireNutType): number {
  const m: Record<WireNutType, number> = {
    small_gray_22awg: 7, medium_orange_14awg: 7, large_yellow_12awg: 8, big_red_10awg: 8, waterproof_gel_filled: 6,
  };
  return m[t];
}

export function nutCost(t: WireNutType): number {
  const m: Record<WireNutType, number> = {
    small_gray_22awg: 2, medium_orange_14awg: 3, large_yellow_12awg: 4, big_red_10awg: 5, waterproof_gel_filled: 8,
  };
  return m[t];
}

export function waterproof(t: WireNutType): boolean {
  const m: Record<WireNutType, boolean> = {
    small_gray_22awg: false, medium_orange_14awg: false, large_yellow_12awg: false, big_red_10awg: false, waterproof_gel_filled: true,
  };
  return m[t];
}

export function listedUl(t: WireNutType): boolean {
  const m: Record<WireNutType, boolean> = {
    small_gray_22awg: true, medium_orange_14awg: true, large_yellow_12awg: true, big_red_10awg: true, waterproof_gel_filled: true,
  };
  return m[t];
}

export function shellMaterial(t: WireNutType): string {
  const m: Record<WireNutType, string> = {
    small_gray_22awg: "flame_retardant_pvc",
    medium_orange_14awg: "nylon_wing_grip",
    large_yellow_12awg: "polypropylene_ribbed",
    big_red_10awg: "nylon_high_torque",
    waterproof_gel_filled: "silicone_gel_sealed",
  };
  return m[t];
}

export function bestCircuit(t: WireNutType): string {
  const m: Record<WireNutType, string> = {
    small_gray_22awg: "low_voltage_signal",
    medium_orange_14awg: "lighting_15amp_branch",
    large_yellow_12awg: "outlet_20amp_kitchen",
    big_red_10awg: "appliance_30amp_dryer",
    waterproof_gel_filled: "outdoor_underground_wet",
  };
  return m[t];
}

export function wireNuts(): WireNutType[] {
  return ["small_gray_22awg", "medium_orange_14awg", "large_yellow_12awg", "big_red_10awg", "waterproof_gel_filled"];
}
