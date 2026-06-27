export type KilnWashType = "alumina_hydrate_brush" | "boron_nitride_spray" | "kiln_paper_fiber" | "thinfire_sheet_smooth" | "shelf_primer_paint";

export function releaseQuality(t: KilnWashType): number {
  const m: Record<KilnWashType, number> = {
    alumina_hydrate_brush: 7, boron_nitride_spray: 10, kiln_paper_fiber: 8, thinfire_sheet_smooth: 9, shelf_primer_paint: 6,
  };
  return m[t];
}

export function surfaceSmoothness(t: KilnWashType): number {
  const m: Record<KilnWashType, number> = {
    alumina_hydrate_brush: 5, boron_nitride_spray: 9, kiln_paper_fiber: 6, thinfire_sheet_smooth: 10, shelf_primer_paint: 4,
  };
  return m[t];
}

export function applicationEase(t: KilnWashType): number {
  const m: Record<KilnWashType, number> = {
    alumina_hydrate_brush: 6, boron_nitride_spray: 9, kiln_paper_fiber: 10, thinfire_sheet_smooth: 10, shelf_primer_paint: 5,
  };
  return m[t];
}

export function reusability(t: KilnWashType): number {
  const m: Record<KilnWashType, number> = {
    alumina_hydrate_brush: 8, boron_nitride_spray: 6, kiln_paper_fiber: 1, thinfire_sheet_smooth: 1, shelf_primer_paint: 9,
  };
  return m[t];
}

export function washCost(t: KilnWashType): number {
  const m: Record<KilnWashType, number> = {
    alumina_hydrate_brush: 1, boron_nitride_spray: 4, kiln_paper_fiber: 2, thinfire_sheet_smooth: 3, shelf_primer_paint: 1,
  };
  return m[t];
}

export function singleUse(t: KilnWashType): boolean {
  const m: Record<KilnWashType, boolean> = {
    alumina_hydrate_brush: false, boron_nitride_spray: false, kiln_paper_fiber: true, thinfire_sheet_smooth: true, shelf_primer_paint: false,
  };
  return m[t];
}

export function sprayApply(t: KilnWashType): boolean {
  const m: Record<KilnWashType, boolean> = {
    alumina_hydrate_brush: false, boron_nitride_spray: true, kiln_paper_fiber: false, thinfire_sheet_smooth: false, shelf_primer_paint: false,
  };
  return m[t];
}

export function baseIngredient(t: KilnWashType): string {
  const m: Record<KilnWashType, string> = {
    alumina_hydrate_brush: "alumina_oxide_powder",
    boron_nitride_spray: "hexagonal_boron_nitride",
    kiln_paper_fiber: "ceramic_fiber_sheet",
    thinfire_sheet_smooth: "rigid_fiber_paper",
    shelf_primer_paint: "zirconia_alumina_mix",
  };
  return m[t];
}

export function bestFiring(t: KilnWashType): string {
  const m: Record<KilnWashType, string> = {
    alumina_hydrate_brush: "general_shelf_protect",
    boron_nitride_spray: "glass_casting_mold",
    kiln_paper_fiber: "fused_glass_texture",
    thinfire_sheet_smooth: "smooth_bottom_fuse",
    shelf_primer_paint: "heavy_duty_pottery",
  };
  return m[t];
}

export function kilnWashes(): KilnWashType[] {
  return ["alumina_hydrate_brush", "boron_nitride_spray", "kiln_paper_fiber", "thinfire_sheet_smooth", "shelf_primer_paint"];
}
