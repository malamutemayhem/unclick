export type BindingThreadType = "linen_waxed_strong" | "cotton_unbleached_soft" | "silk_fine_delicate" | "polyester_synthetic_durable" | "hemp_cord_rustic";

export function tensileStrength(t: BindingThreadType): number {
  const m: Record<BindingThreadType, number> = {
    linen_waxed_strong: 10, cotton_unbleached_soft: 6, silk_fine_delicate: 5, polyester_synthetic_durable: 9, hemp_cord_rustic: 8,
  };
  return m[t];
}

export function sewSmooth(t: BindingThreadType): number {
  const m: Record<BindingThreadType, number> = {
    linen_waxed_strong: 8, cotton_unbleached_soft: 7, silk_fine_delicate: 10, polyester_synthetic_durable: 6, hemp_cord_rustic: 4,
  };
  return m[t];
}

export function archivalSafe(t: BindingThreadType): number {
  const m: Record<BindingThreadType, number> = {
    linen_waxed_strong: 10, cotton_unbleached_soft: 8, silk_fine_delicate: 9, polyester_synthetic_durable: 5, hemp_cord_rustic: 7,
  };
  return m[t];
}

export function knotHold(t: BindingThreadType): number {
  const m: Record<BindingThreadType, number> = {
    linen_waxed_strong: 9, cotton_unbleached_soft: 7, silk_fine_delicate: 5, polyester_synthetic_durable: 6, hemp_cord_rustic: 10,
  };
  return m[t];
}

export function threadCost(t: BindingThreadType): number {
  const m: Record<BindingThreadType, number> = {
    linen_waxed_strong: 3, cotton_unbleached_soft: 1, silk_fine_delicate: 4, polyester_synthetic_durable: 1, hemp_cord_rustic: 2,
  };
  return m[t];
}

export function preWaxed(t: BindingThreadType): boolean {
  const m: Record<BindingThreadType, boolean> = {
    linen_waxed_strong: true, cotton_unbleached_soft: false, silk_fine_delicate: false, polyester_synthetic_durable: false, hemp_cord_rustic: false,
  };
  return m[t];
}

export function naturalFiber(t: BindingThreadType): boolean {
  const m: Record<BindingThreadType, boolean> = {
    linen_waxed_strong: true, cotton_unbleached_soft: true, silk_fine_delicate: true, polyester_synthetic_durable: false, hemp_cord_rustic: true,
  };
  return m[t];
}

export function fiberSource(t: BindingThreadType): string {
  const m: Record<BindingThreadType, string> = {
    linen_waxed_strong: "flax_plant_stem",
    cotton_unbleached_soft: "cotton_boll_seed",
    silk_fine_delicate: "silkworm_cocoon_filament",
    polyester_synthetic_durable: "petroleum_polymer_spun",
    hemp_cord_rustic: "hemp_plant_bast",
  };
  return m[t];
}

export function bestBinding(t: BindingThreadType): string {
  const m: Record<BindingThreadType, string> = {
    linen_waxed_strong: "coptic_kettle_stitch",
    cotton_unbleached_soft: "pamphlet_stitch_simple",
    silk_fine_delicate: "japanese_stab_bind",
    polyester_synthetic_durable: "perfect_bind_reinforce",
    hemp_cord_rustic: "long_stitch_exposed",
  };
  return m[t];
}

export function bindingThreads(): BindingThreadType[] {
  return ["linen_waxed_strong", "cotton_unbleached_soft", "silk_fine_delicate", "polyester_synthetic_durable", "hemp_cord_rustic"];
}
