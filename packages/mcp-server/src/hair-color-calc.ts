export type HairColor = "permanent" | "demi_permanent" | "semi_permanent" | "temporary" | "bleach_lightener";

export function colorLongevity(h: HairColor): number {
  const m: Record<HairColor, number> = {
    permanent: 10, demi_permanent: 7, semi_permanent: 4, temporary: 1, bleach_lightener: 10,
  };
  return m[h];
}

export function graysCoverage(h: HairColor): number {
  const m: Record<HairColor, number> = {
    permanent: 10, demi_permanent: 7, semi_permanent: 3, temporary: 1, bleach_lightener: 0,
  };
  return m[h];
}

export function hairDamage(h: HairColor): number {
  const m: Record<HairColor, number> = {
    permanent: 8, demi_permanent: 4, semi_permanent: 2, temporary: 1, bleach_lightener: 10,
  };
  return m[h];
}

export function colorVibrancy(h: HairColor): number {
  const m: Record<HairColor, number> = {
    permanent: 9, demi_permanent: 7, semi_permanent: 8, temporary: 6, bleach_lightener: 3,
  };
  return m[h];
}

export function productCost(h: HairColor): number {
  const m: Record<HairColor, number> = {
    permanent: 6, demi_permanent: 5, semi_permanent: 4, temporary: 2, bleach_lightener: 7,
  };
  return m[h];
}

export function requiresDeveloper(h: HairColor): boolean {
  const m: Record<HairColor, boolean> = {
    permanent: true, demi_permanent: true, semi_permanent: false, temporary: false, bleach_lightener: true,
  };
  return m[h];
}

export function canLighten(h: HairColor): boolean {
  const m: Record<HairColor, boolean> = {
    permanent: true, demi_permanent: false, semi_permanent: false, temporary: false, bleach_lightener: true,
  };
  return m[h];
}

export function chemicalProcess(h: HairColor): string {
  const m: Record<HairColor, string> = {
    permanent: "oxidation_cortex_penetration", demi_permanent: "low_volume_partial_penetration",
    semi_permanent: "cuticle_deposit_coating", temporary: "surface_film_rinse_out",
    bleach_lightener: "melanin_dissolution_lift",
  };
  return m[h];
}

export function bestUse(h: HairColor): string {
  const m: Record<HairColor, string> = {
    permanent: "full_gray_coverage_change", demi_permanent: "blend_refresh_tone",
    semi_permanent: "vivid_fashion_color", temporary: "event_costume_wash_out",
    bleach_lightener: "pre_lighten_highlight",
  };
  return m[h];
}

export function hairColors(): HairColor[] {
  return ["permanent", "demi_permanent", "semi_permanent", "temporary", "bleach_lightener"];
}
