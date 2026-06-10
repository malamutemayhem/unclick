export type WaxedThreadType = "linen_waxed_thick" | "polyester_waxed_smooth" | "silk_waxed_fine" | "hemp_waxed_rustic" | "cotton_waxed_soft";

export function strength(t: WaxedThreadType): number {
  const m: Record<WaxedThreadType, number> = {
    linen_waxed_thick: 9, polyester_waxed_smooth: 10, silk_waxed_fine: 6, hemp_waxed_rustic: 8, cotton_waxed_soft: 5,
  };
  return m[t];
}

export function knotEase(t: WaxedThreadType): number {
  const m: Record<WaxedThreadType, number> = {
    linen_waxed_thick: 8, polyester_waxed_smooth: 6, silk_waxed_fine: 10, hemp_waxed_rustic: 7, cotton_waxed_soft: 9,
  };
  return m[t];
}

export function waxCoat(t: WaxedThreadType): number {
  const m: Record<WaxedThreadType, number> = {
    linen_waxed_thick: 9, polyester_waxed_smooth: 7, silk_waxed_fine: 8, hemp_waxed_rustic: 10, cotton_waxed_soft: 6,
  };
  return m[t];
}

export function fineness(t: WaxedThreadType): number {
  const m: Record<WaxedThreadType, number> = {
    linen_waxed_thick: 5, polyester_waxed_smooth: 7, silk_waxed_fine: 10, hemp_waxed_rustic: 4, cotton_waxed_soft: 6,
  };
  return m[t];
}

export function threadCost(t: WaxedThreadType): number {
  const m: Record<WaxedThreadType, number> = {
    linen_waxed_thick: 3, polyester_waxed_smooth: 2, silk_waxed_fine: 5, hemp_waxed_rustic: 2, cotton_waxed_soft: 1,
  };
  return m[t];
}

export function archival(t: WaxedThreadType): boolean {
  const m: Record<WaxedThreadType, boolean> = {
    linen_waxed_thick: true, polyester_waxed_smooth: true, silk_waxed_fine: true, hemp_waxed_rustic: false, cotton_waxed_soft: false,
  };
  return m[t];
}

export function natural(t: WaxedThreadType): boolean {
  const m: Record<WaxedThreadType, boolean> = {
    linen_waxed_thick: true, polyester_waxed_smooth: false, silk_waxed_fine: true, hemp_waxed_rustic: true, cotton_waxed_soft: true,
  };
  return m[t];
}

export function threadFiber(t: WaxedThreadType): string {
  const m: Record<WaxedThreadType, string> = {
    linen_waxed_thick: "flax_beeswax_coat",
    polyester_waxed_smooth: "poly_paraffin_coat",
    silk_waxed_fine: "mulberry_silk_wax",
    hemp_waxed_rustic: "hemp_beeswax_heavy",
    cotton_waxed_soft: "cotton_light_wax",
  };
  return m[t];
}

export function bestUse(t: WaxedThreadType): string {
  const m: Record<WaxedThreadType, string> = {
    linen_waxed_thick: "traditional_book_sew",
    polyester_waxed_smooth: "durable_modern_bind",
    silk_waxed_fine: "fine_headband_sew",
    hemp_waxed_rustic: "journal_rustic_bind",
    cotton_waxed_soft: "pamphlet_soft_stitch",
  };
  return m[t];
}

export function waxedThreads(): WaxedThreadType[] {
  return ["linen_waxed_thick", "polyester_waxed_smooth", "silk_waxed_fine", "hemp_waxed_rustic", "cotton_waxed_soft"];
}
