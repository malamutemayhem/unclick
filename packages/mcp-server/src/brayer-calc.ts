export type BrayerType = "soft_rubber_standard" | "hard_rubber_precise" | "foam_roller_texture" | "gelatin_mono_print" | "polyurethane_durometer";

export function inkCoverage(t: BrayerType): number {
  const m: Record<BrayerType, number> = {
    soft_rubber_standard: 9, hard_rubber_precise: 7, foam_roller_texture: 6, gelatin_mono_print: 10, polyurethane_durometer: 8,
  };
  return m[t];
}

export function inkControl(t: BrayerType): number {
  const m: Record<BrayerType, number> = {
    soft_rubber_standard: 7, hard_rubber_precise: 10, foam_roller_texture: 5, gelatin_mono_print: 6, polyurethane_durometer: 9,
  };
  return m[t];
}

export function surfaceAdapt(t: BrayerType): number {
  const m: Record<BrayerType, number> = {
    soft_rubber_standard: 9, hard_rubber_precise: 5, foam_roller_texture: 8, gelatin_mono_print: 10, polyurethane_durometer: 7,
  };
  return m[t];
}

export function durability(t: BrayerType): number {
  const m: Record<BrayerType, number> = {
    soft_rubber_standard: 8, hard_rubber_precise: 9, foam_roller_texture: 4, gelatin_mono_print: 3, polyurethane_durometer: 10,
  };
  return m[t];
}

export function brayerCost(t: BrayerType): number {
  const m: Record<BrayerType, number> = {
    soft_rubber_standard: 1, hard_rubber_precise: 2, foam_roller_texture: 1, gelatin_mono_print: 3, polyurethane_durometer: 2,
  };
  return m[t];
}

export function forRelief(t: BrayerType): boolean {
  const m: Record<BrayerType, boolean> = {
    soft_rubber_standard: true, hard_rubber_precise: true, foam_roller_texture: true, gelatin_mono_print: false, polyurethane_durometer: true,
  };
  return m[t];
}

export function forMonoprint(t: BrayerType): boolean {
  const m: Record<BrayerType, boolean> = {
    soft_rubber_standard: true, hard_rubber_precise: false, foam_roller_texture: false, gelatin_mono_print: true, polyurethane_durometer: false,
  };
  return m[t];
}

export function rollerMaterial(t: BrayerType): string {
  const m: Record<BrayerType, string> = {
    soft_rubber_standard: "natural_rubber_soft",
    hard_rubber_precise: "vulcanized_rubber_hard",
    foam_roller_texture: "open_cell_foam",
    gelatin_mono_print: "animal_gelatin_slab",
    polyurethane_durometer: "cast_polyurethane",
  };
  return m[t];
}

export function bestTechnique(t: BrayerType): string {
  const m: Record<BrayerType, string> = {
    soft_rubber_standard: "block_print_general",
    hard_rubber_precise: "fine_line_relief",
    foam_roller_texture: "background_wash_layer",
    gelatin_mono_print: "ghost_print_transfer",
    polyurethane_durometer: "viscosity_print_multi",
  };
  return m[t];
}

export function brayers(): BrayerType[] {
  return ["soft_rubber_standard", "hard_rubber_precise", "foam_roller_texture", "gelatin_mono_print", "polyurethane_durometer"];
}
