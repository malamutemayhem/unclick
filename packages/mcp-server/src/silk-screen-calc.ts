export type SilkScreenType = "mesh_110_general" | "mesh_160_detail" | "mesh_230_halftone" | "mesh_43_heavy" | "mesh_305_photo";

export function inkDeposit(t: SilkScreenType): number {
  const m: Record<SilkScreenType, number> = {
    mesh_110_general: 8, mesh_160_detail: 6, mesh_230_halftone: 4, mesh_43_heavy: 10, mesh_305_photo: 3,
  };
  return m[t];
}

export function printDetail(t: SilkScreenType): number {
  const m: Record<SilkScreenType, number> = {
    mesh_110_general: 6, mesh_160_detail: 8, mesh_230_halftone: 9, mesh_43_heavy: 3, mesh_305_photo: 10,
  };
  return m[t];
}

export function durability(t: SilkScreenType): number {
  const m: Record<SilkScreenType, number> = {
    mesh_110_general: 8, mesh_160_detail: 7, mesh_230_halftone: 5, mesh_43_heavy: 10, mesh_305_photo: 4,
  };
  return m[t];
}

export function tensionHold(t: SilkScreenType): number {
  const m: Record<SilkScreenType, number> = {
    mesh_110_general: 7, mesh_160_detail: 8, mesh_230_halftone: 9, mesh_43_heavy: 5, mesh_305_photo: 10,
  };
  return m[t];
}

export function screenCost(t: SilkScreenType): number {
  const m: Record<SilkScreenType, number> = {
    mesh_110_general: 1, mesh_160_detail: 2, mesh_230_halftone: 2, mesh_43_heavy: 1, mesh_305_photo: 3,
  };
  return m[t];
}

export function forPhoto(t: SilkScreenType): boolean {
  const m: Record<SilkScreenType, boolean> = {
    mesh_110_general: false, mesh_160_detail: false, mesh_230_halftone: true, mesh_43_heavy: false, mesh_305_photo: true,
  };
  return m[t];
}

export function forTextile(t: SilkScreenType): boolean {
  const m: Record<SilkScreenType, boolean> = {
    mesh_110_general: true, mesh_160_detail: true, mesh_230_halftone: false, mesh_43_heavy: true, mesh_305_photo: false,
  };
  return m[t];
}

export function meshMaterial(t: SilkScreenType): string {
  const m: Record<SilkScreenType, string> = {
    mesh_110_general: "polyester_monofilament",
    mesh_160_detail: "polyester_high_tension",
    mesh_230_halftone: "polyester_calendered",
    mesh_43_heavy: "polyester_heavy_duty",
    mesh_305_photo: "stainless_steel_mesh",
  };
  return m[t];
}

export function bestUse(t: SilkScreenType): string {
  const m: Record<SilkScreenType, string> = {
    mesh_110_general: "general_textile_print",
    mesh_160_detail: "fine_text_graphic",
    mesh_230_halftone: "halftone_gradient",
    mesh_43_heavy: "thick_ink_deposit",
    mesh_305_photo: "photo_emulsion_detail",
  };
  return m[t];
}

export function silkScreens(): SilkScreenType[] {
  return ["mesh_110_general", "mesh_160_detail", "mesh_230_halftone", "mesh_43_heavy", "mesh_305_photo"];
}
