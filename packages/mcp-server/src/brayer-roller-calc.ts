export type BrayerRollerType = "soft_rubber_ink" | "hard_rubber_block" | "foam_roller_stamp" | "gelatin_plate_mono" | "acrylic_roller_clay";

export function inkCoverage(t: BrayerRollerType): number {
  const m: Record<BrayerRollerType, number> = {
    soft_rubber_ink: 10, hard_rubber_block: 7, foam_roller_stamp: 6, gelatin_plate_mono: 9, acrylic_roller_clay: 4,
  };
  return m[t];
}

export function pressureEven(t: BrayerRollerType): number {
  const m: Record<BrayerRollerType, number> = {
    soft_rubber_ink: 9, hard_rubber_block: 10, foam_roller_stamp: 5, gelatin_plate_mono: 8, acrylic_roller_clay: 9,
  };
  return m[t];
}

export function textureAbility(t: BrayerRollerType): number {
  const m: Record<BrayerRollerType, number> = {
    soft_rubber_ink: 5, hard_rubber_block: 7, foam_roller_stamp: 8, gelatin_plate_mono: 10, acrylic_roller_clay: 9,
  };
  return m[t];
}

export function cleanEase(t: BrayerRollerType): number {
  const m: Record<BrayerRollerType, number> = {
    soft_rubber_ink: 7, hard_rubber_block: 8, foam_roller_stamp: 4, gelatin_plate_mono: 6, acrylic_roller_clay: 9,
  };
  return m[t];
}

export function brayerCost(t: BrayerRollerType): number {
  const m: Record<BrayerRollerType, number> = {
    soft_rubber_ink: 2, hard_rubber_block: 2, foam_roller_stamp: 1, gelatin_plate_mono: 3, acrylic_roller_clay: 2,
  };
  return m[t];
}

export function forPrintmaking(t: BrayerRollerType): boolean {
  const m: Record<BrayerRollerType, boolean> = {
    soft_rubber_ink: true, hard_rubber_block: true, foam_roller_stamp: false, gelatin_plate_mono: true, acrylic_roller_clay: false,
  };
  return m[t];
}

export function disposable(t: BrayerRollerType): boolean {
  const m: Record<BrayerRollerType, boolean> = {
    soft_rubber_ink: false, hard_rubber_block: false, foam_roller_stamp: true, gelatin_plate_mono: false, acrylic_roller_clay: false,
  };
  return m[t];
}

export function rollerMaterial(t: BrayerRollerType): string {
  const m: Record<BrayerRollerType, string> = {
    soft_rubber_ink: "soft_durometer_rubber",
    hard_rubber_block: "hard_durometer_rubber",
    foam_roller_stamp: "closed_cell_foam",
    gelatin_plate_mono: "soft_rubber_gelplate",
    acrylic_roller_clay: "clear_acrylic_tube",
  };
  return m[t];
}

export function bestProject(t: BrayerRollerType): string {
  const m: Record<BrayerRollerType, string> = {
    soft_rubber_ink: "lino_block_print",
    hard_rubber_block: "relief_woodcut_press",
    foam_roller_stamp: "kid_craft_stamp",
    gelatin_plate_mono: "monoprint_ghost_layer",
    acrylic_roller_clay: "polymer_clay_flatten",
  };
  return m[t];
}

export function brayerRollers(): BrayerRollerType[] {
  return ["soft_rubber_ink", "hard_rubber_block", "foam_roller_stamp", "gelatin_plate_mono", "acrylic_roller_clay"];
}
