export type EraserType = "pink_rubber" | "white_vinyl" | "kneaded_putty" | "electric_battery" | "ink_sand_grit";

export function erasingPower(t: EraserType): number {
  const m: Record<EraserType, number> = {
    pink_rubber: 7, white_vinyl: 9, kneaded_putty: 5, electric_battery: 10, ink_sand_grit: 8,
  };
  return m[t];
}

export function paperGentle(t: EraserType): number {
  const m: Record<EraserType, number> = {
    pink_rubber: 5, white_vinyl: 9, kneaded_putty: 10, electric_battery: 7, ink_sand_grit: 2,
  };
  return m[t];
}

export function smearFree(t: EraserType): number {
  const m: Record<EraserType, number> = {
    pink_rubber: 4, white_vinyl: 9, kneaded_putty: 8, electric_battery: 10, ink_sand_grit: 6,
  };
  return m[t];
}

export function precisionDetail(t: EraserType): number {
  const m: Record<EraserType, number> = {
    pink_rubber: 4, white_vinyl: 6, kneaded_putty: 8, electric_battery: 10, ink_sand_grit: 5,
  };
  return m[t];
}

export function eraserCost(t: EraserType): number {
  const m: Record<EraserType, number> = {
    pink_rubber: 1, white_vinyl: 1, kneaded_putty: 2, electric_battery: 6, ink_sand_grit: 2,
  };
  return m[t];
}

export function reusable(t: EraserType): boolean {
  const m: Record<EraserType, boolean> = {
    pink_rubber: false, white_vinyl: false, kneaded_putty: true, electric_battery: false, ink_sand_grit: false,
  };
  return m[t];
}

export function erasesInk(t: EraserType): boolean {
  const m: Record<EraserType, boolean> = {
    pink_rubber: false, white_vinyl: false, kneaded_putty: false, electric_battery: false, ink_sand_grit: true,
  };
  return m[t];
}

export function eraserMaterial(t: EraserType): string {
  const m: Record<EraserType, string> = {
    pink_rubber: "natural_latex_rubber",
    white_vinyl: "pvc_plasticizer_soft",
    kneaded_putty: "malleable_rubber_putty",
    electric_battery: "motor_spin_vinyl_tip",
    ink_sand_grit: "pumice_rubber_abrasive",
  };
  return m[t];
}

export function bestUse(t: EraserType): string {
  const m: Record<EraserType, string> = {
    pink_rubber: "general_school_pencil",
    white_vinyl: "drafting_clean_erase",
    kneaded_putty: "charcoal_pastel_lift",
    electric_battery: "fine_art_highlight",
    ink_sand_grit: "ballpoint_ink_correct",
  };
  return m[t];
}

export function erasers(): EraserType[] {
  return ["pink_rubber", "white_vinyl", "kneaded_putty", "electric_battery", "ink_sand_grit"];
}
