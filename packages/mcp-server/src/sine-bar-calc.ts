export type SineBarType = "standard_5inch" | "standard_10inch" | "compound_sine_plate" | "magnetic_sine_chuck" | "mini_sine_vise";

export function angleAccuracy(t: SineBarType): number {
  const m: Record<SineBarType, number> = {
    standard_5inch: 8, standard_10inch: 10, compound_sine_plate: 9, magnetic_sine_chuck: 7, mini_sine_vise: 6,
  };
  return m[t];
}

export function workCapacity(t: SineBarType): number {
  const m: Record<SineBarType, number> = {
    standard_5inch: 5, standard_10inch: 8, compound_sine_plate: 10, magnetic_sine_chuck: 7, mini_sine_vise: 3,
  };
  return m[t];
}

export function setupSpeed(t: SineBarType): number {
  const m: Record<SineBarType, number> = {
    standard_5inch: 8, standard_10inch: 6, compound_sine_plate: 4, magnetic_sine_chuck: 9, mini_sine_vise: 10,
  };
  return m[t];
}

export function holdForce(t: SineBarType): number {
  const m: Record<SineBarType, number> = {
    standard_5inch: 5, standard_10inch: 7, compound_sine_plate: 9, magnetic_sine_chuck: 10, mini_sine_vise: 4,
  };
  return m[t];
}

export function barCost(t: SineBarType): number {
  const m: Record<SineBarType, number> = {
    standard_5inch: 1, standard_10inch: 2, compound_sine_plate: 3, magnetic_sine_chuck: 3, mini_sine_vise: 2,
  };
  return m[t];
}

export function magnetic(t: SineBarType): boolean {
  const m: Record<SineBarType, boolean> = {
    standard_5inch: false, standard_10inch: false, compound_sine_plate: false, magnetic_sine_chuck: true, mini_sine_vise: false,
  };
  return m[t];
}

export function compound(t: SineBarType): boolean {
  const m: Record<SineBarType, boolean> = {
    standard_5inch: false, standard_10inch: false, compound_sine_plate: true, magnetic_sine_chuck: false, mini_sine_vise: false,
  };
  return m[t];
}

export function centerDistance(t: SineBarType): string {
  const m: Record<SineBarType, string> = {
    standard_5inch: "5_inch_center",
    standard_10inch: "10_inch_center",
    compound_sine_plate: "variable_plate_center",
    magnetic_sine_chuck: "6_inch_mag_center",
    mini_sine_vise: "3_inch_mini_center",
  };
  return m[t];
}

export function bestUse(t: SineBarType): string {
  const m: Record<SineBarType, string> = {
    standard_5inch: "quick_angle_setup",
    standard_10inch: "precision_angle_layout",
    compound_sine_plate: "compound_angle_grind",
    magnetic_sine_chuck: "surface_grind_angle",
    mini_sine_vise: "small_part_angle",
  };
  return m[t];
}

export function sineBars(): SineBarType[] {
  return ["standard_5inch", "standard_10inch", "compound_sine_plate", "magnetic_sine_chuck", "mini_sine_vise"];
}
