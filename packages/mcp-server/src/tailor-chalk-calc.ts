export type TailorChalkType = "clay_triangle_classic" | "wax_pencil_sharp" | "chalk_wheel_roller" | "disappearing_ink_pen" | "pounce_powder_pad";

export function markVisibility(t: TailorChalkType): number {
  const m: Record<TailorChalkType, number> = {
    clay_triangle_classic: 8, wax_pencil_sharp: 9, chalk_wheel_roller: 7, disappearing_ink_pen: 6, pounce_powder_pad: 5,
  };
  return m[t];
}

export function linePrecision(t: TailorChalkType): number {
  const m: Record<TailorChalkType, number> = {
    clay_triangle_classic: 7, wax_pencil_sharp: 10, chalk_wheel_roller: 8, disappearing_ink_pen: 9, pounce_powder_pad: 5,
  };
  return m[t];
}

export function easeOfRemoval(t: TailorChalkType): number {
  const m: Record<TailorChalkType, number> = {
    clay_triangle_classic: 8, wax_pencil_sharp: 5, chalk_wheel_roller: 9, disappearing_ink_pen: 10, pounce_powder_pad: 10,
  };
  return m[t];
}

export function durability(t: TailorChalkType): number {
  const m: Record<TailorChalkType, number> = {
    clay_triangle_classic: 6, wax_pencil_sharp: 8, chalk_wheel_roller: 7, disappearing_ink_pen: 5, pounce_powder_pad: 4,
  };
  return m[t];
}

export function chalkCost(t: TailorChalkType): number {
  const m: Record<TailorChalkType, number> = {
    clay_triangle_classic: 1, wax_pencil_sharp: 1, chalk_wheel_roller: 2, disappearing_ink_pen: 2, pounce_powder_pad: 1,
  };
  return m[t];
}

export function selfErasing(t: TailorChalkType): boolean {
  const m: Record<TailorChalkType, boolean> = {
    clay_triangle_classic: false, wax_pencil_sharp: false, chalk_wheel_roller: false, disappearing_ink_pen: true, pounce_powder_pad: false,
  };
  return m[t];
}

export function sharpenable(t: TailorChalkType): boolean {
  const m: Record<TailorChalkType, boolean> = {
    clay_triangle_classic: true, wax_pencil_sharp: true, chalk_wheel_roller: false, disappearing_ink_pen: false, pounce_powder_pad: false,
  };
  return m[t];
}

export function markMedium(t: TailorChalkType): string {
  const m: Record<TailorChalkType, string> = {
    clay_triangle_classic: "calcium_clay_block",
    wax_pencil_sharp: "pigment_wax_core",
    chalk_wheel_roller: "powder_disc_cartridge",
    disappearing_ink_pen: "water_soluble_ink",
    pounce_powder_pad: "fine_chalk_dust",
  };
  return m[t];
}

export function bestFabric(t: TailorChalkType): string {
  const m: Record<TailorChalkType, string> = {
    clay_triangle_classic: "wool_suiting_heavy",
    wax_pencil_sharp: "dark_denim_canvas",
    chalk_wheel_roller: "cotton_quilting_light",
    disappearing_ink_pen: "silk_delicate_sheer",
    pounce_powder_pad: "pattern_transfer_muslin",
  };
  return m[t];
}

export function tailorChalks(): TailorChalkType[] {
  return ["clay_triangle_classic", "wax_pencil_sharp", "chalk_wheel_roller", "disappearing_ink_pen", "pounce_powder_pad"];
}
