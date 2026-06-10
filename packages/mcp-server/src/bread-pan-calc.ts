export type BreadPanType = "loaf_tin_standard" | "pullman_lidded" | "baguette_perforated" | "dutch_oven_cast" | "banneton_proofing";

export function crustFormation(t: BreadPanType): number {
  const m: Record<BreadPanType, number> = {
    loaf_tin_standard: 6, pullman_lidded: 4, baguette_perforated: 9, dutch_oven_cast: 10, banneton_proofing: 3,
  };
  return m[t];
}

export function shapeConsistency(t: BreadPanType): number {
  const m: Record<BreadPanType, number> = {
    loaf_tin_standard: 8, pullman_lidded: 10, baguette_perforated: 7, dutch_oven_cast: 5, banneton_proofing: 9,
  };
  return m[t];
}

export function steamRetention(t: BreadPanType): number {
  const m: Record<BreadPanType, number> = {
    loaf_tin_standard: 3, pullman_lidded: 8, baguette_perforated: 2, dutch_oven_cast: 10, banneton_proofing: 1,
  };
  return m[t];
}

export function airCirculation(t: BreadPanType): number {
  const m: Record<BreadPanType, number> = {
    loaf_tin_standard: 4, pullman_lidded: 1, baguette_perforated: 10, dutch_oven_cast: 3, banneton_proofing: 8,
  };
  return m[t];
}

export function panCost(t: BreadPanType): number {
  const m: Record<BreadPanType, number> = {
    loaf_tin_standard: 2, pullman_lidded: 5, baguette_perforated: 4, dutch_oven_cast: 9, banneton_proofing: 4,
  };
  return m[t];
}

export function ovenSafe(t: BreadPanType): boolean {
  const m: Record<BreadPanType, boolean> = {
    loaf_tin_standard: true, pullman_lidded: true, baguette_perforated: true, dutch_oven_cast: true, banneton_proofing: false,
  };
  return m[t];
}

export function lidIncluded(t: BreadPanType): boolean {
  const m: Record<BreadPanType, boolean> = {
    loaf_tin_standard: false, pullman_lidded: true, baguette_perforated: false, dutch_oven_cast: true, banneton_proofing: false,
  };
  return m[t];
}

export function panMaterial(t: BreadPanType): string {
  const m: Record<BreadPanType, string> = {
    loaf_tin_standard: "aluminized_steel_coated",
    pullman_lidded: "heavy_gauge_steel_lid",
    baguette_perforated: "perforated_steel_tray",
    dutch_oven_cast: "enameled_cast_iron_pot",
    banneton_proofing: "natural_rattan_cane",
  };
  return m[t];
}

export function bestBread(t: BreadPanType): string {
  const m: Record<BreadPanType, string> = {
    loaf_tin_standard: "sandwich_loaf_everyday",
    pullman_lidded: "pain_de_mie_square",
    baguette_perforated: "french_baguette_crispy",
    dutch_oven_cast: "sourdough_artisan_boule",
    banneton_proofing: "shaped_proof_scoring",
  };
  return m[t];
}

export function breadPans(): BreadPanType[] {
  return ["loaf_tin_standard", "pullman_lidded", "baguette_perforated", "dutch_oven_cast", "banneton_proofing"];
}
