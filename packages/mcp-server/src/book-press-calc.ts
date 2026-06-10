export type BookPressType = "nipping_press_cast" | "finishing_press_wood" | "copy_press_screw" | "lying_press_plough" | "flower_press_bolt";

export function pressForce(t: BookPressType): number {
  const m: Record<BookPressType, number> = {
    nipping_press_cast: 10, finishing_press_wood: 6, copy_press_screw: 8, lying_press_plough: 7, flower_press_bolt: 4,
  };
  return m[t];
}

export function platSize(t: BookPressType): number {
  const m: Record<BookPressType, number> = {
    nipping_press_cast: 8, finishing_press_wood: 5, copy_press_screw: 9, lying_press_plough: 7, flower_press_bolt: 4,
  };
  return m[t];
}

export function portability(t: BookPressType): number {
  const m: Record<BookPressType, number> = {
    nipping_press_cast: 2, finishing_press_wood: 7, copy_press_screw: 3, lying_press_plough: 5, flower_press_bolt: 10,
  };
  return m[t];
}

export function buildQuality(t: BookPressType): number {
  const m: Record<BookPressType, number> = {
    nipping_press_cast: 10, finishing_press_wood: 7, copy_press_screw: 9, lying_press_plough: 8, flower_press_bolt: 5,
  };
  return m[t];
}

export function pressCost(t: BookPressType): number {
  const m: Record<BookPressType, number> = {
    nipping_press_cast: 5, finishing_press_wood: 3, copy_press_screw: 4, lying_press_plough: 4, flower_press_bolt: 1,
  };
  return m[t];
}

export function forBinding(t: BookPressType): boolean {
  const m: Record<BookPressType, boolean> = {
    nipping_press_cast: true, finishing_press_wood: true, copy_press_screw: true, lying_press_plough: true, flower_press_bolt: false,
  };
  return m[t];
}

export function hasPlough(t: BookPressType): boolean {
  const m: Record<BookPressType, boolean> = {
    nipping_press_cast: false, finishing_press_wood: false, copy_press_screw: false, lying_press_plough: true, flower_press_bolt: false,
  };
  return m[t];
}

export function pressFrame(t: BookPressType): string {
  const m: Record<BookPressType, string> = {
    nipping_press_cast: "cast_iron_frame",
    finishing_press_wood: "hardwood_cheek_pair",
    copy_press_screw: "steel_screw_platen",
    lying_press_plough: "beech_tub_channel",
    flower_press_bolt: "plywood_bolt_stack",
  };
  return m[t];
}

export function bestTask(t: BookPressType): string {
  const m: Record<BookPressType, string> = {
    nipping_press_cast: "case_bind_glue_set",
    finishing_press_wood: "sewing_spine_hold",
    copy_press_screw: "gilding_edge_clamp",
    lying_press_plough: "trim_edge_plough",
    flower_press_bolt: "press_dry_botanicals",
  };
  return m[t];
}

export function bookPresses(): BookPressType[] {
  return ["nipping_press_cast", "finishing_press_wood", "copy_press_screw", "lying_press_plough", "flower_press_bolt"];
}
