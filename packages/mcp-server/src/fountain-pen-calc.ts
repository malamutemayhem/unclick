export type FountainPenType = "piston_filler" | "cartridge_converter" | "eyedropper_fill" | "vacuum_filler" | "disposable_starter";

export function inkCapacity(t: FountainPenType): number {
  const m: Record<FountainPenType, number> = {
    piston_filler: 9, cartridge_converter: 5, eyedropper_fill: 10, vacuum_filler: 8, disposable_starter: 3,
  };
  return m[t];
}

export function writeSmooth(t: FountainPenType): number {
  const m: Record<FountainPenType, number> = {
    piston_filler: 9, cartridge_converter: 7, eyedropper_fill: 8, vacuum_filler: 10, disposable_starter: 5,
  };
  return m[t];
}

export function fillConvenience(t: FountainPenType): number {
  const m: Record<FountainPenType, number> = {
    piston_filler: 7, cartridge_converter: 10, eyedropper_fill: 4, vacuum_filler: 6, disposable_starter: 10,
  };
  return m[t];
}

export function nibVariety(t: FountainPenType): number {
  const m: Record<FountainPenType, number> = {
    piston_filler: 8, cartridge_converter: 9, eyedropper_fill: 6, vacuum_filler: 7, disposable_starter: 2,
  };
  return m[t];
}

export function penCost(t: FountainPenType): number {
  const m: Record<FountainPenType, number> = {
    piston_filler: 8, cartridge_converter: 5, eyedropper_fill: 6, vacuum_filler: 10, disposable_starter: 1,
  };
  return m[t];
}

export function anyInk(t: FountainPenType): boolean {
  const m: Record<FountainPenType, boolean> = {
    piston_filler: true, cartridge_converter: true, eyedropper_fill: true, vacuum_filler: true, disposable_starter: false,
  };
  return m[t];
}

export function selfSeal(t: FountainPenType): boolean {
  const m: Record<FountainPenType, boolean> = {
    piston_filler: false, cartridge_converter: false, eyedropper_fill: false, vacuum_filler: true, disposable_starter: false,
  };
  return m[t];
}

export function fillMechanism(t: FountainPenType): string {
  const m: Record<FountainPenType, string> = {
    piston_filler: "screw_piston_barrel",
    cartridge_converter: "snap_cartridge_or_converter",
    eyedropper_fill: "direct_barrel_dropper",
    vacuum_filler: "plunger_vacuum_chamber",
    disposable_starter: "prefilled_sealed_cart",
  };
  return m[t];
}

export function bestWriter(t: FountainPenType): string {
  const m: Record<FountainPenType, string> = {
    piston_filler: "enthusiast_daily_writer",
    cartridge_converter: "beginner_student_office",
    eyedropper_fill: "ink_collector_artist",
    vacuum_filler: "luxury_collector_gift",
    disposable_starter: "first_try_casual",
  };
  return m[t];
}

export function fountainPens(): FountainPenType[] {
  return ["piston_filler", "cartridge_converter", "eyedropper_fill", "vacuum_filler", "disposable_starter"];
}
