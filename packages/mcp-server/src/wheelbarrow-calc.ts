export type WheelbarrowType = "steel_traditional" | "poly_lightweight" | "dual_wheel_stable" | "garden_cart_flat" | "electric_power";

export function loadWeight(t: WheelbarrowType): number {
  const m: Record<WheelbarrowType, number> = {
    steel_traditional: 8, poly_lightweight: 5, dual_wheel_stable: 7, garden_cart_flat: 10, electric_power: 9,
  };
  return m[t];
}

export function maneuverEase(t: WheelbarrowType): number {
  const m: Record<WheelbarrowType, number> = {
    steel_traditional: 7, poly_lightweight: 9, dual_wheel_stable: 6, garden_cart_flat: 4, electric_power: 10,
  };
  return m[t];
}

export function rustResistance(t: WheelbarrowType): number {
  const m: Record<WheelbarrowType, number> = {
    steel_traditional: 3, poly_lightweight: 10, dual_wheel_stable: 5, garden_cart_flat: 7, electric_power: 8,
  };
  return m[t];
}

export function tipStability(t: WheelbarrowType): number {
  const m: Record<WheelbarrowType, number> = {
    steel_traditional: 5, poly_lightweight: 4, dual_wheel_stable: 10, garden_cart_flat: 9, electric_power: 8,
  };
  return m[t];
}

export function barrowCost(t: WheelbarrowType): number {
  const m: Record<WheelbarrowType, number> = {
    steel_traditional: 4, poly_lightweight: 3, dual_wheel_stable: 5, garden_cart_flat: 6, electric_power: 10,
  };
  return m[t];
}

export function dumpable(t: WheelbarrowType): boolean {
  const m: Record<WheelbarrowType, boolean> = {
    steel_traditional: true, poly_lightweight: true, dual_wheel_stable: true, garden_cart_flat: false, electric_power: true,
  };
  return m[t];
}

export function motorized(t: WheelbarrowType): boolean {
  const m: Record<WheelbarrowType, boolean> = {
    steel_traditional: false, poly_lightweight: false, dual_wheel_stable: false, garden_cart_flat: false, electric_power: true,
  };
  return m[t];
}

export function trayMaterial(t: WheelbarrowType): string {
  const m: Record<WheelbarrowType, string> = {
    steel_traditional: "pressed_steel_painted", poly_lightweight: "high_density_polyethylene",
    dual_wheel_stable: "galvanized_steel_tub", garden_cart_flat: "steel_mesh_flatbed",
    electric_power: "reinforced_poly_tub",
  };
  return m[t];
}

export function bestJob(t: WheelbarrowType): string {
  const m: Record<WheelbarrowType, string> = {
    steel_traditional: "construction_gravel_concrete", poly_lightweight: "garden_mulch_soil",
    dual_wheel_stable: "heavy_load_uneven_ground", garden_cart_flat: "lumber_bulk_transport",
    electric_power: "hillside_heavy_assist",
  };
  return m[t];
}

export function wheelbarrows(): WheelbarrowType[] {
  return ["steel_traditional", "poly_lightweight", "dual_wheel_stable", "garden_cart_flat", "electric_power"];
}
