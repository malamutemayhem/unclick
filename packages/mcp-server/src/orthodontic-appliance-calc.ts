export type OrthodonticAppliance = "metal_braces" | "ceramic_braces" | "lingual_braces" | "clear_aligners" | "retainer";

export function treatmentSpeed(a: OrthodonticAppliance): number {
  const m: Record<OrthodonticAppliance, number> = {
    metal_braces: 9, ceramic_braces: 8, lingual_braces: 7, clear_aligners: 6, retainer: 3,
  };
  return m[a];
}

export function aestheticScore(a: OrthodonticAppliance): number {
  const m: Record<OrthodonticAppliance, number> = {
    metal_braces: 3, ceramic_braces: 7, lingual_braces: 9, clear_aligners: 10, retainer: 8,
  };
  return m[a];
}

export function comfortLevel(a: OrthodonticAppliance): number {
  const m: Record<OrthodonticAppliance, number> = {
    metal_braces: 4, ceramic_braces: 5, lingual_braces: 3, clear_aligners: 8, retainer: 9,
  };
  return m[a];
}

export function costRange(a: OrthodonticAppliance): number {
  const m: Record<OrthodonticAppliance, number> = {
    metal_braces: 5, ceramic_braces: 7, lingual_braces: 10, clear_aligners: 8, retainer: 3,
  };
  return m[a];
}

export function maintenanceDifficulty(a: OrthodonticAppliance): number {
  const m: Record<OrthodonticAppliance, number> = {
    metal_braces: 7, ceramic_braces: 8, lingual_braces: 9, clear_aligners: 4, retainer: 3,
  };
  return m[a];
}

export function removable(a: OrthodonticAppliance): boolean {
  const m: Record<OrthodonticAppliance, boolean> = {
    metal_braces: false, ceramic_braces: false, lingual_braces: false, clear_aligners: true, retainer: true,
  };
  return m[a];
}

export function suitableForComplex(a: OrthodonticAppliance): boolean {
  const m: Record<OrthodonticAppliance, boolean> = {
    metal_braces: true, ceramic_braces: true, lingual_braces: true, clear_aligners: false, retainer: false,
  };
  return m[a];
}

export function materialComposition(a: OrthodonticAppliance): string {
  const m: Record<OrthodonticAppliance, string> = {
    metal_braces: "stainless_steel_titanium", ceramic_braces: "polycrystalline_alumina",
    lingual_braces: "gold_alloy_stainless", clear_aligners: "thermoplastic_polyurethane",
    retainer: "acrylic_wire_combo",
  };
  return m[a];
}

export function typicalDuration(a: OrthodonticAppliance): string {
  const m: Record<OrthodonticAppliance, string> = {
    metal_braces: "18_to_36_months", ceramic_braces: "18_to_36_months",
    lingual_braces: "24_to_36_months", clear_aligners: "12_to_24_months",
    retainer: "ongoing_nightly",
  };
  return m[a];
}

export function orthodonticAppliances(): OrthodonticAppliance[] {
  return ["metal_braces", "ceramic_braces", "lingual_braces", "clear_aligners", "retainer"];
}
