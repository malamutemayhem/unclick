export type BungeeCord = "natural_rubber" | "synthetic_latex" | "military_spec" | "braided_elastic" | "custom_blend";

export function elasticity(b: BungeeCord): number {
  const m: Record<BungeeCord, number> = {
    natural_rubber: 10, synthetic_latex: 8, military_spec: 7, braided_elastic: 6, custom_blend: 9,
  };
  return m[b];
}

export function tensileStrength(b: BungeeCord): number {
  const m: Record<BungeeCord, number> = {
    natural_rubber: 6, synthetic_latex: 7, military_spec: 10, braided_elastic: 8, custom_blend: 9,
  };
  return m[b];
}

export function uvResistance(b: BungeeCord): number {
  const m: Record<BungeeCord, number> = {
    natural_rubber: 3, synthetic_latex: 6, military_spec: 9, braided_elastic: 7, custom_blend: 8,
  };
  return m[b];
}

export function jumpCountLifespan(b: BungeeCord): number {
  const m: Record<BungeeCord, number> = {
    natural_rubber: 4, synthetic_latex: 6, military_spec: 10, braided_elastic: 7, custom_blend: 8,
  };
  return m[b];
}

export function costPerMeter(b: BungeeCord): number {
  const m: Record<BungeeCord, number> = {
    natural_rubber: 3, synthetic_latex: 5, military_spec: 9, braided_elastic: 4, custom_blend: 8,
  };
  return m[b];
}

export function waterResistant(b: BungeeCord): boolean {
  const m: Record<BungeeCord, boolean> = {
    natural_rubber: false, synthetic_latex: true, military_spec: true, braided_elastic: false, custom_blend: true,
  };
  return m[b];
}

export function certifiedForCommercial(b: BungeeCord): boolean {
  const m: Record<BungeeCord, boolean> = {
    natural_rubber: false, synthetic_latex: true, military_spec: true, braided_elastic: false, custom_blend: true,
  };
  return m[b];
}

export function coreConstruction(b: BungeeCord): string {
  const m: Record<BungeeCord, string> = {
    natural_rubber: "solid_rubber_strand", synthetic_latex: "woven_latex_sheath",
    military_spec: "multi_strand_redundant", braided_elastic: "braided_polyester_core",
    custom_blend: "hybrid_rubber_synthetic",
  };
  return m[b];
}

export function bestApplication(b: BungeeCord): string {
  const m: Record<BungeeCord, string> = {
    natural_rubber: "traditional_land_dive", synthetic_latex: "commercial_bridge_jump",
    military_spec: "extreme_height_crane", braided_elastic: "trampoline_harness",
    custom_blend: "variable_weight_tandem",
  };
  return m[b];
}

export function bungeeCords(): BungeeCord[] {
  return ["natural_rubber", "synthetic_latex", "military_spec", "braided_elastic", "custom_blend"];
}
