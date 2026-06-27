export type CushionPackaging = "bubble_wrap" | "foam_sheet" | "air_pillow" | "molded_pulp" | "corrugated_insert";

export function shockAbsorption(c: CushionPackaging): number {
  const m: Record<CushionPackaging, number> = {
    bubble_wrap: 7, foam_sheet: 8, air_pillow: 6, molded_pulp: 9, corrugated_insert: 5,
  };
  return m[c];
}

export function conformability(c: CushionPackaging): number {
  const m: Record<CushionPackaging, number> = {
    bubble_wrap: 9, foam_sheet: 7, air_pillow: 8, molded_pulp: 3, corrugated_insert: 4,
  };
  return m[c];
}

export function storageEfficiency(c: CushionPackaging): number {
  const m: Record<CushionPackaging, number> = {
    bubble_wrap: 4, foam_sheet: 3, air_pillow: 10, molded_pulp: 5, corrugated_insert: 8,
  };
  return m[c];
}

export function sustainability(c: CushionPackaging): number {
  const m: Record<CushionPackaging, number> = {
    bubble_wrap: 2, foam_sheet: 3, air_pillow: 4, molded_pulp: 10, corrugated_insert: 9,
  };
  return m[c];
}

export function materialCost(c: CushionPackaging): number {
  const m: Record<CushionPackaging, number> = {
    bubble_wrap: 4, foam_sheet: 6, air_pillow: 3, molded_pulp: 7, corrugated_insert: 5,
  };
  return m[c];
}

export function biodegradable(c: CushionPackaging): boolean {
  const m: Record<CushionPackaging, boolean> = {
    bubble_wrap: false, foam_sheet: false, air_pillow: false, molded_pulp: true, corrugated_insert: true,
  };
  return m[c];
}

export function requiresInflation(c: CushionPackaging): boolean {
  const m: Record<CushionPackaging, boolean> = {
    bubble_wrap: false, foam_sheet: false, air_pillow: true, molded_pulp: false, corrugated_insert: false,
  };
  return m[c];
}

export function cushionMaterial(c: CushionPackaging): string {
  const m: Record<CushionPackaging, string> = {
    bubble_wrap: "polyethylene_air_cell", foam_sheet: "polyethylene_polyurethane_sheet",
    air_pillow: "inflated_hdpe_film", molded_pulp: "recycled_fiber_molded",
    corrugated_insert: "fluted_cardboard_divider",
  };
  return m[c];
}

export function bestProduct(c: CushionPackaging): string {
  const m: Record<CushionPackaging, string> = {
    bubble_wrap: "fragile_glass_ceramics", foam_sheet: "electronics_surface_wrap",
    air_pillow: "void_fill_ecommerce", molded_pulp: "egg_carton_electronics_tray",
    corrugated_insert: "bottle_partition_divider",
  };
  return m[c];
}

export function cushionPackagings(): CushionPackaging[] {
  return ["bubble_wrap", "foam_sheet", "air_pillow", "molded_pulp", "corrugated_insert"];
}
