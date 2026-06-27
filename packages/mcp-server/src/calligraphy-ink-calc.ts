export type CalligraphyInkType = "iron_gall_archival" | "walnut_brown_natural" | "sumi_stick_carbon" | "acrylic_opaque_color" | "india_ink_shellac";

export function flowSmooth(t: CalligraphyInkType): number {
  const m: Record<CalligraphyInkType, number> = {
    iron_gall_archival: 8, walnut_brown_natural: 9, sumi_stick_carbon: 7, acrylic_opaque_color: 6, india_ink_shellac: 8,
  };
  return m[t];
}

export function lightfastness(t: CalligraphyInkType): number {
  const m: Record<CalligraphyInkType, number> = {
    iron_gall_archival: 10, walnut_brown_natural: 4, sumi_stick_carbon: 9, acrylic_opaque_color: 8, india_ink_shellac: 9,
  };
  return m[t];
}

export function waterproof(t: CalligraphyInkType): number {
  const m: Record<CalligraphyInkType, number> = {
    iron_gall_archival: 9, walnut_brown_natural: 2, sumi_stick_carbon: 3, acrylic_opaque_color: 10, india_ink_shellac: 10,
  };
  return m[t];
}

export function nibFriendly(t: CalligraphyInkType): number {
  const m: Record<CalligraphyInkType, number> = {
    iron_gall_archival: 6, walnut_brown_natural: 10, sumi_stick_carbon: 9, acrylic_opaque_color: 4, india_ink_shellac: 5,
  };
  return m[t];
}

export function inkCost(t: CalligraphyInkType): number {
  const m: Record<CalligraphyInkType, number> = {
    iron_gall_archival: 2, walnut_brown_natural: 1, sumi_stick_carbon: 3, acrylic_opaque_color: 2, india_ink_shellac: 1,
  };
  return m[t];
}

export function archival(t: CalligraphyInkType): boolean {
  const m: Record<CalligraphyInkType, boolean> = {
    iron_gall_archival: true, walnut_brown_natural: false, sumi_stick_carbon: true, acrylic_opaque_color: true, india_ink_shellac: true,
  };
  return m[t];
}

export function natural(t: CalligraphyInkType): boolean {
  const m: Record<CalligraphyInkType, boolean> = {
    iron_gall_archival: true, walnut_brown_natural: true, sumi_stick_carbon: true, acrylic_opaque_color: false, india_ink_shellac: false,
  };
  return m[t];
}

export function pigmentBase(t: CalligraphyInkType): string {
  const m: Record<CalligraphyInkType, string> = {
    iron_gall_archival: "iron_tannin_reaction",
    walnut_brown_natural: "walnut_hull_extract",
    sumi_stick_carbon: "pine_soot_carbon",
    acrylic_opaque_color: "acrylic_polymer_pigment",
    india_ink_shellac: "carbon_shellac_binder",
  };
  return m[t];
}

export function bestUse(t: CalligraphyInkType): string {
  const m: Record<CalligraphyInkType, string> = {
    iron_gall_archival: "historical_document_write",
    walnut_brown_natural: "practice_warm_tone",
    sumi_stick_carbon: "east_asian_brush_work",
    acrylic_opaque_color: "dark_paper_lettering",
    india_ink_shellac: "technical_drawing_ink",
  };
  return m[t];
}

export function calligraphyInks(): CalligraphyInkType[] {
  return ["iron_gall_archival", "walnut_brown_natural", "sumi_stick_carbon", "acrylic_opaque_color", "india_ink_shellac"];
}
